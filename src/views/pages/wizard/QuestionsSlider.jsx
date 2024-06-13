import { useState } from 'react'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Slider from '@mui/material/Slider'
import MuiInput from '@mui/material/Input'

const Input = styled(MuiInput)`
  width: 50px;
`

export default function InputSlider({ surveyData, onChangeSurveyData, defaultValue }) {
  const handleSliderChange = (event, newValue) => {
    onChangeSurveyData(prev => ({
      ...prev,
      wantedQuestions: event.target.value
    }))
  }

  const handleInputChange = event => {
    onChangeSurveyData(prev => ({
      ...prev,
      wantedQuestions: event.target.value === '' ? 1 : Number(event.target.value)
    }))
  }

  const handleBlur = () => {
    if (surveyData.wantedQuestions < 1) {
      onChangeSurveyData(prev => ({
        ...prev,
        wantedQuestions: 1
      }))
    } else if (surveyData.wantedQuestions > 230) {
      onChangeSurveyData(prev => ({
        ...prev,
        wantedQuestions: 230
      }))
    }
  }

  const marks = [
    {
      value: 1,
      label: '1'
    },
    {
      value: 50,
      label: '50'
    }
  ]

  return (
    <Grid container alignItems='center'>
      <Grid item xs={8} sm={8} lg={8}>
        <Slider
          defaultValue={defaultValue}
          min={1}
          max={50}
          aria-label='Default'
          valueLabelDisplay='auto'
          value={typeof surveyData.wantedQuestions === 'number' ? surveyData.wantedQuestions : 1}
          onChange={handleSliderChange}
          aria-labelledby='input-slider'
          getAriaValueText={e => surveyData.wantedQuestions}
          marks={marks}
        />
      </Grid>
      <Grid item style={{ marginLeft: 23 }} xs={3} sm={3} lg={3}>
        <Input
          value={surveyData.wantedQuestions}
          size='small'
          onChange={handleInputChange}
          onBlur={handleBlur}
          inputProps={{
            step: 1,
            min: 1,
            max: 50,
            type: 'number',
            'aria-labelledby': 'input-slider'
          }}
        />
      </Grid>
    </Grid>
  )
}
