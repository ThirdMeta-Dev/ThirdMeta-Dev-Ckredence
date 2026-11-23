import { useState } from 'react';
import data from '../homepage.json';
import { Container, SectionHeading, Action, Label, actionUrl, useMedia } from './shared';

export function MutualFundApp() {
  return (
    <section data-section="06" className="section product" aria-labelledby="product-title">
      <Container>
        <SectionHeading id="product-title" label="Mutual Fund App">
          Convenince of mutual fund management, <em>now at your fingertips</em>
        </SectionHeading>
        <div className="product-layout">
          <div className="app-intro">
            <div>
              <h3>CKREDENCE MUTUAL FUNDS APP</h3>
              <p>Bringing Mutual Funds At Your Fingertips</p>
            </div>
            <div className="phone-group">
              {[2, 1, 3].map((n) => (
                <img
                  key={n}
                  className={'phone phone-' + n}
                  src={`/media/app-screen-${n}.webp`}
                  alt="Ckredence mutual fund app screen"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
          <div className="app-details">
            <div className="app-proof">
              <h3>TRUSTED BY USERS</h3>
              <strong>
                4.9{' '}
                <span className="star" aria-hidden="true">
                  ★
                </span>
              </strong>
              <p>Our Mutual Fund App Is Easy To Use &amp; Secure</p>
            </div>
            <div className="app-proof">
              <h3>1000+ REGISTERED USERS</h3>
              <div className="avatars">
                {data.appAvatars.map((u) => (
                  <img key={u} src={u} alt="" loading="lazy" />
                ))}
                <span>YOU</span>
              </div>
              <p>Join the community of 1,000+ people</p>
            </div>
            <div className="app-download">
              <h3>DOWNLOAD NOW</h3>
              <p>Our app is available on Play Store &amp; App Store</p>
              <div className="stores">
                {data.appStores.map((item, i) => (
                  <a href={item.href} key={item.href} aria-label={item.label}>
                    <small>{i ? 'GET IT ON' : 'Download on the'}</small>
                    <strong>{i ? 'Google Play' : 'App Store'}</strong>
                  </a>
                ))}
              </div>
              <img
                className="download-screen"
                src="/media/app-screen-1.webp"
                alt="Ckredence mutual fund app screen"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Blogs() {
  return (
    <section data-section="07" className="section blogs" aria-labelledby="blogs-title">
      <Container>
        <SectionHeading id="blogs-title" label="Blogs" align="left">
          Read Our Latest Blogs
        </SectionHeading>
        <div className="blog-grid">
          {data.blogs.map((item, i) => (
            <a
              href={item.href}
              key={item.href}
              className={i === data.blogs.length - 1 ? 'story story-compact' : 'story'}
            >
              <div className="story-art">
                <img src={item.image} alt="" loading="lazy" />
              </div>
              <div className="story-copy">
                <p className="metadata">
                  {item.publisher}
                  <span>·</span>
                  {item.date}
                </p>
                <h3>{item.title}</h3>
              </div>
            </a>
          ))}
          <Action secondary href={actionUrl('/our-resources')}>
            View All Blogs
          </Action>
        </div>
      </Container>
    </section>
  );
}

function MovingGroup({ items, render, reverse }) {
  return (
    <div className={'motion-track' + (reverse ? ' reverse' : '')}>
      {[0, 1].map((copy) => (
        <div className="motion-copy" key={copy} aria-hidden={copy === 1 ? true : undefined}>
          {items.map(render)}
        </div>
      ))}
    </div>
  );
}

function MotionButton({ paused, toggle, target }) {
  return (
    <button className="motion-toggle" aria-pressed={paused} onClick={toggle}>
      <span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span>
      {paused ? 'Resume' : 'Pause'} {target}
    </button>
  );
}

export function Awards() {
  const [paused, setPaused] = useState(false);
  const reduced = useMedia('(prefers-reduced-motion: reduce)');
  const card = (item) => (
    <article className="award" key={item.title}>
      <p className="award-type">{item.label}</p>
      <h3>{item.title}</h3>
      <p>{item.detail}</p>
    </article>
  );
  return (
    <section
      data-section="08"
      className={'awards section' + (paused ? ' paused' : '')}
      aria-labelledby="awards-title"
    >
      <Container className="awards-layout">
        <div className="awards-intro">
          <Label>Achievements &amp; Awards</Label>
          <h2 id="awards-title">
            A Graceful Journey Of <em>35 Years</em>
          </h2>
          <p>
            Our milestones and industry recognition that reflect our commitment to excellence and
            client success.
          </p>
          {!reduced && (
            <MotionButton paused={paused} toggle={() => setPaused(!paused)} target="awards" />
          )}
        </div>
        <div className="awards-window">
          <MovingGroup items={data.awards.slice(0, 3)} render={card} />
          <MovingGroup items={data.awards.slice(3)} render={card} reverse />
        </div>
      </Container>
    </section>
  );
}

export function Communities() {
  return (
    <section data-section="09" className="section communities" aria-labelledby="community-title">
      <Container>
        <SectionHeading id="community-title" label="Join Our Community">
          Regular Updates <em>On Whatsapp</em>
        </SectionHeading>
        <div className="community-list">
          {data.communities.map((item) => (
            <a href={item.href} key={item.href}>
              <span className="chat-icon" aria-hidden="true">
                ···
              </span>
              <span>{item.label}</span>
              <i className="chevron" />
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function Faq() {
  const [open, setOpen] = useState(0);
  const [all, setAll] = useState(false);
  const visible = all ? data.faq : data.faq.slice(0, 7);
  return (
    <section data-section="10" className="section faq" aria-labelledby="faq-title">
      <Container className="faq-layout">
        <h2 id="faq-title">General FAQ’s</h2>
        <div className="faq-intro">
          <p>
            Answers to commonly asked questions about our templates, services, and purchasing
            process.
          </p>
          <Action secondary href={actionUrl('/contact-us')}>
            Ask Question
          </Action>
        </div>
        <div className="questions">
          {visible.map(({ q, a }, i) => (
            <div className="question" key={q}>
              <h3>
                <button
                  aria-expanded={open === i}
                  aria-controls={'answer-' + i}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  {q}
                  <span aria-hidden="true">{open === i ? '−' : '+'}</span>
                </button>
              </h3>
              <div className="answer" hidden={open !== i} id={'answer-' + i}>
                {a}
              </div>
            </div>
          ))}
          {!all && (
            <button
              className="text-button show-more"
              onClick={() => {
                setAll(true);
                requestAnimationFrame(() =>
                  document.querySelector('.question:nth-child(8) button')?.focus(),
                );
              }}
            >
              Show More
            </button>
          )}
        </div>
      </Container>
    </section>
  );
}

export function Testimonials() {
  const [paused, setPaused] = useState(false);
  const reduced = useMedia('(prefers-reduced-motion: reduce)');
  const card = (item) => (
    <figure className="review" key={item.author}>
      <blockquote>{item.quote}</blockquote>
      <figcaption>
        <img src={item.image} alt="" loading="lazy" />
        <span>
          <b>{item.author}</b>
          <small>{item.age}</small>
        </span>
        <b className="google-mark" aria-label="Google">
          G
        </b>
      </figcaption>
    </figure>
  );
  return (
    <section
      data-section="11"
      className={'section testimonials' + (paused ? ' paused' : '')}
      aria-labelledby="reviews-title"
    >
      <Container>
        <SectionHeading id="reviews-title" label="Testimonials">
          What Our Clients <em>Say About Us</em>
        </SectionHeading>
        <div className="heading-row">
          {!reduced && (
            <MotionButton paused={paused} toggle={() => setPaused(!paused)} target="reviews" />
          )}
        </div>
      </Container>
      <Container className="reviews-window">
        <MovingGroup items={data.reviews.slice(0, 6)} render={card} />
        <MovingGroup items={data.reviews.slice(6)} render={card} reverse />
      </Container>
    </section>
  );
}
