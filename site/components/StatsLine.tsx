import { BUILD_META } from '@/lib/build-meta';

const ZUIT_URL = 'https://github.com/shubhamkaushal765/zuit';

export default function StatsLine() {
  const { pillars, repos, stack, lastBuild } = BUILD_META;
  return (
    <p className="stats-line">
      <span className="stats-line__item">
        <span style={{ color: 'var(--color-pillar-code)' }}>{pillars}</span> pillars
      </span>
      <span className="stats-line__item">
        <span style={{ color: 'var(--color-pillar-ml)' }}>{repos}</span> repos
      </span>
      <span className="stats-line__item">{stack.join(' + ')}</span>
      <span className="stats-line__item">
        last build <time dateTime={lastBuild}>{lastBuild}</time>
      </span>
      <a className="stats-line__item stats-line__item--proof" href={ZUIT_URL}>
        zuit · rust SAST
      </a>
    </p>
  );
}
