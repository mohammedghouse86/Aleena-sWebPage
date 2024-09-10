"use client";
import { useEffect, useRef, useState, useContext } from "react"; //CAT GAME 1
import {PageContext} from '../utilities/Context';
import Confetti from "react-confetti";
import '../Styles/Game1Styles.css';
import LoadingComponent from '../Components/LoadingComponent';

const Game1 = () => {
  const canvasRef = useRef(null);
  const [audio, setAudio] = useState(null);
  const [playaudio, setplayaudio] = useState(false);
  const { pageNo, setPageNo, changeObj, data } = useContext(PageContext);
    //data = {audio: '/catAudio.mp3', photo: '/cat.jpg', answer: 'A'}
  useEffect(() => {
    // Initialize the audio object only on the client side
    const newAudio = new Audio(data.audio);
    setAudio(newAudio);
    console.log('this is data=', data);
  }, [data.audio]);

  useEffect(() => {
    console.log("playing sound", playaudio);
    if (playaudio) {
      audio.play();
      setTimeout(() => {
        setplayaudio(false);
      }, 1000);
    }
  }, [playaudio]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = data.photo; //photo 
    let width = 0;
    let height = 0;
    const targetWidth = 300;
    const targetHeight = 300;
    const growthRate = 10; // Adjust this to control the speed of growth

    img.onload = () => {
      const animate = () => {
        if (width < targetWidth && height < targetHeight) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, width, height);
          width += growthRate;
          height += growthRate;
          console.log(width === growthRate && height === growthRate && audio);
          // Play the sound only once
          if (width === targetWidth && audio !== null) {
            setplayaudio(true);
          }

          requestAnimationFrame(animate);
        }
      };
      animate();
    };
  }, [audio, data.photo]);

  const submitAnswer = (e) => {
    console.log('this is page number=',pageNo)
    e.preventDefault(); // Prevent default form submission behavior
  
    const formData = new FormData(e.target); // Get form data from the form element
    let answer = formData.get('answer').replace(/\s+/g, ''); // Retrieve the value of the input with the name 'answer'
    
    console.log('this is the length',answer.length);
    if(answer==data.answer.toUpperCase() || answer ==data.answer.toLowerCase()){
    setIsOpaque(true); // Make the screen slightly opaque
    setShowConfetti(true); // Trigger the confetti
  
    setTimeout(() => {
      setShowConfetti(false); // Stop the confetti after a while
      setIsOpaque(false); // Remove opacity
      if(pageNo<10){
        setPageNo(pageNo+1);
        changeObj(pageNo+1);
      }
      if(pageNo===10){
        setPageNo(1);
        changeObj(1);
      }
      
      console.log('did the page number change?', pageNo)
    }, 5000); // Confetti duration: 5 seconds
    }
    else{
      alert("try again!")
    }
  };
  

  const [isOpaque, setIsOpaque] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  return (<>
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        border: "1px solid yellow",
        padding: "10px",
        width: "500px",
      }}
    >
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          style={{
            zIndex: 3,
            position: "absolute",
            top: 170,
            left: 0,
            width: "400px",
            height: "400px",
            zIndex: 10,
          }}
        />
      )}
      <canvas
        ref={canvasRef}
        width="300"
        height="300"
        style={{ position: "relative" }}
      />
      <div style={{ display: "flex", flexDirection: "column", justifyContent:'center', alignItems:'center'}}>
      <label htmlFor="question">Question:</label>
        <div className="question">{data.question}</div>
        <form onSubmit={submitAnswer} style={{ display: "flex", flexDirection: "column", justifyContent:'center', alignItems:'center'}}>
          <label htmlFor="answer">Answer:</label>
          <input
            type="text"
            id="answer"
            name="answer"
            style={{ width: "100px", height: "30px" }}
          />
          <button type="submit" className="card" style={{marginTop:'20px'}}>
            <h2>Submit</h2>
          </button>
        </form>
      </div>
    </div>
    <LoadingComponent progress={pageNo}/>
    </>
  );
};

export default Game1;
