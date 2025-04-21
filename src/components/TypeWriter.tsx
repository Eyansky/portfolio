
import React, { useState, useEffect } from 'react';

interface TypeWriterProps {
  text: string;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export function TypeWriter({ text, delay = 100, className = "", onComplete }: TypeWriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Reset when text prop changes
  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
    setIsDeleting(false);
  }, [text]);

  useEffect(() => {
    // If we've typed the full text and not deleting yet, start deleting after pause
    if (currentIndex === text.length && !isDeleting) {
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1500);

      return () => clearTimeout(timeout);
    }

    // If we've deleted everything, call onComplete to switch to next tagline
    if (currentIndex === 0 && isDeleting) {
      if (onComplete) {
        onComplete();
      }
      return;
    }

    // Handle typing and deleting logic
    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        setDisplayText(text.substring(0, currentIndex + 1));
        setCurrentIndex(prev => prev + 1);
      } else {
        // Deleting
        // We ensure substring from 0 to currentIndex - 1 only if currentIndex > 0
        setDisplayText(text.substring(0, Math.max(currentIndex - 1, 0)));
        setCurrentIndex(prev => Math.max(prev - 1, 0));
      }
    }, isDeleting ? delay / 2 : delay);

    return () => clearTimeout(timer);
  }, [currentIndex, delay, isDeleting, text, onComplete]);

  return (
    <div className={className}>
      <span>{displayText}</span>
      <span className="animate-pulse">|</span>
    </div>
  );
}

export default TypeWriter;
