'use client'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import SurveyCard from '@/app/(dashboard)/surveys/SurveyCard'
import withAuth from '@/hoc/withAuth'
import withPeer from '@/hoc/withPeer'

function RespondentHome() {
  return (
    localStorage.getItem('user-type') === 'respondent' && (
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant='h3' className='sm:mbs-2 lg:mbs-0'>
            Surveys you’d be great for!
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

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant='h3' className='sm:mbs-2 lg:mbs-0'>
            Your completed surveys
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <SurveyCard
            name={'Increderea in institutiile statului'}
            description={'Descrie interactiunea cetatenilor cu institutiile statului'}
            reward={2.3}
            completed={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <SurveyCard
            name={'Fumatul printre studentii la medicina'}
            description={'Datele furnizate pot oferi o perspectiva de corelare a comportamentelor vicioase'}
            reward={4.2}
            completed={true}
          />
        </Grid>
      </Grid>
    )
  )
}

export default withAuth(withPeer(RespondentHome))
