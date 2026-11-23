import { useEffect, useRef, useState } from "react";
import data from "./content.json";
import { Action, Icon, Label, Steps, site, contact } from "./ui.jsx";

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
  const questions = more ? data.faq : data.faq.slice(0, 7);
  return (
    <section className="section wrap faq">
      <div>
        <Label>Investor information</Label>
        <h2>General FAQs</h2>
        <Action href={contact}>Ask a question</Action>
      </div>
      <div>
        {questions.map((item, i) => (
          <article className="faq-row" key={item.q}>
            <h3>
              <button
                aria-expanded={active === i}
                aria-controls={"answer-" + i}
                onClick={() => setActive(active === i ? -1 : i)}
              >
                {item.q}
                <span>{active === i ? "−" : "+"}</span>
              </button>
            </h3>
            <div id={"answer-" + i} hidden={active !== i}>
              {i === 5 ? (
                <p>
                  <a
                    href={
                      site + "/#:~:text=What%20are%20the%20various%20securities"
                    }
                  >
                    Read Ckredence’s published FAQ
                  </a>{" "}
                  or <a href={contact}>ask the team</a> about eligible
                  securities.
                </p>
              ) : (
                <p>{item.a}</p>
              )}
            </div>
          </article>
        ))}
        <button
          className="outline"
          onClick={() => {
            setMore(!more);
            if (more && active >= 7) setActive(-1);
          }}
        >
          {more ? "Show fewer" : "Show more"}
        </button>
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
    <section className="section wrap">
      <div className="support">
        <div>
          <Label>WhatsApp support</Label>
          <h2>
            Need help?
            <br />
            Talk to an expert.
          </h2>
          <p>
            Connect with our team for instant assistance, personalized
            solutions, and real-time query resolution.
          </p>
          <Action href={data.support.links[0].url}>Quick support</Action>
          <small>No spam, just genuine support.</small>
        </div>
        <img loading="lazy" src={data.support.image} alt="" />
      </div>
    </section>
  );
}
export function Reports() {
  return (
    <section className="wrap reports">
      <details>
        <summary>
          <Icon name="shield" />
          <strong>Complaint reports</strong>
          <Icon name="plus" />
        </summary>
        <div>
          {[
            ["PMS", "/complaint-dashboard"],
            ["RIA", "/complaint-dashboard-ria"],
            ["AIF", "/complaint-dashboard-aif"],
          ].map(([name, url]) => (
            <a className="text-link" key={name} href={site + url}>
              {name} report <Icon name="external" size={15} />
            </a>
          ))}
        </div>
      </details>
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
