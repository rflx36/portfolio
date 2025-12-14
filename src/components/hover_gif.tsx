import { useState, useRef } from 'react';

interface HoverGifProps {
  staticSrc: string;
  animatedSrc: string;
  alt?: string;
  className?: string;
  type?: 'gif' | 'video';
}

export const HoverGif: React.FC<HoverGifProps> = ({ 
  staticSrc, 
  animatedSrc, 
  alt = "Phillipines",
  className = "",
  type = "gif"
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const gifKeyRef = useRef(0);

  const handleMouseEnter = () => {
    setIsHovered(true);
    
    if (type === 'video' && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else if (type === 'gif') {
      gifKeyRef.current += 1;
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    
    if (type === 'video' && videoRef.current) {
      // videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleVideoEnded = () => {
    if (videoRef.current) {
      setIsHovered(false);
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div 
      className={`relative inline-block  cursor-pointer overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img 
        src={staticSrc}
        alt={alt}
        className={`w-full h-full object-cover shadow ${
          isHovered ? 'opacity-0' : 'opacity-100'
        }`}
      />
      
      {type === 'video' ? (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover shadow ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          muted
          playsInline
          // onEnded={handleVideoEnded}
        >
          <source src={animatedSrc} type="video/mp4" />
          <source src={animatedSrc.replace('.mp4', '.webm')} type="video/webm" />
        </video>
      ) : (
        <img
          key={gifKeyRef.current}
          src={animatedSrc}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />
      )}
    </div>
  );
};