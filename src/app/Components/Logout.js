import React from 'react';
import {doLogout} from "../actions/index";

const Logout = () => {
  return (
    <>
      <form action={doLogout}>
        <button className='bg-black text-white p-1 rounded-md m-1 text-1g w-40'type="submit">LogOut</button>
      </form>
    </>
  )
}

export default Logout
