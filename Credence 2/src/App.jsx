import { useEffect, useRef, useState } from "react";
import data from "./content.json";
import articles from "./articles.json";
import { Header, Hero, Highlights, Icon, Action, Label, site } from "./ui.jsx";
import {
  Community,
  Faq,
  Reviews,
  Support,
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
    <section id="approaches" aria-labelledby="approaches-heading">
      <div className="section tint">
        <div className="wrap approach-track" ref={track}>
          <header className="approach-heading" ref={heading}>
            <div className="approach-intro">
              <Label>Portfolio Management Services</Label>
              <h2 id="approaches-heading">PMS investment approaches</h2>
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
      </div>
      <Statistics />
    </section>
  );
}
function Statistics() {
  return (
    <section className="stats wrap" id="pms-metrics" aria-label="PMS key statistics">
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
  const [lead, ...earlier] = blogs;
  const preview = articles.find((story) => story.url === lead.url)?.preview;
  const share = preview && (100 * preview.fundAssets / preview.totalAssets).toFixed(1);

  return (
    <section className="section wrap" id="blogs" aria-labelledby="blogs-title">
      <Label>Blogs</Label>
      <div className="section-head market-heading">
        <h2 id="blogs-title">Latest market insights</h2>
        <a className="text-link" href={site + "/our-resources"}>View all blogs <Icon name="external" size={16} /></a>
      </div>

      <article className="market-lead">
        <div className="market-lead-copy">
          <p className="market-kicker">Latest article</p>
          <h3>{lead.title}</h3>
          <p className="market-credit">{lead.date} · Ckredence Wealth</p>
          <a className="action" href={lead.url} aria-label={`Read article: ${lead.title}`}>Read article <Icon name="arrow" size={16} /></a>
        </div>
        {preview ? (
          <figure className="market-figure">
            <figcaption>{preview.subject}</figcaption>
            <div className="market-measure"><strong>{share}%</strong><span>{preview.period}</span></div>
            <div className="market-bar" aria-hidden="true"><span style={{ width: share + "%" }} /></div>
            <p>₹{preview.fundAssets} lakh crore of ₹{preview.totalAssets} {preview.unit}</p>
          </figure>
        ) : (
          <img className="market-cover" src={lead.image} alt="" />
        )}
      </article>

      <div className="market-backlist">
        <h3>Earlier articles</h3>
        <ul>
          {earlier.map((story) => (
            <li key={story.url}>
              <a href={story.url}>
                <img src={story.image} loading="lazy" alt="" width="84" height="56" />
                <div>
                  <h4>{story.title}</h4>
                  <p className="market-credit">{story.date} · Ckredence Wealth</p>
                </div>
                <Icon name="external" size={16} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
function Awards() {
  const { strategy, source, rankings } = data.pmsRecognition;
  const approach = data.strategies.find((item) => item.label === strategy);
  return (
    <section className="section wrap" id="awards" aria-labelledby="awards-title">
      <Label>A journey of 35 years</Label>
      <h2 id="awards-title">Achievements &amp; awards</h2>
      <div className="recognition-layout">
        <article className="recognition-feature">
          <p className="recognition-kicker">PMS rankings in India</p>
          <h3>{approach.title}</h3>
          <dl className="recognition-ranks">
            {rankings.map(({ period, result }) => (
              <div key={period}><dt>{period}</dt><dd>{result}</dd></div>
            ))}
          </dl>
          <p className="recognition-source">Source: {source}.</p>
          <Action href={approach.link}>Explore this strategy</Action>
        </article>
        <div className="recognition-register">
          <h3>Industry awards</h3>
          <ul>
            {data.awards.map(({ title, detail, period }) => (
              <li key={title}>
                <span className="recognition-year">{period}</span>
                <div><h4>{title}</h4><p>{detail}</p></div>
              </li>
            ))}
          </ul>
        </div>
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
        <Highlights />
        <Services />
        <Strategies />
        <Manager />
        <MobileApp />
        <Blogs />
        <Awards />
        <Community />
        <Faq />
        <Reviews />
      </main>
      <div className="page-close">
        <Support />
        <Footer />
      </div>
    </>
  );
}
