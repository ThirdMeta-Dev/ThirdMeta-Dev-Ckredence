import { useEffect, useRef, useState } from "react";
import data from "./content.json";
import { Icon, Label, Steps, site, contact } from "./ui.jsx";

export function Community() {
  return (
    <section className="tint section">
      <div className="wrap">
        <Label>Join our community</Label>
        <h2>Regular updates on WhatsApp</h2>
        <div className="communities">
          {data.communities.map((group, i) => (
            <a key={group.url} href={group.url}>
              <Icon name="chat" />
              <span>
                <strong>
                  {["Equity", "IPO", "Mutual Fund", "Portfolio Management"][i]}
                </strong>
                <small>{group.label.split(" - ")[0]}</small>
              </span>
              <Icon name="external" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Faq() {
  const [more, setMore] = useState(false);
  const [active, setActive] = useState(0);
  const firstAdditional = useRef(null);
  const initialCount = 7;
  const questions = more ? data.faq : data.faq.slice(0, initialCount);
  useEffect(() => {
    if (more) firstAdditional.current?.focus();
  }, [more]);
  return (
    <section className="section wrap faq" id="faqs" aria-labelledby="faq-heading">
      <header>
        <Label>Investor information</Label>
        <h2 id="faq-heading">General FAQs</h2>
      </header>
      <div className="faq-list" id="faq-list">
        {questions.map((item, i) => (
          <article className={active === i ? "faq-row is-open" : "faq-row"} key={i}>
            <h3>
              <button
                ref={i === initialCount ? firstAdditional : null}
                aria-expanded={active === i}
                aria-controls={"answer-" + i}
                onClick={() => setActive(active === i ? -1 : i)}
              >
                <span>{item.q}</span>
                <span className="faq-toggle" aria-hidden="true">{active === i ? "−" : "+"}</span>
              </button>
            </h3>
            <div id={"answer-" + i} hidden={active !== i}>
              {!item.a ? (
                <p>
                  <a
                    href={
                      site + "/#:~:text=What%20are%20the%20various%20securities"
                    }
                  >
                    See eligible securities
                  </a>{" "}
                  or <a href={contact}>ask the team</a>.
                </p>
              ) : (
                <p>{item.a}</p>
              )}
              {item.detail && active === i && (
                <details className="faq-detail">
                  <summary>Full answer</summary>
                  <p>{item.detail}</p>
                </details>
              )}
            </div>
          </article>
        ))}
      </div>
      <div className="faq-actions">
        {data.faq.length > initialCount && <button
          className="outline"
          aria-controls="faq-list"
          aria-expanded={more}
          onClick={() => {
            setMore(!more);
            if (more && active >= initialCount) setActive(-1);
          }}
        >
          {more ? "Show fewer questions" : `Show ${data.faq.length - initialCount} more questions`}
        </button>}
        <a className="text-link" href={contact}>Ask a question <Icon name="external" size={16} /></a>
      </div>
    </section>
  );
}
export function Reviews() {
  const [index, setIndex] = useState(0);
  const rail = useRef(null);
  const touch = useRef(null);
  const count = data.reviews.length;
  const move = (by) => setIndex((current) => (current + by + count) % count);

  useEffect(() => {
    const strip = rail.current;
    const selected = strip.children[index];
    strip.scrollTo({
      left: selected.offsetLeft - (strip.clientWidth - selected.offsetWidth) / 2,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }, [index]);

  function onKey(event) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    move(event.key === "ArrowLeft" ? -1 : 1);
  }

  function finishSwipe(event) {
    const start = touch.current;
    touch.current = null;
    if (!start || !event.changedTouches.length) return;
    const end = event.changedTouches[0];
    const dx = end.clientX - start.clientX;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(end.clientY - start.clientY)) {
      move(dx < 0 ? 1 : -1);
    }
  }

  return (
    <section className="section client-reviews" id="testimonials" aria-labelledby="reviews-heading" aria-roledescription="carousel">
      <div className="review-wrap">
        <h2 id="reviews-heading">What our clients say</h2>
        <div className="review-stage" tabIndex={0} role="group" aria-label="Client reviews. Use left and right arrow keys to browse."
          onKeyDown={onKey}
          onTouchStart={(event) => { touch.current = event.touches.length === 1 ? event.touches[0] : null; }}
          onTouchEnd={finishSwipe} onTouchCancel={() => { touch.current = null; }}>
          {data.reviews.map((item, i) => {
            const half = Math.floor(count / 2);
            const offset = (i - index + count + half) % count - half;
            return (
              <figure className="review-slide" key={item.name} aria-hidden={offset !== 0}
                data-side={Math.sign(offset)} style={{ "--slide-offset": offset, visibility: Math.abs(offset) > 2 ? "hidden" : undefined }}>
                <span className="review-quote" aria-hidden="true">“</span>
                <blockquote>{item.text.slice(1, -2).join(" ")}</blockquote>
                <figcaption>
                  {item.image ? <img src={item.image} alt="" width="48" height="48" loading="lazy" /> : <span>{item.name[0]}</span>}
                  <span className="review-source" aria-hidden="true">G</span>
                  <span className="review-credit">
                    <strong>{item.name}</strong>
                    <small>Google review · {item.text[0]}</small>
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
        <div className="review-controls" onKeyDown={onKey}>
          <Steps label="review" prev={() => move(-1)} next={() => move(1)} />
        </div>
        <p className="review-status" role="status">{`Review ${index + 1} of ${count}: ${data.reviews[index].name}. ${data.reviews[index].text.slice(1, -2).join(" ")}`}</p>
        <div className="review-directory" ref={rail} role="group" aria-label="Choose a client review">
          {data.reviews.map((item, i) => (
            <button key={item.name} type="button" aria-pressed={i === index} onClick={() => setIndex(i)}>
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Support() {
  return (
    <section className="expert-support" id="expert-support" aria-labelledby="expert-heading">
      <div className="support">
        <img loading="lazy" src={data.support.image} alt="" />
        <div className="support-intro">
          <h2 id="expert-heading">Need help? Talk to an expert</h2>
          <p>Stay connected with us through WhatsApp</p>
        </div>
        <ul className="support-benefits">
          {["Instant Assistance", "Personalized Solutions", "Real-Time Query Resolution"].map(benefit => (
            <li key={benefit}><span aria-hidden="true">✓</span>{benefit}</li>
          ))}
        </ul>
        <div className="support-contact">
          <a href={data.support.links[0].url} target="_blank" rel="noopener noreferrer" aria-label="Quick Support on WhatsApp (opens in a new tab)">
            {data.support.links[0].label}<span><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"></path></svg></span>
          </a>
          <p><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></svg>No spam, just genuine support!</p>
        </div>
      </div>
    </section>
  );
}
function Links({ title, items }) {
  return (
    <div>
      <h3>{title}</h3>
      <ul>
        {items.map((a) => (
          <li key={a.url}>
            <a href={a.url}>{a.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
export function Footer() {
  const groups = data.footer.groups;
  return (
    <footer>
      <div className="wrap">
        <div className="footer-brand">
          <a href="#" aria-label="Ckredence Wealth home">
            <img className="logo" src={data.logo} alt="Ckredence Wealth" />
          </a>
          <p>Transforming investments into lasting wealth.</p>
        </div>
        <div className="foot-grid">
          <Links title="Company" items={groups.company} />
          <Links title="Investor resources" items={groups.related} />
          <Links title="Policies & disclosures" items={groups.policies} />
          <Links title="Contact" items={groups.contact} />
        </div>
        <div className="offices">
          {data.footer.offices.map(([name, address]) => (
            <div key={name}>
              <h3>{name}</h3>
              <p>{address}</p>
            </div>
          ))}
        </div>
        <div className="reg">
          <div>
            {data.footer.entities.map(([name, id]) => (
              <p key={id}>
                <strong>{name}</strong> · {id}
              </p>
            ))}
          </div>
          <div>
            {data.footer.registrations.map(([label, v]) => (
              <p key={label}>
                {label} · {v}
              </p>
            ))}
          </div>
        </div>
        <div className="foot-bottom">
          <small>© 2026 Ckredence Wealth</small>
          <div>
            {groups.social.map((a) => (
              <a key={a.url} href={a.url}>
                {a.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
