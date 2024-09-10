// app/utilities/Context.js
'use client';
import { createContext, useState } from 'react';

// Create the context
export const PageContext = createContext();

// Provider component for confetti visibility state
export const PageProvider = ({ children }) => {
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState({audio:"/catAudio.mp3", photo:"/cat.jpg", question:<h2>C __ T</h2>, answer:"A"});
  const object = {
                  1:{audio:"/catAudio.mp3", photo:"/cat.jpg", question:<h2>C __ T</h2>, answer:"A"},
                  2:{audio:"/dogAudio.mp3", photo:"/dog.jpg", question:<h2>D __ G</h2>, answer:"O"},
                  3:{audio:"/fishAudio.mp3", photo:"/fish.jpg", question:<h2>FI __ H</h2>, answer:"S"},
                  4:{audio:"/busAudio.mp3", photo:"/bus.jpg", question:<h2>__ U S</h2>, answer:"B"},
                  5:{audio:"/oneAudio.mp3", photo:"/one.jpg", question:<h2>O N __</h2>, answer:"E"},
                  6:{audio:"/twoAudio.mp3", photo:"/two.jpg", question:<h2>__ W O</h2>, answer:"T"},
                  7:{audio:"/threeAudio.mp3", photo:"/three.jpg", question:<h2>T H R E __</h2>, answer:"E"},
                  8:{audio:"/fourAudio.mp3", photo:"/four.jpg", question:<h2>F O __ R</h2>, answer:"U"},
                  9:{audio:"/fiveAudio.mp3", photo:"/five.jpg", question:<h2>__ I V E</h2>, answer:"F"},
                  10:{audio:"/nineAudio.mp3", photo:"/nine.jpg", question:<h2>N I __ E</h2>, answer:"N"},
                }
  const changeObj = (i) =>{
    setData(object[i])
  }
  return (
    <PageContext.Provider value={{ pageNo, setPageNo, changeObj, data }}>
      {children}
    </PageContext.Provider>
  );
};


