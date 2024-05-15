'use client'
import ClientHome from "@/app/(dashboard)/home/ClientHome";
import RespondentHome from "@/app/(dashboard)/home/RespondentHome";
import {useEffect, useState} from "react";

const HomePage = () => {
  const [userType, setUserType] = useState('')

  useEffect(() => {
    setUserType(localStorage.getItem('user-type'))
  }, [])

  return userType === 'respondent' ? <RespondentHome/> : <ClientHome/>
}

export default HomePage;
