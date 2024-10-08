'use client';
import { useEffect, useState } from "react";
import "../globals.css";
import { useRouter } from 'next/navigation';
import '../Styles/Game1Styles.css';
import Logout from '../Components/Logout.js';
import Navbar from "../Components/Navbar";
import Post from "../Components/Post";
import AddPost from "../Components/AddPost";
import {UserProvider} from "../Context/Context";
const page = () => {
  
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [photo,setPhoto] = useState("")
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch('/api/auth/session');
        const data = await res.json();
        //console.log('this is data from home===>>>>', data)

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

  //getting user photo
  useEffect(()=>{
    const fetchphoto = async () =>{
      const res = await fetch(`http://localhost:5000/Getuserphoto/${session.user.name}`);
      const photo1 = await res.json();
      //console.log('this is the photo from home ===>>>>',photo1);
      setPhoto(`data:image/jpeg;base64,${photo1}`);
    }
    //console.log('this is the session from home ===>>>>',session);
    if(session!=null){fetchphoto();
    }
  },[session])
  
  const handleClick = () =>{
    router.push('/Game');
  }
  return (
    <>
    <UserProvider>
    <Navbar/>
      
      <div className="homepge">
        <Post/>
        <AddPost/>
        <button className="card" onClick={handleClick}><h2>Game do it</h2></button>
        <Logout/>
      </div>
      </UserProvider>
      </>
  );
};

export default page;
