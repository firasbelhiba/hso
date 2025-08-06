/**
 * Page Animation Controller
 * 
 * Centralized animation management system that:
 * - Coordinates smooth page transitions
 * - Maintains brand consistency
 * - Optimizes performance
 * - Respects accessibility preferences
 */

export type TransitionStyle = 'pixel-fade' | 'slide' | 'scale-glow';

interface AnimationConfig {
  duration: number;
  easing: string;
  prefersReducedMotion: boolean;
}

class PageAnimationController {
  private config: AnimationConfig;
  private currentTransition: TransitionStyle = 'pixel-fade';
  private isTransitioning = false;
  private performanceObserver?: PerformanceObserver;

  constructor() {
    this.config = {
      duration: 400,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      prefersReducedMotion: this.detectReducedMotion()
    };

    this.initializePerformanceMonitoring();
    this.setupMediaQueryListener();
  }

  /**
   * Detect user's motion preferences
   */
  private detectReducedMotion(): boolean {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Listen for changes in motion preferences
   */
  private setupMediaQueryListener(): void {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', (e) => {
      this.config.prefersReducedMotion = e.matches;
    });
  }

  /**
   * Initialize performance monitoring for transitions
   */
  private initializePerformanceMonitoring(): void {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

    this.performanceObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.name.includes('transition')) {
          // Log performance metrics (can be sent to analytics)
          console.log(`Transition ${entry.name}: ${entry.duration.toFixed(2)}ms`);
          
          // Warn if transition is slower than 16ms (60fps threshold)
          if (entry.duration > 16) {
            console.warn(`Slow transition detected: ${entry.name} took ${entry.duration.toFixed(2)}ms`);
          }
        }
      });
    });

    this.performanceObserver.observe({ entryTypes: ['measure'] });
  }

  /**
   * Set the current transition style
   */
  setTransitionStyle(style: TransitionStyle): void {
    this.currentTransition = style;
    
    // Update duration based on transition style
    switch (style) {
      case 'pixel-fade':
        this.config.duration = 400;
        break;
      case 'slide':
        this.config.duration = 350;
        break;
      case 'scale-glow':
        this.config.duration = 450;
        break;
    }
  }

  /**
   * Execute page transition with performance monitoring
   */
  async executeTransition(
    fromElement: HTMLElement,
    toElement: HTMLElement,
    direction: 'forward' | 'backward' = 'forward'
  ): Promise<void> {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    const transitionId = `${this.currentTransition}-${Date.now()}`;
    
    // Start performance measurement
    performance.mark(`transition-${transitionId}-start`);

    try {
      if (this.config.prefersReducedMotion) {
        // Instant transition for reduced motion preference
        this.handleReducedMotionTransition(fromElement, toElement);
      } else {
        // Full animation
        await this.handleFullTransition(fromElement, toElement, direction, transitionId);
      }
    } finally {
      // End performance measurement
      performance.mark(`transition-${transitionId}-end`);
      performance.measure(
        `transition-${transitionId}`,
        `transition-${transitionId}-start`,
        `transition-${transitionId}-end`
      );
      
      this.isTransitioning = false;
    }
  }

  /**
   * Handle transition for users with reduced motion preference
   */
  private handleReducedMotionTransition(
    fromElement: HTMLElement,
    toElement: HTMLElement
  ): void {
    fromElement.style.display = 'none';
    toElement.style.display = 'block';
    toElement.style.opacity = '1';
  }

  /**
   * Handle full animation transition
   */
  private async handleFullTransition(
    fromElement: HTMLElement,
    toElement: HTMLElement,
    direction: 'forward' | 'backward',
    transitionId: string
  ): Promise<void> {
    return new Promise((resolve) => {
      // Prepare elements
      this.prepareTransitionElements(fromElement, toElement);

      // Apply exit animation to current page
      const exitClass = `transition-${this.currentTransition}-exit`;
      fromElement.classList.add(exitClass);

      // Apply enter animation to new page after brief delay
      setTimeout(() => {
        const enterClass = `transition-${this.currentTransition}-enter`;
        toElement.classList.add(enterClass);
        toElement.style.display = 'block';

        // Clean up after animation completes
        setTimeout(() => {
          this.cleanupTransition(fromElement, toElement, exitClass, enterClass);
          resolve();
        }, this.config.duration);
      }, 50);
    });
  }

  /**
   * Prepare elements for transition
   */
  private prepareTransitionElements(
    fromElement: HTMLElement,
    toElement: HTMLElement
  ): void {
    // Ensure smooth hardware-accelerated animations
    fromElement.style.willChange = 'transform, opacity';
    toElement.style.willChange = 'transform, opacity';
    fromElement.style.transform = 'translateZ(0)';
    toElement.style.transform = 'translateZ(0)';
    
    // Set initial state for new page
    toElement.style.display = 'none';
    toElement.style.opacity = '0';
  }

  /**
   * Clean up after transition completes
   */
  private cleanupTransition(
    fromElement: HTMLElement,
    toElement: HTMLElement,
    exitClass: string,
    enterClass: string
  ): void {
    // Remove animation classes
    fromElement.classList.remove(exitClass);
    toElement.classList.remove(enterClass);
    
    // Reset styles
    fromElement.style.display = 'none';
    fromElement.style.willChange = 'auto';
    toElement.style.willChange = 'auto';
    toElement.style.opacity = '1';
    
    // Trigger content fade-in for better perceived performance
    toElement.classList.add('page-content-fade-in');
    setTimeout(() => {
      toElement.classList.remove('page-content-fade-in');
    }, 600);
  }

  /**
   * Preload route for better performance
   */
  preloadRoute(path: string): void {
    if (typeof window === 'undefined') return;
    
    // Create prefetch link
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = path;
    
    // Avoid duplicate preloads
    const existing = document.querySelector(`link[href="${path}"]`);
    if (!existing) {
      document.head.appendChild(link);
    }
  }

  /**
   * Get optimal transition style based on route change
   */
  getOptimalTransitionStyle(fromPath: string, toPath: string): TransitionStyle {
    // Logic to determine best transition based on route relationship
    if (fromPath === '/' && toPath !== '/') {
      return 'slide'; // Forward navigation from home
    } else if (fromPath !== '/' && toPath === '/') {
      return 'slide'; // Backward navigation to home
    } else if (fromPath.includes('tools') || toPath.includes('tools')) {
      return 'scale-glow'; // Special transition for tools page
    }
    
    return 'pixel-fade'; // Default brand-aligned transition
  }

  /**
   * Optimize animations based on device capabilities
   */
  optimizeForDevice(): void {
    if (typeof window === 'undefined') return;
    
    // Detect device capabilities
    const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
    const isSlowConnection = 'connection' in navigator && 
      (navigator as any).connection?.effectiveType === 'slow-2g';
    
    if (isLowEndDevice || isSlowConnection) {
      // Use faster, simpler transitions
      this.config.duration = Math.min(this.config.duration, 250);
      this.setTransitionStyle('pixel-fade');
    }
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    if (this.performanceObserver) {
      this.performanceObserver.disconnect();
    }
  }
}

// Export singleton instance
export const pageAnimationController = new PageAnimationController();

// Utility functions for common animation tasks
export const animationUtils = {
  /**
   * Add smooth scroll behavior to element
   */
  smoothScrollTo(element: HTMLElement, offset = 0): void {
    const targetPosition = element.offsetTop - offset;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  },

  /**
   * Animate navbar based on scroll position
   */
  animateNavbar(scrollY: number, threshold = 100): string {
    return scrollY > threshold 
      ? 'fixed bg-black/90 backdrop-blur-md shadow-lg navbar-transitioning'
      : 'absolute bg-transparent navbar-transitioning';
  },

  /**
   * Create staggered animation for lists
   */
  staggerAnimation(elements: NodeListOf<HTMLElement>, delay = 100): void {
    elements.forEach((element, index) => {
      element.style.animationDelay = `${index * delay}ms`;
      element.classList.add('page-content-fade-in');
    });
  },

  /**
   * Intersection Observer for scroll-triggered animations
   */
  observeScrollAnimations(): IntersectionObserver {
    return new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('page-content-fade-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );
  }
};

export default pageAnimationController;