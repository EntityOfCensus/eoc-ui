import { useState, useEffect } from 'react'
// MUI Imports
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'
// import { useAtomValue } from 'jotai/index'
// import { newSurveyAtom } from '@/app/store/atoms'
import { encrypt, sign, signMessage } from '@othent/kms'

import BasicSettings from '@views/pages/wizard/BasicSettings'
import { SurveyRepositoryApi, SurveyRepositoryApiClient } from '../../../@bff/survey-repository'
import { message, createDataItemSigner } from '@permaweb/aoconnect'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

import { getSinger } from '@/app/store/consts'

// const TESTING_CENSUS_PROCESS_ID = 'ENnyYpVeZlS0j01ss-Rht9rHVpmZ73vItDb2Xtrtikc'

const permissions = ['ACCESS_ADDRESS', 'SIGNATURE', 'SIGN_TRANSACTION', 'DISPATCH']

const StepCreate = ({ surveyData, onChangeSurveyData, activeStep, handleNext, handlePrev, steps }) => {
  // const [newSurvey, setNewSurvey] = useState(newSurveyData)
  // Hooks
  const [isSaving, setIsSaving] = useState(false)

  const [surveyRepositoryApi, setSurveyRepositoryApi] = useState(
    new SurveyRepositoryApi(SurveyRepositoryApiClient.instance)
  )

  const theme = useTheme()

  const saveSurvey = async () => {
    surveyRepositoryApi.apiClient.authentications = {
      bearerAuth: {
        type: 'oauth2',
        accessToken: localStorage.getItem('id_token')
      }
    }

    setIsSaving(true)
    try {
      if (surveyData.surveyId) {
        surveyRepositoryApi.deleteSurvey(surveyData.surveyId, async function (error, data, response) {
          if (error) {
            console.log('error', error)
            return
          }
          await persistSurvey()
        })
      } else {
        await persistSurvey()
      }
    } catch (error) {
      console.log(error)
    }

    async function persistSurvey() {
      const messageId = await message({
        process: 'ENnyYpVeZlS0j01ss-Rht9rHVpmZ73vItDb2Xtrtikc',
        signer: createDataItemSigner(await getSinger()),
        // the survey as stringified JSON
        data: JSON.stringify(surveyData),
        tags: [{ name: 'Action', value: 'AddSurvey' }]
      })
      onChangeSurveyData(prev => ({
        ...prev,
        surveyId: messageId
      }))
      surveyRepositoryApi.addOrUpdateSurvey(
        { surveyId: messageId, state: 'Intermediate', name: surveyData.name },
        function (error, data, response) {
          if (error) {
            console.log('error', error)
            return
          }
          setIsSaving(false)
          handleNext()
        }
      )
    }
  }

  useEffect(() => {
    console.log(surveyData)
  }, [])

  return (
    <Grid container spacing={6}>
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={isSaving}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <Grid item xs={12} lg={6}>
        <Typography variant='h4' className='mb-4'>
          Almost done! 🚀
        </Typography>
        <Typography className='mb-4'>Confirm your target groups information.</Typography>

        {surveyData.targetGroups
          .filter(item => item.visible)
          .map((item, index) => (
            <Grid key={index} item xs={12} lg={6}>
              <Typography variant='h5'>{`${item.country}  -  ${item.ir}%, ${item.loi} min`}</Typography>

              <table className='is-full border-collapse'>
                <tbody>
                  <tr>
                    <td className='pbe-2'>
                      <Typography className='font-medium'>Wanted Completes</Typography>
                    </td>
                    <td className='pbe-2'>
                      <Typography>{item.wantedCompletes}</Typography>
                    </td>
                  </tr>

                  <tr>
                    <td className='pbe-2'>
                      <Typography className='font-medium'>Feasible Completes</Typography>
                    </td>
                    <td className='pbe-2'>
                      <Typography>???</Typography>
                    </td>
                  </tr>

                  <tr>
                    <td className='pbe-2'>
                      <Typography className='font-medium'>CPI</Typography>
                    </td>
                    <td className='pbe-2'>
                      <Typography>??? EUR</Typography>
                    </td>
                  </tr>

                  <tr>
                    <td className='pbe-2'>
                      <Typography className='font-medium'>CPTG</Typography>
                    </td>
                    <td className='pbe-2'>
                      <Typography>??? EUR</Typography>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Grid>
          ))}
        <FormControlLabel control={<Switch />} label='I have confirmed the deal details.' />
      </Grid>
      <Grid item lg={6} xs={12}>
        <div className='flex justify-center items-end border rounded is-full bs-auto pbs-3'>
          <img
            alt='review-illustration'
            src='/images/illustrations/characters/6.png'
            className={classnames({ 'scale-x-[-1]': theme.direction === 'rtl' }, 'bs-[230px] lg:bs-[257px]')}
          />
        </div>
        <BasicSettings surveyData={surveyData} onChangeSurveyData={onChangeSurveyData} />
      </Grid>
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
            onClick={saveSurvey}
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
  )
}

export default StepCreate
