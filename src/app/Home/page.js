'use client';
import { useEffect, useState } from "react";
import "../globals.css";
import { useRouter } from 'next/navigation';
import '../Styles/Game1Styles.css';
import Logout from '../Components/Logout.js';

const page = () => {
  const router = useRouter();
  const [session, setSession] = useState(null);
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch('/api/auth/session');
        const data = await res.json();
        console.log('this is data from home===>>>>', data)

        if (!data) {
          router.push('/');
        } else {
          setSession(data);
        }
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    };

    fetchSession();
  }, [router]);

  
  const handleClick = () =>{
    router.push('/Game');
  }
  return (
    
      <div className="homepge">
        <h1>Go to Game</h1>
        <button className="card" onClick={handleClick}><h2>Game</h2></button>
        <Logout/>
      </div>
    
  );
};

export default page;
