'use client'

// React Imports

// Next Imports

// MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// Components Imports
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Checkbox from "@mui/material/Checkbox";

const ProfileQuestions = ({question, answers}) => {
  question = ''
  return (
    <Card>
      <CardHeader title='Optional info'/>
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <FormLabel>În medie, câte ore vă uitați la televizor într-o săptămână obișnuită?</FormLabel>
              <RadioGroup
                row
                name='radio-buttons-group'
                value={question.answer}
              >
                <Grid item xs={12} sm={12} ms={12} lg={12}><FormControlLabel value='a1' control={<Radio/>}
                                                                             label='5 ore sau mai puțin'/></Grid>
                <Grid item xs={12} sm={12} ms={12} lg={12}><FormControlLabel value='a2' control={<Radio/>}
                                                                             label='6 - 10 ore'/></Grid>
                <Grid item xs={12} sm={12} ms={12} lg={12}><FormControlLabel value='a3' control={<Radio/>}
                                                                             label='11 - 20 ore'/></Grid>
                <Grid item xs={12} sm={12} ms={12} lg={12}><FormControlLabel value='a4' control={<Radio/>}
                                                                             label='Mai mult de 20 ore'/></Grid>
                <Grid item xs={12} sm={12} ms={12} lg={12}><FormControlLabel value='a5' control={<Radio/>}
                                                                             label='Nu ma uit la TV'/></Grid>
                <Grid item xs={12} sm={12} ms={12} lg={12}><FormControlLabel value='a6' control={<Radio/>}
                                                                             label='Prefer sa nu raspund'/></Grid>
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <FormLabel>În medie, câte ore vă uitați la televizor într-o săptămână obișnuită?</FormLabel>
              <RadioGroup
                row
                name='radio-buttons-group'
                value={question.answer}
              >
                <FormControlLabel
                  value='a1' control={<Radio/>}
                  label='5 ore sau mai puțin'/>
                <FormControlLabel
                  value='a2' control={<Radio/>}
                  label='6 - 10 ore'/>
                <FormControlLabel
                  value='a3' control={<Radio/>}
                  label='11 - 20 ore'/>
                <FormControlLabel
                  value='a4' control={<Radio/>}
                  label='Mai mult de 20 ore'/>
                <FormControlLabel
                  value='a5' control={<Radio/>}
                  label='Nu ma uit la TV'/>
                <FormControlLabel
                  value='a6' control={<Radio/>}
                  label='Prefer sa nu raspund'/>
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <FormLabel>În medie, câte ore vă uitați la televizor într-o săptămână obișnuită?</FormLabel>
              <RadioGroup
                row
                name='radio-buttons-group'
                value={question.answer}
                onChange={e => setCardData({...cardData, addressType: e.target.value})}
              >
                <Grid item xs={12} sm={12} ms={12} lg={12}>
                  <FormControlLabel value='a1' label='5 ore sau mai puțin' control={<Checkbox/>}/>
                </Grid>
                <Grid item xs={12} sm={12} ms={12} lg={12}>
                  <FormControlLabel value='a2' label='6 - 10 ore' control={<Checkbox/>}/>
                </Grid>
                <Grid item xs={12} sm={12} ms={12} lg={12}>
                  <FormControlLabel value='a3' label='11 - 20 ore' control={<Checkbox/>}/>
                </Grid>
                <Grid item xs={12} sm={12} ms={12} lg={12}>
                  <FormControlLabel value='a4' label='Mai mult de 20 ore' control={<Checkbox/>}/>
                </Grid>
                <Grid item xs={12} sm={12} ms={12} lg={12}>
                  <FormControlLabel value='a5' label='Nu ma uit la TV' control={<Checkbox/>}/>
                </Grid>
                <Grid item xs={12} sm={12} ms={12} lg={12}>

                  <FormControlLabel value='a6' label='Prefer sa nu raspund' control={<Checkbox/>}/>
                </Grid>

              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <FormLabel>În medie, câte ore vă uitați la televizor într-o săptămână obișnuită?</FormLabel>
              <RadioGroup
                row
                name='radio-buttons-group'
                value={question.answer}
                onChange={e => setCardData({...cardData, addressType: e.target.value})}>
                <FormControlLabel value='a1' label='5 ore sau mai puțin' control={<Checkbox/>}/>
                <FormControlLabel value='a2' label='6 - 10 ore' control={<Checkbox/>}/>
                <FormControlLabel value='a3' label='11 - 20 ore' control={<Checkbox/>}/>
                <FormControlLabel value='a4' label='Mai mult de 20 ore' control={<Checkbox/>}/>
                <FormControlLabel value='a5' label='Nu ma uit la TV' control={<Checkbox/>}/>
                <FormControlLabel value='a6' label='Prefer sa nu raspund' control={<Checkbox/>}/>

              </RadioGroup>
            </Grid>

            <Grid item xs={12} className='flex gap-4'>
              <Button variant='contained' type='submit'>
                Submit
              </Button>
              <Button variant='tonal' color='secondary' type='reset' onClick={() => reset()}>
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default ProfileQuestions
