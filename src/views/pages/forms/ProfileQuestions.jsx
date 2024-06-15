'use client'

// React Imports
import * as React from 'react'
import { useEffect, useState } from 'react'

// Next Imports

// MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// Components Imports
import { newProfileSurveyAtom } from '@/app/store/atoms'
import { useAtom } from 'jotai/index'
import ProfileQuestion from './ProfileQuestion'

import {
  RespondentProfileSurveyIndexApi,
  QuestionStatisticApi,
  RespondentProfileSurveyApiClient
} from '../../../@bff/respondent-optional-info-api'
import { dryrun, message, createDataItemSigner } from '@permaweb/aoconnect'
import { jwtDecode } from 'jwt-decode'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

import Alert from '@mui/material/Alert'
import Link from '@mui/material/Link'
import Snackbar from '@mui/material/Snackbar'

import GlobalProfiling from '@views/pages/shared/GlobalProfiling'
import Typography from '@mui/material/Typography'
import { profileCategories, respondentSurveyData, initSurveyData } from '@/app/store/consts'

import * as othentSinger from '@othent/kms'

const toIsoString = date => {
  var tzo = -date.getTimezoneOffset(),
    dif = tzo >= 0 ? '+' : '-',
    pad = function (num) {
      return (num < 10 ? '0' : '') + num
    }

  return (
    date.getFullYear() +
    '-' +
    pad(date.getMonth() + 1) +
    '-' +
    pad(date.getDate()) +
    'T' +
    pad(date.getHours()) +
    ':' +
    pad(date.getMinutes()) +
    ':' +
    pad(date.getSeconds()) +
    dif +
    pad(Math.floor(Math.abs(tzo) / 60)) +
    ':' +
    pad(Math.abs(tzo) % 60)
  )
}

const ProfileQuestions = ({ question, answers }) => {
  const [newProfileSurvey, setNewProfileSurvey] = useAtom(newProfileSurveyAtom)

  const [isSaving, setIsSaving] = useState(false)

  const [profileSurveySaved, setProfileSurveySaved] = useState(false)

  const [respondentProfileSurveyIndexApi, setRespondentProfileSurveyIndexApi] = useState(
    new RespondentProfileSurveyIndexApi(RespondentProfileSurveyApiClient.instance)
  )

  const [questionStatisticApi, setQuestionStatisticApi] = useState(
    new QuestionStatisticApi(RespondentProfileSurveyApiClient.instance)
  )

  const getSinger = () => {
    const singer = Object.assign({}, othentSinger, {
      getActiveAddress: () => othentSinger.getActiveKey(),
      getAddress: () => othentSinger.getActiveKey(),
      singer: tx => othentSinger.sign(tx),
      type: 'arweave'
    })
    return singer
  }

  useEffect(() => {
    if (
      !newProfileSurvey.surveyId &&
      (!newProfileSurvey.targetGroups ||
        !newProfileSurvey.targetGroups[0].surveyData ||
        newProfileSurvey.targetGroups[0].surveyData.length <= 0)
    ) {
      const idToken = localStorage.getItem('id_token')
      const { sub } = jwtDecode(idToken)
      respondentProfileSurveyIndexApi.apiClient.authentications = {
        bearerAuth: {
          type: 'oauth2',
          accessToken: idToken
        }
      }
      respondentProfileSurveyIndexApi.findRespondentProfileSurveyIndexById(sub, function (error, data, response) {
        if (error) {
          console.log('error', error)
          return
        }
        if (data.currentSurveyId) {
          fetchProfileSurvey(data.currentSurveyId)
        } else {
          fetchProfileSurvey(null)
        }
      })
    }
  })

  const handleSubmit = async e => {
    e.preventDefault()
    setIsSaving(true)
    let targetGroup = newProfileSurvey.targetGroups[0]

    let surveyDataDto = []
    for (var i = 0; i < targetGroup.surveyData.length; ++i) {
      surveyDataDto.push({
        question: targetGroup.surveyData[i].question,
        category: targetGroup.surveyData[i].category,
        answers: targetGroup.surveyData[i].answers
      })
    }
    let survey = {
      type: newProfileSurvey.type,
      config: 'easy',
      countryCodes: [],
      countryNames: [],
      wantedRespondents: 1,
      wantedQuestions: 4,
      targetGroups: [
        {
          minimumAge: 0,
          maximumAge: 0,
          gender: targetGroup.gender,
          country: targetGroup.country,
          wantedCompletes: '1',
          ir: '',
          loi: '',
          daysInField: '',
          startDate: targetGroup.dob,
          time: toIsoString(new Date()).substring(0, 10),
          visible: true,
          surveyData: surveyDataDto
        }
      ]
    }
    try {
      const messageId = await message({
        process: 'ENnyYpVeZlS0j01ss-Rht9rHVpmZ73vItDb2Xtrtikc',
        signer: createDataItemSigner(await getSinger()),
        // the survey as stringified JSON
        data: JSON.stringify(survey),
        tags: [{ name: 'Action', value: 'AddSurvey' }]
      })
      const idToken = localStorage.getItem('id_token')
      const { sub } = jwtDecode(idToken)
      respondentProfileSurveyIndexApi.apiClient.authentications = {
        bearerAuth: {
          type: 'oauth2',
          accessToken: idToken
        }
      }
      if (newProfileSurvey.surveyId) {
        respondentProfileSurveyIndexApi.updateRespondentProfileSurveyIndex(
          {
            currentSurveyId: messageId,
            lastSurveyId: newProfileSurvey.surveyId
          },
          sub,
          async function (error, data, response) {
            setIsSaving(false)
            if (error) {
              console.log('error', error)
              return
            }
            let stats = []
            let oldSurvey = await getProfileSurvey(newProfileSurvey.surveyId)
            if (oldSurvey != null) {
              for (var i = 0; i < survey.targetGroups[0].surveyData.length; ++i) {
                for (var j = 0; j < oldSurvey.targetGroups[0].surveyData[i].answers.length; ++j) {
                  stats.push({
                    question: oldSurvey.targetGroups[0].surveyData[i].question,
                    answer: oldSurvey.targetGroups[0].surveyData[i].answers[j] + '',
                    dateOfBirth: toIsoString(new Date(oldSurvey.targetGroups[0].startDate)).substring(0, 10),
                    country: oldSurvey.targetGroups[0].country,
                    gender: oldSurvey.targetGroups[0].gender,
                    category: oldSurvey.targetGroups[0].surveyData[i].category,
                    count: -1,
                    profileSurveyStatisticId: oldSurvey.type
                  })
                }
                for (var j = 0; j < survey.targetGroups[0].surveyData[i].answers.length; ++j) {
                  stats.push({
                    question: survey.targetGroups[0].surveyData[i].question,
                    answer: survey.targetGroups[0].surveyData[i].answers[j] + '',
                    dateOfBirth: toIsoString(new Date(newProfileSurvey.targetGroups[0].dob)).substring(0, 10),
                    country: newProfileSurvey.targetGroups[0].country,
                    gender: newProfileSurvey.targetGroups[0].gender,
                    category: newProfileSurvey.targetGroups[0].surveyData[i].category,
                    count: 1,
                    profileSurveyStatisticId: newProfileSurvey.type
                  })
                }
              }
              questionStatisticApi.addQuestionStatistic(stats, function (error, data, response) {
                if (error) {
                  console.log('error', error)
                  return
                }
                setNewProfileSurvey(prev => ({
                  ...prev,
                  surveyId: messageId
                }))
                setProfileSurveySaved(true)
              })
              return
            }
            setNewProfileSurvey(prev => ({
              ...prev,
              surveyId: messageId
            }))
            setProfileSurveySaved(true)
          }
        )
      } else {
        respondentProfileSurveyIndexApi.addRespondentProfileSurveyIndex(
          {
            currentSurveyId: messageId,
            lastSurveyId: ''
          },
          function (error, data, response) {
            let stats = []
            for (var i = 0; i < survey.targetGroups[0].surveyData.length; ++i) {
              for (var j = 0; j < survey.targetGroups[0].surveyData[i].answers.length; ++j) {
                stats.push({
                  question: survey.targetGroups[0].surveyData[i].question,
                  answer: survey.targetGroups[0].surveyData[i].answers[j] + '',
                  dateOfBirth: toIsoString(new Date(newProfileSurvey.targetGroups[0].dob)).substring(0, 10),
                  country: newProfileSurvey.targetGroups[0].country,
                  gender: newProfileSurvey.targetGroups[0].gender,
                  category: newProfileSurvey.targetGroups[0].surveyData[i].category,
                  count: 1,
                  profileSurveyStatisticId: newProfileSurvey.type
                })
              }
            }
            setIsSaving(false)
            if (error) {
              console.log('error', error)
              return
            }
            questionStatisticApi.addQuestionStatistic(stats, function (error, data, response) {
              if (error) {
                console.log('error', error)
                return
              }
              setNewProfileSurvey(prev => ({
                ...prev,
                surveyId: messageId
              }))
              setProfileSurveySaved(true)
            })
          }
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getProfileSurvey = async surveyId => {
    try {
      const tx = await dryrun({
        process: 'ENnyYpVeZlS0j01ss-Rht9rHVpmZ73vItDb2Xtrtikc',
        tags: [
          { name: 'Action', value: 'GetSurveyByKv' },
          { name: 'Key', value: 'ao_id' },
          { name: 'Val', value: surveyId }
        ]
      })
      return JSON.parse(tx.Messages[0].Data)
    } catch (error) {
      console.log(error)
      return true
    }
  }

  const fetchProfileSurvey = async surveyId => {
    try {
      const tx = await dryrun({
        process: 'ENnyYpVeZlS0j01ss-Rht9rHVpmZ73vItDb2Xtrtikc',
        tags: [
          { name: 'Action', value: 'GetSurveyByKv' },
          { name: 'Key', value: 'ao_id' },
          { name: 'Val', value: surveyId }
        ]
      })
      let survey = JSON.parse(tx.Messages[0].Data)

      let sd = []
      for (var i = 0; i < survey.targetGroups[0].surveyData.length; ++i) {
        sd.push({
          question: respondentSurveyData[i].question,
          type: respondentSurveyData[i].type,
          category: respondentSurveyData[i].category,
          possibleAnswers: respondentSurveyData[i].possibleAnswers,
          answers: survey.targetGroups[0].surveyData[i].answers
        })
      }
      let targetGroup = newProfileSurvey.targetGroups[0]
      targetGroup.surveyData = sd
      setNewProfileSurvey(prev => ({
        ...prev,
        surveyId: surveyId,
        targetGroups: [targetGroup]
      }))
      return sd
    } catch (error) {
      console.log(error)
      let targetGroup = newProfileSurvey.targetGroups[0]
      targetGroup.surveyData = initSurveyData(respondentSurveyData)

      setNewProfileSurvey(prev => ({
        ...prev,
        targetGroups: [targetGroup]
      }))
    }
  }

  return (
    newProfileSurvey.targetGroups &&
    newProfileSurvey.targetGroups[0] &&
    newProfileSurvey.targetGroups[0].dob &&
    newProfileSurvey.targetGroups[0].country &&
    newProfileSurvey.targetGroups[0].gender && (
      <React.StrictMode>
        <Snackbar
          open={profileSurveySaved}
          autoHideDuration={3000}
          onClose={() => {
            setProfileSurveySaved(false)
          }}
        >
          <Alert variant='filled' severity='success'>
            <Link target='_blank' href={'https://ao_marton.g8way.io/#/message/' + newProfileSurvey.surveyId}>
              View Block in ao Explorer
            </Link>
          </Alert>
        </Snackbar>

        <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={isSaving}>
          <CircularProgress color='inherit' />
        </Backdrop>
        <Card>
          <CardHeader title='Optional info' />
          <CardContent>
            <GlobalProfiling
              profileCategories={profileCategories}
              surveyData={newProfileSurvey.targetGroups[0].surveyData}
              render={(category, open) => (
                <React.Fragment>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={6}>
                      <Grid item xs={12}>
                        <Typography component='span' variant='h5' className='flex flex-col'>
                          {category}
                        </Typography>
                        <Typography component='span' variant='h6' className='flex flex-col'>
                          Below are the questions that the panelists hae responded to. You can select any number of
                          attributes that matches your target criteria. The target group will then contain only
                          panelists who have answered these selected attributes (as well as any other attributes you
                          have selected in other categories).
                        </Typography>
                        {open &&
                          newProfileSurvey.targetGroups[0].surveyData &&
                          newProfileSurvey.targetGroups[0].surveyData.map((item, index) => (
                            <ProfileQuestion key={index} questionItem={item} category={category} />
                          ))}
                      </Grid>
                      <Grid item xs={12} className='flex gap-4'>
                        <Button variant='contained' type='submit' disabled={isSaving}>
                          {(isSaving && 'Saving...') || (!isSaving && 'Save')}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </React.Fragment>
              )}
            />
          </CardContent>
        </Card>
      </React.StrictMode>
    )
  )
}

export default ProfileQuestions
