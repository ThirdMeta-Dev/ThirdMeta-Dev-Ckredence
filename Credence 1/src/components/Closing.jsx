import { useEffect, useRef, useState } from 'react';
import data from '../homepage.json';
import { Container, Action, actionUrl, mediaUrl } from './shared';

export function Expert() {
  return (
    <section className="section expert" data-section="12" aria-labelledby="expert-title">
      <Container className="expert-box">
        <div>
          <h2 id="expert-title">
            Need Help?, Talk to an <em>Expert</em>
          </h2>
          <p>Stay connected with us through Whatsapp</p>
        </div>
        <div>
          <ul>
            {['Instant Assistance', 'Personalized Solutions', 'Real-Time Query Resolution'].map(
              (benefit) => (
                <li key={benefit}>{benefit}</li>
              ),
            )}
          </ul>
          <Action href="https://api-wa.co/tRC0zw">Quick Support</Action>
          <small>No spam, just genuine support!</small>
        </div>
      </Container>
    </section>
  );
}

export function Complaints() {
  const [open, setOpen] = useState(false);
  const box = useRef(null);
  const toggle = useRef(null);
  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      } else if (e.type === 'pointerdown' && !box.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('keydown', close);
    document.addEventListener('pointerdown', close);
    return () => {
      document.removeEventListener('keydown', close);
      document.removeEventListener('pointerdown', close);
    };
  }, [open]);
  return (
    <aside data-section="13" aria-label="Complaint Reports" className="complaints" ref={box}>
      <button
        className="complaint-toggle"
        ref={toggle}
        aria-controls="report-actions"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <img src={mediaUrl('/media/complaints.webp')} alt="" />
        <span>
          <strong>Complaint Reports</strong>
          <small className="desktop-report">0 Score Reports Filed</small>
          <small className="mobile-report">Click to see more</small>
        </span>
        <span className="complaint-more">{open ? 'Show less' : 'Show More'}</span>
        <i className={'chevron ' + (open ? 'down' : 'up')} />
      </button>
      <div id="report-actions" hidden={!open} className="report-links">
        {[
          ['PMS', '/complaint-dashboard'],
          ['RIA', '/complaint-dashboard-ria'],
          ['AIF', '/complaint-dashboard-aif'],
        ].map(([name, path]) => (
          <a key={name} href={actionUrl(path)}>
            {name} Report
          </a>
        ))}
      </div>
    </aside>
  );
}

function Links({ items }) {
  return items.map((link) => (
    <a key={link.href} href={link.href}>
      {link.label}
    </a>
  ));
}

export function Footer() {
  const groups = data.footerGroups;
  return (
    <footer data-section="14" className="footer">
      <Container>
        <div className="footer-brand">
          <a href="#content">
            <img src={mediaUrl('/media/logo-light.webp')} alt="Ckredence Wealth" />
          </a>
          <p>
            Transforming Investments
            <br />
            into Lasting Wealth
          </p>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          <Links items={data.footerNav} />
        </nav>
        <div className="office-grid">
          {data.offices.map((office) => (
            <div key={office.name}>
              <h3>{office.name}</h3>
              <address>{office.address}</address>
            </div>
          ))}
        </div>
        <div className="entities">
          {data.entities.map(([name, id]) => (
            <p key={name}>
              <strong>{name}</strong>
              <span>{id}</span>
            </p>
          ))}
        </div>
        <div className="footer-details">
          <div>
            <h3>Contact Us</h3>
            {groups['Contact Us'].map((item, i) => (
              <p key={item.href}>
                <span>{data.contactLabels[i]}</span>
                <a href={item.href}>{item.label}</a>
              </p>
            ))}
          </div>
          <div>
            <h3>Related Links</h3>
            <Links items={groups['Related Links']} />
          </div>
          <div>
            <h3>More Info</h3>
            {groups['More Info'].map(([label, value]) => (
              <p key={label}>
                <span>{label}</span>
                {value}
              </p>
            ))}
          </div>
          <div>
            <h3>Company</h3>
            <Links items={groups.Company} />
          </div>
          <div>
            <h3>Support</h3>
            <Links items={groups.Support} />
          </div>
        </div>
        <div className="footer-end">
          <p>
            <a href="#content">Ckredence Wealth</a> © 2026 All Rights Reserved
          </p>
          <div>
            <Links items={data.social} />
          </div>
        </div>
      </Container>
    </footer>
  );
}
