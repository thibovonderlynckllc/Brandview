"use client";

import { useState, useEffect, useRef } from 'react';

// Simplified Video Player Component with native controls
const VideoPlayer = ({ src, className, poster }: { src: string; className?: string; poster?: string }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // For mobile devices, use ReactPlayer with native controls
  if (isMobile) {
    return (
      <div className={`relative ${className} bg-gray-800`}>
        <video 
          src={src}
          poster={poster}
          controls
          playsInline
          className="w-full h-full object-cover"
          preload="metadata"
        />
      </div>
    );
  }

  // For desktop devices, use native video player with autoplay
  return (
    <div className={`relative ${className}`}>
      <video 
        src={src}
        poster={poster}
        autoPlay={true}
        muted={true} 
        loop
        playsInline
        className="object-cover w-full h-full"
        preload="metadata"
      />
    </div>
  );
};

export default VideoPlayer; 