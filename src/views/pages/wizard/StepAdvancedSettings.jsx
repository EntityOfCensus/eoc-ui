// MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'
import React, { useEffect, useState } from 'react'
import AdvancedSettings from '@views/pages/wizard/AdvancedSettings'
import { respondentSurveyData } from '@/app/store/consts'
import { countries } from 'countries-list'
import QuestionsSlider from './QuestionsSlider'
import Typography from '@mui/material/Typography'

const StepAdvancedSettings = ({ surveyData, onChangeSurveyData, activeStep, handleNext, handlePrev, steps }) => {
  const [countriesList, setCountriesList] = useState([])

  const [mounted, setMounted] = useState(false)

  const defaultTargetGroup = {
    minimumAge: 18,
    maximumAge: 64,
    gender: 'both',
    country: '',
    wantedCompletes: surveyData.wantedRespondents,
    ir: '100',
    loi: surveyData.wantedQuestions ? (surveyData.wantedQuestions / 3).toFixed() : '',
    daysInField: '7',
    startDate: '',
    time: '00:00',
    surveyData: JSON.parse(JSON.stringify(respondentSurveyData)),
    visible: true
  }

  useEffect(() => {
    if (!surveyData.targetGroups || surveyData.targetGroups.length === 0) {
      onChangeSurveyData(prev => ({
        ...prev,
        targetGroups: [JSON.parse(JSON.stringify(defaultTargetGroup))]
      }))
    }
    let list = []
    for (var key in countries) {
      list.push({ code: key, name: countries[key].name })
    }
    setCountriesList(list)
  }, [mounted])

  useEffect(() => {
    if (!mounted) {
      setMounted(true)
    }
  }, [])

  const handleAddTargetGroup = event => {
    onChangeSurveyData(prev => ({
      ...prev,
      targetGroups: [...surveyData.targetGroups, defaultTargetGroup]
    }))
  }

  return (
    <Grid container spacing={6} justifyContent='space-between'>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Grid item xs={12} sm={12} ls={12}>
          <Typography variant='h4' className='sm:mbs-2 lg:mbs-0'>
            How many questions do you want to ask respondents?
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} ls={12}>
          <QuestionsSlider surveyData={surveyData} onChangeSurveyData={onChangeSurveyData} defaultValue={10} />
        </Grid>
        <Grid item xs={12} sm={12} ls={12}>
          <Typography variant='h6' className='sm:mbs-2 lg:mbs-0'>
            We recommend xx questions and no more than yy. Based on the number of questions, respondents will be paid
            more or less, impacting the cost of the survey.
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {surveyData.targetGroups &&
          surveyData.targetGroups.map((item, index) => (
            <AdvancedSettings
              key={index}
              surveyData={surveyData}
              onChangeSurveyData={onChangeSurveyData}
              targetGroupIndex={index}
              countries={countriesList}
            />
          ))}
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent='flex-end'>
          <Button color={'secondary'} variant={'contained'} onClick={handleAddTargetGroup}>
            Add Target Group
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <div className='flex items-center justify-between'>
          <Button
            variant='tonal'
            color='secondary'
            disabled={activeStep === 0}
            onClick={handlePrev}
            startIcon={<DirectionalIcon ltrIconClass='tabler-arrow-left' rtlIconClass='tabler-arrow-right' />}
          >
            Previous
          </Button>
          <Button
            variant='contained'
            color={activeStep === steps.length - 1 ? 'success' : 'primary'}
            onClick={handleNext}
            endIcon={
              activeStep === steps.length - 1 ? (
                <i className='tabler-check' />
              ) : (
                <DirectionalIcon ltrIconClass='tabler-arrow-right' rtlIconClass='tabler-arrow-left' />
              )
            }
          >
            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}

export default StepAdvancedSettings
