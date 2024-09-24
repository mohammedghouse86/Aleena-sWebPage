import React from 'react';
import {doLogout} from "../actions/index";
import '../Styles/Game1Styles.css';
        
const Logout = () => {
  return (
    <>
      <form action={doLogout}>
        {/*<button className='bg-black text-white p-1 rounded-md m-1 text-1g w-40'type="submit">LogOut</button>*/}
        <button className="card" type="submit"><h2>LogOut</h2></button>
      </form>
    </>
  )
}

export default Logout
