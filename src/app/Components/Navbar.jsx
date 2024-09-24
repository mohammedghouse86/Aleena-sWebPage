'use client';
import { useEffect, useState, useContext } from "react";
import "../globals.css";
import { useRouter } from 'next/navigation';
import '../Styles/Game1Styles.css';
import Logout from '../Components/Logout.js';
import UserContext from "../Context/Context";
const Navbar = () => {
  const context = useContext(UserContext);
  const {setUser} = context;
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
          setUser(data); // user data uploaded in the contextAPI
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
      //console.log('this is the photo from Navbar ===>>>>',photo1);
      setPhoto(`data:image/jpeg;base64,${photo1}`);
    }
    //console.log('this is the session from home ===>>>>',session);
    if(session!=null){fetchphoto();
    }
  },[session])
  

  return (
    
      <div className="navbar" style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
        <h1>Social Media Website</h1>
        <div className="spacer">|</div>
        {session && 
        <>
        <div>{session.user.name.toUpperCase()}</div>
        <img width='60px' height='40px' style={{width:'60px', height:'40px', borderRadius:'50%', marginLeft:'10px', marginRight:'10px'}} src={photo} alt={`${session.user.name}'s profile`} /> 
        </>
        }
        <Logout/>
      </div>
    
  );
};

export default Navbar;
