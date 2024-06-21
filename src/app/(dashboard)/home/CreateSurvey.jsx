'use client'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import AddCircleIcon from '@mui/icons-material/AddCircle'
// Styled Component Imports

const CreateSurvey = () => {
  const styles = {
    largeIcon: {
      width: 60,
      height: 60
    }
  }

  return (
    <Card>
      <CardHeader title='Create Survey' subheader='Start new survey' className='pbe-0' />
      <CardContent className='flex flex-col gap-3 items-center'>
        <AddCircleIcon largeIcon sx={{ width: 70, height: 78 }} />

        <Link href='/new-survey'>
          <Button variant='tonal'>New Survey </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

export default CreateSurvey
