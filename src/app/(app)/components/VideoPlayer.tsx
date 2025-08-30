"use client";

import { useState, useEffect, useRef } from 'react';

// Robust Video Player Component with mobile crash prevention
const VideoPlayer = ({ src, className, poster }: { src: string; className?: string; poster?: string }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Video error:', e);
    setHasError(true);
  };

  const handleLoadedData = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleLoadStart = () => {
    setIsLoaded(false);
  };

  // For mobile devices - simplified approach to prevent crashes
  if (isMobile) {
    return (
      <div className={`relative ${className} bg-gray-800`}>
        <video 
          ref={videoRef}
          src={src}
          poster={poster}
          controls
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
          onError={handleError}
          onLoadedData={handleLoadedData}
          onLoadStart={handleLoadStart}
          // Prevent mobile crashes
          muted={false}
          // Additional mobile attributes
          data-webkit-playsinline="true"
          data-x-webkit-airplay="allow"
        />
      </div>
    );
  }

  // For desktop devices - autoplay with loop
  return (
    <div className={`relative ${className}`}>
      <video 
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={true}
        muted={true} 
        loop
        playsInline
        preload="metadata"
        className="object-cover w-full h-full"
        onError={handleError}
        onLoadedData={handleLoadedData}
        onLoadStart={handleLoadStart}
      />
    </div>
  );
};

export default VideoPlayer; 