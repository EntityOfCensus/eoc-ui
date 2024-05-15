// MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'
import React, {useEffect, useState} from "react";
import {newSurveyAtom} from "@/app/store/atoms";
import {useAtom} from "jotai/index";
import BasicSettings from "@views/pages/wizard/BasicSettings";
import axios from "axios";
import {getName} from "country-list";

const StepBasicSettings = ({activeStep, handleNext, handlePrev, steps}) => {
  const [newSurvey, setNewSurvey] = useAtom(newSurveyAtom)
  const [populations, setPopulations] = useState([])
  const [mounted, setMounted] = useState(false)

  const defaultTargetGroup = {
    minimumAge: 18,
    maximumAge: 64,
    gender: 'both',
    country: '',
    wantedCompletes: newSurvey.wantedRespondents,
    ir: '100',
    loi: (newSurvey.wantedQuestions / 3).toFixed(),
    daysInField: '7',
    startDate: '',
    time: '00:00',
    visible: true
  }

  useEffect(() => {
      const today = new Date()
      const tomorrow = new Date(today)

      if (populations.length > 0) {
        tomorrow.setDate(tomorrow.getDate() + 1)
        let totalPop = populations
          .map(item => item.value)
          .reduce((sum, a) => sum + a, 0);

        if (newSurvey.config === 'easy') {
          const targetGroups = newSurvey.countryCodes.map(countryCode => ({
              minimumAge: 18,
              maximumAge: 64,
              gender: 'both',
              country: getName(countryCode),
              wantedCompletes: ((populations.filter(item => item.countryCode === countryCode)[0].value / totalPop) * newSurvey.wantedRespondents).toFixed(),
              ir: '100',
              loi: (newSurvey.wantedQuestions / 3).toFixed(),
              daysInField: '7',
              startDate: tomorrow,
              time: '00:00',
              visible: true
            })
          )

          setNewSurvey(prev => ({
            ...prev,
            targetGroups: targetGroups
          }))
        }

        if (newSurvey.config === 'advanced' && newSurvey.targetGroups.length === 0) {
          setNewSurvey(prev => ({
            ...prev,
            targetGroups: Array(1).fill(defaultTargetGroup)
          }))
        }
      }
    }, [mounted]
  )

  useEffect(() => {
    const fetchAssets = async () => {
      const res = await axios.get(`https://restcountries.com/v3.1/alpha?codes=${newSurvey.countryCodes}`)
      setPopulations(res.data.map(index => ({
        countryCode: index.cca2,
        value: index.population
      })))
      setMounted(true)
    }
    fetchAssets()
  }, [])

  const handleAddTargetGroup = (event) => {
    setNewSurvey(prev => ({
        ...prev,
        targetGroups: [...newSurvey.targetGroups, defaultTargetGroup]
      })
    )
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        {
          newSurvey.config === 'advanced' && newSurvey.targetGroups && newSurvey.targetGroups.map((item, index) => (
              <BasicSettings targetGroup={item}/>
            )
          )
        }
        {
          newSurvey.config === 'easy' && newSurvey.targetGroups && newSurvey.targetGroups.map((item, index) => (
              <BasicSettings targetGroup={item}/>
            )
          )
        }
      </Grid>

      {
        newSurvey.config === 'advanced' && <Grid container justifyContent="flex-end">
          <Button
            color={'secondary'}
            variant={'contained'}
            onClick={handleAddTargetGroup}
          >
            Add Target Group
          </Button>
        </Grid>
      }

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

export default StepBasicSettings
