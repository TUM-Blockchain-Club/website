'use client'

import Link from 'next/link';
import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '@/components/button';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';

// Import the CSS file
import './JoinDialog.css';

// Import the images
import metamaskImg from '@/images/stickers/metamask.png';
import gitImg from '@/images/stickers/git.png';
import hardhatImg from '@/images/stickers/hardhat.png';
import bagImg from '@/images/stickers/bag.png';

// Definition of an ornament with position and animation properties
interface Ornament {
  image: StaticImageData;
  alt: string;
  width: number;
  height: number;
  position: {
    x: string; // CSS position value (e.g., "-20px", "10%", etc.)
    y: string; // CSS position value (e.g., "-20px", "10%", etc.)
  };
  rotation: number; // degrees
  animationDelay?: number; // seconds
  floatOffset: number; // Offset for float animation (0-100)
  floatDuration?: number; // Duration of float animation in seconds
}

export interface JoinDialogProps {
  joinUrl?: string;
  deadline?: Date | string; // Application deadline
}

// Function to calculate time difference
const calculateTimeLeft = (deadline: Date) => {
  const now = new Date();
  const difference = deadline.getTime() - now.getTime();
  
  if (difference <= 0) {
    return { isExpired: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  
  return {
    isExpired: false,
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60)
  };
};

export const JoinDialog = ({
  joinUrl = 'https://tum-blockchain.com/join',
  deadline,
}: JoinDialogProps) => {
  // Using a simpler approach with only one state for dialog visibility
  const [dialogOpen, setDialogOpen] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{
    isExpired: boolean;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  
  // Create a ref for the Apply Now button
  const applyButtonRef = useRef<HTMLAnchorElement>(null);
  
  // Parse the deadline
  const deadlineDate = useMemo(() => {
    if (!deadline) return null;
    return deadline instanceof Date ? deadline : new Date(deadline);
  }, [deadline]);
  
  // Check if deadline has already passed
  const isDeadlinePassed = useMemo(() => {
    if (!deadlineDate) return false;
    return new Date() > deadlineDate;
  }, [deadlineDate]);

  // Hardcoded ornaments with fixed positions
  const ornaments: Record<string, Ornament> = {
    fox: {
      image: metamaskImg,
      alt: 'Metamask Fox',
      width: 100,
      height: 100,
      position: { x: '-50px', y: '-50px' },
      rotation: -8,
      floatOffset: 20, // 20% offset
      floatDuration: 4.2,
    },
    helmet: {
      image: hardhatImg,
      alt: 'Hardhat',
      width: 100,
      height: 100,
      position: { x: 'calc(100% - 70px)', y: '-30px' },
      rotation: 8,
      animationDelay: 0.2,
      floatOffset: 45, // 45% offset
      floatDuration: 3.8,
    },
    backpack: {
      image: bagImg,
      alt: 'Backpack',
      width: 100,
      height: 100,
      position: { x: '-50px', y: 'calc(100% - 90px)' },
      rotation: 8,
      animationDelay: 0.3,
      floatOffset: 75, // 75% offset
      floatDuration: 4.5,
    },
    git: {
      image: gitImg,
      alt: 'Git Logo',
      width: 100,
      height: 100,
      position: { x: 'calc(100% - 50px)', y: 'calc(100% - 60px)' },
      rotation: -8,
      animationDelay: 0.5,
      floatOffset: 0, // 0% offset
      floatDuration: 3.6,
    },
  };

  // Function to close dialog with animation
  const closeDialog = useCallback(() => {
    setAnimatingOut(true);
    
    // After animation duration, actually close the dialog
    setTimeout(() => {
      setDialogOpen(false);
      setAnimatingOut(false);
    }, 300);
  }, []);

  // Initialization effect
  useEffect(() => {
    // Don't initialize anything if deadline has passed
    if (isDeadlinePassed) return;
    
    // Check if the dialog has been dismissed today
    const dismissedUntil = localStorage.getItem('join-dialog-dismissed-until');
    if (dismissedUntil) {
      const dismissedDate = new Date(dismissedUntil);
      const now = new Date();
      
      // If the current date is still before or equal to the dismissal date, don't show the dialog
      if (now <= dismissedDate) {
        return;
      }
    }
    
    // Otherwise, show the dialog after a short delay
    const timer = setTimeout(() => {
      setDialogOpen(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [isDeadlinePassed]);
  
  // Update countdown timer every second
  useEffect(() => {
    if (!deadlineDate || isDeadlinePassed) return;
    
    // Initialize time left
    setTimeLeft(calculateTimeLeft(deadlineDate));
    
    // Update timer every second
    const intervalId = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(deadlineDate);
      setTimeLeft(newTimeLeft);
      
      // If deadline has passed during the countdown, close the dialog
      if (newTimeLeft.isExpired) {
        closeDialog();
        clearInterval(intervalId);
      }
    }, 1000);
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [deadlineDate, isDeadlinePassed, closeDialog]);

  const handleDismiss = () => {
    // Set the dismissal date to the end of today
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    localStorage.setItem('join-dialog-dismissed-until', today.toISOString());
    closeDialog();
  };

  // Handle auto focus to the "Apply Now" button
  const handleOpenAutoFocus = (event: Event) => {
    // Prevent the default focus behavior
    event.preventDefault();
    
    // Focus the Apply Now button
    if (applyButtonRef.current) {
      applyButtonRef.current.focus();
    }
  };

  // Do not render anything if the deadline has passed
  if (timeLeft?.isExpired || isDeadlinePassed) {
    return null;
  }

  // Custom Dialog implementation to have full control over the animation states
  return dialogOpen ? (
    <Dialog.Root 
      open={true} // Always true when we render this component
      modal={true}
      onOpenChange={(open) => {
        if (!open && !animatingOut) {
          closeDialog();
        }
      }}
    >
      <Dialog.Portal forceMount>
        <Dialog.Overlay 
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 ${
            animatingOut ? 'animate-fade-out' : 'animate-fade-in'
          }`} 
        />
        <Dialog.Content 
          className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-violet-2 text-foreground px-10 py-6 lg:px-20 lg:py-10 w-[90vw] max-w-2xl z-50 shadow-xl bg-background border border-border flex flex-col gap-8 ${
            animatingOut ? 'animate-scale-out' : 'animate-scale-in'
          } dialog-container`}
          onPointerDownOutside={(e) => {
            if (animatingOut) {
              e.preventDefault();
            }
          }}
          onEscapeKeyDown={(e) => {
            if (animatingOut) {
              e.preventDefault();
            }
          }}
          onInteractOutside={(e) => {
            if (animatingOut) {
              e.preventDefault();
            }
          }}
          onOpenAutoFocus={handleOpenAutoFocus}
          forceMount
        >
          {/* Ornaments with animation */}
          {Object.values(ornaments).map((ornament, index) => (
            <div 
              key={index} 
              className={`absolute w-32 h-32 ornament-wrapper ${
                animatingOut ? '' : 'animate-ornament-entry'
              }`}
              style={{
                left: ornament.position.x,
                top: ornament.position.y,
                animationDelay: ornament.animationDelay ? `${ornament.animationDelay}s` : undefined,
              }}
            >
              <Image 
                src={ornament.image} 
                alt={ornament.alt} 
                width={ornament.width} 
                height={ornament.height}
                className="animate-float ornament-image" 
                style={{ 
                  transform: `rotate(${ornament.rotation}deg)`,
                  '--rotation': `${ornament.rotation}deg`,
                  '--float-offset': `${ornament.floatOffset}%`,
                  '--float-duration': `${ornament.floatDuration || 4}s`,
                } as React.CSSProperties}
                priority={true}
                quality={90}
              />
            </div>
          ))}

          {/* Content */}
          <Dialog.Title className="text-3xl font-heading font-bold text-center">
            Apply for TUM Blockchain Club
          </Dialog.Title>
          <Dialog.Description className="text-center">
            Become a part of our community and join us on our journey to explore blockchain technology.
          </Dialog.Description>
          
          {/* Countdown timer */}
          {timeLeft && deadlineDate && (
            <div className="text-center">
              <p className="text-md uppercase font-semibold tracking-wide mb-2">Application Deadline</p>
              <div className="flex justify-center gap-4">
                <div className="text-center">
                  <span className="text-2xl font-bold">{timeLeft.days}</span>
                  <p className="text-xs uppercase">Days</p>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold">{timeLeft.hours}</span>
                  <p className="text-xs uppercase">Hours</p>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold">{timeLeft.minutes}</span>
                  <p className="text-xs uppercase">Minutes</p>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold">{timeLeft.seconds}</span>
                  <p className="text-xs uppercase">Seconds</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex flex-col-reverse lg:flex-row gap-2 lg:gap-4 justify-end">
            <Button buttonType="secondary" onClick={handleDismiss}>
                Dismiss for today
            </Button>
            <Button asChild buttonType="cta">
              <Link ref={applyButtonRef} href={joinUrl}>Apply Now</Link>
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  ) : null;
};
