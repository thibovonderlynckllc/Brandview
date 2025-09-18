"use client";

import { useEffect, useRef, useState } from 'react';

// TypeScript declarations for Video.js
declare global {
  interface Window {
    videojs: any;
  }
}

// VideoJS Component using the Video.js library
const VideoJS = ({ 
  src, 
  className, 
  autoPlay = true,
  loop = true,
  muted = true,
  controls = false,
  width = '100%',
  height = '100%'
}: { 
  src: string; 
  className?: string; 
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  width?: string | number;
  height?: string | number;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Detect device type
  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    // Make sure Video.js is available
    if (typeof window !== 'undefined' && window.videojs) {
      if (!playerRef.current) {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const player = window.videojs(videoElement, {
          controls: isMobile ? true : controls,
          // Use 'muted' for better autoplay support across browsers
          autoplay: isMobile ? false : (autoPlay ? 'muted' : false),
          loop: loop,
          muted: muted,
          preload: 'metadata',
          responsive: true,
          fluid: true,
          playbackRates: [0.5, 1, 1.25, 1.5, 2],
          userActions: {
            hotkeys: true
          }
        }, () => {
          setIsLoaded(true);
          setHasError(false);
          
          // Enhanced autoplay handling for desktop
          if (!isMobile && autoPlay) {
            const attemptAutoplay = async () => {
              try {
                player.muted(true);
                const playPromise = player.play();
                
                if (playPromise !== undefined) {
                  await playPromise;
                  console.log('Autoplay successful');
                }
              } catch (error) {
                console.warn('Autoplay failed:', error);
                
                // Try again on user interaction
                const tryPlayOnInteraction = async () => {
                  try {
                    player.muted(true);
                    await player.play();
                    document.removeEventListener('click', tryPlayOnInteraction);
                  } catch (e) {
                    console.warn('Play on interaction failed:', e);
                  }
                };
                
                document.addEventListener('click', tryPlayOnInteraction, { once: true });
              }
            };
            
            // Use intersection observer
            const observer = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                    attemptAutoplay();
                    observer.disconnect();
                  }
                });
              },
              { threshold: 0.3 }
            );
            
            if (videoElement) {
              observer.observe(videoElement);
            }
          }
          
          // Add event listeners
          player.on('error', () => {
            console.error('Video error occurred');
            setHasError(true);
          });

          player.on('loadeddata', () => {
            setIsLoaded(true);
          });

          player.on('ended', () => {
            if (loop) {
              player.currentTime(0);
              player.play();
            }
          });
        });

        playerRef.current = player;
      }
    }

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.dispose();
          playerRef.current = null;
        } catch (error) {
          console.error('Error disposing player:', error);
        }
      }
    };
  }, [src, autoPlay, loop, muted, controls, isMobile]);

  // Update player when props change
  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.src(src);
      playerRef.current.muted(muted);
      playerRef.current.loop(loop);
    }
  }, [src, muted, loop]);

  return (
    <div className={`relative ${className}`}>
      <video
        ref={videoRef}
        className="video-js vjs-default-skin"
        data-setup="{}"
        style={{
          width: width,
          height: height,
          objectFit: 'cover'
        }}
      >
        <source src={src} type="video/mp4" />
        <p className="vjs-no-js">
          To view this video please enable JavaScript, and consider upgrading to a
          web browser that
          <a href="https://videojs.com/html5-video-support/" target="_blank" rel="noopener noreferrer">
            supports HTML5 video
          </a>
        </p>
      </video>
      
      {/* Loading indicator */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      )}
      
      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white">
          <div className="text-center">
            <p className="text-sm">Video unavailable</p>
            <p className="text-xs opacity-75">Please try again later</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoJS;
