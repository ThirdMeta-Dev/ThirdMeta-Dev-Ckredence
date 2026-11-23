import { useId, useState } from 'react';

const format = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 });
const compact = new Intl.NumberFormat('en-IN', { notation: 'compact', maximumFractionDigits: 1 });

export default function PerformanceChart({ strategy, growth = false }) {
  const [active, setActive] = useState(null);
  const id = useId();
  const labels = growth ? strategy.dates : strategy.periods;
  const series = growth ? strategy.growth : strategy.returns;
  const values = series.flatMap((line) => line.values);
  const min = growth ? Math.min(...values) * 0.98 : Math.min(0, ...values);
  const max = Math.max(...values) * 1.06;
  const left = 44,
    right = 394,
    top = 14,
    bottom = 141;
  const x = (index) =>
    left + (right - left) * (growth ? index / (labels.length - 1) : (index + 0.5) / labels.length);
  const y = (value) => bottom - ((bottom - top) * (value - min)) / (max - min);
  const title = growth ? 'Portfolio growth' : 'Return comparison';
  const close = () => setActive(null);
  function inspect(event) {
    const box = event.currentTarget.getBoundingClientRect();
    const ratio = (((event.clientX - box.left) * 410) / box.width - left) / (right - left);
    setActive(
      Math.max(
        0,
        Math.min(
          labels.length - 1,
          growth ? Math.round(ratio * (labels.length - 1)) : Math.floor(ratio * labels.length),
        ),
      ),
    );
  }
  function keyboard(event) {
    const positions = {
      ArrowLeft: Math.max(0, (active ?? 1) - 1),
      ArrowRight: Math.min(labels.length - 1, (active ?? -1) + 1),
      Home: 0,
      End: labels.length - 1,
    };
    if (event.key in positions) {
      event.preventDefault();
      setActive(positions[event.key]);
    }
    if (event.key === 'Escape') close();
  }
  return (
    <figure className="chart">
      <figcaption>
        <strong>{title}</strong>
        <span>{growth ? strategy.growthDate : 'As on 31st October, 2026'}</span>
      </figcaption>
      <div
        className="chart-plot"
        role="group"
        aria-label={title + '. Use left and right arrow keys to inspect values.'}
        tabIndex="0"
        onFocus={() => setActive(0)}
        onBlur={close}
        onKeyDown={keyboard}
        onPointerMove={inspect}
        onPointerDown={inspect}
        onPointerLeave={close}
      >
        <svg viewBox="0 0 410 170" aria-hidden="true">
          {[0, 1, 2, 3].map((t) => {
            const value = min + ((max - min) * t) / 3;
            return (
              <g key={t}>
                <line x1={left} x2={right} y1={y(value)} y2={y(value)} className="grid-line" />
                <text x={left - 5} y={y(value) + 3} textAnchor="end">
                  {growth ? compact.format(value) : Math.round(value) + '%'}
                </text>
              </g>
            );
          })}
          {series.map((line, j) =>
            growth ? (
              <polyline
                key={line.name}
                className={`trace trace-${j}`}
                points={line.values.map((v, i) => `${x(i)},${y(v)}`).join(' ')}
              />
            ) : (
              <g key={line.name} className={`bars bars-${j}`}>
                {line.values.map((v, i) => (
                  <rect
                    key={i}
                    x={x(i) + (j ? 0 : -9)}
                    width="8"
                    y={Math.min(y(0), y(v))}
                    height={Math.max(1, Math.abs(y(0) - y(v)))}
                  />
                ))}
              </g>
            ),
          )}
          {labels.map(
            (label, i) =>
              (!growth ||
                i === 0 ||
                i === labels.length - 1 ||
                i === Math.floor(labels.length / 2)) && (
                <text
                  key={label}
                  x={x(i)}
                  y="161"
                  textAnchor={growth && i === labels.length - 1 ? 'end' : 'middle'}
                >
                  {label}
                </text>
              ),
          )}
          {active !== null && (
            <line className="chart-guide" x1={x(active)} x2={x(active)} y1={top} y2={bottom} />
          )}
        </svg>
      </div>
      <div className="legend">
        {series.map((line, i) => (
          <span key={line.name}>
            <i className={`swatch s${i}`} />
            {line.name}
          </span>
        ))}
      </div>
      <output
        id={id}
        className={'chart-tooltip' + (active === null ? ' hidden' : '')}
        aria-live="polite"
      >
        {active !== null && (
          <>
            <strong>{labels[active]}</strong>
            {series.map((line) => (
              <span key={line.name}>
                {line.name} ·{' '}
                {line.values[active] == null ? '—' : format.format(line.values[active])}
              </span>
            ))}
          </>
        )}
      </output>
    </figure>
  );
}
