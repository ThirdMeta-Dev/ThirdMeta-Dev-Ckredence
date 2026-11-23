import { useLayoutEffect, useRef, useState } from 'react';
import data from '../homepage.json';
import { Action, Container, mediaUrl, SectionHeading, useMedia } from './shared';
import './services.css';

const services = data.services;
const serviceTitle = 'services-title';

// Grizzly ties the end of each image pair to 20% of the viewport plus the gallery gap.
function transitionEnd(gap) {
  return window.innerHeight * 0.2 + gap;
}

function ServiceCopy({ item, index, onLinkFocus }) {
  return (
    <div className="service-copy">
      <h3 id={`service-title-${index}`} tabIndex={-1}>
        {item.name}
      </h3>
      <p>{item.description}</p>
      <ul>
        {item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
      </ul>
      <div className="service-copy-action" onFocus={onLinkFocus}>
        <Action href={item.href}>
          Know More<span className="service-sr"> about {item.name}</span>
        </Action>
      </div>
    </div>
  );
}

function ImagePair({ item }) {
  return (
    <div className="service-pair">
      {item.gallery.map(({ frame, ratio, src, alt }) => (
        <div
          key={src}
          className={`service-frame frame-${frame}`}
          style={{ '--service-ratio': ratio }}
        >
          <img src={mediaUrl(src)} alt={alt} loading="lazy" decoding="async" />
        </div>
      ))}
    </div>
  );
}

export default function Services() {
  const section = useRef(null);
  const navigation = useRef(null);
  const gallery = useRef(null);
  const rail = useRef(null);
  const reducedMotion = useMedia('(prefers-reduced-motion: reduce)');
  const [fits, setFits] = useState(true);
  const [selection, setSelection] = useState({ active: 0, docked: false });
  const pinned = fits && !reducedMotion;

  useLayoutEffect(() => {
    const root = section.current;
    const copies = [...root.querySelectorAll('.service-copy')];
    function measure() {
      const style = getComputedStyle(root);
      const desktop = Boolean(parseFloat(style.getPropertyValue('--service-panel-min')));
      const nav = navigation.current;
      const navBottom = parseFloat(getComputedStyle(nav).top) + nav.offsetHeight;
      const pinTop = Math.max(parseFloat(style.getPropertyValue('--service-pin')), navBottom + 8);
      const contentHeight = Math.max(...copies.map((copy) => copy.offsetHeight));
      const desktopPadding = parseFloat(style.getPropertyValue('--service-slide-inset')) + 4;
      const panelHeight = contentHeight + (desktop ? desktopPadding : 40);
      // Only the stacked layout needs to reserve space below the copy for the images.
      const gallerySpace = desktop ? 16 : Math.min(144, window.innerHeight * 0.2);
      setFits(panelHeight + pinTop + gallerySpace <= window.innerHeight);
    }
    measure();
    const observer = new ResizeObserver(measure);
    copies.forEach((copy) => observer.observe(copy));
    observer.observe(navigation.current);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [pinned]);

  useLayoutEffect(() => {
    const root = section.current;
    const title = document.getElementById(serviceTitle);
    const nav = navigation.current;
    const images = gallery.current;
    const windowEl = rail.current;
    const slides = windowEl ? [...windowEl.children] : [];
    const pairs = images ? [...images.children] : [];
    const articles = root.querySelectorAll('.service-list article');
    let gap;
    let distances;
    let navTop;
    let frame = 0;

    function updateSelection(active) {
      const docked = title.getBoundingClientRect().bottom <= navTop + 1;
      setSelection((current) =>
        current.active === active && current.docked === docked ? current : { active, docked },
      );
    }

    function sync() {
      frame = 0;
      if (!pinned) {
        const boundary = navTop + nav.offsetHeight + 9;
        let active = 0;
        articles.forEach((article, index) => {
          if (article.getBoundingClientRect().top <= boundary) active = index;
        });
        updateSelection(active);
        return;
      }
      const end = transitionEnd(gap);
      let progress = 0;
      let incoming = 1;
      for (let i = 0; i < pairs.length - 1; i++) {
        const bottom = pairs[i].getBoundingClientRect().bottom;
        const outgoing = Math.max(0, Math.min(1, 1 - (bottom - end) / distances[i]));
        slides[i].style.setProperty('--service-offset', `${(1 - incoming - outgoing) * 100}%`);
        progress += outgoing;
        incoming = outgoing;
      }
      slides.at(-1).style.setProperty('--service-offset', `${(1 - incoming) * 100}%`);
      windowEl.style.setProperty('--service-progress', progress);
      updateSelection(Math.round(progress));
    }
    function measure() {
      navTop = parseFloat(getComputedStyle(nav).top);
      if (!pinned) {
        sync();
        return;
      }
      const galleryStyle = getComputedStyle(images);
      gap = parseFloat(galleryStyle.rowGap);
      const desktopTravel = parseFloat(galleryStyle.getPropertyValue('--service-panel-min'));
      distances = slides.slice(0, -1).map((slide, index) => {
        if (desktopTravel) return desktopTravel;
        const copyHeight = slide.firstElementChild.getBoundingClientRect().height;
        const padding = parseFloat(getComputedStyle(slide).paddingBottom);
        return Math.min(copyHeight + padding, pairs[index].getBoundingClientRect().height + gap);
      });
      sync();
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(sync);
    }
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    if (images) observer.observe(images);
    for (const slide of slides) observer.observe(slide.firstElementChild);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', measure);
      cancelAnimationFrame(frame);
    };
  }, [pinned]);

  function goTo(index, focusTitle = true) {
    const heading = document.getElementById(`service-title-${index}`);
    const nav = navigation.current;
    const navTop = parseFloat(getComputedStyle(nav).top);
    const titleExit = document.getElementById(serviceTitle).getBoundingClientRect().bottom - navTop;
    if (pinned) {
      const images = gallery.current;
      const gap = parseFloat(getComputedStyle(images).rowGap);
      const previous = images.children[index - 1];
      const target = previous
        ? previous.getBoundingClientRect().bottom - transitionEnd(gap)
        : Math.max(
            images.getBoundingClientRect().top - transitionEnd(gap) - gap,
            titleExit,
          );
      window.scrollBy({ top: target, behavior: 'instant' });
    } else {
      const article = heading.closest('article');
      window.scrollBy({
        top: Math.max(article.getBoundingClientRect().top - navTop - nav.offsetHeight - 8, titleExit),
        behavior: 'instant',
      });
    }
    if (focusTitle) heading.focus({ preventScroll: true });
  }

  function revealFocusedLink(event, index) {
    if (!event.target.matches(':focus-visible')) return;
    const progress = Number(rail.current.style.getPropertyValue('--service-progress'));
    if (Math.abs(progress - index) > 0.001) goTo(index, false);
  }

  return (
    <section
      ref={section}
      id="services"
      className="services"
      data-section="02"
      aria-labelledby={serviceTitle}
    >
      <Container>
        <SectionHeading id={serviceTitle} align="left">
          Our <em>Services</em>
        </SectionHeading>
        <div ref={navigation} className="service-nav" data-docked={selection.docked}>
          <nav aria-label="Jump to a service" className="service-index">
            {services.map((item, index) => (
              <button
                type="button"
                key={item.href}
                aria-label={item.shortName ? item.name : undefined}
                aria-current={selection.active === index ? 'true' : undefined}
                aria-controls={`service-panel-${index}`}
                onClick={() => goTo(index)}
              >
                <span className={item.shortName ? 'service-tab-full' : undefined}>{item.name}</span>
                {item.shortName && <span className="service-tab-short">{item.shortName}</span>}
              </button>
            ))}
          </nav>
        </div>
        {pinned ? (
          <div className="service-story is-pinned">
            <div className="service-pin">
              <div ref={rail} className="service-window">
                {services.map((item, index) => (
                  <article
                    key={item.href}
                    id={`service-panel-${index}`}
                    className="service-slide"
                    aria-labelledby={`service-title-${index}`}
                  >
                    <ServiceCopy
                      item={item}
                      index={index}
                      onLinkFocus={(event) => revealFocusedLink(event, index)}
                    />
                  </article>
                ))}
              </div>
            </div>
            <div ref={gallery} className="service-gallery">
              {services.map((item) => (
                <ImagePair key={item.href} item={item} />
              ))}
            </div>
          </div>
        ) : (
          <div className="service-list">
            {services.map((item, index) => (
              <article
                className="service-story"
                key={item.href}
                id={`service-panel-${index}`}
                aria-labelledby={`service-title-${index}`}
              >
                <ServiceCopy item={item} index={index} />
                <ImagePair item={item} />
              </article>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
