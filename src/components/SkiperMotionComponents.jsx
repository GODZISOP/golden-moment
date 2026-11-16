import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { ArrowUpRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const PRELOADER_WORDS = [
  'STILLNESS',
  'BOTANICAL NECTAR',
  'PURE RADIANCE',
  'GOLDEN MOMENT'
];

const RITUAL_CARDS = [
  {
    num: '01',
    title: 'Cold-Whipped Shea Nectar',
    category: 'shea-butters',
    cta: 'Explore Shea Butters',
    description:
      'Unrefined Grade-A West African shea whipped at low temperature with plant nectars so it melts effortlessly onto damp skin.',
    notes: ['Grade-A African Shea', 'Botanical Nectar', '24h Velvet Glow']
  },
  {
    num: '02',
    title: '12-Hour Extrait Sillage',
    category: 'body-oils',
    cta: 'Explore Body Oils',
    description:
      'Alcohol-free perfume body oils suspended in weightless squalane to bond with skin warmth for an intimate, lasting aura.',
    notes: ['Alcohol-Free Extrait', 'Botanical Squalane', 'Intimate Sillage']
  },
  {
    num: '03',
    title: 'Mindful Evening Stillness',
    category: 'journals',
    cta: 'Explore Journals',
    description:
      'Linen-bound reflection journals crafted to pair with your nightly oil ritual, turning self-care into an intentional pause.',
    notes: ['Linen-Bound Pages', 'Slow Rituals', 'Guided Prompts']
  }
];

/**
 * Skiper UI #08 Words Preloader + #09 Stairs Curtain.
 * Plays once on initial page load and lifts 5 vertical espresso columns.
 */
export function WordsPreloader({ onComplete }) {
  const [done, setDone] = useState(() => prefersReducedMotion());
  const overlayRef = useRef(null);
  const wordRef = useRef(null);

  useEffect(() => {
    if (done) {
      onComplete?.();
      return undefined;
    }

    const ctx = gsap.context(() => {
      const wordEl = wordRef.current;
      const stairs = overlayRef.current?.querySelectorAll('.gm-preloader-stair');
      if (!wordEl || !stairs?.length) {
        setDone(true);
        onComplete?.();
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          setDone(true);
          onComplete?.();
        }
      });

      PRELOADER_WORDS.forEach((word, index) => {
        tl.call(() => {
          if (wordEl) wordEl.textContent = word;
        })
          .fromTo(
            wordEl,
            { opacity: 0, y: 14, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              force3D: true,
              duration: index === PRELOADER_WORDS.length - 1 ? 0.28 : 0.16,
              ease: 'power3.out'
            }
          )
          .to(wordEl, {
            opacity: index === PRELOADER_WORDS.length - 1 ? 0 : 0.25,
            y: -10,
            scale: 1.02,
            force3D: true,
            duration: 0.12,
            delay: index === PRELOADER_WORDS.length - 1 ? 0.12 : 0.04,
            ease: 'power2.in'
          });
      });

      tl.to(stairs, {
        yPercent: -100,
        duration: 0.62,
        stagger: 0.05,
        ease: 'power4.inOut'
      });
    }, overlayRef);

    return () => ctx.revert();
  }, [done, onComplete]);

  if (done) return null;

  return (
    <div ref={overlayRef} className="gm-preloader-overlay" aria-hidden="true">
      <div className="gm-preloader-stairs">
        {[0, 1, 2, 3, 4].map((col) => (
          <div key={col} className="gm-preloader-stair" />
        ))}
      </div>
      <div className="gm-preloader-word-wrap">
        <span ref={wordRef} className="gm-preloader-word">
          {PRELOADER_WORDS[0]}
        </span>
      </div>
    </div>
  );
}

/**
 * Skiper UI #89 Scroll Progress top indicator bar driven by ScrollTrigger.
 */
export function ScrollProgressBar() {
  const barRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        barRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.15
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return <div ref={barRef} className="gm-scroll-progress" aria-hidden="true" />;
}

/**
 * Progressive blur disabled in favor of pure 60fps compositor animations.
 */
export function ProgressiveBlurBar() {
  return null;
}

/**
 * Skiper UI #27 Rolling Text / #58 Text Roll Navigation link label.
 */
export function TextRoll({ text, className = '' }) {
  return (
    <span className={`gm-text-roll ${className}`}>
      <span className="gm-text-roll-inner gm-text-roll-top">{text}</span>
      <span className="gm-text-roll-inner gm-text-roll-bottom" aria-hidden="true">
        {text}
      </span>
    </span>
  );
}

/**
 * motionprompts.dev Magnetic cursor wrapper using gsap.quickTo().
 */
export function MagneticButton({ children, className = '', strength = 10 }) {
  const wrapRef = useRef(null);
  const quickXRef = useRef(null);
  const quickYRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || prefersReducedMotion()) return undefined;

    quickXRef.current = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' });
    quickYRef.current = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' });

    return () => {
      gsap.killTweensOf(el);
    };
  }, []);

  const handleMouseMove = (e) => {
    const el = wrapRef.current;
    if (!el || !quickXRef.current || !quickYRef.current || prefersReducedMotion()) return;
    const rect = el.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const relY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    const clampedX = Math.max(-strength, Math.min(strength, relX * strength));
    const clampedY = Math.max(-strength, Math.min(strength, relY * strength));
    quickXRef.current(clampedX);
    quickYRef.current(clampedY);
  };

  const handleMouseLeave = () => {
    const el = wrapRef.current;
    if (!el || prefersReducedMotion()) return;
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
      overwrite: 'auto'
    });
  };

  return (
    <span
      ref={wrapRef}
      className={`gm-magnetic-wrap ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </span>
  );
}

/**
 * motionprompts.dev Word-by-word masked 3D split text reveal.
 */
export function SplitTextReveal({ text, as: Tag = 'h2', className = '' }) {
  const rootRef = useRef(null);
  const words = String(text || '').trim().split(/\s+/).filter(Boolean);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      const targets = root.querySelectorAll('.gm-split-word');
      if (!targets.length) return;
      gsap.fromTo(
        targets,
        {
          yPercent: 115,
          rotateX: -28,
          opacity: 0
        },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.04,
          ease: 'power3.out',
          force3D: true,
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: root,
            start: 'top 90%',
            once: true
          }
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, [text]);

  return (
    <Tag ref={rootRef} className={className}>
      {words.map((word, idx) => (
        <React.Fragment key={`${word}-${idx}`}>
          <span className="gm-split-mask">
            <span className="gm-split-word">{word}</span>
          </span>
          {idx < words.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </Tag>
  );
}

/**
 * motionprompts.dev 3D Tilt + Skiper UI #90 Champagne Gold Spotlight Card.
 */
export function TiltSpotlightCard({
  as: Component = 'div',
  children,
  className = '',
  maxTilt = 6,
  ...rest
}) {
  const cardRef = useRef(null);
  const rotXRef = useRef(null);
  const rotYRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || prefersReducedMotion()) return undefined;

    gsap.set(el, { transformPerspective: 900, transformStyle: 'preserve-3d' });
    rotXRef.current = gsap.quickTo(el, 'rotationX', { duration: 0.35, ease: 'power3.out' });
    rotYRef.current = gsap.quickTo(el, 'rotationY', { duration: 0.35, ease: 'power3.out' });

    return () => {
      gsap.killTweensOf(el);
    };
  }, []);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el || prefersReducedMotion()) return;
    if (window.matchMedia('(hover: none)').matches) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty('--spot-x', `${x}px`);
    el.style.setProperty('--spot-y', `${y}px`);

    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;
    rotXRef.current?.(-normY * maxTilt);
    rotYRef.current?.(normX * maxTilt);
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el || prefersReducedMotion()) return;
    rotXRef.current?.(0);
    rotYRef.current?.(0);
  };

  return (
    <Component
      ref={cardRef}
      className={`gm-tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      <div className="gm-tilt-spotlight" aria-hidden="true" />
      {children}
    </Component>
  );
}

/**
 * Skiper UI #44 Vercel Scroll with Blur + motionprompts Sticky Scroll Reveal.
 */
export function VercelBlurScrollSection({ onExplore }) {
  const sectionRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll('.gm-ritual-blur-card');
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            y: 40,
            scale: 0.94,
            opacity: 0,
            rotateX: -6
          },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            rotateX: 0,
            duration: 0.75,
            delay: index * 0.08,
            ease: 'power3.out',
            force3D: true,
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              end: 'top 55%',
              toggleActions: 'play none none none',
              once: true
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="gm-ritual-blur-section" aria-label="The Ritual of Radiance">
      <div className="gm-ritual-blur-inner">
        <div className="gm-subpage-head">
          <span className="gm-kicker">SKIPER × MOTIONPROMPTS EXPERIENCE</span>
          <SplitTextReveal
            text="The Ritual of Radiance"
            as="h2"
            className="gm-subpage-title"
          />
          <p className="gm-subpage-lead">
            Depth-of-field botanical storytelling designed to move like silk — hover or select any ritual to explore its sensory craft.
          </p>
        </div>

        <div className="gm-ritual-cards-grid">
          {RITUAL_CARDS.map((item, idx) => {
            const isFocused = activeCard === idx;
            return (
              <TiltSpotlightCard
                key={item.num}
                className={`gm-ritual-blur-card ${isFocused ? 'is-focused' : ''}`}
                onMouseEnter={() => setActiveCard(idx)}
                onClick={() => setActiveCard(idx)}
              >
                <div className="gm-ritual-card-top">
                  <span className="gm-ritual-num">{item.num}</span>
                  <Sparkles size={16} color="#9b7a2c" />
                </div>

                <h3 className="gm-ritual-title">{item.title}</h3>
                <p className="gm-ritual-desc">{item.description}</p>

                <div className="gm-ritual-notes">
                  {item.notes.map((note) => (
                    <span key={note} className="gm-ritual-note-pill">
                      {note}
                    </span>
                  ))}
                </div>

                <MagneticButton strength={6}>
                  <button
                    type="button"
                    className="gm-ritual-cta"
                    onClick={(e) => {
                      e.stopPropagation();
                      onExplore?.(item.category);
                    }}
                  >
                    <span>{item.cta}</span>
                    <ArrowUpRight size={14} />
                  </button>
                </MagneticButton>
              </TiltSpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * Orchestrates Lenis smooth scrolling + GSAP ScrollTrigger choreographies across tabs.
 */
export function useGoldenMomentMotion(activeTab, containerRef, activeProductId = null) {
  const lenisRef = useRef(null);

  // 1. Lenis smooth scroll synced to GSAP ticker
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true
    });
    lenisRef.current = lenis;

    const onLenisScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onLenisScroll);

    const tick = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.off('scroll', onLenisScroll);
      lenis.destroy();
      if (lenisRef.current === lenis) {
        lenisRef.current = null;
      }
    };
  }, []);

  // 1b. Immediately reset scroll to top on view or product change
  useLayoutEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.resize();
      lenisRef.current.scrollTo(0, { immediate: true, force: true });
    }
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [activeTab, activeProductId]);

  // 2. GSAP + ScrollTrigger animations per active view
  useEffect(() => {
    const container = containerRef?.current;
    if (!container || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      // Hero Parallax & Entrance
      const heroSection = container.querySelector('.gm-hero-section');
      if (heroSection) {
        const heroImg = heroSection.querySelector('.gm-hero-img');
        const heroItems = heroSection.querySelectorAll(
          '.gm-hero-title, .gm-hero-subtitle, .gm-hero-cta-row'
        );

        if (heroImg) {
          gsap.fromTo(
            heroImg,
            { scale: 1.14 },
            { scale: 1, duration: 1.4, ease: 'power3.out' }
          );
          gsap.to(heroImg, {
            yPercent: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: heroSection,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.6
            }
          });
        }

        if (heroItems.length) {
          gsap.fromTo(
            heroItems,
            { y: 28, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              stagger: 0.12,
              ease: 'power3.out',
              force3D: true,
              clearProps: 'transform,opacity'
            }
          );
        }
      }

      // Brand Story Parallax & Floating Bottle
      const brandSection = container.querySelector('.gm-brand-intro-section');
      if (brandSection) {
        const watermark = brandSection.querySelector('.gm-brand-watermark');
        const bottle = brandSection.querySelector('.gm-brand-bottle-img');
        const copyCol = brandSection.querySelector('.gm-brand-copy-col');

        if (watermark) {
          gsap.to(watermark, {
            xPercent: -14,
            ease: 'none',
            scrollTrigger: {
              trigger: brandSection,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8
            }
          });
        }

        if (bottle) {
          gsap.fromTo(
            bottle,
            { y: 36, opacity: 0, scale: 0.94 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: brandSection,
                start: 'top 82%',
                once: true
              },
              onComplete: () => {
                gsap.to(bottle, {
                  y: -10,
                  duration: 2.8,
                  repeat: -1,
                  yoyo: true,
                  ease: 'sine.inOut'
                });
              }
            }
          );
        }

        if (copyCol) {
          gsap.fromTo(
            copyCol,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              ease: 'power3.out',
              clearProps: 'transform,opacity',
              scrollTrigger: {
                trigger: brandSection,
                start: 'top 82%',
                once: true
              }
            }
          );
        }
      }

      // Category Trio Clip-Path Reveal (Skiper UI #35/#52)
      const catCards = container.querySelectorAll('.gm-cat-card');
      if (catCards.length) {
        gsap.fromTo(
          catCards,
          { clipPath: 'inset(12% 6% 12% 6%)', opacity: 0.5 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power3.out',
            clearProps: 'clipPath,opacity',
            scrollTrigger: {
              trigger: '.gm-category-trio',
              start: 'top 85%',
              once: true
            }
          }
        );
      }

      // Product Grid Staggered Reveal (60fps compositor)
      if (container.querySelector('.gm-prod-card')) {
        ScrollTrigger.batch('.gm-prod-card', {
          start: 'top 92%',
          once: true,
          onEnter: (batch) =>
            gsap.fromTo(
              batch,
              { y: 40, opacity: 0, scale: 0.96 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                stagger: 0.07,
                duration: 0.75,
                ease: 'power3.out',
                force3D: true,
                overwrite: 'auto',
                clearProps: 'transform,opacity'
              }
            )
        });
      }

      // About Pillar Cards Stagger
      if (container.querySelector('.gm-pillar-card')) {
        ScrollTrigger.batch('.gm-pillar-card', {
          start: 'top 90%',
          once: true,
          onEnter: (batch) =>
            gsap.fromTo(
              batch,
              { y: 34, opacity: 0, scale: 0.97 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                stagger: 0.1,
                duration: 0.75,
                ease: 'power3.out',
                force3D: true,
                overwrite: 'auto',
                clearProps: 'transform,opacity'
              }
            )
        });
      }

      // FAQ Items Stagger
      if (container.querySelector('.gm-faq-item')) {
        ScrollTrigger.batch('.gm-faq-item', {
          start: 'top 92%',
          once: true,
          onEnter: (batch) =>
            gsap.fromTo(
              batch,
              { y: 24, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                stagger: 0.06,
                duration: 0.65,
                ease: 'power3.out',
                force3D: true,
                overwrite: 'auto',
                clearProps: 'transform,opacity'
              }
            )
        });
      }

      // Product Detail Entrance
      const detailMedia = container.querySelector('.gm-detail-media');
      const detailInfo = container.querySelector('.gm-detail-info');
      if (detailMedia || detailInfo) {
        const detailTargets = [detailMedia, detailInfo].filter(Boolean);
        gsap.fromTo(
          detailTargets,
          { y: 26, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.7,
            ease: 'power3.out',
            force3D: true,
            clearProps: 'transform,opacity'
          }
        );
      }

      // Contact Cards Reveal
      const contactDark = container.querySelector('.gm-contact-card-dark');
      const contactForm = container.querySelector('.gm-contact-form-card');
      if (contactDark || contactForm) {
        const contactTargets = [contactDark, contactForm].filter(Boolean);
        gsap.fromTo(
          contactTargets,
          { y: 34, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.12,
            duration: 0.75,
            ease: 'power3.out',
            force3D: true,
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: '.gm-contact-grid',
              start: 'top 88%',
              once: true
            }
          }
        );
      }
    }, containerRef);

    const rafId = requestAnimationFrame(() => {
      if (lenisRef.current) {
        lenisRef.current.resize();
        lenisRef.current.scrollTo(0, { immediate: true, force: true });
      }
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, [activeTab, activeProductId, containerRef]);
}
