'use client';
import "../Styles/Game1Styles.css";
import React from "react";

const page = () => {
  const object = {
    1:{audio:"/catAudio.mp3", photo:"/cat.jpg", answer:"A"},
    2:{audio:"/dogAudio.mp3", photo:"/dog.jpg", answer:"O"}}
  const handleOne = () =>{
    const numer = 1;
    const obj = object[numer];
    console.log('this is the first one=',obj)
  }
  const handleTwo = () =>{
    const numer = 2;
    const obj = object[numer];
    console.log('this is the second one=',obj)
  }
  return (
    <>
    <button className="card" onClick={handleOne}>
      <h2> One </h2>
    </button>
    <button className="card" onClick={handleTwo}>
      <h2> Two </h2>
    </button>
    </>
  );
};

export default page;
