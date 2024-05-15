'use client'

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import RadialBarChart from "@/app/(dashboard)/home/RadialBarChart";
import withAuth from '../../../hoc/withAuth';

function ClientHome() {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography variant='h2' className='sm:mbs-2 lg:mbs-0'>
          Your existing research studies
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <RadialBarChart title="Medical" status="In Progress" percentage={[58]}/>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <RadialBarChart title="Automotive" status="In Progress" percentage={[88]}/>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <RadialBarChart title="Agriculture" status="In Progress" percentage={[63]}/>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <RadialBarChart title="Horeca" status="Completed" percentage={[100]}/>
      </Grid>
    </Grid>
  )
}
export default withAuth(ClientHome);
