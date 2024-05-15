import {useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';

import {newSurveyAtom} from '/src/app/store/atoms';
import {useAtom, useAtomValue} from "jotai";

const Input = styled(MuiInput)`
  width: 50px;
`;

export default function InputSlider({defaultValue}) {
  const [newSurvey, setNewSurvey] = useAtom(newSurveyAtom)

  const handleSliderChange = (event, newValue) => {
    setNewSurvey(prev => ({
      ...prev,
      wantedRespondents: event.target.value
    }))
  };

  const handleInputChange = (event) => {
    setNewSurvey(prev => ({
      ...prev,
      wantedRespondents: event.target.value === '' ? 1 : Number(event.target.value)
    }))
  };

  const handleBlur = () => {
    if (newSurvey.wantedCompletes < 1) {
      setNewSurvey(prev => ({
        ...prev,
        wantedRespondents: 1
      }))
    } else if (newSurvey.wantedRespondents > 230) {
      setNewSurvey(prev => ({
        ...prev,
        wantedRespondents: 230
      }))
    }
  };

  const marks = [
    {
      value: 1,
      label: '1',
    },
    {
      value: 230,
      label: '230',
    }
  ];

  return (
    <Grid container alignItems="center">
      <Grid item xs={8} sm={8} lg={8}>
        <Slider
          defaultValue={defaultValue}
          min={1}
          max={230}
          aria-label="Default"
          valueLabelDisplay="auto"
          value={typeof newSurvey.wantedRespondents === 'number' ? newSurvey.wantedRespondents : 1}
          onChange={handleSliderChange}
          aria-labelledby="input-slider"
          getAriaValueText={(e) => newSurvey.wantedRespondents}
          marks={marks}
        />
      </Grid>
      <Grid item style={{marginLeft: 23}} xs={3} sm={3} lg={3}>
        <Input
          value={newSurvey.wantedRespondents}
          size="small"
          onChange={handleInputChange}
          onBlur={handleBlur}
          inputProps={{
            step: 1,
            min: 1,
            max: 230,
            type: 'number',
            'aria-labelledby': 'input-slider',
          }}
        />
      </Grid>
    </Grid>
  );
}
