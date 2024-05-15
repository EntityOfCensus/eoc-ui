"use client";
import { useEffect, useState } from 'react';
import {useRouter} from "next/navigation";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter()

    useEffect(() => {
      const checkAuth = async () => {
        const token = localStorage.getItem('id_token');
        if (!token) {
          router.push('/login');
          return;
        }

        try {
          // Add your authentication logic here -> user is RESPONDENT or CLIENT and set state accordinglye
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Authentication failed:', error);
          router.push('/login');
        }
      };

      checkAuth();
    });

    if (!isAuthenticated) {
      return <div>Loading...</div>; // You can render a loading spinner here
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
