'use client'; 

import { useEffect } from 'react';
import { usePathname } from 'next/navigation'; 
import { gsap } from 'gsap';

type PageTransitionProps = {
  children: React.ReactNode; // This will accept child components
};

const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname(); // Detects current path

  useEffect(() => {
    // Animate page entrance
    const animateIn = () => {
      gsap.fromTo(
        '.content', 
        { opacity: 0, x: -100 }, 
        { opacity: 1, x: 0, duration: 0.5 }
      );
    };

    // Animate page exit (if needed for unmount)
    const animateOut = (callback: () => void) => {
      gsap.to('.content', { opacity: 0, x: 100, duration: 0.5, onComplete: callback });
    };

    // Start animation on route change
    const handleRouteChange = () => {
      animateIn();
    };

    
    animateIn(); // Animate page load
    return () => {
      animateOut(() => {}); // Optionally, handle animation when component unmounts or before route change
    };
  }, [pathname]); // Run this effect on every route change (pathname change)

  return <div className="content">{children}</div>; // Render the children here
};

export default PageTransition;
