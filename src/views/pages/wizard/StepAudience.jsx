// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'

import DirectionalIcon from '@components/DirectionalIcon'

import RespondentsSlider from './RespondentsSlider'
import QuestionsSlider from './QuestionsSlider'
import React from 'react'
import GlobalProfiling from '@views/pages/shared/GlobalProfiling'
import ProfileQuestion from '@views/pages/forms/ProfileQuestion'
import { profileCategories } from '@/app/store/consts'

import dynamic from 'next/dynamic'

const WorldMap = dynamic(() => import('@/libs/WorldMap'), { ssr: false })

const StepAudience = ({ surveyData, onChangeSurveyData, activeStep, handleNext, handlePrev, steps }) => {
  const [categoryTitle, setCategoryTitle] = useState('')

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant='h4' className='sm:mbs-2 lg:mbs-0'>
          What countries would you like to target in your survey?
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} lg={12}>
        <WorldMap surveyData={surveyData} onChangeSurveyData={onChangeSurveyData} style={{ 'z-index': 9999 }} />
      </Grid>
      <Grid item xs={12} sm={12} lg={12}>
        {surveyData.countryNames &&
          surveyData.countryNames.map((item, index) => (
            <Chip
              key={index}
              variant='tonal'
              label={item}
              color={'primary'}
              size='medium'
              className='capitalize mie-4'
            />
          ))}
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h4' className='sm:mbs-2 lg:mbs-0'>
          How many respondents do you want to target?
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} ls={12}>
        <RespondentsSlider surveyData={surveyData} onChangeSurveyData={onChangeSurveyData} defaultValue={13} />
      </Grid>
      <Grid item xs={12} sm={12} ls={12}>
        <Typography variant='h6' className='sm:mbs-2 lg:mbs-0'>
          By default we address a general population. If you want to further define your respondent selection, please
          proceed to the next step.
        </Typography>
      </Grid>
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
          We recommend xx questions and no more than yy. Based on the number of questions, respondents will be paid more
          or less, impacting the cost of the survey.
        </Typography>
      </Grid>
      <GlobalProfiling
        category={categoryTitle}
        profileCategories={profileCategories}
        surveyData={surveyData.targetGroups ? surveyData.targetGroups[0].surveyData : []}
        render={(category, open) => (
          <React.Fragment>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Typography component='span' variant='h5' className='flex flex-col'>
                  {category}
                </Typography>
                <Typography component='span' variant='h6' className='flex flex-col'>
                  Below are the questions that the panelists hae responded to. You can select any number of attributes
                  that matches your target criteria. The target group will then contain only panelists who have answered
                  these selected attributes (as well as any other attributes you have selected in other categories).
                </Typography>
                {open &&
                  surveyData.targetGroups &&
                  surveyData.targetGroups[0].surveyData &&
                  surveyData.targetGroups[0].surveyData.map((item, index) => (
                    <ProfileQuestion key={index} questionItem={item} category={category} />
                  ))}
              </Grid>
            </Grid>
          </React.Fragment>
        )}
      />
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

export default StepAudience
