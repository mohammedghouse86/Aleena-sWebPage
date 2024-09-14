import React from "react";
import "../globals.css";
import IntroPhoto from "../Components/IntroPhoto";
import Game1 from "../Components/Game1";
import {PageProvider} from "../utilities/Context";

const page = () => {
  return (
    
      <div className="homepge">
        <h1>Hi I am Aleena and welcome to my website</h1>
        <IntroPhoto />
        <PageProvider>
        <Game1 />
        </PageProvider>
        
      </div>
    
  );
};

export default page;
