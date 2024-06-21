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
import { useAtom } from 'jotai'
import { mapDataAtom } from '@/app/store/atoms'
import axios from 'axios'
import { respondentSurveyData } from '@/app/store/consts'

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
  const [mapData, setMapData] = useAtom(mapDataAtom)

  const [confirmConfigTypeChange, setConfirmConfigTypeChange] = useState(false)

  const [confirmConfigTypeChangeTitle, setConfirmConfigTypeChangeTitle] = useState('')

  const [confirmConfigTypeChangeContent, setConfirmConfigTypeChangeContent] = useState('')

  const [configType, setConfigType] = useState(null)

  // const [confirmConfigTypeChange, setConfirmConfigTypeChange] = useState(false)

  const theme = useTheme()

  const handleChange = prop => {
    if (typeof prop === 'string') {
      if (prop === 'disabled') {
        //doNothing
      } else {
        setConfigType(prop)
        if (!surveyData.targetGroups) {
          onChangeSurveyData(prev => ({
            ...prev,
            config: prop,
            countryCodes: [],
            countryNames: [],
            wantedRespondents: 0
          }))
        } else {
          if (surveyData.config === 'easy') {
            setConfirmConfigTypeChangeTitle('Change to advance configuration type?')
            setConfirmConfigTypeChangeContent(
              'Changing to advance configuration, the easy configuration will be smart distributed into advance configuration'
            )
          } else {
            setConfirmConfigTypeChangeTitle('Change to easy configuration type?')
            setConfirmConfigTypeChangeContent('Changing to easy configuration, all audience setup will be reset')
          }
          setConfirmConfigTypeChange(true)
        }
      }
    }
    // else if (configType != prop.target.value) {
    //   setConfigType(prop.target.value)
    //   if (!surveyData.targetGroups) {
    //     onChangeSurveyData(prev => ({
    //       ...prev,
    //       config: prop.target.value
    //     }))
    //   } else {
    //     if (surveyData.config === 'easy') {
    //       setConfirmConfigTypeChangeTitle('Change to advance configuration type?')
    //       setConfirmConfigTypeChangeContent(
    //         'Changing to advance configuration, the easy configuration will be smart distributed into advance configuration'
    //       )
    //     } else {
    //       setConfirmConfigTypeChangeTitle('Change to easy configuration type?')
    //       setConfirmConfigTypeChangeContent('Changing to easy configuration, all audience setup will be reset')
    //     }
    //     setConfirmConfigTypeChange(true)
    //   }
    // }
  }

  const handleOptionChange = async () => {
    if (configType == 'advanced') {
      setMapData({})
      const res = await axios.get(`https://restcountries.com/v3.1/alpha?codes=${surveyData.countryCodes}`)
      let totalPop = res.data.map(item => item.population).reduce((sum, a) => sum + a, 0)
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      const targetGroups = res.data.map(countryIndex => ({
        minimumAge: surveyData.minimumAge ? surveyData.minimumAge : 18,
        maximumAge: surveyData.maximumAge ? surveyData.maximumAge : 64,
        gender: surveyData.gender ? surveyData.gender : 'both',
        country: countryIndex.cca2,
        wantedCompletes: surveyData.wantedRespondents
          ? ((countryIndex.population / totalPop) * surveyData.wantedRespondents).toFixed()
          : '',
        ir: surveyData.maximumAge ? surveyData.maximumAge : '100',
        loi: surveyData.loi
          ? surveyData.loi
          : surveyData.wantedQuestions
            ? (surveyData.wantedQuestions / 3).toFixed()
            : '',
        daysInField: surveyData.daysInField ? surveyData.daysInField : '7',
        startDate: surveyData.startDate ? surveyData.startDate : tomorrow,
        time: surveyData.time ? surveyData.time : '00:00',
        surveyData: surveyData.targetGroups
          ? JSON.parse(JSON.stringify(surveyData.targetGroups[0].surveyData))
          : JSON.parse(JSON.stringify(respondentSurveyData)),
        visible: true
      }))

      onChangeSurveyData(prev => ({
        ...prev,
        ir: null,
        minimumAge: null,
        maximumAge: null,
        gender: null,
        daysInField: null,
        startDate: null,
        time: null,
        targetGroups: targetGroups,
        countryCodes: [],
        countryNames: [],
        config: configType
      }))
    } else {
      onChangeSurveyData(prev => ({
        ...prev,
        countryCodes: [],
        countryNames: [],
        targetGroups: null,
        config: configType
      }))
    }
  }

  return (
    <React.Fragment>
      <DraggableDialog
        title={confirmConfigTypeChangeTitle}
        content={confirmConfigTypeChangeContent}
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
