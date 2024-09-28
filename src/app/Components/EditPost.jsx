import React, { useState, useContext} from 'react';
import "../Styles/SubmitPost.css";
import UserContext from "../Context/Context";

const EditPost = ({uuid, post}) => {
  const [buttonState, setButtonState] = useState(false);
  const context = useContext(UserContext);
  const { seteditNotVisible, user, fetchPost } = context;
  const handleSubmit = async(e) => {
    e.preventDefault();
    const stuff = new FormData(e.target);
    const postData = stuff.get("post");
    console.log('this is what will be entered ==>>', post);
    console.log('this is the post uuid ==>>', uuid);
    const res = await fetch("http://localhost:5000/updatePost", {
      method: "PUT", // Corrected method to 'POST'
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify({ UUid: uuid, body: postData }),
    });
    fetchPost();
    const result = await res.json();
    console.log(result)
  }
  const handleCloseEditWindow = () => {
    seteditNotVisible(false);
  }
  return (
    <div>
      <button onClick={handleCloseEditWindow}>Close</button>
      <form onSubmit={handleSubmit} className="addpost">
        <label htmlFor="post">
          <input className="input" type="text" name="post" defaultValue={post} />
        </label>
        <button className="btn" type="submit" disabled={buttonState}>
          Post
        </button>
      </form>
    </div>
  )
}

export default EditPost
