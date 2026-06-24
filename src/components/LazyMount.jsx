import React, { useState, useEffect, useRef } from 'react';

const LazyMount = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // If not mobile, or if IntersectionObserver is not supported, just mount immediately
    if (typeof IntersectionObserver === 'undefined') {
      setIsMounted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsMounted(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '300px', // Mount when within 300px of viewport
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="mobile-optimized-section">
      {isMounted ? children : null}
    </div>
  );
};

export default LazyMount;
