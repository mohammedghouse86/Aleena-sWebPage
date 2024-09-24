import React, {useEffect, useState, useContext} from 'react';
import '../Styles/Postcss.css';
import UserContext from "../Context/Context";

const Post = () => {
  const context = useContext(UserContext);
  const { fetchPost, postData } = context;
  //const [postData, setPostData] = useState([]);
  const [posthtml, setPostHTML] = useState([]);
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
      if(postData!==undefined){
        setPostHTML(postData.map((element,index)=>{
          const newphoto = btoa(
            new Uint8Array(element.WebSiteUser.photo.data)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
          //console.log("this is newphoto",newphoto)
          return <div key={element.id} className='postinner'>
            <img className='photo' width='30px' height='30px' src={`data:image/jpeg;base64,${newphoto}`}/>
            <p style={{marginLeft:'10px'}}>{element.body}</p>
            </div>          
        }))
      }

    },[postData])
    
  
  return (
    <div className='postouter'>
      {posthtml}
    </div>
  )
}

export default Post
