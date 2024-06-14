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
      wantedRespondents: event.target.value
    }))
  }

  const handleInputChange = event => {
    onChangeSurveyData(prev => ({
      ...prev,
      wantedRespondents: event.target.value === '' ? 1 : Number(event.target.value)
    }))
  }

  const handleBlur = () => {
    if (surveyData.wantedCompletes < 1) {
      onChangeSurveyData(prev => ({
        ...prev,
        wantedRespondents: 1,
        loi: (1 / 3).toFixed(3)
      }))
    } else if (surveyData.wantedRespondents > 230) {
      onChangeSurveyData(prev => ({
        ...prev,
        wantedRespondents: 230
      }))
    }
  }

  const marks = [
    {
      value: 1,
      label: '1'
    },
    {
      value: 230,
      label: '230'
    }
  ]

  return (
    <Grid container alignItems='center'>
      <Grid item xs={8} sm={8} lg={8}>
        <Slider
          min={0}
          max={230}
          aria-label='Default'
          valueLabelDisplay='auto'
          value={typeof surveyData.wantedRespondents === 'number' ? surveyData.wantedRespondents : 0}
          onChange={handleSliderChange}
          aria-labelledby='input-slider'
          getAriaValueText={e => surveyData.wantedRespondents}
          marks={marks}
        />
      </Grid>
      <Grid item style={{ marginLeft: 23 }} xs={3} sm={3} lg={3}>
        <Input
          value={surveyData.wantedRespondents ? surveyData.wantedRespondents : 0}
          size='small'
          onChange={handleInputChange}
          onBlur={handleBlur}
          inputProps={{
            step: 1,
            min: 0,
            max: 230,
            type: 'number',
            'aria-labelledby': 'input-slider'
          }}
        />
      </Grid>
    </Grid>
  )
}
