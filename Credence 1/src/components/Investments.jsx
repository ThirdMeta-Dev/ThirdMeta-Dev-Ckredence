import { useState } from 'react';
import data from '../homepage.json';
import { Container, SectionHeading, Action, actionUrl } from './shared';
import PerformanceChart from './PerformanceChart';

export function Strategies() {
  const [index, setIndex] = useState(0);
  const selected = data.strategies[index];
  function navigate(event, i) {
    const last = data.strategies.length - 1;
    const next = {
      ArrowLeft: (i + last) % (last + 1),
      ArrowRight: (i + 1) % (last + 1),
      Home: 0,
      End: last,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setIndex(next);
    document.getElementById('strategy-tab-' + next)?.focus();
  }
  return (
    <section data-section="03" className="section strategies" aria-labelledby="strategy-title">
      <Container>
        <SectionHeading id="strategy-title">
          PMS Investment <em>Approaches</em>
        </SectionHeading>
        <div role="tablist" className="strategy-tabs" aria-label="PMS investment approaches">
          {data.strategies.map((item, i) => (
            <button
              key={item.name}
              id={'strategy-tab-' + i}
              role="tab"
              aria-controls="strategy-panel"
              aria-selected={i === index}
              tabIndex={i === index ? 0 : -1}
              onKeyDown={(e) => navigate(e, i)}
              onClick={() => setIndex(i)}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div
          id="strategy-panel"
          role="tabpanel"
          aria-labelledby={'strategy-tab-' + index}
          tabIndex="0"
        >
          <div className="strategy-intro">
            <div>
              <h3>{selected.title}</h3>
              <p>{selected.description}</p>
            </div>
            <Action secondary href={selected.href}>
              Know More
            </Action>
          </div>
          <div className="charts" key={selected.name}>
            <PerformanceChart strategy={selected} />
            <PerformanceChart strategy={selected} growth />
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Metrics() {
  return (
    <section data-section="04" aria-label="PMS Key Statistics" className="metrics">
      <Container as="dl">
        {data.metrics.map(({ label, value }) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </Container>
    </section>
  );
}

export function Manager() {
  return (
    <section data-section="05" className="section manager" aria-labelledby="manager-title">
      <Container className="profile-container">
        <div className="manager-layout">
          <div className="manager-copy">
            <SectionHeading id="manager-title" align="left">
              Desk Of <em>Fund Manager</em>
            </SectionHeading>
            <div className="manager-details">
              <h3>Kartik Mehta</h3>
              <p className="experience">22+ Years Experience</p>
              <p className="manager-note">
                Our Fund Manager Publishes Monthly overview on market and our current holdings
              </p>
              <Action href={actionUrl('/insights')}>View Articles</Action>
            </div>
          </div>
          <div className="manager-photo">
            <img src="/media/kartik-mehta.webp" alt="Kartik Mehta" loading="lazy" />
          </div>
        </div>
      </Container>
    </section>
  );
}
