// Component Imports
'use client'
import dynamic from 'next/dynamic'

//export const runtime = 'edge' // 'nodejs' (default) | 'edge'

const CreateSurvey = dynamic(() => import('@views/pages/wizard'), { ssr: false })

const CreateSurveyPage = ({ params: { surveyId: string } }) => {
  return localStorage.getItem('user-type') === 'client' && <CreateSurvey />
}

export default CreateSurveyPage
