'use client'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import MandatoryUserData from '@views/pages/forms/MandatoryUserData'
import ProfileQuestions from '@views/pages/forms/ProfileQuestions'
import withAuth from '@/hoc/withAuth'

export const runtime = 'edge' // 'nodejs' (default) | 'edge'

const FormValidation = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4'>Respondent Profile</Typography>
      </Grid>
      <Grid item xs={12}>
        <MandatoryUserData />
      </Grid>
      <Grid item xs={12}>
        <ProfileQuestions />
      </Grid>
    </Grid>
  )
}

export default withAuth(FormValidation)
