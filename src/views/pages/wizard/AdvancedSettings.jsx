import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CustomTextField from '@core/components/mui/TextField'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { Controller, useForm } from 'react-hook-form'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import FormHelperText from '@mui/material/FormHelperText'
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import MenuItem from '@mui/material/MenuItem'
import GlobalProfiling from '@views/pages/shared/GlobalProfiling'
import ProfileQuestion from '@views/pages/forms/ProfileQuestion'
import { profileCategories } from '@/app/store/consts'

const AdvancedSettings = ({ surveyData, onChangeSurveyData, targetGroupIndex, countries }) => {
  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      minimumAge: '18',
      maximumAge: '64',
      gender: '',
      country: '',
      wantedCompletes: '',
      ir: '100',
      loi: '',
      daysInField: '',
      startDate: '',
      time: '',
      visible: true
    }
  })

  const formValues = watch()

  const [disabled, setDisabled] = useState(false)
  const [visible, setVisible] = useState(surveyData.targetGroups[targetGroupIndex].visible)

  useEffect(() => {
    setDisabled(surveyData.config === 'easy')
  }, [])

  const isGender = gender => {
    return surveyData.targetGroups[targetGroupIndex].gender === gender
  }

  const handleDeleteTargetGroup = event => {
    let targetGroups = surveyData.targetGroups
    targetGroups.splice(targetGroupIndex, 1)
    onChangeSurveyData(prev => ({
      ...prev,
      targetGroups: targetGroups
    }))
  }

  const onAnswerChange = (answers, question) => {
    let targetGroups = surveyData.targetGroups
    let targetGroup = targetGroups[targetGroupIndex]
    for (var i = 0; i < targetGroup.surveyData.length; ++i) {
      if (
        targetGroup.surveyData[i].question == question.question &&
        targetGroup.surveyData[i].category == question.category
      ) {
        targetGroup.surveyData[i].answers = answers
      }
    }
    targetGroups.splice(targetGroupIndex, 1, targetGroup)
    onChangeSurveyData(prev => ({
      ...prev,
      targetGroups: targetGroups
    }))
  }

  const handleChange = event => {
    const { name, value } = event.target
    formValues[name] = value

    console.log('Form values:', formValues)

    let targetGroups = surveyData.targetGroups
    formValues['surveyData'] = surveyData.targetGroups[targetGroupIndex].surveyData
    targetGroups.splice(targetGroupIndex, 1, formValues)

    onChangeSurveyData(prev => ({
      ...prev,
      targetGroups: targetGroups
    }))
  }

  return (
    visible && (
      <Grid container spacing={3} justifyContent='space-between' m={2}>
        {!disabled && (
          <Grid item xs={12}>
            <Grid container justifyContent='flex-end'>
              <Button size={'small'} color={'secondary'} variant={'contained'} onClick={handleDeleteTargetGroup}>
                <i className='tabler-x' />
              </Button>
            </Grid>
          </Grid>
        )}
        <GlobalProfiling
          profileCategories={profileCategories}
          surveyData={surveyData.targetGroups ? surveyData.targetGroups[targetGroupIndex].surveyData : []}
          render={(category, open) => (
            <React.Fragment>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <Typography component='span' variant='h5' className='flex flex-col'>
                    {category}
                  </Typography>
                  <Typography component='span' variant='h6' className='flex flex-col'>
                    Below are the questions that the panelists hae responded to. You can select any number of attributes
                    that matches your target criteria. The target group will then contain only panelists who have
                    answered these selected attributes (as well as any other attributes you have selected in other
                    categories).
                  </Typography>
                  {open &&
                    surveyData.targetGroups &&
                    surveyData.targetGroups[targetGroupIndex].surveyData &&
                    surveyData.targetGroups[targetGroupIndex].surveyData.map((item, index) => (
                      <ProfileQuestion
                        key={index}
                        questionItem={item}
                        onAnswerChange={onAnswerChange}
                        category={category}
                      />
                    ))}
                </Grid>
              </Grid>
            </React.Fragment>
          )}
        />
        <Grid item xs={12}>
          <form>
            <Grid container spacing={6} justifyContent='space-between'>
              <Grid item xs={12} sm={12} md={12} lg={5}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant='h5' className='sm:mbs-2 lg:mbs-0'>
                      Demographics
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={6} lg={6}>
                    <Controller
                      name='minimumAge'
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          disabled={disabled}
                          type='number'
                          value={surveyData.targetGroups[targetGroupIndex].minimumAge}
                          style={{ marginRight: 10 }}
                          label='Minimum age'
                          onChange={e => {
                            field.onChange(e)
                            handleChange(e)
                          }}
                          placeholder={'18'}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} lg={6}>
                    <Controller
                      name='maximumAge'
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          disabled={disabled}
                          type='number'
                          value={surveyData.targetGroups[targetGroupIndex].maximumAge}
                          label='Maximum age'
                          onChange={e => {
                            field.onChange(e)
                            handleChange(e)
                          }}
                          placeholder={'64'}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {!disabled && (
                      <Controller
                        name='country'
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <CustomTextField
                            {...field}
                            select
                            fullWidth
                            label='Country'
                            placeholder={'Choose country'}
                            onChange={e => {
                              field.onChange(e)
                              handleChange(e)
                            }}
                          >
                            {countries.map((country, index) => (
                              <MenuItem key={index} value={country.code}>
                                {country.name}
                              </MenuItem>
                            ))}
                          </CustomTextField>
                        )}
                      />
                    )}
                    {disabled && (
                      <CustomTextField
                        disabled={disabled}
                        value={surveyData.targetGroups[targetGroupIndex].country}
                        type='string'
                        style={{ marginRight: 10 }}
                        onChange={e => {
                          field.onChange(e)
                          handleChange(e)
                        }}
                        label='Country'
                      />
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl error={Boolean(errors.radio)}>
                      <FormLabel>Gender</FormLabel>
                      <Controller
                        name='gender'
                        value={surveyData.targetGroups[targetGroupIndex].gender}
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <RadioGroup
                            row
                            {...field}
                            onChange={e => {
                              field.onChange(e)
                              handleChange(e)
                            }}
                            name='gender'
                          >
                            <FormControlLabel
                              value='female'
                              disabled={disabled}
                              control={<Radio checked={isGender('female')} />}
                              label='Female'
                            />
                            <FormControlLabel
                              value='male'
                              disabled={disabled}
                              control={<Radio checked={isGender('male')} />}
                              label='Male'
                            />
                            <FormControlLabel
                              value='both'
                              disabled={disabled}
                              control={<Radio checked={isGender('both')} />}
                              label='Both'
                            />
                          </RadioGroup>
                        )}
                      />
                      {errors.radio && <FormHelperText error>This field is required.</FormHelperText>}
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={7}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} lg={12}>
                    <Typography variant='h5' className='sm:mbs-2 lg:mbs-0'>
                      Survey specific data
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Controller
                      name='wantedCompletes'
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          value={surveyData.targetGroups[targetGroupIndex].wantedCompletes}
                          disabled={disabled}
                          style={{ width: '90%' }}
                          onChange={e => {
                            field.onChange(e)
                            handleChange(e)
                          }}
                          label='Number of wanted completes'
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Controller
                      name='ir'
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          disabled={disabled}
                          value={surveyData.targetGroups[targetGroupIndex].ir}
                          style={{ width: '90%' }}
                          label='Estimated incidence rate (IR)'
                          onChange={e => {
                            field.onChange(e)
                            handleChange(e)
                          }}
                          helperText='Percentage (%)'
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Controller
                      name='loi'
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          disabled={disabled}
                          value={surveyData.targetGroups[targetGroupIndex].loi}
                          style={{ marginRight: 30, width: '90%' }}
                          label='Estimated length of interview (LOI)'
                          onChange={e => {
                            field.onChange(e)
                            handleChange(e)
                          }}
                          helperText='Minutes'
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Controller
                      name='daysInField'
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          disabled={disabled}
                          value={surveyData.targetGroups[targetGroupIndex].daysInField}
                          label='Number of days in field'
                          style={{ width: '90%' }}
                          onChange={e => {
                            field.onChange(e)
                            handleChange(e)
                          }}
                          placeholder={'7'}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Controller
                      name='startDate'
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
                              disabled={disabled}
                              value={surveyData.targetGroups[targetGroupIndex].startDate}
                              style={{ marginTop: 10, marginRight: 30, width: '90%' }}
                              label='Start Date'
                              onChange={e => {
                                field.onChange(e)
                                handleChange(e)
                              }}
                              {...(errors.startDate && { error: true, helperText: 'This field is required.' })}
                            />
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Controller
                      name='time'
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <CustomTextField
                          {...field}
                          disabled={disabled}
                          value={surveyData.targetGroups[targetGroupIndex].time}
                          style={{ marginTop: 10, width: '90%' }}
                          label='Time'
                          onChange={e => {
                            field.onChange(e)
                            handleChange(e)
                          }}
                          placeholder={'12:53'}
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
  )
}

export default AdvancedSettings
