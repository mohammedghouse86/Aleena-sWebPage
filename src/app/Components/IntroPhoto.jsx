'use client';
import { useEffect, useRef } from 'react';

const IntroPhoto = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = '/Aleena(300x400).jpg';
    let width = 3;
    let height = 4;
    const targetWidth = 90;
    const targetHeight = 90;
    const growthRate = 3; // Adjust this to control the speed of growth
    let xmove = 255;

    const img1 = new Image();
    img1.src = '/Aleena1(300x400).jpg';
    let width2 = 3;
    let height2 = 4;
    const targetWidth2 = 90;
    const targetHeight2 = 90;
    const growthRate2 = 3;
    let xmove2 = 350;

    img.onload = () => {
      const animate = () => {
        // Animate the first image
        if (width < targetWidth && height < targetHeight) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, xmove, 0, width, height);
          width += growthRate;
          height += growthRate;
          xmove -= 9;
          requestAnimationFrame(animate);
        }

        // Animate the second image after the first one reaches its target size
        if (width >= targetWidth && height >= targetHeight && width2 < targetWidth2 && height2 < targetHeight2) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);  // Draw the first image in its final position
          ctx.drawImage(img1, xmove2, 0, width2, height2); // Draw the second image
          width2 += growthRate2;
          height2 += growthRate2;
          xmove2 -= 9;
          requestAnimationFrame(animate);
        }
      };
      animate();
    };
  }, []);

  return <canvas ref={canvasRef} width="330" height="130" />;
};

export default IntroPhoto;
