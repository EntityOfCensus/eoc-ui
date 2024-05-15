'use client'

// React Imports
import {useState} from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Chip from '@mui/material/Chip'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'
import {FormControlLabel} from '@mui/material'

// Component Imports
import DialogCloseButton from './DialogCloseButton'
import CustomTextField from '@core/components/mui/TextField'
import RespondentHome from "@/app/(dashboard)/home/RespondentHome";
import ProfileQuestions from "@views/pages/forms/ProfileQuestion";
import ProfileQuestion from "@views/pages/forms/ProfileQuestion";

const initialData = [
  {
    question: 'Question 1?',
    questionType: 'multiple',
    category: '',
    possibleAnswers: ['answer 1', 'answer 2', 'answer 3', 'answer 4', 'answer 5'],
    answers: ['answer 2', 'answer 4']
  },
  {
    question: 'Question 2?',
    questionType: 'multiple',
    category: '',
    possibleAnswers: ['answer 1', 'answer 2', 'answer 3', 'answer 4', 'answer 5'],
    answers: ['answer 1', 'answer 5']
  },
  {
    question: 'Question 3?',
    category: '',
    questionType: 'simple',
    possibleAnswers: ['answer 1', 'answer 2', 'answer 3', 'answer 4', 'answer 5'],
    answers: ['answer 3']
  }

]

const ProfileModal = ({open, setOpen, data, categoryTitle}) => {
  // States
  const [profileCategoryData, setProfileCategoryData] = useState(data || initialData)

  const handleClose = () => {
    setOpen(false)
    setProfileCategoryData(profileCategoryData)
  }

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      maxWidth='md'
      scroll='body'
      sx={{'& .MuiDialog-paper': {overflow: 'visible'}}}
    >
      <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
        <i className='tabler-x'/>
      </DialogCloseButton>
      <DialogTitle variant='h4' className='flex gap-2 flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
        {categoryTitle}
        <Typography component='span' variant='h6' className='flex flex-col text-center'>
          Below are the questions that the panelists hae responded to. You can select any number of attributes that matches your target criteria.
          The target group will then contain only panelists who have answered these selected attributes (as well as any other attributes you have selected in other categories).
        </Typography>
      </DialogTitle>
      <form onSubmit={e => e.preventDefault()}>
        <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
          <Grid container spacing={5}>
            {
              profileCategoryData && profileCategoryData.map((item, index) =>
                <ProfileQuestion
                  key={index}
                  questionItem={item}
                />
              )
            }
          </Grid>
        </DialogContent>
        <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
          <Button variant='contained' onClick={handleClose} type='submit'>
            Submit
          </Button>
          <Button variant='tonal' color='secondary' type='reset' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ProfileModal
