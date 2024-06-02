'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormLabel from '@mui/material/FormLabel'
import FormHelperText from '@mui/material/FormHelperText'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import { jwtDecode } from 'jwt-decode'
import { newProfileSurveyAtom } from '@/app/store/atoms'
import { useAtom } from 'jotai/index'

// Third-party Imports
import { toast } from 'react-toastify'
import { useForm, Controller } from 'react-hook-form'

import { RespondentBasicDataApi, RespondentBasicDataApiClient } from '../../../@bff/respondent-basic-info-api'

// Components Imports
import CustomTextField from '@core/components/mui/TextField'

// Styled Component Imports
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

const MandatoryUserData = () => {
  const [newProfileSurvey, setNewProfileSurvey] = useAtom(newProfileSurveyAtom)

  // Hooks
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      dob: null,
      select: '',
      country: '',
      city: '',
      county: '',
      postalCode: '',
      radio: '',
      checkbox: false
    }
  })
  const [respondentBasicData, setRespondentBasicData] = useState(null)

  const [respondentBasicDataApi, setRespondentBasicDataApi] = useState(
    new RespondentBasicDataApi(RespondentBasicDataApiClient.instance)
  )

  useEffect(() => {
    if (!respondentBasicData) {
      const { sub } = jwtDecode(localStorage.getItem('id_token'))
      respondentBasicDataApi.apiClient.authentications = {
        bearerAuth: {
          type: 'bearerAuth',
          accessToken: localStorage.getItem('id_token')
        }
      }
      respondentBasicDataApi.findRespondentBasicDataById(sub, function (error, data, response) {
        if (error) {
          console.log('error', error)
          return
        }
        const { sub } = jwtDecode(localStorage.getItem('id_token'))
        if (data.id == sub) {
          let targetGroup = newProfileSurvey.targetGroups[0]; //.length > 0 {
          targetGroup.dob = data.dateOfBirth;
          targetGroup.gender = data.gender;
          targetGroup.country = data.country;
          setNewProfileSurvey(prev => ({
            ...prev,
            type: 'respondent-survey',
            respondentOthentSub: sub,
            targetGroups: [targetGroup]
          }))
          setRespondentBasicData(data)
          setValue('firstName', data.firstName)
          setValue('lastName', data.lastName)
          setValue('email', data.email)
          setValue('dob', data.dateOfBirth)
          setValue('select', data.country)
          setValue('city', data.city)
          setValue('county', data.county)
          setValue('postal_code', data.postalCode)
          setValue('radio', data.gender)
          setValue('checkbox', data.agreeOnTerms)
        }
        console.log('data', data)
      })
    }
  }, [respondentBasicData])

  const onSubmit = data => {
    let body = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      dateOfBirth: new Date(data.dob).toISOString().substring(0, 10),
      country: data.select,
      city: data.city,
      county: data.county,
      postalCode: data.postal_code,
      gender: data.radio,
      agreeOnTerms: data.checkbox
    }
    let targetGroup = newProfileSurvey.targetGroups[0] //.length > 0 {
    targetGroup.dob = body.dateOfBirth
    targetGroup.gender = body.gender
    targetGroup.country = body.country
    setNewProfileSurvey(prev => ({
      ...prev,
      type: 'respondent-survey',
      respondentOthentSub: jwtDecode(localStorage.getItem('id_token')),
      targetGroups: [targetGroup]
    }))
    if (respondentBasicData) {
      putRespondentBasicData(body)
    } else {
      postRespondentBasicData(body)
    }
    toast.success('Form Submitted')
  }

  const postRespondentBasicData = body => {
    respondentBasicDataApi.apiClient.authentications = {
      bearerAuth: {
        type: 'bearerAuth',
        accessToken: localStorage.getItem('id_token')
      }
    }
    respondentBasicDataApi.addRespondentBasicData(body, function (error, data, response) {
      console.log(error)
      //todo error handling
    })
  }

  const putRespondentBasicData = body => {
    const { sub } = jwtDecode(localStorage.getItem('id_token'))
    respondentBasicDataApi.apiClient.authentications = {
      bearerAuth: {
        type: 'bearerAuth',
        accessToken: localStorage.getItem('id_token')
      }
    }
    respondentBasicDataApi.updateRespondentBasicData(body, sub, function (error, data, response) {
      console.log(error)
      //todo error handling
    })
  }

  return (
    <Card>
      <CardHeader title='Mandatory Info' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='firstName'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='First Name'
                    placeholder='John'
                    {...(errors.firstName && { error: true, helperText: 'This field is required.' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='lastName'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Last Name'
                    placeholder='Doe'
                    {...(errors.lastName && { error: true, helperText: 'This field is required.' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    type='email'
                    label='Email'
                    placeholder='johndoe@gmail.com'
                    {...(errors.email && { error: true, helperText: 'This field is required.' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='dob'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <AppReactDatepicker
                    selected={value}
                    showYearDropdown
                    showMonthDropdown
                    onChange={onChange}
                    placeholderText='MM/DD/YYYY'
                    customInput={
                      <CustomTextField
                        value={value}
                        onChange={onChange}
                        fullWidth
                        label='Date Of Birth'
                        {...(errors.dob && { error: true, helperText: 'This field is required.' })}
                      />
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='select'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    select
                    value={field.value}
                    fullWidth
                    label='Country'
                    {...field}
                    error={Boolean(errors.select)}
                  >
                    <MenuItem value=''>Select Country</MenuItem>
                    {}
                    <MenuItem value='UK'>UK</MenuItem>
                    <MenuItem value='USA'>USA</MenuItem>
                    <MenuItem value='Australia'>Australia</MenuItem>
                    <MenuItem value='Germany'>Germany</MenuItem>
                  </CustomTextField>
                )}
              />
              {errors.select && <FormHelperText error>This field is required.</FormHelperText>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='city'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='City'
                    placeholder='Bucharest'
                    {...(errors.lastName && { error: true, helperText: 'This field is required.' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='county'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='County'
                    placeholder='Bucharest'
                    {...(errors.lastName && { error: true, helperText: 'This field is required.' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='postal_code'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Postal Code'
                    placeholder='140022'
                    {...(errors.lastName && { error: true, helperText: 'This field is required.' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl error={Boolean(errors.radio)}>
                <FormLabel>Gender</FormLabel>
                <Controller
                  name='radio'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <RadioGroup row {...field} name='radio-buttons-group'>
                      <FormControlLabel value='female' control={<Radio />} label='Female' />
                      <FormControlLabel value='male' control={<Radio />} label='Male' />
                      <FormControlLabel value='other' control={<Radio />} label='Other' />
                    </RadioGroup>
                  )}
                />
                {errors.radio && <FormHelperText error>This field is required.</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl error={Boolean(errors.checkbox)}>
                <Controller
                  name='checkbox'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} checked={field.value} />}
                      label='Agree to our terms and conditions'
                    />
                  )}
                />
                {errors.checkbox && <FormHelperText error>This field is required.</FormHelperText>}
              </FormControl>
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

export default MandatoryUserData
