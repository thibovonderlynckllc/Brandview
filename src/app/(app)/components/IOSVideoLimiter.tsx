"use client";

import { useState, useEffect } from 'react';

// Simple component to limit video count on iOS devices
interface IOSVideoLimiterProps {
  children: React.ReactNode;
  maxVideosIOS?: number;
  maxVideosOther?: number;
}

const IOSVideoLimiter = ({ 
  children, 
  maxVideosIOS = 6, 
  maxVideosOther = 15 
}: IOSVideoLimiterProps) => {
  const [isIOS, setIsIOS] = useState(false);
  const [maxVideos, setMaxVideos] = useState(maxVideosOther);

  useEffect(() => {
    // Detect iOS devices
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    
    setIsIOS(ios);
    setMaxVideos(ios ? maxVideosIOS : maxVideosOther);
  }, [maxVideosIOS, maxVideosOther]);

  // If it's an array of children, limit them
  if (Array.isArray(children)) {
    return <>{children.slice(0, maxVideos)}</>;
  }

  return <>{children}</>;
};

export default IOSVideoLimiter;
