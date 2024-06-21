'use client'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import RadialBarChart from '@/app/(dashboard)/home/RadialBarChart'
import CreateSurvey from '@/app/(dashboard)/home/CreateSurvey'
import withAuth from '../../../hoc/withAuth'
import React, { useState, useEffect } from 'react'

import { SurveyRepositoryApi, SurveyApiClient } from '../../../@bff/survey-repository'
// import { getSurvey } from '@/app/store/consts'

function ClientHome() {
  const [mounted, setMounted] = useState(false)

  // const [surveysIdx, setSurveysIdx] = useState()

  const [surveys, setSurveys] = useState()

  const [surveyRepositoryApi, setSurveyRepositoryApi] = useState(new SurveyRepositoryApi(SurveyApiClient.instance))

  useEffect(() => {
    if (mounted) {
      surveyRepositoryApi.apiClient.authentications = {
        bearerAuth: {
          type: 'oauth2',
          accessToken: localStorage.getItem('id_token')
        }
      }
      surveyRepositoryApi.findSurvey(1, null, async function (error, data, response) {
        if (error) {
          console.log('error', error)
          return
        }
        // let _surveysIdx = surveysIdx ? surveysIdx : []
        // let _surveys = surveys ? surveys : []
        // for (var i = 0; i < data.length; ++i) {
        //   const surveyIndex = data[i]
        //   // const survey = await getSurvey(surveyIndex.surveyId)
        //   // if (survey) {
        //   // _surveysIdx.push(surveyIndex)
        //   _surveys.push(survey)
        //   // }
        // }
        // setSurveysIdx(_surveysIdx)
        setSurveys(data)
      })
    }
  }, [mounted])

  useEffect(() => {
    if (!mounted) {
      setMounted(true)
    }
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography variant='h2' className='sm:mbs-2 lg:mbs-0'>
          Your existing research studies
        </Typography>
      </Grid>
      {surveys &&
        surveys.map((item, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={2}>
            <RadialBarChart title={item.name} status={item.state} percentage={[0]} surveyId={item.surveyId} />
          </Grid>
        ))}
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <CreateSurvey />
      </Grid>
    </Grid>
  )
}
export default withAuth(ClientHome)
