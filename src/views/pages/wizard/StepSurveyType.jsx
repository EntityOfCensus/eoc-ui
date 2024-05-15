// React Imports
import {useEffect, useState} from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from "@mui/material/Typography";
import {useTheme} from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import CustomInputVertical from '@core/components/custom-inputs/Vertical'

import DirectionalIcon from '@components/DirectionalIcon'
import {useAtom} from "jotai/index";
import {newSurveyAtom} from "@/app/store/atoms";

// Vars
const data = [
  {
    title: 'Survey',
    value: 'survey',
    content: 'Gathering information using relevant questions from a sample of people with the aim of understanding populations as a whole.',
    asset: 'tabler-file-analytics',
    isSelected: true,
  },
  {
    title: 'Focus Group',
    value: 'focus_group',
    content: 'Coming soon',
    asset: 'tabler-users-group',
    isDisabled: true
  }
]

const StepSurveyType = ({activeStep, handleNext, handlePrev, steps}) => {
  const [newSurvey, setNewSurvey] = useAtom(newSurveyAtom)

  // Hooks
  const theme = useTheme()

  const handleOptionChange = prop => {
    if (typeof prop === 'string') {
      if (prop === 'disabled') {
        //doNothing
      }
    } else {
      setNewSurvey(prev => ({
        ...prev,
        type: prop.target.value
      }))
      console.log(newSurvey)
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4' className='sm:mbs-2 lg:mbs-0'>
          What type of research study do you want to conduct?
        </Typography>
      </Grid>
      {data.map((item, index) => {
        let asset

        if (item.asset && typeof item.asset === 'string') {
          asset = <i className={classnames(item.asset, 'text-[1.75rem]')}/>
        }

        return (
          <CustomInputVertical
            type='radio'
            key={index}
            gridProps={{xs: 12, sm: 4, lg: 6}}
            selected={newSurvey.type}
            disabled={item.isDisabled}
            color={item.color}
            name='custom-radios-basic'
            handleChange={handleOptionChange}
            data={typeof item.asset === 'string' ? {...item, asset} : item}
          />
        )
      })}

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

export default StepSurveyType
