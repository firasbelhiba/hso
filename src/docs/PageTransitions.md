# Page Transition Animation System

## Overview
A comprehensive, production-ready page transition system designed for the Hedera Africa Hackathon website. The system maintains brand consistency, ensures 60fps performance, and includes full accessibility support.

## Features

### 🎨 Design System Integration
- **Brand Colors**: Uses official Hedera blue (#0350F3) and website background (#EFE8F7)
- **Typography**: Maintains existing font hierarchy (Archivo, PixelOperator8)
- **Visual Consistency**: Transitions complement existing animations and visual elements
- **Pixel-Perfect**: Aligned with the website's pixel art aesthetic

### 🚀 Performance Optimizations
- **Hardware Acceleration**: GPU-accelerated transforms for smooth 60fps animations
- **Device Detection**: Automatically adjusts animation complexity based on device capabilities
- **Reduced Motion Support**: Full compliance with accessibility preferences
- **Performance Monitoring**: Built-in animation performance tracking

### 🎯 Three Transition Styles

#### 1. Pixel Fade (Default)
- **Use Case**: Home page and general navigation
- **Duration**: 400ms
- **Effect**: Subtle scale and brightness animation matching pixel aesthetic
- **Brand Alignment**: Perfect for the hackathon's gaming/pixel theme

#### 2. Slide Transition
- **Use Case**: Content pages (Tracks, Media Kit)
- **Duration**: 350ms
- **Effect**: Smooth horizontal slide with opacity
- **UX Benefit**: Clear directional navigation feedback

#### 3. Scale Glow
- **Use Case**: Tools page and special sections
- **Duration**: 450ms
- **Effect**: Scale animation with Hedera blue glow
- **Brand Enhancement**: Highlights technical/developer content

## Implementation Guide

### Basic Setup
The transition system is automatically active once installed. No additional configuration needed for basic functionality.

### Custom Transition Usage

```tsx
import { PageTransition, usePageTransition } from './components/PageTransition';

// Wrap your page component
export const MyPage = () => (
  <PageTransition transitionStyle="pixel-fade">
    <div className="page-content-fade-in">
      {/* Your page content */}
    </div>
  </PageTransition>
);

// Use transition hook for custom logic
export const CustomComponent = () => {
  const { isTransitioning } = usePageTransition('scale-glow');
  
  return (
    <div className={isTransitioning ? 'transitioning' : ''}>
      {/* Component content */}
    </div>
  );
};
```

### Enhanced Links with Preloading

```tsx
import { TransitionLink } from './components/PageTransition';

// Automatic route preloading on hover
<TransitionLink 
  to="/tracks" 
  transitionStyle="slide"
  preload={true}
  className="nav-link"
>
  Tracks
</TransitionLink>
```

### Animation Controller Usage

```tsx
import { pageAnimationController, animationUtils } from './utils/pageAnimations';

// Set transition style programmatically
pageAnimationController.setTransitionStyle('scale-glow');

// Preload routes for better performance
pageAnimationController.preloadRoute('/tools');

// Add scroll-triggered animations
const observer = animationUtils.observeScrollAnimations();
document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});
```

## CSS Classes Reference

### Core Transition Classes
```css
.page-transition-container     /* Main wrapper for transitions */
.page-entering                /* Page entering state */
.page-exiting                 /* Page exiting state */
.page-content-fade-in         /* Content fade-in animation */
```

### Transition Style Classes
```css
.transition-pixel-fade-enter  /* Pixel fade entrance */
.transition-pixel-fade-exit   /* Pixel fade exit */
.transition-slide-enter       /* Slide entrance */
.transition-slide-exit        /* Slide exit */
.transition-scale-glow-enter  /* Scale glow entrance */
.transition-scale-glow-exit   /* Scale glow exit */
```

### Loading States
```css
.page-loading-overlay         /* Full-screen loading overlay */
.loading-spinner             /* Hedera-branded spinner */
.loading-pixels              /* Pixel-style loading dots */
.loading-pixel               /* Individual loading pixel */
```

## Accessibility Features

### Reduced Motion Support
- Automatically detects `prefers-reduced-motion: reduce`
- Provides instant transitions for accessibility compliance
- Maintains visual feedback without motion

### ARIA Compliance
```tsx
// Announce page changes to screen readers
<div role="main" aria-live="polite">
  {/* Page content */}
</div>
```

### Keyboard Navigation
- All transition triggers work with keyboard navigation
- Focus management during transitions
- No motion-induced vestibular issues

## Performance Monitoring

### Built-in Analytics
```typescript
// Performance tracking is automatically enabled
// Check browser dev tools for transition metrics
performance.getEntriesByType('measure')
  .filter(entry => entry.name.includes('transition'));
```

### Performance Tips
1. **Hardware Acceleration**: All animations use `transform` and `opacity`
2. **Layer Creation**: `will-change` property creates efficient render layers
3. **Frame Rate**: Animations target 60fps with fallbacks for slower devices
4. **Memory Management**: Automatic cleanup prevents memory leaks

## Browser Support

### Modern Browsers (Full Features)
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Fallback Support
- Graceful degradation for older browsers
- CSS-only fallbacks when JavaScript is disabled
- Reduced motion alternatives

## Customization Options

### Timing Adjustments
```css
/* Custom duration for specific routes */
.route-tools .page-transition-container {
  animation-duration: 600ms;
}
```

### Brand Color Overrides
```css
/* Customize glow colors */
.transition-scale-glow-enter {
  box-shadow: 0 20px 40px rgba(149, 224, 0, 0.1); /* Green accent */
}
```

### Route-Specific Styles
```typescript
// Custom transition logic in pageAnimations.ts
getOptimalTransitionStyle(fromPath: string, toPath: string): TransitionStyle {
  // Add your custom logic here
  if (fromPath.includes('admin')) return 'pixel-fade';
  return 'slide';
}
```

## Testing Guidelines

### Performance Testing
```javascript
// Monitor transition performance
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    if (entry.duration > 16) { // 60fps threshold
      console.warn(`Slow transition: ${entry.duration}ms`);
    }
  });
});
observer.observe({ entryTypes: ['measure'] });
```

### Accessibility Testing
1. Test with `prefers-reduced-motion: reduce`
2. Verify keyboard navigation works during transitions
3. Check screen reader announcements
4. Test on various devices and connection speeds

### Visual Testing
1. Verify transitions match brand guidelines
2. Check for visual glitches during animations
3. Test on different screen sizes
4. Validate color contrast ratios

## Troubleshooting

### Common Issues

#### Transitions Not Working
- Check if Framer Motion is properly installed
- Verify React Router setup
- Ensure CSS is loaded correctly

#### Performance Issues
- Check device capabilities detection
- Verify hardware acceleration is enabled
- Review animation complexity

#### Accessibility Concerns
- Test reduced motion preferences
- Verify ARIA labels are present
- Check keyboard navigation flow

### Debug Mode
```typescript
// Enable detailed logging
pageAnimationController.debug = true;
```

## Future Enhancements

### Planned Features
1. **Route-based preloading**: Intelligent prefetching
2. **Gesture support**: Touch/swipe transitions
3. **Advanced analytics**: Detailed performance metrics
4. **Custom easing**: Brand-specific timing functions

### Community Contributions
- Follow the existing code style
- Include performance tests
- Update documentation
- Maintain accessibility standards

## License
This transition system is part of the Hedera Africa Hackathon website and follows the project's licensing terms.