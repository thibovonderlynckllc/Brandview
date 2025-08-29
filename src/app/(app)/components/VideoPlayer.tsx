"use client";

import { useState, useEffect, useRef } from 'react';

// Custom Video Player Component with dreamlovers-style mobile/desktop handling
const VideoPlayer = ({ src, className }: { src: string; className?: string }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const toggleMute = () => { setIsMuted(!isMuted); };

  // Mobile detection - exact same as dreamlovers
  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isTabletOrMobile = /Mobi|Android|iPad|iPhone/i.test(navigator.userAgent) || window.innerWidth <= 1200;
      setIsMobile(isTouchDevice && isTabletOrMobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Desktop video event handlers
  useEffect(() => {
    if (isMobile || !videoRef.current) return;

    const video = videoRef.current;

    const handleEnded = () => {
      // Loop the video
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, [isMobile]);

  return (
    <div className={`relative ${className}`}>
      {isMobile ? (
        // Mobile: Use native HTML5 video controls (exact same as dreamlovers)
        <video
          className="w-full h-full object-cover"
          muted
          playsInline
          loop
          controls
          onError={(e) => {
            // Fallback to background color if video fails
            const target = e.target as HTMLVideoElement;
            target.style.display = 'none';
            const fallbackDiv = document.createElement('div');
            fallbackDiv.className = 'w-full h-full bg-gray-200';
            target.parentElement?.appendChild(fallbackDiv);
          }}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        // Desktop: Auto-play with custom controls (exact same as dreamlovers)
        <>
          <video
            ref={videoRef}
            src={src}
            autoPlay
            muted={isMuted}
            loop
            playsInline
            preload="auto"
            controls={false}
            className="w-full h-full object-cover"
          />
          
          {/* Custom mute/unmute button overlay - only for desktop */}
          <div className="absolute bottom-4 right-4 z-10">
            <button
              onClick={toggleMute}
              className="text-white transition-colors duration-200 p-2 bg-black bg-opacity-50 rounded-full"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                // Muted icon (speaker with slash)
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                </svg>
              ) : (
                // Unmuted icon (speaker)
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default VideoPlayer; 