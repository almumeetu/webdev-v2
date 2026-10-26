'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Cloud,
  Code2,
  Globe2,
  LayoutPanelTop,
  MapPin,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Zap,
} from 'lucide-react';
import { SiAndroid, SiApple, SiFlutter, SiKotlin, SiNextdotjs, SiReact } from 'react-icons/si';
import type { IconType } from 'react-icons';
import type { HeroSlide } from '../types';
import { initialHeroSlides } from '../data/initialData';
import { useLanguage } from '../context/LanguageContext';
import { SignatureShapeDivider } from './SignatureShapeDivider';
import styles from './Hero.module.css';

interface HeroProps {
  slides?: HeroSlide[];
  onExploreClick?: () => void;
  onExploreServices?: () => void;
  onContactClick?: () => void;
  onOpenQuote?: () => void;
  onNavigateProjects?: () => void;
}

const AUTOPLAY_INTERVAL = 6500;

const ENGINEERING_TECH = [
  { label: 'Flutter', Icon: SiFlutter, color: 'flutter' },
  { label: 'React Native', Icon: SiReact, color: 'react' },
  { label: 'Kotlin', Icon: SiKotlin, color: 'kotlin' },
];

function PlatformTile({
  label,
  Icon,
  detail,
}: {
  label: string;
  Icon: IconType | typeof LayoutPanelTop;
  detail: string;
}) {
  return (
    <div className={styles.platformTile}>
      <span className={styles.platformIcon}>
        <Icon aria-hidden="true" />
      </span>
      <span className={styles.platformName}>{label}</span>
      <span className={styles.platformDetail}>{detail}</span>
    </div>
  );
}

function EngineeringVisual({ isDe, slideIndex = 1 }: { isDe: boolean; slideIndex?: number }) {
  return (
    <div className={styles.architectureStage}>
      <div className={styles.stageCaption}>
        <span>{isDe ? 'Systemarchitektur' : 'System architecture'}</span>
        <span className={styles.stageCaptionMeta}>0{slideIndex + 1} / PLATFORM</span>
      </div>

      <div className={styles.cloudNode}>
        <span className={styles.cloudIcon}><Cloud aria-hidden="true" /></span>
        <span className={styles.cloudNodeCopy}>
          <strong>{isDe ? 'Cloud-Plattform' : 'Cloud platform'}</strong>
          <small>API · DATA · CI/CD</small>
        </span>
        <span className={styles.coreTag}>{isDe ? 'KERN' : 'CORE'}</span>
      </div>

      <div className={styles.connectorTree} aria-hidden="true">
        <span className={styles.connectorStem} />
        <span className={styles.connectorRail} />
      </div>

      <div className={styles.platformGrid}>
        <PlatformTile label="Web" Icon={LayoutPanelTop} detail={isDe ? 'Plattform' : 'Platform'} />
        <PlatformTile label="Android" Icon={SiAndroid} detail={isDe ? 'Native App' : 'Native app'} />
        <PlatformTile label="iOS" Icon={SiApple} detail={isDe ? 'Native App' : 'Native app'} />
      </div>

      <div className={styles.architectureFootnote}>
        <span className={styles.liveDot} />
        <span>{isDe ? 'Eine Architektur. Jede Oberfläche.' : 'One architecture. Every screen.'}</span>
        <span className={styles.architectureLatency}>{isDe ? 'SKALIERBAR' : 'READY TO SCALE'}</span>
      </div>
    </div>
  );
}

function WebExperienceVisual({ isDe, slideIndex = 2 }: { isDe: boolean; slideIndex?: number }) {
  return (
    <div className={styles.browserStage}>
      <div className={styles.stageCaption}>
        <span>{isDe ? 'Web-App Vorschau' : 'Web app preview'}</span>
        <span className={styles.stageCaptionMeta}>0{slideIndex + 1} / WEB</span>
      </div>

      <div className={styles.browserWindow}>
        <div className={styles.browserToolbar}>
          <span className={styles.browserDots}><i /><i /><i /></span>
          <span className={styles.addressBar}><ShieldCheck aria-hidden="true" /> studio.webdev.dev</span>
          <ArrowUpRight className={styles.browserExternal} aria-hidden="true" />
        </div>

        <div className={styles.webPagePreview}>
          <div className={styles.webNav}>
            <span className={styles.webWordmark}><span />northstar</span>
            <span className={styles.webNavLinks}><i /><i /><i /></span>
            <span className={styles.webNavButton} />
          </div>

          <div className={styles.webHeroPreview}>
            <div className={styles.webHeroCopy}>
              <span className={styles.webKicker}>{isDe ? 'DIGITALE PRODUKTE' : 'DIGITAL PRODUCTS'}</span>
              <strong>{isDe ? 'Ein besseres Erlebnis beginnt hier.' : 'A better experience starts here.'}</strong>
              <span className={styles.webHeroButton}>{isDe ? 'Entdecken' : 'Discover'} <ArrowRight aria-hidden="true" /></span>
            </div>
            <div className={styles.webArtwork}>
              <span className={styles.webArtworkOrb} />
              <span className={styles.webArtworkCard}><Sparkles aria-hidden="true" /></span>
            </div>
          </div>

          <div className={styles.webFeatureRow}>
            <span><i /> {isDe ? 'Schnell' : 'Fast'}</span>
            <span><i /> {isDe ? 'Sicher' : 'Secure'}</span>
            <span><i /> {isDe ? 'Responsiv' : 'Responsive'}</span>
          </div>
        </div>
      </div>

      <div className={styles.browserMetrics}>
        <span><Zap aria-hidden="true" /><strong>{isDe ? 'Performance' : 'Performance'}</strong></span>
        <span><ShieldCheck aria-hidden="true" /><strong>{isDe ? 'Sicherheit' : 'Security'}</strong></span>
        <span><Smartphone aria-hidden="true" /><strong>{isDe ? 'Responsive' : 'Responsive'}</strong></span>
      </div>
    </div>
  );
}

function PhoneMockup({
  variant,
  isDe,
}: {
  variant: 'backLeft' | 'front' | 'backRight';
  isDe: boolean;
}) {
  return (
    <div className={`${styles.phone} ${styles[variant]}`}>
      <div className={styles.phoneScreen}>
        <span className={styles.phoneNotch} />
        <div className={styles.phoneStatus}><span>9:41</span><span>•••</span></div>
        {variant === 'backLeft' ? (
          <div className={styles.phoneAltScreen}>
            <span className={styles.phoneAppIcon}><Globe2 aria-hidden="true" /></span>
            <strong>Explore</strong>
            <span className={styles.phoneSkeleton} />
            <span className={styles.phoneSkeletonShort} />
            <span className={styles.phoneImageTile}><Sparkles aria-hidden="true" /></span>
            <span className={styles.phoneSkeleton} />
          </div>
        ) : variant === 'backRight' ? (
          <div className={styles.phoneAltScreen}>
            <span className={styles.phoneAppIcon}><Code2 aria-hidden="true" /></span>
            <strong>{isDe ? 'Projekte' : 'Projects'}</strong>
            <span className={styles.phoneProjectCard}><i /><b /><small /></span>
            <span className={styles.phoneProjectCard}><i /><b /><small /></span>
            <span className={styles.phoneSkeletonShort} />
          </div>
        ) : (
          <div className={styles.phoneMainScreen}>
            <div className={styles.phoneGreeting}>
              <span>{isDe ? 'GUTEN MORGEN' : 'GOOD MORNING'}</span>
              <strong>{isDe ? 'Dein nächstes Kapitel.' : 'Your next chapter.'}</strong>
            </div>
            <div className={styles.phoneProgressCard}>
              <span className={styles.phoneProgressTop}><span>{isDe ? 'Projektfortschritt' : 'Project progress'}</span><i>•••</i></span>
              <div className={styles.phoneProgressRing}><b>72<span>%</span></b></div>
              <span className={styles.phoneProgressLabel}>{isDe ? 'Auf Kurs' : 'On track'}</span>
            </div>
            <div className={styles.phoneAppRows}>
              <span><i /><b /><small /></span>
              <span><i /><b /><small /></span>
            </div>
            <div className={styles.phoneTabBar}><i /><i /><i /><i /></div>
          </div>
        )}
      </div>
    </div>
  );
}

function MobileExperienceVisual({ isDe, slideIndex = 0 }: { isDe: boolean; slideIndex?: number }) {
  return (
    <div className={styles.mobileStage}>
      <div className={styles.stageCaption}>
        <span>{isDe ? 'Mobile-Erlebnis' : 'Mobile experience'}</span>
        <span className={styles.stageCaptionMeta}>0{slideIndex + 1} / MOBILE</span>
      </div>

      <div className={styles.deviceShowcase}>
        <PhoneMockup variant="backLeft" isDe={isDe} />
        <PhoneMockup variant="backRight" isDe={isDe} />
        <PhoneMockup variant="front" isDe={isDe} />
        <span className={`${styles.platformPill} ${styles.androidPill}`}><SiAndroid aria-hidden="true" /> Android</span>
        <span className={`${styles.platformPill} ${styles.applePill}`}><SiApple aria-hidden="true" /> iOS</span>
      </div>

      <div className={styles.mobileBuildNote}>
        <span className={styles.mobileBuildIcon}><Code2 aria-hidden="true" /></span>
        <span><strong>{isDe ? 'Ein Produkt. Zwei Plattformen.' : 'One product. Two platforms.'}</strong><small>Flutter · React Native · Kotlin</small></span>
        <span className={styles.mobileBuildCheck}><Check aria-hidden="true" /></span>
      </div>
    </div>
  );
}

function getSlideVisualType(slide: HeroSlide, index: number): 'mobile' | 'web' | 'engineering' {
  const title = (slide.title || '').toLowerCase();
  const tag = (slide.tag || '').toLowerCase();
  const badge = (slide.badge || '').toLowerCase();
  if (title.includes('native mobile') || title.includes('mobile-apps') || title.includes('mobile apps') || tag.includes('mobile') || badge.includes('mobile')) {
    return 'mobile';
  }
  if (title.includes('modern web') || title.includes('web-apps') || title.includes('web apps') || tag.includes('web development') || badge.includes('web engineering')) {
    return 'web';
  }
  if (title.includes('web & mobile') || title.includes('engineering') || tag.includes('software engineering') || badge.includes('digital experiences')) {
    return 'engineering';
  }
  return index === 0 ? 'mobile' : index === 1 ? 'engineering' : 'web';
}

function EngineeringShowcase({ slide, index, isDe }: { slide: HeroSlide; index: number; isDe: boolean }) {
  const visualType = getSlideVisualType(slide, index);
  const themeClass = visualType === 'mobile'
    ? styles.themeMobile
    : visualType === 'web'
    ? styles.themeWeb
    : styles.themeEngineering;

  const localBackground = slide.backgroundImage?.startsWith('/') && !slide.backgroundImage.startsWith('//')
    ? slide.backgroundImage
    : undefined;

  const imageDescription = isDe
    ? visualType === 'mobile'
      ? 'Drei Smartphone-Vorschauen für eine plattformübergreifende App auf Android und iOS.'
      : visualType === 'web'
      ? 'Vorschau einer responsiven Webanwendung mit Leistungs-, Sicherheits- und Mobilansicht.'
      : 'Vernetzte Cloud-, Web-, Android- und iOS-Architektur mit Flutter, React Native und Kotlin.'
    : visualType === 'mobile'
      ? 'Three smartphone previews for a cross-platform app on Android and iOS.'
      : visualType === 'web'
      ? 'A responsive web application preview with performance, security, and mobile views.'
      : 'Connected cloud, web, Android, and iOS architecture with Flutter, React Native, and Kotlin.';

  return (
    <div className={`${styles.showcase} ${themeClass}`} role="img" aria-label={imageDescription}>
      {localBackground && <img className={styles.userBackground} src={localBackground} alt="" loading="lazy" decoding="async" />}
      <div className={styles.showcaseScrim} />

      <div className={styles.showcaseInner}>
        <div className={styles.showcaseHeader}>
          <span className={styles.logoTile}>
            <img src="/images/logo/webdev-logo.png" alt="" loading="eager" />
          </span>
          <span className={styles.showcaseBrand}>
            <span>WebDev Software Solutions</span>
            <strong>{isDe ? 'Engineering-Plattform' : 'Engineering Platform'}</strong>
          </span>
          <span className={styles.excellenceStatus}>
            <i />
            <span>{isDe ? 'Engineering Excellence' : 'Engineering Excellence'}</span>
          </span>
        </div>

        <div className={styles.showcaseVisual} key={`visual-${slide.id || index}`}>
          {visualType === 'mobile' ? (
            <MobileExperienceVisual isDe={isDe} slideIndex={index} />
          ) : visualType === 'web' ? (
            <WebExperienceVisual isDe={isDe} slideIndex={index} />
          ) : (
            <EngineeringVisual isDe={isDe} slideIndex={index} />
          )}
        </div>

        <div className={styles.techFooter}>
          {(visualType === 'web'
            ? [{ label: 'Next.js', Icon: SiNextdotjs, color: 'blue' }, { label: 'API', Icon: Code2, color: 'blue' }, { label: 'Cloud', Icon: Cloud, color: 'cyan' }]
            : ENGINEERING_TECH
          ).map(({ label, Icon, color }) => (
            <span className={styles.techBadge} key={label}>
              <Icon className={styles[color]} aria-hidden="true" />
              <span>{label}</span>
            </span>
          ))}
          <span className={styles.showcaseTag}>{slide.tag || (isDe ? `0${index + 1} / DIGITALE PRODUKTE` : `0${index + 1} / DIGITAL PRODUCTS`)}</span>
        </div>
      </div>
    </div>
  );
}

export const Hero: React.FC<HeroProps> = ({
  slides: customSlides,
  onExploreClick,
  onExploreServices,
  onContactClick,
  onOpenQuote,
  onNavigateProjects,
}) => {
  const { lang, localizeHeroSlide } = useLanguage();
  const isDe = lang === 'de';
  const rawSlides = customSlides?.length ? customSlides : initialHeroSlides;
  const slides = useMemo(() => rawSlides.map((slide, index) => localizeHeroSlide(slide, index)), [rawSlides, localizeHeroSlide]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isPausedByUser, setIsPausedByUser] = useState(false);
  const [isPausedByFocus, setIsPausedByFocus] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [timerVersion, setTimerVersion] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const carouselRef = useRef<HTMLElement>(null);

  const safeIndex = Math.min(currentIndex, Math.max(slides.length - 1, 0));
  const currentSlide = slides[safeIndex] || initialHeroSlides[0];
  const rotationPaused = isPausedByUser || isPausedByFocus || prefersReducedMotion;
  const isAutoplayRunning = slides.length > 1 && !rotationPaused && !isHovering && isDocumentVisible;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updateMotionPreference();
    mediaQuery.addEventListener('change', updateMotionPreference);
    return () => mediaQuery.removeEventListener('change', updateMotionPreference);
  }, []);

  useEffect(() => {
    const updateDocumentVisibility = () => {
      const isVisible = document.visibilityState === 'visible';
      setIsDocumentVisible(isVisible);
      if (isVisible) setTimerVersion((version) => version + 1);
    };
    updateDocumentVisibility();
    document.addEventListener('visibilitychange', updateDocumentVisibility);
    return () => document.removeEventListener('visibilitychange', updateDocumentVisibility);
  }, []);

  useEffect(() => {
    if (slides.length <= 1 || !isDocumentVisible || isHovering || rotationPaused) return;

    const timer = window.setTimeout(() => {
      setCurrentIndex((index) => (index + 1) % slides.length);
    }, AUTOPLAY_INTERVAL);

    return () => window.clearTimeout(timer);
  }, [currentIndex, isDocumentVisible, isHovering, rotationPaused, slides.length, timerVersion]);

  const navigateTo = useCallback((index: number) => {
    if (slides.length <= 1) return;
    const nextIndex = (index + slides.length) % slides.length;
    setCurrentIndex(nextIndex);
    setTimerVersion((version) => version + 1);
  }, [slides.length]);

  const handleNext = useCallback(() => navigateTo(safeIndex + 1), [navigateTo, safeIndex]);
  const handlePrevious = useCallback(() => navigateTo(safeIndex - 1), [navigateTo, safeIndex]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      handleNext();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      handlePrevious();
    } else if (event.key === 'Home') {
      event.preventDefault();
      navigateTo(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      navigateTo(slides.length - 1);
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    const startX = touchStartX.current;
    const endX = event.changedTouches[0]?.clientX;
    touchStartX.current = null;
    if (startX === null || endX === undefined) return;
    const distance = startX - endX;
    if (Math.abs(distance) < 48) return;
    if (distance > 0) handleNext();
    else handlePrevious();
  };

  const executeAction = (action?: HeroSlide['primaryBtnAction'] | HeroSlide['secondaryBtnAction']) => {
    switch (action) {
      case 'quote':
        if (onOpenQuote) onOpenQuote();
        else onContactClick?.();
        break;
      case 'services':
        if (onExploreServices) onExploreServices();
        else onExploreClick?.();
        break;
      case 'projects':
        if (onNavigateProjects) onNavigateProjects();
        else onExploreClick?.();
        break;
      case 'contact':
        if (onContactClick) onContactClick();
        else onOpenQuote?.();
        break;
      default:
        if (onOpenQuote) onOpenQuote();
        else onContactClick?.();
    }
  };

  const toggleRotation = () => {
    if (prefersReducedMotion) return;
    const shouldPause = !rotationPaused;
    setIsPausedByUser(shouldPause);
    setIsPausedByFocus(shouldPause);
    if (!shouldPause) setTimerVersion((version) => version + 1);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setTimerVersion((version) => version + 1);
  };

  return (
    <section
      ref={carouselRef}
      className={`hero-shape-surface ${styles.hero} relative -mt-[114px] w-full overflow-hidden bg-slate-50 pb-8 pt-[142px] sm:-mt-[124px] sm:pb-10 sm:pt-[156px] lg:-mt-[130px] lg:pb-12 lg:pt-[166px]`}
      role="region"
      aria-roledescription={isDe ? 'Karussell' : 'carousel'}
      aria-label={isDe ? 'WebDev Leistungsübersicht' : 'WebDev services overview'}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      onFocusCapture={() => setIsPausedByFocus(true)}
      onBlurCapture={(event) => {
        if (!carouselRef.current?.contains(event.relatedTarget as Node)) {
          setIsPausedByFocus(false);
          setTimerVersion((version) => version + 1);
        }
      }}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.keyboardControls} role="group" aria-label={isDe ? 'Karussell-Steuerung' : 'Carousel controls'}>
        <button type="button" onClick={handlePrevious}>{isDe ? 'Vorherige Folie' : 'Previous slide'}</button>
        <button type="button" onClick={handleNext}>{isDe ? 'Nächste Folie' : 'Next slide'}</button>
        <button type="button" onClick={toggleRotation} disabled={prefersReducedMotion}>
          {rotationPaused
            ? (isDe ? 'Folienwechsel starten' : 'Resume slide rotation')
            : (isDe ? 'Folienwechsel pausieren' : 'Pause slide rotation')}
        </button>
      </div>
      <div className={styles.ambientLayer} aria-hidden="true">
        <span className={styles.ambientGlowLeft} />
        <span className={styles.ambientGlowRight} />
        <span className={styles.blueprintLine} />
      </div>
      <div className={`${styles.layout} relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-7 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:gap-8 lg:px-8 xl:gap-10`}>
        <div className={styles.contentColumn}>
          <div
            key={currentSlide.id || safeIndex}
            className={styles.slideCopy}
            role="group"
            aria-roledescription={isDe ? 'Folie' : 'slide'}
            aria-label={`${safeIndex + 1} ${isDe ? 'von' : 'of'} ${slides.length}`}
            aria-live={isAutoplayRunning ? 'off' : 'polite'}
          >
            <h1 className={styles.headline}>
              <span className={styles.headlineMain}>{currentSlide.title}</span>
              {currentSlide.highlightText && <span className={styles.headlineHighlight}>{currentSlide.highlightText}</span>}
            </h1>

            <p className={styles.description}>{currentSlide.subtitle}</p>

            <div className={styles.ctaRow}>
              <button
                type="button"
                onClick={() => executeAction(currentSlide.primaryBtnAction || 'quote')}
                className={styles.primaryButton}
              >
                <span>{currentSlide.primaryBtnText || (isDe ? 'Projekt starten' : 'Start Your Project')}</span>
                <ArrowRight aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => executeAction(currentSlide.secondaryBtnAction || 'services')}
                className={styles.secondaryButton}
              >
                <span>{currentSlide.secondaryBtnText || (isDe ? 'Leistungen entdecken' : 'Explore Services')}</span>
                <ArrowUpRight aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Stable footer section: dot pagination and location metadata */}
          <div className={styles.columnFooter}>
            {slides.length > 1 && (
              <div className={styles.dotPagination} role="tablist" aria-label={isDe ? 'Folie wählen' : 'Select slide'}>
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    role="tab"
                    aria-selected={idx === safeIndex}
                    aria-label={`${isDe ? 'Folie' : 'Slide'} ${idx + 1}`}
                    className={`${styles.dotBtn} ${idx === safeIndex ? styles.dotActive : ''}`}
                    onClick={() => navigateTo(idx)}
                  />
                ))}
              </div>
            )}

            <div className={styles.contentMeta}>
              <div className={styles.locationLine}>
                <MapPin aria-hidden="true" />
                <span>{isDe ? 'Leverkusen, Deutschland · Weltweit tätig' : 'Leverkusen, Germany · Working worldwide'}</span>
              </div>

              <span className={styles.visuallyHidden} aria-live={isAutoplayRunning ? 'off' : 'polite'} aria-atomic="true">
                {isDe ? `Folie ${safeIndex + 1} von ${slides.length}: ${currentSlide.title} ${currentSlide.highlightText || ''}` : `Slide ${safeIndex + 1} of ${slides.length}: ${currentSlide.title} ${currentSlide.highlightText || ''}`}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.visualColumn}>
          <EngineeringShowcase slide={currentSlide} index={safeIndex} isDe={isDe} />
        </div>
      </div>

      <SignatureShapeDivider position="bottom" fillColor="text-white" heightClass="h-4 sm:h-5 md:h-6" />
    </section>
  );
};

export default Hero;
