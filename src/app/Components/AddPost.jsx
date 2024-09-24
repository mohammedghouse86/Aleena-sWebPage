import React, { useState, useEffect, useContext } from "react";
import "../Styles/SubmitPost.css";
import UserContext from "../Context/Context";

const AddPost = () => {
  const context = useContext(UserContext);
  const { user, fetchPost } = context;
  const [buttonState, setButtonState] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const stuff = new FormData(e.target);
    const postData = stuff.get("post");
    //console.log(postData);
    //console.log('this is the user signed in ==>>', user.user.uuid);
    // got the post string and now to use the API
    //http://localhost:5000/addPost
    const res = await fetch("http://localhost:5000/addPost", {
      method: "POST", // Corrected method to 'POST'
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify({ userUuid: user.user.uuid, body: postData }),
    });
    fetchPost();
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="addpost">
        <label htmlFor="post">
          <input className="input" type="text" name="post" />
        </label>
        <button className="btn" type="submit" disabled={buttonState}>
          Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
