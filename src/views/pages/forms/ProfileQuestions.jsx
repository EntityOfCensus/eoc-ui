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
import { useEffect, useState } from 'react'
import { dryrun, message, createDataItemSigner, result } from '@permaweb/aoconnect'
import { jwtDecode } from 'jwt-decode'

const ProfileQuestions = ({ question, answers }) => {
  const [newProfileSurvey, setNewProfileSurvey] = useAtom(newProfileSurveyAtom)

  const [surveyData, setSurveyData] = useState(newProfileSurvey.targetGroups[0].init.surveyData)

  const [currentSurveyId, setCurrentSurveyId] = useState(null)

  const [isConnected, setIsConnected] = useState(
    localStorage.getItem('walletAddress') != null && localStorage.getItem('walletAddress').length > 0
  )

  const [walletAddress, setWalletAddress] = useState(null)

  const [respondentProfileSurveyIndexApi, setRespondentProfileSurveyIndexApi] = useState(
    new RespondentProfileSurveyIndexApi(RespondentProfileSurveyApiClient.instance)
  )

  useEffect(() => {
    checkConnected()
  }, [walletAddress])

  useEffect(() => {
      const fetchProfileSurvey = async () => {
        try {
          const tx = await dryrun({
            process: "taFQ_bgJhuBLNP7VXMdYq9xq9938oqinxboiLi7k2M8",
            tags: [
              { name: "Action", value: "GetSurveyByKv" },
              { name: "Key", value: "ao_id" },
              { name: "Val", value: currentSurveyId },
            ],
          });

          console.log(JSON.parse(tx.Messages[0].Data));

          return JSON.parse(tx.Messages[0].Data);
        } catch (error) {
          console.log(error);
          return {};
        }
      }
    if (currentSurveyId) {
      fetchProfileSurvey()
    }
  }, [currentSurveyId])

  useEffect(() => {
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
          setCurrentSurveyId(data.currentSurveyId)
        }
      })
    }
  }, [])

  const handleSubmit = e => {
    console.log('newProfileSurvey', newProfileSurvey)
    console.log('event', e)
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
            setAddress(address)
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
        <form onSubmit={handleSubmit}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              {surveyData &&
                surveyData.map((item, index) => (
                  <ProfileQuestion key={index} questionItem={item.init} connected={isConnected} />
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
              <Button variant='contained' type='submit'>
                Submit
              </Button>
              <Button variant='tonal' color='secondary' type='reset' onClick={() => reset()}>
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default ProfileQuestions
