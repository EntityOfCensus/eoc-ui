'use client'

// React Imports

// Next Imports
import {useRouter} from 'next/navigation'

// MUI Imports
import useMediaQuery from '@mui/material/useMediaQuery'
import {styled, useTheme} from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import Logo from '@components/layout/shared/Logo'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import {useImageVariant} from '@core/hooks/useImageVariant'
import {useSettings} from '@core/hooks/useSettings'

import {connect} from "@othent/kms";
import React, {useEffect, useState} from "react";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import {Controller, useForm} from "react-hook-form";
import FormHelperText from "@mui/material/FormHelperText";

// Styled Custom Components
const LoginIllustration = styled('img')(({theme}) => ({
  zIndex: 2,
  blockSize: 'auto',
  maxBlockSize: 680,
  maxInlineSize: '100%',
  margin: theme.spacing(12),
  [theme.breakpoints.down(1536)]: {
    maxBlockSize: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxBlockSize: 450
  }
}))

const MaskImg = styled('img')({
  blockSize: 'auto',
  maxBlockSize: 355,
  inlineSize: '100%',
  position: 'absolute',
  insetBlockEnd: 0,
  zIndex: -1
})

const LoginV2 = ({mode}) => {
  // Vars
  const darkImg = '/images/pages/auth-mask-dark.png'
  const lightImg = '/images/pages/auth-mask-light.png'
  const darkIllustration = '/images/illustrations/auth/v2-login.js-dark.png'
  const lightIllustration = '/images/illustrations/auth/v2-login.js-light.png'
  const borderedDarkIllustration = '/images/illustrations/auth/v2-login.js-dark-border.png'
  const borderedLightIllustration = '/images/illustrations/auth/v2-login.js-light-border.png'

  // Hooks
  const router = useRouter()
  const {settings} = useSettings()
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const characterIllustration = useImageVariant(
    mode,
    lightIllustration,
    darkIllustration,
    borderedLightIllustration,
    borderedDarkIllustration
  )
  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    formState: {errors}
  } = useForm({
    userType: 'client'
  });

  const [userType, setUserType] = useState('client')
  const handleLogin = async () => {
    // const res1 = await login()
    // console.log("Login \n", res1.data);
    // router.push('/home')

    const res = await connect();
    console.log("Connect,\n", res.data);

    router.push('/home')
  }

  useEffect(() => {
    localStorage.setItem('user-type', userType)
  }, [userType])

  function handleUserTypeChange(e) {
    console.log(e.target.value)
    setUserType(e.target.value)
  }

  const isUserType = (type) => {
    return userType === type
  }

  return (
    <div className='flex bs-full justify-center'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
          {
            'border-ie': settings.skin === 'bordered'
          }
        )}
      >
        <LoginIllustration src={characterIllustration} />
        {!hidden && (
          <MaskImg
            alt='mask'
            src={authBackground}
            className={classnames({'scale-x-[-1]': theme.direction === 'rtl'})}
          />
        )}
      </div>
      <div
        className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <div className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'>
          <Logo/>
        </div>
        <div
          className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0'>
          <div className='flex flex-col gap-1'>
            <Typography variant='h4'>{`Welcome to ${themeConfig.templateName}! 👋🏻`}</Typography>
            <Typography>Please sign-in to your account and start the adventure</Typography>
          </div>
          <FormControl error={Boolean(errors.radio)}>
            <FormLabel>User Type</FormLabel>
            <Controller
              name='userType'
              defaultValue={userType}
              control={control}
              rules={{required: true}}
              render={({field}) => (
                <RadioGroup row {...field} name='userType'>
                  <FormControlLabel value='client' defaultValue={isUserType('client')} onChange={handleUserTypeChange}
                                    control={<Radio defaultChecked/>} label='Client'/>
                  <FormControlLabel value='respondent' defaultValue={isUserType('respondent')} onChange={handleUserTypeChange}
                                    control={<Radio defaultChecked/>} label='Respondent'/>
                </RadioGroup>
              )}
            />
            {errors.radio && <FormHelperText error>This field is required.</FormHelperText>}
          </FormControl>
          <Button fullWidth variant='contained' onClick={handleLogin}>
            Login
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LoginV2
