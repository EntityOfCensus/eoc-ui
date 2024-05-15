import {useState} from 'react';
import {styled} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import {useAtom} from "jotai";
import {newSurveyAtom} from "@/app/store/atoms";

const Input = styled(MuiInput)`
  width: 50px;
`;

export default function InputSlider({defaultValue}) {
  const [newSurvey, setNewSurvey] = useAtom(newSurveyAtom)

  const handleSliderChange = (event, newValue) => {
    setNewSurvey(prev => ({
      ...prev,
      wantedQuestions: event.target.value
    }))
  };

  const handleInputChange = (event) => {
    setNewSurvey(prev => ({
      ...prev,
      wantedQuestions: event.target.value === '' ? 1 : Number(event.target.value)
    }))
  };

  const handleBlur = () => {
    if (newSurvey.wantedQuestions < 1) {
      setNewSurvey(prev => ({
        ...prev,
        wantedQuestions: 1
      }))
    } else if (newSurvey.wantedQuestions > 230) {
      setNewSurvey(prev => ({
        ...prev,
        wantedQuestions: 230
      }))
    }
  };


  const marks = [
    {
      value: 1,
      label: '1',
    },
    {
      value: 50,
      label: '50',
    }
  ];

  return (
    <Grid container alignItems="center">
      <Grid item xs={8} sm={8} lg={8}>
        <Slider
          defaultValue={defaultValue}
          min={1}
          max={50}
          aria-label="Default"
          valueLabelDisplay="auto"
          value={typeof newSurvey.wantedQuestions === 'number' ? newSurvey.wantedQuestions : 1}
          onChange={handleSliderChange}
          aria-labelledby="input-slider"
          getAriaValueText={(e) => newSurvey.wantedQuestions}
          marks={marks}
        />
      </Grid>
      <Grid item style={{marginLeft: 23}} xs={3} sm={3} lg={3}>
          <Input
            value={newSurvey.wantedQuestions}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 1,
              max: 50,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
        />
      </Grid>
    </Grid>
  );
}
