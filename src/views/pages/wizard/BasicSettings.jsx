import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CustomTextField from '@core/components/mui/TextField'
import { Controller, useForm } from 'react-hook-form'
import React from 'react'

const BasicSettings = ({ surveyData, onChangeSurveyData }) => {
  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: surveyData.name || '',
      description: surveyData.description || ''
    }
  })

  const formValues = watch()

  const handleChange = event => {
    const { name, value } = event.target
    onChangeSurveyData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <form>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant='h5' className='sm:mbs-2 lg:mbs-0'>
                    Survey details
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} lg={12}>
                  <Controller
                    name='name'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        type='text'
                        value={surveyData.name || ''}
                        style={{ marginRight: 10 }}
                        label='Name'
                        fullWidth
                        onChange={e => {
                          field.onChange(e)
                          handleChange(e)
                        }}
                        placeholder={'Type the name of the study'}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} lg={12}>
                  <Controller
                    name='description'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        type='text'
                        multiline
                        fullWidth
                        rows={4}
                        value={surveyData.description || ''}
                        label='Description'
                        onChange={e => {
                          field.onChange(e)
                          handleChange(e)
                        }}
                        placeholder={'Describe research'}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}

export default BasicSettings
