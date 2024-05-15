'use client'

// Next Imports

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import {useTheme} from '@mui/material/styles'

// Components Imports
import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'
import Button from "@mui/material/Button";


const SurveyCard = ({name, description, reward, completed}) => {
  // Hooks
  const theme = useTheme()

  // Vars
  const warningColor = theme.palette.warning.main

  const hide = (e) => {
    console.log(e)
  }

  return (
    <Card>
      <CardHeader title={name} action={
        <OptionMenu  options={['Hide']}/>
      }>
      </CardHeader>
      <CardContent className='flex flex-col'>
        <Typography variant='body2' style={{marginTop: -20}} className='font-small' color='text.primary'>
          {description}
        </Typography>
      </CardContent>
      {
        !completed && <CardContent className='flex flex-col gap-6'>
        <div className='flex items-center gap-4'>
          <div className='flex items-center is-full'>
            <CustomAvatar skin='light' variant='rounded' color='success'>
              <i className='tabler-currency-dollar'/>
            </CustomAvatar>
            <div className='flex flex-col' style={{marginLeft: 10}}>
              <Typography className='font-medium' color='text.primary'>
                $ {reward}
              </Typography>
              <Typography variant='body2'>Your Earnings</Typography>
            </div>
          </div>
        </div>
      </CardContent>
      }
      <CardContent className='flex flex-col gap-3 items-center'>
        <Button className='items-center' variant='tonal'>{completed ? 'See your answers' : 'Start Survey'}</Button>
      </CardContent>
    </Card>
  )
}

export default SurveyCard
