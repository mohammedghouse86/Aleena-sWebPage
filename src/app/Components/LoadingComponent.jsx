import React, { useState } from 'react';
import '../Styles/LoadingBar.css'; 

function LoadingBar({progress}) {
  //const [progress, setProgress] = useState(0);

  // Function to simulate loading progress
  /*const handleIncreaseProgress = () => {
    setProgress((prev) => (prev < 100 ? prev + 10 : 100));
  };*/
  //console.log('this is the progress from loading component =',progress)

  return (
    <div>
      
      <div className="loading-bar-container">
        <div
          className="loading-bar"
          style={{ width: `${(progress-1)*10}%` }}
        ></div>
      </div>

      <p>{(progress-1)*10}%</p>

      {/*<button onClick={handleIncreaseProgress}>
        Increase Progress
      </button>*/}
    </div>
  );
}

export default LoadingBar;
