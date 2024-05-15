import {useAtomValue} from "jotai";
import {newSurveyAtom} from "@/app/store/atoms";
import {useTheme} from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import classnames from "classnames";
import Button from "@mui/material/Button";
import DirectionalIcon from "@components/DirectionalIcon";

const Cart = () => {
  const newSurvey = useAtomValue(newSurveyAtom)
// Hooks
  const theme = useTheme()
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={6}>
        <Typography variant='h4' className='mb-4'>
          Almost done! 🚀
        </Typography>
        <Typography className='mb-4'>Confirm your target groups information.</Typography>

        {
          newSurvey.targetGroups
            //.filter(item => item.visible)
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


        {/*<tr>*/}
        {/*  <td className='pbe-2'>*/}
        {/*    <Typography className='font-medium'>Minimum Age</Typography>*/}
        {/*  </td>*/}
        {/*  <td className='pbe-2'>*/}
        {/*    <Typography>{newSurvey.targetGroups[0].minimumAge}</Typography>*/}
        {/*  </td>*/}
        {/*</tr>*/}
        {/*<tr>*/}
        {/*  <td className='pbe-2'>*/}
        {/*    <Typography className='font-medium'>Maximum Age</Typography>*/}
        {/*  </td>*/}
        {/*  <td className='pbe-2'>*/}
        {/*    <Typography>{newSurvey.targetGroups[0].maximumAge}</Typography>*/}
        {/*  </td>*/}
        {/*</tr>*/}
        {/*<tr>*/}
        {/*  <td className='pbe-2'>*/}
        {/*    <Typography className='font-medium'>Country</Typography>*/}
        {/*  </td>*/}
        {/*  <td className='pbe-2'>*/}
        {/*    <Typography>{newSurvey.targetGroups[0].country}</Typography>*/}
        {/*  </td>*/}
        {/*</tr>*/}
        {/*<tr>*/}
        {/*  <td className='pbe-2'>*/}
        {/*    <Typography className='font-medium'>Gender</Typography>*/}
        {/*  </td>*/}
        {/*  <td className='pbe-2'>*/}
        {/*    <Typography>{newSurvey.targetGroups[0].gender}</Typography>*/}
        {/*  </td>*/}
        {/*</tr>*/}
        {/*<tr>*/}
        {/*  <td className='pbe-2'>*/}
        {/*    <Typography className='font-medium'>Wanted Completes</Typography>*/}
        {/*  </td>*/}
        {/*  <td className='pbe-2'>*/}
        {/*    <Typography>{newSurvey.targetGroups[0].wantedCompletes}</Typography>*/}
        {/*  </td>*/}
        {/*</tr>*/}
        {/*<tr>*/}
        {/*  <td className='pbe-2'>*/}
        {/*    <Typography className='font-medium'>Incidence Rate</Typography>*/}
        {/*  </td>*/}
        {/*  <td className='pbe-2'>*/}
        {/*    <Typography>{newSurvey.targetGroups[0].ir}</Typography>*/}
        {/*  </td>*/}
        {/*</tr>*/}
        {/*<tr>*/}
        {/*  <td className='pbe-2'>*/}
        {/*    <Typography className='font-medium'>Length of interview</Typography>*/}
        {/*  </td>*/}
        {/*  <td className='pbe-2'>*/}
        {/*    <Typography>{newSurvey.targetGroups[0].loi}</Typography>*/}
        {/*  </td>*/}
        {/*</tr>*/}
        {/*<tr>*/}
        {/*  <td className='pbe-2'>*/}
        {/*    <Typography className='font-medium'>Days in field</Typography>*/}
        {/*  </td>*/}
        {/*  <td className='pbe-2'>*/}
        {/*    <Typography>{newSurvey.targetGroups[0].daysInField}</Typography>*/}
        {/*  </td>*/}
        {/*</tr>*/}
        {/*<tr>*/}
        {/*  <td className='pbe-2'>*/}
        {/*    <Typography className='font-medium'>Days in field</Typography>*/}
        {/*  </td>*/}
        {/*  <td className='pbe-2'>*/}
        {/*    <Typography>{newSurvey.targetGroups[0].daysInField}</Typography>*/}
        {/*  </td>*/}
        {/*</tr>*/}
        {/*<tr>*/}
        {/*  <td className='pbe-2'>*/}
        {/*    <Typography className='font-medium'>Start Date</Typography>*/}
        {/*  </td>*/}
        {/*  <td className='pbe-2'>*/}
        {/*    <Typography>{newSurvey.targetGroups[0].startDate.toString()}</Typography>*/}
        {/*  </td>*/}
        {/*</tr>*/}
        {/*<tr>*/}
        {/*  <td className='pbe-2'>*/}
        {/*    <Typography className='font-medium'>time</Typography>*/}
        {/*  </td>*/}
        {/*  <td className='pbe-2'>*/}
        {/*    <Typography>{newSurvey.targetGroups[0].time}</Typography>*/}
        {/*  </td>*/}
        {/*</tr>*/}
        {/*  </tbody>*/}
        {/*</table>*/}
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
