// MUI Imports
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import {useTheme} from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon'
import {useAtomValue} from "jotai/index";
import {newSurveyAtom} from "@/app/store/atoms";
import {encrypt, sign} from "@othent/kms";
import Arweave from "arweave/web";
import {useEffect} from "react";

const StepReview = ({activeStep, handleNext, handlePrev, steps}) => {
  const newSurvey = useAtomValue(newSurveyAtom)
  // Hooks
  const theme = useTheme()
  const arweave = Arweave.init({
    host: "arweave.net",
    protocol: "https",
    port: 443,
  });

  const sendToArweave = async () => {
    console.log('survey to send to Arweave ', newSurvey)
    // let encryptedSurvey = await encrypt(JSON.stringify(newSurvey))
    // console.log('encrypted survey ', encryptedSurvey)

    const transaction = await arweave.createTransaction({
      data: JSON.stringify(newSurvey),
    });

    const tags = [
      {name: "AppName", value: "EoC Test"},
      {name: "Content-Type", value: "application/json"}
    ]
    transaction.addTag('Content-Type', 'application/json');
    const start = performance.now();
    const res = await sign(transaction, tags);
    const end = performance.now();
    console.log(`Sign: time taken: ${(end - start) / 1000} seconds,\n`, res);

    const txn = await arweave.transactions.post(transaction);
    console.log(txn);

    handleNext()
  }

  useEffect(() => {
    console.log(newSurvey)
  }, [])

  const sendToArweaveEncrypted = async () => {
    const encryptedData = await encrypt(JSON.stringify(newSurvey))
    const transaction = await arweave.createTransaction({
      data: encryptedData,
    });

    const tags = [
      {name: "AppName", value: "EoC Test"},
      {name: "Content-Type", value: "application/json"}
    ]
    transaction.addTag('Content-Type', 'application/json');
    const start = performance.now();
    const res = await sign(transaction, tags);
    const end = performance.now();
    console.log(`Sign: time taken: ${(end - start) / 1000} seconds,\n`, res);
    const txn = await arweave.transactions.post(transaction);
    console.log(txn);

    handleNext()
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={6}>
        <Typography variant='h4' className='mb-4'>
          Almost done! 🚀
        </Typography>
        <Typography className='mb-4'>Confirm your target groups information.</Typography>

        {
          newSurvey.targetGroups
            .filter(item => item.visible)
            .map((item, index) => (
              <Grid item xs={12} lg={6}>

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
            ))
        }
        <FormControlLabel control={<Switch/>} label='I have confirmed the deal details.'/>
      </Grid>
      <Grid item lg={6} xs={12}>
        <div className='flex justify-center items-end border rounded is-full bs-auto pbs-3'>
          <img
            alt='review-illustration'
            src='/images/illustrations/characters/6.png'
            className={classnames({'scale-x-[-1]': theme.direction === 'rtl'}, 'bs-[230px] lg:bs-[257px]')}
          />
        </div>
      </Grid>
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
            onClick={sendToArweave}
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

export default StepReview
