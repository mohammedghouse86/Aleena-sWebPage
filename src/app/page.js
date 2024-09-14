'use client'
import React, { useEffect} from 'react';
import LogInForm from './components/LogInForm';
import { useRouter } from 'next/navigation';
const Home = () => {
  const router = useRouter();
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch('/api/auth/session');
        const data = await res.json();
        //console.log('this is data ===>>>>', data)

        if (data) {
          router.push('/home');
        }
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    };

    fetchSession();
  }, [router]);
  return (
    <>
    <div className="flex items-center justify-center min-h-screen">
      HomePage <LogInForm/>
    </div>
    </>
  );
}

export default Home;
