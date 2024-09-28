import React, {useEffect, useState, useContext} from 'react';
import '../Styles/Postcss.css';
import UserContext from "../Context/Context";
import EditPost from "../Components/EditPost";
import {add_like} from "../utilities/index"

const Post = () => {
  const context = useContext(UserContext);
  const { fetchPost, postData, user, seteditNotVisible, editNotVisible, userActivities, didLike, likeStatus} = context;
  //const [postData, setPostData] = useState([]);
  const [posthtml, setPostHTML] = useState([]);
  const [postForEdit, setPostForEdit] = useState({uuid:"",body:""});
    useEffect(()=>{
        /*async function fetchPost () {
            const res = await fetch ('http://localhost:5000/readPost', {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                },
            }); 
            const response = await res.json()
            //console.log('this is the responce from post.jsx in components ==>>',response);
            setPostData(response);
        }
        console.log(toggle);
        fetchPost();*/
        fetchPost();
    },[])
    useEffect(()=>{
      console.log('I AM FROM THE USEEFFECT ===',Object.keys(postData).length)
            /*if(postData!==undefined && Object.keys(likeStatus).length===Object.keys(postData).length){*/
              if(postData!==undefined){
        setPostHTML(postData.map((element,index)=>{
          const newphoto = btoa(
            new Uint8Array(element.WebSiteUser.photo.data)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
          //console.log("this is element from the post",element)
          return <div key={element.id} className='mainpostinner'>
          
          <div  className='postinner'>
            <img className='photo' width='30px' height='30px' src={`data:image/jpeg;base64,${newphoto}`}/>
            <p style={{marginLeft:'10px'}}>{element.body}</p>
            {user.user.uuid===element.WebSiteUser.uuid && <img className='recycleBin' src='./pen.jpg' alt='pen' /*function to edit a post*/ onClick = {() =>{editthis(element.uuid, element.body)}}/>}
            {user.user.uuid===element.WebSiteUser.uuid && <img className='recycleBin' src='./recycleBin.png' alt='bin' onClick = {() =>{deletethis(element.id)}}/>}
            </div>
            <div className='icons'>
              <img onClick={
                async()=>{
                  await add_like(user.user.uuid,element.uuid,true);
                  await fetchPost();
                  }}
              width='25px' height='25px' src={likeStatus[element.id]/*?likeStatus[element.id]:likeStatus[element.id]console.log('from SRC==>>',likeStatus,element.id,likeStatus[element.id])*/} style={{cursor:'pointer'}}/>{/*console.log('THIS IS THE LIKE STATUS FROM UI',likeStatus)*/}
              <img width='25px' height='25px' src={`./retweet black.jpg`}/>
              <img width='25px' height='25px' src={`./bookmarked black.jpg`}/>
            </div>      
            </div>    
        }))
      }
      userActivities();
    },[postData, likeStatus])

    const editthis = (postuuid, postText) =>{ 
      //console.log("edit clicked")
      seteditNotVisible(false);
      setTimeout(()=>{seteditNotVisible(true);},50)
      setPostForEdit({uuid:postuuid, body:postText})}

    const deletethis = async (postid) =>{
      const response1 = await fetch('http://localhost:5000/deleteLIRTBM',{
        method:"DELETE",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body:JSON.stringify({PostUuid:postid})
      })
      const result1 = await response1.json();
      if(result1.success){
      const response = await fetch('http://localhost:5000/deletePost',{
        method:"DELETE",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body:JSON.stringify({UUid:postid})
      })
      const result2 = await response.json();
      
      fetchPost();}
      else{
        console.log('there was an error deleting the entry from the likes, retweet and bookmarks table and this is the response==>', result1.success)
      }
    }
  
  return (
    <div className='postouter'>
      {editNotVisible && <EditPost uuid={postForEdit.uuid} post={postForEdit.body}/>}
      {posthtml}
      
    </div>
  )
}

export default Post
