'use client'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import SurveyCard from '@/app/(dashboard)/surveys/SurveyCard'
import withAuth from '../../../hoc/withAuth'

export const runtime = 'edge' // 'nodejs' (default) | 'edge'

const Marketplace = () => {
  return (
    localStorage.getItem('user-type') === 'respondent' && (
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant='h3' className='sm:mbs-2 lg:mbs-0'>
            All available surveys
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <SurveyCard
            name={'Increderea in self-driving cars'}
            description={'Siguranta pasagerilor in masini care se conduc singure'}
            reward={1.5}
            completed={false}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <SurveyCard
            name={'Increderea in self-driving cars'}
            description={'Siguranta pasagerilor in masini care se conduc singure'}
            reward={1.5}
            completed={false}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <SurveyCard
            name={'Increderea in self-driving cars'}
            description={'Siguranta pasagerilor in masini care se conduc singure'}
            reward={1.5}
            completed={false}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <SurveyCard
            name={'Increderea in self-driving cars'}
            description={'Siguranta pasagerilor in masini care se conduc singure'}
            reward={1.5}
            completed={false}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <SurveyCard
            name={'Increderea in self-driving cars'}
            description={'Siguranta pasagerilor in masini care se conduc singure'}
            reward={1.5}
            completed={false}
          />
        </Grid>
      </Grid>
    )
  )
}

export default withAuth(Marketplace)
