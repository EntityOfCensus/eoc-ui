'use client'

// React Imports

// Next Imports

// MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// Components Imports
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import Checkbox from '@mui/material/Checkbox'
import { newProfileSurveyAtom } from '@/app/store/atoms'
import { useAtom } from 'jotai/index'
import ProfileQuestion from './ProfileQuestion'

import {
  RespondentProfileSurveyIndexApi,
  RespondentProfileSurveyApiClient
} from '../../../@bff/respondent-optional-info-api'
import { cache, useEffect, useState } from 'react'
import { dryrun, message, createDataItemSigner, result } from '@permaweb/aoconnect'
import { jwtDecode } from 'jwt-decode'

const ProfileQuestions = ({ question, answers }) => {
  const [newProfileSurvey, setNewProfileSurvey] = useAtom(newProfileSurveyAtom)

  const [surveyData, setSurveyData] = useState([])

  const [currentSurveyId, setCurrentSurveyId] = useState(null)

  const [isConnected, setIsConnected] = useState(
    localStorage.getItem('walletAddress') != null && localStorage.getItem('walletAddress').length > 0
  )

  const [walletAddress, setWalletAddress] = useState(null)

  const [respondentProfileSurveyIndexApi, setRespondentProfileSurveyIndexApi] = useState(
    new RespondentProfileSurveyIndexApi(RespondentProfileSurveyApiClient.instance)
  )

  console.log(surveyData)

  useEffect(() => {
    checkConnected()
  }, [walletAddress])

  // useEffect(() => {
  //   if (currentSurveyId) {
  //   }
  // }, [currentSurveyId])

  useEffect(() => {
    setSurveyData(initSurveyData(newProfileSurvey.targetGroups[0].init.surveyData))
    const walletAddress =
      localStorage.getItem('walletAddress') != null && localStorage.getItem('walletAddress').length > 0
        ? localStorage.getItem('walletAddress')
        : null
    if (walletAddress) {
      setWalletAddress(walletAddress)
    }
    if (!currentSurveyId) {
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
          fetchProfileSurvey(data.currentSurveyId).then(sd => {
            setSurveyData(sd)
          })
        }
      })
    }
  }, [])

  const handleSubmit = async () => {
    let targetGroup = newProfileSurvey.targetGroups[0]
    targetGroup.surveyData = surveyData
    setNewProfileSurvey(prev => ({
      ...prev,
      targetGroups: [targetGroup]
    }))
    let surveyDataDto = []
    for (var i = 0; i < surveyData.length; ++i) {
      surveyDataDto.push({
        question: surveyData[i].question,
        answers: surveyData[i].answers
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
    console.log(JSON.stringify(survey))
    try {
      const messageId = await message({
        process: 'taFQ_bgJhuBLNP7VXMdYq9xq9938oqinxboiLi7k2M8',
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

  const fetchProfileSurvey = async surveyId => {
    try {
      const tx = await dryrun({
        process: 'taFQ_bgJhuBLNP7VXMdYq9xq9938oqinxboiLi7k2M8',
        tags: [
          { name: 'Action', value: 'GetSurveyByKv' },
          { name: 'Key', value: 'ao_id' },
          { name: 'Val', value: surveyId }
        ]
      })

      console.log(JSON.parse(tx.Messages[0].Data))
      let survey = JSON.parse(tx.Messages[0].Data)

      let targetGroup = newProfileSurvey.targetGroups[0]
      targetGroup['surveyData'] = targetGroup.init.surveyData
      for (var i = 0; i < survey.targetGroups[0].surveyData.length; ++i) {
        targetGroup.surveyData[i].answers = survey.targetGroups[0].surveyData[i].answers
      }
      // for(var i = 0 ; i < s.length; ++i) {
      // }
      return targetGroup.surveyData
      // // setSurveyData(targetGroup.surveyData)
      // setNewProfileSurvey(prev => ({
      //   ...prev,
      //   targetGroups: [targetGroup]
      // }))
    } catch (error) {
      console.log(error)
    }
  }

  const checkConnected = async () => {
    console.log('Fetching address...')
    try {
      // Check if ArConnect is available
      if (window.arweaveWallet) {
        try {
          // Try to get permissions without prompting the user again if they're already connected
          const currentPermissions = await window.arweaveWallet.getPermissions()
          if (currentPermissions.includes('ACCESS_ADDRESS')) {
            const address = await window.arweaveWallet.getActiveAddress()
            console.log('Connected: ', address)
            setIsConnected(true)
          } else {
            console.log('Not connected.')
            setIsConnected(false)
          }
        } catch (error) {
          console.error('Error connecting to ArConnect:', error)
          setIsConnected(false)
        }
      } else {
        console.log('ArConnect not installed.')
        setIsConnected(false)
      }
    } catch (error) {
      console.error('Failed to fetch address:', error)
      setIsConnected(false)
    }
  }

  question = ''
  return (
    <Card>
      <CardHeader title='Optional info' />
      <CardContent>
        {/* <form onSubmit={handleSubmit}> */}
        <Grid container spacing={6}>
          <Grid item xs={12}>
            {surveyData &&
              surveyData.map((item, index) => (
                <ProfileQuestion key={index} questionItem={item} connected={isConnected} />
              ))}
          </Grid>

          {/* <ProfileQuestion  */}
          {/* <Grid item xs={12}>
              <FormLabel>În medie, câte ore vă uitați la televizor într-o săptămână obișnuită?</FormLabel>
              <RadioGroup row name='radio-buttons-group' value={question.answer}>
                <Grid item xs={12} sm={12} ms={12} lg={12}>
                  <FormControlLabel value='a1' control={<Radio />} label='5 ore sau mai puțin' />
                </Grid>
                <Grid item xs={12} sm={12} ms={12} lg={12}>
                  <FormControlLabel value='a2' control={<Radio />} label='6 - 10 ore' />
                </Grid>
                <Grid item xs={12} sm={12} ms={12} lg={12}>
                  <FormControlLabel value='a3' control={<Radio />} label='11 - 20 ore' />
                </Grid>
                <Grid item xs={12} sm={12} ms={12} lg={12}>
                  <FormControlLabel value='a4' control={<Radio />} label='Mai mult de 20 ore' />
                </Grid>
                <Grid item xs={12} sm={12} ms={12} lg={12}>
                  <FormControlLabel value='a5' control={<Radio />} label='Nu ma uit la TV' />
                </Grid>
                <Grid item xs={12} sm={12} ms={12} lg={12}>
                  <FormControlLabel value='a6' control={<Radio />} label='Prefer sa nu raspund' />
                </Grid>
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <FormLabel>În medie, câte ore vă uitați la televizor într-o săptămână obișnuită?</FormLabel>
              <RadioGroup row name='radio-buttons-group' value={question.answer}>
                <FormControlLabel value='a1' control={<Radio />} label='5 ore sau mai puțin' />
                <FormControlLabel value='a2' control={<Radio />} label='6 - 10 ore' />
                <FormControlLabel value='a3' control={<Radio />} label='11 - 20 ore' />
                <FormControlLabel value='a4' control={<Radio />} label='Mai mult de 20 ore' />
                <FormControlLabel value='a5' control={<Radio />} label='Nu ma uit la TV' />
                <FormControlLabel value='a6' control={<Radio />} label='Prefer sa nu raspund' />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <FormLabel>În medie, câte ore vă uitați la televizor într-o săptămână obișnuită?</FormLabel>
              <RadioGroup
                row
                name='radio-buttons-group'
                value={question.answer}
                onChange={e => setCardData({ ...cardData, addressType: e.target.value })}
              >
                <Grid item xs={12} sm={12} ms={12} lg={12}>
                  <FormControlLabel value='a1' label='5 ore sau mai puțin' control={<Checkbox />} />
                </Grid>
                <Grid item xs={12} sm={12} ms={12} lg={12}>
                  <FormControlLabel value='a2' label='6 - 10 ore' control={<Checkbox />} />
                </Grid>
                <Grid item xs={12} sm={12} ms={12} lg={12}>
                  <FormControlLabel value='a3' label='11 - 20 ore' control={<Checkbox />} />
                </Grid>
                <Grid item xs={12} sm={12} ms={12} lg={12}>
                  <FormControlLabel value='a4' label='Mai mult de 20 ore' control={<Checkbox />} />
                </Grid>
                <Grid item xs={12} sm={12} ms={12} lg={12}>
                  <FormControlLabel value='a5' label='Nu ma uit la TV' control={<Checkbox />} />
                </Grid>
                <Grid item xs={12} sm={12} ms={12} lg={12}>
                  <FormControlLabel value='a6' label='Prefer sa nu raspund' control={<Checkbox />} />
                </Grid>
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <FormLabel>În medie, câte ore vă uitați la televizor într-o săptămână obișnuită?</FormLabel>
              <RadioGroup
                row
                name='radio-buttons-group'
                value={question.answer}
                onChange={e => setCardData({ ...cardData, addressType: e.target.value })}
              >
                <FormControlLabel value='a1' label='5 ore sau mai puțin' control={<Checkbox />} />
                <FormControlLabel value='a2' label='6 - 10 ore' control={<Checkbox />} />
                <FormControlLabel value='a3' label='11 - 20 ore' control={<Checkbox />} />
                <FormControlLabel value='a4' label='Mai mult de 20 ore' control={<Checkbox />} />
                <FormControlLabel value='a5' label='Nu ma uit la TV' control={<Checkbox />} />
                <FormControlLabel value='a6' label='Prefer sa nu raspund' control={<Checkbox />} />
              </RadioGroup>
            </Grid> */}

          <Grid item xs={12} className='flex gap-4'>
            <Button variant='contained' type='submit' onClick={() => handleSubmit()}>
              Submit
            </Button>
            <Button variant='tonal' color='secondary' type='reset' onClick={() => reset()}>
              Reset
            </Button>
          </Grid>
        </Grid>
        {/* </form> */}
      </CardContent>
    </Card>
  )
}

export default ProfileQuestions
