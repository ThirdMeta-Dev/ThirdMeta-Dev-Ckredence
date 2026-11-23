import { useState } from "react";
import content from "./content.json";

export const site = "https://ckredencewealth.com";
export const contact = site + "/contact-us";

const paths = {
  book: "M4 4h6l2 2 2-2h6v15h-6l-2 2-2-2H4zM12 6v15",
  chevron: "m9 5 7 7-7 7",
  arrow: "M4 12h15m-6-6 6 6-6 6",
  external: "M5 19 18 6M6 6h12v12",
  plus: "M5 12h14m-7-7v14",
  menu: "M3 7h18M3 12h18M3 17h18",
  close: "m5 5 14 14M19 5 5 19",
  chart: "M4 20V4m0 16h16M7 15l4-5 3 2 6-8",
  layers: "m2 8 10-5 10 5-10 5zm1 5 9 5 9-5M3 17l9 5 9-5",
  equity: "M5 5v14m-2-9h4v5H3zm9-8v15m-2-11h4v6h-4zm9-12v15m-2-11h4v6h-4z",
  compass:
    "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Zm-6-4-2.5 5.5L8 16l2.5-5.5z",
  people: "M15 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM5 21v-2a7 7 0 0 1 14 0v2",
  star: "m12 2 3 6.2 6.8 1-4.9 4.8 1.2 6.8-6.1-3.2-6.1 3.2 1.2-6.8-4.9-4.8 6.8-1z",
  award: "M18 8a6 6 0 1 1-12 0 6 6 0 1 1 12 0Zm-10 5-2 8 6-3 6 3-2-8",
  shield: "m12 2 8 4v5c0 5-4 9-8 11-4-2-8-6-8-11V6zm-4 9 3 3 5-6",
  chat: "M21 11a9 9 0 0 1-13 8l-6 2 2-6a9 9 0 1 1 17-4Z",
};
export function Icon({ name, size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
export function Action({ href, children, light = false }) {
  return (
    <a className={"action" + (light ? " light" : "")} href={href}>
      <span className="roll">
        <span data-copy={children}>{children}</span>
      </span>
      <Icon name="external" size={15} />
    </a>
  );
}
export function Label({ children }) {
  return <p className="label">{children}</p>;
}
export function Steps({ label, prev, next }) {
  return (
    <div className="steps">
      <button aria-label={"Previous " + label} onClick={prev}>
        <Icon name="chevron" />
      </button>
      <button aria-label={"Next " + label} onClick={next}>
        <Icon name="chevron" />
      </button>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const items = [
    ["Our services", "#services", "layers"],
    ["PMS approaches", "#approaches", "chart"],
    ["Insights", "#blogs", "book"],
    ["Login portal", site + "/login-portal", "people"],
  ];
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="header">
        <div className="nav">
          <a className="home-link" href="#" aria-label="Ckredence Wealth home">
            <img className="logo" src={content.logo} alt="Ckredence Wealth" />
          </a>
          <nav
            id="navigation"
            aria-label="Main navigation"
            className={open ? "open" : ""}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setOpen(false);
                document.getElementById("menu").focus();
              }
            }}
          >
            {items.map(([label, href, icon]) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                onClick={() => setOpen(false)}
              >
                <Icon name={icon} />
                <span>{label}</span>
              </a>
            ))}
          </nav>
          <Action href={site + "/invest-with-us"}>Invest with us</Action>
          <button
            id="menu"
            className="menu"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-controls="navigation"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </header>
    </>
  );
}

export function Hero() {
  const [slide, setSlide] = useState(0);
  const change = () => setSlide((v) => 1 - v);
  return (
    <section className="hero wrap" aria-labelledby="hero-title">
      <div className="rank-note">
        <span aria-hidden="true" />
        Ranked 69th among PMS providers in India by investor count
      </div>
      <h1 id="hero-title">
        <span className="headline-row">
          Welcome to{" "}
          <span className="inline-unit">
            <img
              className="brand-token"
              src="./media/hero-detail-0.webp"
              alt=""
            />
            <span className="type-pill">Ckredence Wealth</span>
          </span>
        </span>
        <span className="headline-row">
          Your journey{" "}
          <span className="inline-unit">
            <img className="scene-token" src={content.hero.growth} alt="" /> to
            prosperity
          </span>
        </span>
        <span className="headline-row">starts right here.</span>
      </h1>
      <div className="hero-actions">
        <Action href={contact}>Get in touch</Action>
        <a
          className="outline news"
          href="#blogs"
          aria-label="What’s new — latest market insights"
        >
          Latest insights <Icon name="external" size={14} />
        </a>
      </div>
      <div className="highlight" role="region" aria-roledescription="carousel" aria-label="Ckredence highlights">
        <div className="highlight-copy" key={slide} aria-live="polite">
          <p className="label">{slide ? "Portfolio Management Services" : "Ckredence Mutual Funds App"}</p>
          <h2>{slide ? <>Ranked 69th<br/>across India.</> : <>Your investments,<br/>at your fingertips.</>}</h2>
          {slide ? <p>Among PMS providers by investor count</p> :
            <a className="highlight-link" href="#app">Explore the app <Icon name="external" size={15}/></a>}
        </div>
        {slide ? <div className="highlight-ranking" aria-hidden="true"/> :
          <div className="highlight-phones" aria-hidden="true">
            <img src={content.screens[1]} alt=""/>
            <img src={content.screens[0]} alt=""/>
          </div>}
        <div className="highlight-controls">
          <span aria-hidden="true" className={slide === 0 ? "current" : ""}/>
          <span aria-hidden="true" className={slide === 1 ? "current" : ""}/>
          <Steps label="highlight" prev={change} next={change}/>
        </div>
      </div>
    </section>
  );
}
