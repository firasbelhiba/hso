import React from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Page Transition Manager Component
 * 
 * Provides smooth, brand-consistent page transitions with:
 * - Three distinct transition styles
 * - Performance optimizations
 * - Accessibility support (reduced motion)
 * - Loading states with brand styling
 */

interface PageTransitionProps {
  children: React.ReactNode;
  transitionStyle?: 'pixel-fade' | 'slide' | 'scale-glow';
  duration?: number;
  className?: string;
}

interface LoadingOverlayProps {
  isVisible: boolean;
  style?: 'spinner' | 'pixels';
}

// Custom hook for managing page transitions
export const usePageTransition = (transitionStyle: 'pixel-fade' | 'slide' | 'scale-glow' = 'pixel-fade') => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [currentPath, setCurrentPath] = React.useState(location.pathname);

  React.useEffect(() => {
    // Trigger transition when route changes
    if (location.pathname !== currentPath) {
      setIsTransitioning(true);
      
      // Duration based on transition style
      const duration = transitionStyle === 'scale-glow' ? 450 : 
                      transitionStyle === 'slide' ? 350 : 400;
      
      // Allow exit animation to complete before updating content
      setTimeout(() => {
        setCurrentPath(location.pathname);
        setIsTransitioning(false);
      }, duration / 2);
    }
  }, [location.pathname, currentPath, transitionStyle]);

  return { isTransitioning, currentPath };
};

// Loading overlay component with brand styling
export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  isVisible, 
  style = 'pixels' 
}) => {
  if (!isVisible) return null;

  return (
    <div className={`page-loading-overlay ${!isVisible ? 'hidden' : ''}`}>
      {style === 'spinner' ? (
        <div className="loading-spinner" />
      ) : (
        <div className="loading-pixels">
          <div className="loading-pixel" />
          <div className="loading-pixel" />
          <div className="loading-pixel" />
        </div>
      )}
    </div>
  );
};

// Main page transition wrapper component
export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  transitionStyle = 'pixel-fade',
  duration = 400,
  className = ''
}) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = React.useState(location);
  const [isAnimating, setIsAnimating] = React.useState(false);

  React.useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setIsAnimating(true);
    }
  }, [location, displayLocation]);

  const handleAnimationEnd = () => {
    if (isAnimating) {
      setDisplayLocation(location);
      setIsAnimating(false);
    }
  };

  const getTransitionClasses = () => {
    const baseClasses = 'page-transition-container';
    
    if (isAnimating) {
      if (location.pathname !== displayLocation.pathname) {
        // Exiting animation
        return `${baseClasses} page-exiting transition-${transitionStyle}-exit ${className}`;
      } else {
        // Entering animation
        return `${baseClasses} page-entering transition-${transitionStyle}-enter ${className}`;
      }
    }
    
    return `${baseClasses} ${className}`;
  };

  return (
    <div 
      className={getTransitionClasses()}
      onAnimationEnd={handleAnimationEnd}
      style={{ 
        animationDuration: `${duration}ms`,
        // Ensure smooth transitions on all devices
        willChange: 'transform, opacity',
        // Hardware acceleration for smooth 60fps animations
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    >
      {children}
    </div>
  );
};

// Enhanced Link component with preloading and transition support
interface TransitionLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  preload?: boolean;
  transitionStyle?: 'pixel-fade' | 'slide' | 'scale-glow';
  onClick?: () => void;
}

export const TransitionLink: React.FC<TransitionLinkProps> = ({
  to,
  children,
  className = '',
  preload = true,
  transitionStyle = 'pixel-fade',
  onClick
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  // Preload route on hover for better perceived performance
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (preload) {
      // Trigger route preloading (implementation depends on your router setup)
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = to;
      document.head.appendChild(link);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Add transition delay for visual feedback
    const duration = transitionStyle === 'scale-glow' ? 450 : 
                    transitionStyle === 'slide' ? 350 : 400;
    
    // Trigger custom onClick if provided
    if (onClick) {
      onClick();
    }
    
    // Navigate after brief delay for better UX
    setTimeout(() => {
      window.history.pushState({}, '', to);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }, 50);
  };

  return (
    <a
      href={to}
      className={`transition-all duration-200 ${className} ${
        isHovered ? 'transform scale-105' : ''
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};

// Utility function to detect user's motion preferences
export const prefersReducedMotion = (): boolean => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return false;
};

// Performance monitoring utility
export const measureTransitionPerformance = (transitionName: string) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    performance.mark(`transition-${transitionName}-start`);
    
    return () => {
      performance.mark(`transition-${transitionName}-end`);
      performance.measure(
        `transition-${transitionName}`,
        `transition-${transitionName}-start`,
        `transition-${transitionName}-end`
      );
    };
  }
  return () => {};
};

// HOC for adding page transition support to components
export const withPageTransition = <P extends object>(
  Component: React.ComponentType<P>,
  transitionStyle: 'pixel-fade' | 'slide' | 'scale-glow' = 'pixel-fade'
) => {
  return React.forwardRef<any, P>((props, ref) => (
    <PageTransition transitionStyle={transitionStyle}>
      <div className="page-content-fade-in">
        <Component {...props} ref={ref} />
      </div>
    </PageTransition>
  ));
};

export default PageTransition;