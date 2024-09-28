import React, { createContext, useState } from 'react';

// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  // Define your state (or anything you want to provide)
  const [user, setUser] = useState({});
  const [postData, setPostData] = useState([]);
  const [userPreferences, setUserPreferences] =useState({});
  const [editNotVisible, seteditNotVisible] = useState(false);
  const [likeStatus, setLikeStatus] = useState({});
  const fetchPost =  async() => {
    const res = await fetch ('http://localhost:5000/readPost', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    }); 
    const response = await res.json()
    //console.log('this is the response from context.js in components ==>>',response);
    setPostData(response); //here you have all the data for the post
    //getting the user details 
    console.log("FETCH POST HAS BEEN CALLED NUMBER OF POST ===  ",Object.keys(response).length)
    const userres = await fetch('/api/auth/session');
    const data = await userres.json();
    console.log("calling didlike")
    didLike(response, data);  
}

// Creating an object which will contain the post liked or not liked also retweet and bookmarked

  const userActivities = async() =>{
    
    if(user && user.user && postData){
      const id = user.user.id;
      postData.map((element,index)=>{
        fetchLRB(id,element.id)
      })
      //console.log("this is from the userActivities function ==>>>", id, postData);
      getuserpref();
    }
  }

  function getuserpref(){
    //console.log('this is the userPreferences', userPreferences)
  }

  const fetchLRB = async(userID,PostID) =>{
    const response = await fetch('http://localhost:5000/readLIRTBM',{
      method:"POST",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body:JSON.stringify({userUuid:userID, PostUuid:PostID})
    })
    const res = await response.json();
    if(Object.keys(res).length!==3){
      setUserPreferences((prev) => ({
        ...prev,
        [PostID]: res // Spread the response into the previous state
      }));
    }
  }
  //the following frunction will be automatically called after we have the entire post data
  const didLike = async(response,user1) =>{ 
    //console.log("DIDLIKE FUNCTION CALLED...FROM CONTEX...AFTER GETTING THE POSTS")
    // Now, we have the signed in user and all the post data, now we would iterate over the post data
    //console.log('this is postData from the didLike function==>>',response);
    //console.log('this is user from the didLike function==>>',user1.user.id);
    response.map(async(element,index)=>{
      //console.log("this is the iteration in the post",element.id)
      const response = await fetch('http://localhost:5000/readLIRTBM',{
        method:"POST",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body:JSON.stringify({userUuid:user1.user.id, PostUuid:element.id})
      });
      const res = await response.json();
      setLikeStatus(prev => ({
        ...prev,
        [element.id]: res.likes ? './heart red.jpg' : './heart black.jpg'
      }));
    })
    
    /*
    
    console.log('this is the response ==>>',PostID,res);
    setLikeStatus(prev => ({
      ...prev,
      [PostID]: res.likes ? './heart_red.jpg' : './heart_black.jpg'
    }));
    console.log(likeStatus)*/
  }
  return (
    // Use the context provider to wrap children and pass the value
    <UserContext.Provider value={{ user, setUser, fetchPost, postData, editNotVisible, seteditNotVisible, userActivities, didLike, likeStatus, userPreferences }}>
      {children}
    </UserContext.Provider>
  );
};

// Export the context to be used in other components
export default UserContext;
