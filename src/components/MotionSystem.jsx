import { lazy, Suspense, useEffect, useRef, useState } from 'react';

const DotLottieReact = lazy(() => (
  import('@lottiefiles/dotlottie-react').then((module) => ({ default: module.DotLottieReact }))
));

export const MotionAsset = ({
  src,
  className = '',
  loop = true,
  autoplay = true,
  playOnView = false,
  speed = 1,
  ariaLabel,
}) => {
  const dotLottieRef = useRef(null);
  const rootRef = useRef(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(!playOnView);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReduceMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (!playOnView || !rootRef.current) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.38 }
    );
    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, [playOnView]);

  useEffect(() => {
    const player = dotLottieRef.current;
    if (!player) return;
    player.setSpeed?.(speed);
    if (reduceMotion || !isVisible || !autoplay) {
      player.pause?.();
      return;
    }
    player.play?.();
  }, [autoplay, isVisible, reduceMotion, speed]);

  return (
    <div ref={rootRef} className={`motion-asset ${className}`} aria-label={ariaLabel} aria-hidden={!ariaLabel}>
      <Suspense fallback={<span className="motion-asset-fallback" />}>
        <DotLottieReact
          src={src}
          loop={loop && !reduceMotion}
          autoplay={autoplay && !reduceMotion && isVisible}
          dotLottieRefCallback={(dotLottie) => {
            dotLottieRef.current = dotLottie;
          }}
        />
      </Suspense>
    </div>
  );
};
