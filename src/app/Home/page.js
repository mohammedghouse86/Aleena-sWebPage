'use client';
import React from "react";
import "../globals.css";
import { useRouter } from 'next/navigation';
import '../Styles/Game1Styles.css';
import Logout from '../Components/Logout.js';

const page = () => {
  const router = useRouter();
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
