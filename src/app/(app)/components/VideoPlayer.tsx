"use client";

import { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';

// Custom Video Player Component with YouTube-style controls
const VideoPlayer = ({ src, className, poster }: { src: string; className?: string; poster?: string }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleMute = () => { 
    setIsMuted(!isMuted); 
  };

  const togglePlay = () => {
    if (isMobile) {
      // On mobile, show the ReactPlayer when play is clicked
      setShowPlayer(true);
      setIsPlaying(true);
    } else {
      // On desktop, use native video controls
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    if (isMobile) {
      setShowPlayer(false);
    }
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  // For mobile devices, use ReactPlayer with light mode (poster/thumbnail)
  if (isMobile) {
    return (
      <div className={`relative ${className} bg-gray-800 transition-all duration-300 ease-in-out`}>
        <style jsx>{`
          :global(.react-player video) {
            object-fit: cover !important;
            width: 100% !important;
            height: 100% !important;
          }
          .video-overlay {
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
          }
          .video-overlay.show {
            opacity: 1;
          }
          .poster-overlay {
            opacity: 1;
            transition: opacity 0.3s ease-in-out;
          }
          .poster-overlay.hide {
            opacity: 0;
          }
        `}</style>
        
        {/* Poster Image - always present, fades out when video plays */}
        <div className={`absolute inset-0 poster-overlay ${showPlayer ? 'hide' : ''}`}>
          {poster ? (
            <img 
              src={poster} 
              alt="Video poster" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white">
              <div className="text-center">
                <div className="text-2xl mb-2">📹</div>
                <div>Video: {src}</div>
                <div className="text-sm text-gray-300">No poster available</div>
              </div>
            </div>
          )}
          
          {/* Play button overlay - only visible when poster is shown */}
          {!showPlayer && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={togglePlay}
                className="bg-white bg-opacity-90 rounded-full p-4 hover:bg-opacity-100 transition-all duration-200 transform hover:scale-105"
                aria-label="Play video"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-gray-800">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            </div>
          )}
        </div>
        
        {/* Video Player - fades in when showPlayer is true */}
        {showPlayer && (
          <div className={`absolute inset-0 video-overlay show`}>
            <ReactPlayer
              width="100%"
              height="100%"
              playing={true}
              muted={isMuted}
              loop
              controls={false}
              src={src}
              style={{
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
              onError={(error) => {
                // Fallback to poster if video fails to load
                setShowPlayer(false);
              }}
              onEnded={handleVideoEnded}
              onPlay={handleVideoPlay}
              onPause={handleVideoPause}
            />
          </div>
        )}
      </div>
    );
  }

  // For desktop devices, use native video player with autoplay
  return (
    <div className={`relative ${className}`}>
      <video 
        ref={videoRef}
        src={src} 
        autoPlay={true}
        muted={isMuted} 
        loop 
        className="object-cover w-full h-full"
        onEnded={handleVideoEnded}
        onPlay={handleVideoPlay}
        onPause={handleVideoPause}
      />
      
      {/* Simple mute/unmute button overlay */}
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
    </div>
  );
};

export default VideoPlayer; 