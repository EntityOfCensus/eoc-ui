// Component Imports
'use client'
import CreateSurvey from '@views/pages/wizard'

const CreateSurveyPage = () => {
  return localStorage.getItem('user-type') === 'client' && <CreateSurvey />
}

export default CreateSurveyPage
