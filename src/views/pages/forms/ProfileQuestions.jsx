'use client'

// React Imports
import { useEffect, useState } from 'react'

// Next Imports

// MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// Components Imports
import { newProfileSurveyAtom, newArConnectGlobalIsConnected } from '@/app/store/atoms'
import { useAtom } from 'jotai/index'
import ProfileQuestion from './ProfileQuestion'

import {
  RespondentProfileSurveyIndexApi,
  RespondentProfileSurveyApiClient
} from '../../../@bff/respondent-optional-info-api'
import { dryrun, message, createDataItemSigner } from '@permaweb/aoconnect'
import { jwtDecode } from 'jwt-decode'

const getInitSurveyData = surveyData => {
  surveyData.question = surveyData.init.question
  surveyData.type = surveyData.init.type
  surveyData.possibleAnswers = surveyData.init.possibleAnswers
  surveyData.answers = [surveyData.init.answers]
  return surveyData
}

const initSurveyData = surveyData => {
  for (var i = 0; i < surveyData.length; ++i) {
    surveyData[i] = getInitSurveyData(surveyData[i])
  }
  return surveyData
}

const ProfileQuestions = ({ question, answers }) => {
  const [arConnectGlobalIsConnected, setArConnectGlobalIsConnected] = useAtom(newArConnectGlobalIsConnected)

  const [newProfileSurvey, setNewProfileSurvey] = useAtom(newProfileSurveyAtom)

  const [isSaving, setIsSaving] = useState(false)

  const [currentSurveyId, setCurrentSurveyId] = useState(null)

  const [respondentProfileSurveyIndexApi, setRespondentProfileSurveyIndexApi] = useState(
    new RespondentProfileSurveyIndexApi(RespondentProfileSurveyApiClient.instance)
  )

  useEffect(() => {
    // fetchProfileSurvey(currentSurveyId)
    console.log('-----------------------use efect masaa --------------------------------------')
    if (arConnectGlobalIsConnected.connected) {
      console.log('-----------------------use efect fetch --------------------------------------')
      if (!newProfileSurvey.targetGroups[0].surveyData || newProfileSurvey.targetGroups[0].surveyData.length == 0) {
        fetchProfileSurvey(currentSurveyId)
      }
    } else if (currentSurveyId && !arConnectGlobalIsConnected.connected) {
      // if (newProfileSurvey.targetGroups[0].surveyData && newProfileSurvey.targetGroups[0].surveyData.length > 0) {
      //   console.log('-----------------------use efect empty --------------------------------------')
      //   let targetGroup = newProfileSurvey.targetGroups[0]
      //   targetGroup.surveyData = initSurveyData(newProfileSurvey.targetGroups[0].init.surveyData)

      //   setNewProfileSurvey(prev => ({
      //     ...prev,
      //     targetGroups: [targetGroup]
      //   }))
      // }
    } else {
      //   if (!newProfileSurvey.targetGroups[0].surveyData || newProfileSurvey.targetGroups[0].surveyData.length == 0) {
      //     console.log('-----------------------use efect empty --------------------------------------')
      //     let targetGroup = newProfileSurvey.targetGroups[0]
      //   targetGroup.surveyData = initSurveyData(newProfileSurvey.targetGroups[0].init.surveyData)
      //   setNewProfileSurvey(prev => ({
      //     ...prev,
      //     targetGroups: [targetGroup]
      //   }))
      // }
      // let targetGroup = newProfileSurvey.targetGroups[0]
      // targetGroup.surveyData = initSurveyData(newProfileSurvey.targetGroups[0].init.surveyData)
      // setNewProfileSurvey(prev => ({
      //   ...prev,
      //   targetGroups: [targetGroup]
      // }))
    }
  }, [currentSurveyId, arConnectGlobalIsConnected])

  useEffect(() => {
    if (!currentSurveyId && arConnectGlobalIsConnected) {
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
          setCurrentSurveyId(data.currentSurveyId)
        } else {
        }
      })
    }
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    setIsSaving(true)
    let targetGroup = newProfileSurvey.targetGroups[0]

    let surveyDataDto = []
    for (var i = 0; i < targetGroup.surveyData.length; ++i) {
      surveyDataDto.push({
        question: targetGroup.surveyData[i].question,
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
          time: new Date().toISOString(),
          visible: true,
          surveyData: surveyDataDto
        }
      ]
    }
    try {
      const messageId = await message({
        process: 'ENnyYpVeZlS0j01ss-Rht9rHVpmZ73vItDb2Xtrtikc',
        signer: createDataItemSigner(window.arweaveWallet),
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
      if (currentSurveyId) {
        respondentProfileSurveyIndexApi.updateRespondentProfileSurveyIndex(
          {
            currentSurveyId: messageId,
            lastSurveyId: currentSurveyId
          },
          sub,
          function (error, data, response) {
            setIsSaving(false)
            if (error) {
              console.log('error', error)
              return
            }
            setCurrentSurveyId(messageId)
          }
        )
      } else {
        respondentProfileSurveyIndexApi.addRespondentProfileSurveyIndex(
          {
            currentSurveyId: messageId,
            lastSurveyId: ''
          },
          function (error, data, response) {
            setIsSaving(false)
            if (error) {
              console.log('error', error)
              return
            }
          }
        )
      }
    } catch (error) {
      console.log(error)
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
          question: newProfileSurvey.targetGroups[0].init.surveyData[i].init.question,
          type: newProfileSurvey.targetGroups[0].init.surveyData[i].init.type,
          possibleAnswers: newProfileSurvey.targetGroups[0].init.surveyData[i].init.possibleAnswers,
          answers: survey.targetGroups[0].surveyData[i].answers
        })
      }
      let targetGroup = newProfileSurvey.targetGroups[0]
      targetGroup.surveyData = sd
      setNewProfileSurvey(prev => ({
        ...prev,
        targetGroups: [targetGroup]
      }))
      return sd
    } catch (error) {
      console.log(error)
      let targetGroup = newProfileSurvey.targetGroups[0]
      targetGroup.surveyData = initSurveyData(newProfileSurvey.targetGroups[0].init.surveyData)

      setNewProfileSurvey(prev => ({
        ...prev,
        targetGroups: [targetGroup]
      }))
    }
  }

  return (
    <Card>
      <CardHeader title='Optional info' />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              {newProfileSurvey.targetGroups[0].surveyData &&
                newProfileSurvey.targetGroups[0].surveyData.map((item, index) => (
                  <ProfileQuestion key={index} questionItem={item} />
                ))}
            </Grid>
            <Grid item xs={12} className='flex gap-4'>
              <Button variant='contained' type='submit' disabled={!arConnectGlobalIsConnected.connected || isSaving}>
                {(isSaving && 'Saving...') || (!isSaving && 'Save')}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default ProfileQuestions
