'use client'
import ClientProfile from "@/app/(dashboard)/profile/ClientProfile";
import RespondentProfile from "@/app/(dashboard)/profile/RespondentProfile";
import {useEffect, useState} from "react";

const ProfilePage = () => {
  const [userType, setUserType] = useState('')

  useEffect(() => {
    setUserType(localStorage.getItem('user-type'))
  }, [])

  return userType === 'respondent' ? <RespondentProfile/> : <ClientProfile/>
}

export default ProfilePage;
