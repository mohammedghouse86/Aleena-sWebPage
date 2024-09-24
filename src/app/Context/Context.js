import React, { createContext, useState } from 'react';

// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  // Define your state (or anything you want to provide)
  const [user, setUser] = useState({});
  const [postData, setPostData] = useState([]);
  const fetchPost =  async() => {
    const res = await fetch ('http://localhost:5000/readPost', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    }); 
    const response = await res.json()
    console.log('this is the responce from post.jsx in components ==>>',response);
    setPostData(response);
}
  return (
    // Use the context provider to wrap children and pass the value
    <UserContext.Provider value={{ user, setUser, fetchPost, postData }}>
      {children}
    </UserContext.Provider>
  );
};

// Export the context to be used in other components
export default UserContext;
