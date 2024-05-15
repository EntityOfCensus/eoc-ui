'use client'

// React Imports
import {useRef, useState} from 'react'

// MUI Imports
import {styled} from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stepper from '@mui/material/Stepper'
import MuiStep from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import StepSurveyType from './StepSurveyType'
import StepConfigType from './StepConfigType'
import StepBasicSettings from './StepBasicSettings'
import StepReview from './StepReview'

// Styled Component Imports
import StepperWrapper from '@core/styles/stepper'
import StoreProvider from "@/app/store/StoreProvider";
import {countriesAtom, newSurveyAtom} from "@/app/store/atoms";
import {useAtom, useStore} from "jotai";
import withAuth from "@/hoc/withAuth";
import {useRouter} from "next/navigation";
import dynamic from "next/dynamic";
const StepAudience = dynamic(() => import('./StepAudience'), { ssr: false })

// Vars
const steps = [
  {
    icon: 'tabler-users',
    title: 'Survey Type',
    subtitle: 'Choose type of survey'
  },
  {
    icon: 'tabler-id',
    title: 'Audience',
    subtitle: 'Provide needed audience'
  },
  {
    icon: 'tabler-settings',
    title: 'Config Type',
    subtitle: 'Configure your survey'
  },
  {
    icon: 'tabler-settings',
    title: 'Basic Settings',
    subtitle: 'Target audience properties'
  },
  {
    icon: 'tabler-checkbox',
    subtitle: 'Launch a survey',
    title: 'Review & Complete'
  }
]

const Step = styled(MuiStep)({
  '&.Mui-completed .step-title , &.Mui-completed .step-subtitle': {
    color: 'var(--mui-palette-text-disabled)'
  }
})

const getStepContent = (step, handleNext, handlePrev) => {
  const Tag =
    step === 0 ? StepSurveyType :
      step === 1 ? StepAudience :
        step === 2 ? StepConfigType :
          step === 3 ? StepBasicSettings : StepReview

  return <Tag activeStep={step} handleNext={handleNext} handlePrev={handlePrev} steps={steps}/>
}

const CreateSurvey = () => {
  // States
  const [activeStep, setActiveStep] = useState(0)
  const store = useStore()
  const loaded = useRef(false)
  const [newSurvey, setNewSurvey] = useAtom(newSurveyAtom)
  const router = useRouter()

  if (!loaded.current) {
    store.set(countriesAtom, [])
    loaded.current = true
  }

  const handleNext = async () => {
    if (activeStep !== steps.length - 1) {
      setActiveStep(activeStep + 1)
    } else {
      setNewSurvey(prev => ({
        type: 'survey',
        config: 'easy',
        countryCodes: [],
        countryNames: [],
        wantedRespondents: 1000,
        wantedQuestions: 50,
        targetGroups: []
      }))

      router.push('/home')
    }
  }

  const handlePrev = () => {
    if (activeStep !== 0) {
      setActiveStep(activeStep - 1)
    }
  }

  return (
    <StoreProvider>
      <Card className='flex flex-col md:flex-row'>
        <CardContent className='max-md:border-be md:border-ie md:min-is-[300px]'>
          <StepperWrapper>
            <Stepper
              activeStep={activeStep}
              orientation='vertical'
              connector={<></>}
              className='flex flex-col gap-4 min-is-[220px]'
            >
              {steps.map((label, index) => {
                return (
                  <Step key={index} onClick={() => setActiveStep(index)}>
                    <StepLabel icon={<></>} className='p-1 cursor-pointer'>
                      <div className='step-label'>
                        <CustomAvatar
                          variant='rounded'
                          skin={activeStep === index ? 'filled' : 'light'}
                          {...(activeStep >= index && {color: 'primary'})}
                          {...(activeStep === index && {className: 'shadow-primarySm'})}
                          size={38}
                        >
                          <i className={classnames(label.icon, '!text-[22px]')}/>
                        </CustomAvatar>
                        <div className='flex flex-col'>
                          <Typography color='text.primary' className='step-title'>
                            {label.title}
                          </Typography>
                          <Typography className='step-subtitle'>{label.subtitle}</Typography>
                        </div>
                      </div>
                    </StepLabel>
                  </Step>
                )
              })}
            </Stepper>
          </StepperWrapper>
        </CardContent>

        <CardContent className='flex-1 pbs-6'>{getStepContent(activeStep, handleNext, handlePrev)}</CardContent>
      </Card>
    </StoreProvider>
  )
}

export default withAuth(CreateSurvey)
