import { useEffect, useRef, useState } from "react";
import data from "./content.json";
import articles from "./articles.json";
import { Header, Hero, Icon, Action, Label, site } from "./ui.jsx";
import {
  Community,
  Faq,
  Reviews,
  Support,
  Reports,
  Footer,
} from "./Investor.jsx";

function Services() {
  const descriptions = [
    "A professionally managed portfolio built around your goals, investment horizon, and risk profile.",
    "Diversified mutual fund offerings and guidance for first-time and experienced investors.",
    "Stock selection informed by fundamental research, market trends, and risk management.",
    "Research-led guidance on asset allocation and portfolio choices. You retain control of investment decisions.",
  ];
  return (
    <section id="services" className="section wrap">
      <div className="section-head">
        <h2>Investment services</h2>
        <span className="heading-aside">Our services</span>
      </div>
      <div className="services-grid">
        {data.services.map((s, i) => (
          <article className={"service-card card-" + i} key={s.title}>
            <a
              href={s.link}
              className="service-title"
              aria-label={"Know more about " + s.title}
            >
              <h3>{s.title}</h3>
              <span className="card-link-label" aria-hidden="true">
                Know more <Icon name="external" size={12} />
              </span>
              <span className="round-icon">
                <Icon name="external" size={16} />
              </span>
            </a>
            <div className="service-art">
              <img
                loading="lazy"
                alt=""
                src={
                  [
                    "./media/pms-cover.webp",
                    "./media/funds-cover.webp",
                    "./media/equity-cover.webp",
                    "./media/advisory-cover.webp",
                  ][i]
                }
              />
            </div>
            <div className="service-copy">
              <p>{descriptions[i]}</p>
              <a
                className="text-link"
                href={s.link}
                aria-label={"Know more about " + s.title}
              >
                Know more <Icon name="external" size={14} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
function Strategies() {
  const [active, setActive] = useState(0);
  const track = useRef(null);
  const heading = useRef(null);
  const steps = useRef([]);

  useEffect(() => {
    const element = track.current;
    const header = heading.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let stickyTop = 0;
    let current = 0;
    let previousY = window.scrollY;
    let compact = 0;
    let titleSpace = 0;

    function sync() {
      frame = 0;
      const y = window.scrollY;
      const bounds = element.getBoundingClientRect();
      const expandedBottom = stickyTop + header.offsetHeight;
      const travel = Math.max(1, titleSpace);
      // Keep the scroll track stationary as the heading and cards move inside it.
      const inSection = bounds.top <= stickyTop && bounds.bottom > stickyTop;
      compact = inSection ? Math.max(0, Math.min(1, compact + (y - previousY) / travel)) : 0;
      previousY = y;
      const entrance = Math.max(0, Math.min(1, (stickyTop - bounds.top) / travel));
      const progress = Math.min(compact, entrance);
      const eased = reducedMotion.matches ? Number(progress >= 0.5) : progress * progress * (3 - 2 * progress);
      const collapse = titleSpace * eased;
      element.style.setProperty("--approach-collapse", collapse.toFixed(2) + "px");
      header.style.setProperty("--approach-title-opacity", (1 - eased).toFixed(3));
      const headerBottom = expandedBottom - collapse;
      // Tab anchors and selection share the full heading's stable reference point.
      const threshold = expandedBottom + Math.min(100, (innerHeight - expandedBottom) * 0.25);
      let next = 0;
      const positions = steps.current.map((step, i) => {
        if (step.getBoundingClientRect().top <= threshold) next = i;
        return step.firstElementChild.getBoundingClientRect();
      });
      if (next !== current) {
        setActive(next);
        current = next;
      }
      if (reducedMotion.matches) return;

      // Measure the stationary wrappers so the visual bounce cannot feed back into scroll progress.
      positions.forEach((rect, i) => {
        const fromBottom = innerHeight - rect.top;
        const fromTop = rect.bottom - headerBottom;
        const fadeDistance = Math.max(1, Math.min(240, rect.height * 0.55, (innerHeight - headerBottom) * 0.5));
        const progress = Math.max(0, Math.min(1, Math.min(fromBottom, fromTop) / fadeDistance));
        const opacity = progress * progress * (3 - 2 * progress);
        const direction = fromBottom < fromTop ? 1 : -1;
        const offset = direction * 18 * (1 - progress) ** 2 * Math.cos(progress * Math.PI * 1.6);
        const style = steps.current[i].firstElementChild.style;
        style.setProperty("--approach-opacity", opacity.toFixed(3));
        style.setProperty("--approach-offset", offset.toFixed(2) + "px");
        style.setProperty("--approach-scale", (1 - 0.055 * (1 - opacity) - 0.025 * eased).toFixed(4));
      });
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(sync);
    }
    function measure() {
      stickyTop = parseFloat(getComputedStyle(header).top);
      titleSpace = header.querySelector(".tabs").offsetTop - header.firstElementChild.offsetTop;
      element.style.setProperty("--approach-heading-height", header.offsetHeight + "px");
      for (const step of steps.current) {
        const available = innerHeight - stickyTop - header.offsetHeight;
        step.classList.toggle("can-pin", step.firstElementChild.offsetHeight <= available - 12);
      }
      schedule();
    }
    const observer = new ResizeObserver(measure);
    observer.observe(header);
    steps.current.forEach(step => observer.observe(step.firstElementChild));
    measure();
    reducedMotion.addEventListener("change", schedule);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", schedule);
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", schedule);
    };
  }, []);

  function onKey(event, index) {
    const count = data.strategies.length;
    const next = { ArrowRight: (index + 1) % count, ArrowLeft: (index + count - 1) % count, Home: 0, End: count - 1 }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    const link = event.currentTarget.parentElement.children[next];
    link.focus({ preventScroll: true });
    link.click();
  }

  return (
    <section className="section tint" id="approaches">
      <div className="wrap approach-track" ref={track}>
        <header className="approach-heading" ref={heading}>
          <div className="approach-intro">
            <Label>Portfolio Management Services</Label>
            <h2>PMS investment approaches</h2>
          </div>
          <nav className="tabs" aria-label="Investment approaches">
            {data.strategies.map((item, i) => (
              <a key={item.label} href={"#approach-" + i} aria-current={active === i ? "location" : undefined}
                onKeyDown={event => onKey(event, i)}>{item.label}</a>
            ))}
          </nav>
        </header>
        {data.strategies.map((item, i) => (
          <div className="approach-step" id={"approach-" + i} key={item.label}
            ref={node => { steps.current[i] = node; }}>
            <div className="approach-position">
              <article className="strategy" aria-labelledby={"strategy-title-" + i}>
                <div>
                  <h3 id={"strategy-title-" + i}>{item.title}</h3>
                  <p>{item.body}</p>
                  <Action href={item.link}>Know more</Action>
                </div>
                <a className="chart" href={item.link}
                  aria-label={"View " + item.label + " performance and benchmark details"}>
                  <img src={item.charts[0]} alt={item.label + " performance by investment period. " + item.date}/>
                </a>
              </article>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
function Statistics() {
  return (
    <section className="stats wrap" aria-label="PMS key statistics">
      {[
        ["₹900+ Cr", "Total PMS AUM"],
        ["550", "Clients"],
        ["₹50 L", "Minimum investment"],
        ["₹2 L", "Minimum SIP"],
      ].map(([n, t]) => (
        <div key={t}>
          <strong>{n}</strong>
          <span>{t}</span>
        </div>
      ))}
    </section>
  );
}
function Manager() {
  return (
    <section className="manager-section" id="fund-manager">
      <div className="wrap manager">
        <div>
          <Label>Desk of Fund Manager</Label>
          <h2>Kartik Mehta</h2>
          <span className="experience">22+ years of experience</span>
          <p>
            Read the fund manager’s monthly perspective on the markets and current
            portfolio holdings.
          </p>
          <Action light href={data.manager.links[0].url}>
            View articles
          </Action>
        </div>
        <img
          loading="lazy"
          src="./media/fund-manager-placeholder.webp"
          alt="Illustrative portrait of a fund manager"
        />
      </div>
    </section>
  );
}
function MobileApp() {
  return (
    <section className="section wrap" id="app">
      <Label>Mutual Fund App</Label>
      <h2>
        Manage your mutual funds
        <br />
        from your phone.
      </h2>
      <div className="app-grid">
        <div className="screen-card">
          <h3>Ckredence Mutual Funds App</h3>
          <div>
            {data.screens.map((s) => (
              <img
                key={s}
                loading="lazy"
                src={s}
                alt="Ckredence mutual fund app screen"
              />
            ))}
          </div>
        </div>
        <article className="app-stat">
          <Icon name="star" />
          <strong>4.9</strong>
          <p>User rating</p>
        </article>
        <article className="app-stat">
          <Icon name="people" />
          <strong>1,000+</strong>
          <p>Registered users</p>
        </article>
        <div className="downloads">
          <h3>Download the app</h3>
          <div>
            {data.stores.map((a, i) => (
              <Action key={a.url} href={a.url}>
                {i ? "Google Play" : "App Store"}
              </Action>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
function Blogs() {
  const [blogs, setBlogs] = useState(articles);
  useEffect(() => {
    if (import.meta.env.MODE === "pages") return;
    const controller = new AbortController();
    fetch("/api/articles", { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((items) => {
        if (items?.length === 4) setBlogs(items);
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);
  return (
    <section className="section tint" id="blogs" aria-labelledby="blogs-title">
      <div className="wrap">
        <Label>Blogs</Label>
        <div className="section-head">
          <h2 id="blogs-title">Latest market insights</h2>
          <a className="text-link" href={site + "/our-resources"}>
            View all blogs <Icon name="external" />
          </a>
        </div>
        <div className="blogs">
          <a className="blog-lead" href={blogs[0].url} aria-labelledby="blog-lead-title">
            <span className="lead-label">Latest article</span>
            <h3 id="blog-lead-title">{blogs[0].title}</h3>
            <span className="blog-meta">{blogs[0].date} · Ckredence Wealth</span>
            <span className="action">Read article <Icon name="arrow" size={16} /></span>
          </a>
          {blogs.slice(1).map((b) => (
            <a className="blog-story" href={b.url} key={b.url}>
              <div className="blog-cover">
                <img loading="lazy" src={b.image} alt="" />
              </div>
              <div className="blog-text">
                <h3>{b.title}</h3>
                <span className="blog-meta">{b.date} · Ckredence Wealth</span>
              </div>
              <Icon name="external" size={16} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
function Awards() {
  return (
    <section className="section wrap">
      <Label>Achievements &amp; Awards</Label>
      <h2>A journey of 35 years</h2>
      <div className="awards">
        {data.awards.map((v, i) => (
          <article key={v.title}>
            <Icon name="award" size={24} />
            <div>
              <small>
                {i === 3 || i === 4 ? "Achievement" : "Award & recognition"}
              </small>
              <h3>{v.title}</h3>
              <p>{v.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
export default function App() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <Strategies />
        <Statistics />
        <Manager />
        <MobileApp />
        <Blogs />
        <Awards />
        <Community />
        <Faq />
        <Reviews />
        <Support />
        <Reports />
      </main>
      <Footer />
    </>
  );
}
