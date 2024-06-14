// MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import CustomInputVertical from '@core/components/custom-inputs/Vertical'
import DirectionalIcon from '@components/DirectionalIcon'
import React, { useState } from 'react'
import DraggableDialog from '@/libs/DraggableDialog'

// Vars
const data = [
  {
    title: 'Easy Configuration',
    value: 'easy',
    content: 'Suitable for any curious researcher.',
    asset: 'tabler-settings-automation',
    isSelected: true
  },
  {
    title: 'Advanced Configuration',
    value: 'advanced',
    content: 'For proficient market researchers who are accustomed',
    asset: 'tabler-settings-star'
  }
]

const StepConfigType = ({ surveyData, onChangeSurveyData, activeStep, handleNext, handlePrev, steps }) => {
  const [confirmConfigTypeChange, setConfirmConfigTypeChange] = useState(false)

  const [prop, setProp] = useState(null)

  // const [confirmConfigTypeChange, setConfirmConfigTypeChange] = useState(false)

  const theme = useTheme()

  const handleChange = prop => {
    if (typeof prop === 'string') {
      if (prop === 'disabled') {
        //doNothing
      }
    } else {
      if (!surveyData.targetGroups) {
        onChangeSurveyData(prev => ({
          ...prev,
          config: prop.target.value
        }))
      } else {
        setProp(prop)
        setConfirmConfigTypeChange(true)
      }
    }
  }

  const handleOptionChange = () => {
    onChangeSurveyData(prev => ({
      ...prev,
      config: prop.target.value
    }))
  }

  return (
    <React.Fragment>
      <DraggableDialog
        title='Confirm'
        content='Confirm change'
        confirmCallback={handleOptionChange}
        confirm={confirmConfigTypeChange}
        onClose={setConfirmConfigTypeChange}
      />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography variant='h4' className='sm:mbs-2 lg:mbs-0'>
            How would you like to configure your survey?
          </Typography>
        </Grid>
        {data.map((item, index) => {
          let asset

          if (item.asset && typeof item.asset === 'string') {
            asset = <i className={classnames(item.asset, 'text-[1.75rem]')} />
          }

          return (
            <CustomInputVertical
              type='radio'
              key={index}
              gridProps={{ xs: 12, sm: 4, lg: 6 }}
              selected={surveyData.config}
              disabled={item.isDisabled}
              name='custom-radios-basic'
              handleChange={handleChange}
              data={typeof item.asset === 'string' ? { ...item, asset } : item}
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
    </React.Fragment>
  )
}

export default StepConfigType
