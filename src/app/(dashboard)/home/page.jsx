'use client'
import ClientHome from '@/app/(dashboard)/home/ClientHome'
import RespondentHome from '@/app/(dashboard)/home/RespondentHome'
import { useEffect, useState } from 'react'

//export const runtime = 'edge' // 'nodejs' (default) | 'edge'

const HomePage = () => {
  const [userType, setUserType] = useState('')

  useEffect(() => {
    setUserType(localStorage.getItem('user-type'))
  }, [])

  return userType === 'respondent' ? <RespondentHome /> : <ClientHome />
}

export default HomePage
