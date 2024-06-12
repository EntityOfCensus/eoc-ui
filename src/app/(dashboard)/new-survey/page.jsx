// Component Imports
'use client'
import dynamic from 'next/dynamic'

const CreateSurvey = dynamic(() => import('@views/pages/wizard'), { ssr: false })

const CreateSurveyPage = () => {
  return localStorage.getItem('user-type') === 'client' && <CreateSurvey />
}

export default CreateSurveyPage
