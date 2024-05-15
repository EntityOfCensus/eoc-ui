// MUI Imports
import Grid from '@mui/material/Grid';

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

import DirectionalIcon from "@components/DirectionalIcon";

import RespondentsSlider from './RespondentsSlider';
import QuestionsSlider from './QuestionsSlider';
import React from "react";

import {useAtomValue} from "jotai";
import {newSurveyAtom} from '../../../app/store/atoms';
import dynamic from "next/dynamic";

const WorldMap = dynamic(() => import('@/libs/WorldMap'), { ssr: false })

const StepAudience = ({activeStep, handleNext, handlePrev, steps}) => {
  const newSurvey = useAtomValue(newSurveyAtom)

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant='h4' className='sm:mbs-2 lg:mbs-0'>
          What countries would you like to target in your survey?
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} lg={12}>
        <WorldMap style={{"z-index": 9999}}/>
      </Grid>
      <Grid item xs={12} sm={12} lg={12}>
        {
          newSurvey.countryNames && newSurvey.countryNames.map((item, index) => (
              <Chip
                key={index}
                variant='tonal'
                label={item}
                color={'primary'}
                size='medium'
                className='capitalize mie-4'
              />
            )
          )
        }
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h4' className='sm:mbs-2 lg:mbs-0'>
          How many respondents do you want to target?
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} ls={12}>
        <RespondentsSlider defaultValue={13}/>
      </Grid>
      <Grid item xs={12} sm={12} ls={12}>
        <Typography variant='h6' className='sm:mbs-2 lg:mbs-0'>
          By default we address a general population. If you want to further define your respondent selection,
          please proceed to the next step.
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} ls={12}>
        <Typography variant='h4' className='sm:mbs-2 lg:mbs-0'>
          How many questions do you want to ask respondents?
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} ls={12}>
        <QuestionsSlider defaultValue={10}/>
      </Grid>
      <Grid item xs={12} sm={12} ls={12}>
        <Typography variant='h6' className='sm:mbs-2 lg:mbs-0'>
          We recommend xx questions and no more than yy. Based on the number of questions, respondents will be paid
          more or less, impacting the cost of the survey.
        </Typography>
      </Grid>


      <Grid item xs={12}>
        <div className='flex items-center justify-between'>
          <Button
            variant='tonal'
            color='secondary'
            disabled={activeStep === 0}
            onClick={handlePrev}
            startIcon={<DirectionalIcon ltrIconClass='tabler-arrow-left' rtlIconClass='tabler-arrow-right'/>}
          >
            Previous
          </Button>
          <Button
            variant='contained'
            color={activeStep === steps.length - 1 ? 'success' : 'primary'}
            onClick={handleNext}
            endIcon={
              activeStep === steps.length - 1 ? (
                <i className='tabler-check'/>
              ) : (
                <DirectionalIcon ltrIconClass='tabler-arrow-right' rtlIconClass='tabler-arrow-left'/>
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

export default StepAudience;
