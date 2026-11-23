import { useEffect, useRef, useState } from 'react';
import data from '../homepage.json';
import { Container, Action, actionUrl, StepControls } from './shared';

function InvestmentLinks({ compact = false }) {
  return (
    <nav className={compact ? 'investment-strip' : 'quick-nav'} aria-label="Investment links">
      {data.header.map(({ href, label }) => (
        <a key={href} href={href}>
          {label}
        </a>
      ))}
    </nav>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [tickerPaused, setTickerPaused] = useState(false);
  const nav = useRef(null);
  const trigger = useRef(null);
  useEffect(() => {
    if (!open) return;
    function dismiss(event) {
      if (event.key === 'Escape') {
        setOpen(false);
        trigger.current?.focus();
      }
    }
    const outside = (event) => {
      if (!nav.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('keydown', dismiss);
    document.addEventListener('pointerdown', outside);
    document.addEventListener('focusin', outside);
    return () => {
      document.removeEventListener('keydown', dismiss);
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('focusin', outside);
    };
  }, [open]);
  return (
    <>
      <a className="skip" href="#content">
        Skip to content
      </a>
      <div className={'ranking' + (tickerPaused ? ' still' : '')}>
        <div className="ticker-window">
          <div className="ticker">
            {Array.from({ length: 8 }, (_, i) => (
              <span className="rank-item" key={i} aria-hidden={i > 0 ? true : undefined}>
                <span className="rank-mark" aria-hidden="true">
                  ✦
                </span>
                Ranked 69th Among Top PMS in India by Investors Count
              </span>
            ))}
          </div>
        </div>
        <button
          className="ticker-toggle"
          aria-label={tickerPaused ? 'Resume announcement' : 'Pause announcement'}
          aria-pressed={tickerPaused}
          onClick={() => setTickerPaused(!tickerPaused)}
        >
          {tickerPaused ? '▷' : 'Ⅱ'}
        </button>
      </div>
      <header className="masthead" ref={nav}>
        <Container className="head-row">
          <a href="#content" className="home-logo">
            <img
              src="/media/logo.webp"
              alt="Ckredence Wealth — Your Journey to Prosperity"
              width="175"
              height="51"
            />
          </a>
          <InvestmentLinks />
          <button
            ref={trigger}
            className="menu-trigger"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen(!open)}
          >
            <span className={'burger' + (open ? ' is-open' : '')} aria-hidden="true">
              <i />
              <i />
            </span>
            Menu
          </button>
        </Container>
        {open && (
          <nav className="site-menu" id="site-menu" aria-label="Site menu">
            <Container className="menu-grid">
              {data.footerGroups.Company.filter((item) => item.href !== '/').map((item) => (
                <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              ))}
              {data.header.map((item) => (
                <a className="mobile-menu-link" href={item.href} key={item.href}>
                  {item.label}
                </a>
              ))}
            </Container>
          </nav>
        )}
      </header>
      <InvestmentLinks compact />
    </>
  );
}

export function Opening() {
  const [slide, setSlide] = useState(0);
  const banner = data.banners[slide];
  const change = (step) =>
    setSlide((current) => (current + step + data.banners.length) % data.banners.length);
  const image = (
    <img
      src={banner.image}
      alt={slide === 0 ? 'Ckredence Wealth podcast — live' : banner.alt}
      width="1800"
      height="534"
    />
  );
  return (
    <section
      className="opening"
      id="content"
      data-section="01"
      aria-labelledby="hero-title"
      tabIndex="-1"
    >
      <div className="hero-band">
        <Container className="hero-wrap">
          <div className="hero-copy">
            <a href={actionUrl('/our-resources')} className="news-link">
              <span className="news-art" aria-hidden="true">
                <img src="/media/hero-inline-1.webp" alt="" />
                <span className="journey-art">
                  <img src="/media/hero-inline-2.webp" alt="" />
                  <img src="/media/hero-inline-3.webp" alt="" />
                </span>
              </span>
              <strong>What's new</strong>
              <span>Read Our Latest Blogs To Get Updated With The Market</span>
              <i className="chevron" />
            </a>
            <h1 id="hero-title">
              Welcome to Ckredence, <em>Your Journey to prosperity</em>{' '}
              <span className="hero-close">Starts right here</span>
            </h1>
            <Action href={actionUrl('/contact-us')}>Get In touch</Action>
          </div>
          <div className="hero-art">
            <img
              className="hero-photo"
              src="/media/hero-inline-4.webp"
              width="1117"
              height="763"
              alt=""
              fetchPriority="high"
            />
          </div>
        </Container>
      </div>
      <Container
        className="promotion"
        role="region"
        aria-label="Ckredence announcements"
        aria-roledescription="carousel"
      >
        <div className="banner-frame">
          {banner.href ? (
            <a href={banner.href} aria-label={banner.alt}>
              {image}
            </a>
          ) : (
            image
          )}
        </div>
        <div className="banner-controls">
          <div className="slide-dots">
            {data.banners.map((item, index) => (
              <button
                key={item.image}
                aria-label={`Show banner ${index + 1}`}
                aria-current={slide === index ? 'true' : undefined}
                onClick={() => setSlide(index)}
              >
                <i />
              </button>
            ))}
          </div>
          <StepControls name="banner" previous={() => change(-1)} next={() => change(1)} />
        </div>
      </Container>
    </section>
  );
}
