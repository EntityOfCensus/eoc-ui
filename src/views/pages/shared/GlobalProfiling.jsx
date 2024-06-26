'use client'

// React Imports

// Next Imports

// MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

// Components Imports
import Typography from '@mui/material/Typography'
import React, { useEffect, useState } from 'react'
import Chip from '@mui/material/Chip'
import useMediaQuery from '@menu/hooks/useMediaQuery'

const GlobalProfiling = ({ profileCategories, render, surveyData }) => {
  const [categories, setCategories] = useState(profileCategories)

  const [profileOpen, setProfileOpen] = useState(false)
  const [categoryTitle, setCategoryTitle] = useState('')
  const [open, setOpen] = useState(false)
  const isMobile = useMediaQuery('600px')

  // const [data, setData] = useState(surveyData)

  const handleProfilingClick = e => {
    setProfileOpen(prev => !prev)
  }

  useEffect(() => {
    if (!open) {
      if (categoryTitle) {
        setOpen(true)
      }
    }
  }, [open])

  const handleClick = e => {
    if (isMobile) {
      setProfileOpen(prev => !prev)
    }
    if (open) {
      setOpen(false)
    } else {
      setOpen(true)
    }
    setCategoryTitle(e.target.outerText)
    setCategories([...categories])
  }

  const getButtonColor = item => {
    let allAnswered = false
    let someAnswered = false
    if (surveyData) {
      var cntAll = 0
      var cntAnswered = 0
      for (var i = 0; i < surveyData.length; ++i) {
        if (surveyData[i].category == item.label) {
          cntAll++
          if (surveyData[i].answers.length > 0) {
            cntAnswered++
          }
        }
      }
      allAnswered = cntAll > 0 && cntAll == cntAnswered
      someAnswered = !allAnswered && cntAnswered > 0
    }
    return allAnswered ? 'success' : someAnswered ? 'warning' : 'primary'
  }

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Typography variant='h5' className='sm:mbs-2 lg:mbs-0'>
          Global profiling category
          <Button style={{ margin: 10 }} color={'primary'} variant={'contained'} onClick={handleProfilingClick}>
            {profileOpen ? 'Hide' : 'Show'}
          </Button>
        </Typography>
        {profileOpen &&
          profileCategories &&
          profileCategories.map((item, index) => (
            <React.Fragment key={index}>
              <Chip
                key={index}
                style={{ width: '200px', marginRight: 10, marginBottom: 10 }}
                variant='filled'
                label={item.label}
                color={item.color ? item.color : getButtonColor(item)}
                size='medium'
                className='capitalize mie-4'
                onClick={handleClick}
              />
            </React.Fragment>
          ))}
        {open && render(categoryTitle, open)}
      </Grid>
    </React.Fragment>
  )
}

export default GlobalProfiling
