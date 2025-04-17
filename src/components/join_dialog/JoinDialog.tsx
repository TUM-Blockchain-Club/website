'use client'

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '@/components/button';
import Image from 'next/image';
import classNames from 'classnames';

// Import the CSS file
import './JoinDialog.css';

// Import the images
import metamaskImg from '@/images/metamask.png';
import gitImg from '@/images/git.png';
import hardhatImg from '@/images/hardhat.png';
import bagImg from '@/images/bag.png';

// Definition of an ornament with position and animation properties
interface Ornament {
  image: any; // StaticImageData
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
}

export const JoinDialog = ({
  joinUrl = 'https://tum-blockchain.com/join',
}: JoinDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

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

  useEffect(() => {
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
      setIsOpen(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    // Set the dismissal date to the end of today
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    localStorage.setItem('join-dialog-dismissed-until', today.toISOString());
    setIsOpen(false);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-violet-2 text-foreground px-20 py-10 w-[90vw] max-w-lg z-50 shadow-xl animate-scale-in bg-background border border-border flex flex-col gap-8">
          {/* Ornaments with animation */}
          {Object.values(ornaments).map((ornament, index) => (
            <div 
              key={index} 
              className="absolute w-32 h-32 animate-ornament-entry ornament-wrapper"
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
          <Dialog.Title className="text-2xl font-heading font-bold text-center">
            Join TUM Blockchain Club
          </Dialog.Title>
          <Dialog.Description className="text-center">
            Become a part of our community and join us on our journey to explore blockchain technology.
          </Dialog.Description>
          
          <div className="flex gap-4 justify-end">
            <Button buttonType="secondary" onClick={handleDismiss}>
                Dismiss for today
            </Button>
            <Button asChild buttonType="cta">
              <Link href={joinUrl}>Join Now</Link>
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
