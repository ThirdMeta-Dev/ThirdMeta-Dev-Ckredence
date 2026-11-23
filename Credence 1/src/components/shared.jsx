import { useEffect, useState } from 'react';

export function actionUrl(path) {
  return new URL(path, 'https://ckredencewealth.com').href;
}

export function mediaUrl(path) {
  return import.meta.env.BASE_URL + path.replace(/^\//, '');
}

export function Container({ as: Element = 'div', className = '', children, ...props }) {
  return (
    <Element className={`wrap ${className}`.trim()} {...props}>
      {children}
    </Element>
  );
}

export function SectionHeading({ id, label, children, align = 'center' }) {
  return (
    <header className={`section-heading align-${align}`}>
      {label && <Label>{label}</Label>}
      <h2 id={id}>{children}</h2>
    </header>
  );
}

export function Action({ href, children, secondary = false }) {
  return (
    <a className={secondary ? 'action secondary' : 'action'} href={href}>
      {children}
    </a>
  );
}

export function Label({ children }) {
  return (
    <p className="label">
      <img src={mediaUrl('/media/ornament-left.svg')} alt="" width="28" height="14" />
      {children}
      <img src={mediaUrl('/media/ornament-right.svg')} alt="" width="28" height="14" />
    </p>
  );
}

export function StepControls({ previous, next, name }) {
  return (
    <div className="step-controls">
      <button type="button" aria-label={`Previous ${name}`} onClick={previous}>
        <span className="chevron back" />
      </button>
      <button type="button" aria-label={`Next ${name}`} onClick={next}>
        <span className="chevron" />
      </button>
    </div>
  );
}

export function useMedia(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const media = window.matchMedia(query);
    const sync = () => setMatches(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, [query]);
  return matches;
}
