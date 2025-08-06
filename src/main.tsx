import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import App from './App.tsx';
import TracksPage from './pages/TracksPage.tsx';
import ToolsPage from './pages/ToolsPage.tsx';
import MediaKit from './pages/MediaKit.tsx';
import RulesPage from './pages/RulesPage.tsx';
import MentorsPage from './pages/MentorsPage.tsx';
import { pageAnimationController } from './utils/pageAnimations';
import './index.css';

// Enhanced routing component with smooth transitions
const AnimatedRoutes = () => {
  const location = useLocation();

  // Optimize animations based on device capabilities
  React.useEffect(() => {
    pageAnimationController.optimizeForDevice();
  }, []);

  // Scroll to top on route change
  React.useEffect(() => {
    // Scroll to top immediately on route change
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  // Determine transition style based on route
  const getTransitionVariants = () => {
    const currentPath = location.pathname;
    
    // Route-specific transition logic matching our design system
    if (currentPath === '/tools') {
      return scaleGlowVariants; // Special transition for tools page
    } else if (currentPath === '/tracks' || currentPath === '/media-kit' || currentPath === '/mentors') {
      return slideVariants; // Smooth slide for content pages
    }
    
    return pixelFadeVariants; // Brand-aligned default transition
  };

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' ? 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  const variants = prefersReducedMotion ? reducedMotionVariants : getTransitionVariants();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={variants}
        transition={{
          type: "tween",
          ease: [0.4, 0, 0.2, 1], // Material Design easing
          duration: prefersReducedMotion ? 0.1 : 0.4
        }}
        className="page-transition-container"
        style={{
          // Hardware acceleration for smooth 60fps animations
          willChange: 'transform, opacity',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        <Routes location={location}>
          <Route path="/" element={<App />} />
          <Route path="/tracks" element={<TracksPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/media-kit" element={<MediaKit />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/mentors" element={<MentorsPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

// Transition variants matching our brand design system

// Pixel Fade - Brand-aligned default transition
const pixelFadeVariants = {
  initial: {
    opacity: 0,
    scale: 0.98,
    filter: "brightness(0.8)"
  },
  in: {
    opacity: 1,
    scale: 1,
    filter: "brightness(1)"
  },
  out: {
    opacity: 0,
    scale: 0.98,
    filter: "brightness(0.8)"
  }
};

// Slide - For navigation between content pages
const slideVariants = {
  initial: {
    x: "100%",
    opacity: 0
  },
  in: {
    x: "0%",
    opacity: 1
  },
  out: {
    x: "-100%",
    opacity: 0
  }
};

// Scale Glow - Special transition for tools page
const scaleGlowVariants = {
  initial: {
    scale: 0.95,
    opacity: 0,
    boxShadow: "0 0 0 rgba(3, 80, 243, 0)"
  },
  in: {
    scale: 1,
    opacity: 1,
    boxShadow: "0 20px 40px rgba(3, 80, 243, 0.1)"
  },
  out: {
    scale: 0.95,
    opacity: 0,
    boxShadow: "0 0 0 rgba(3, 80, 243, 0)"
  }
};

// Reduced motion fallback - Accessibility compliance
const reducedMotionVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 }
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <AnimatedRoutes />
    </Router>
  </StrictMode>
);
