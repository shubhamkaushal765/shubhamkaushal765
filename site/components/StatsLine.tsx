import { BUILD_META } from '@/lib/build-meta';

export default function StatsLine() {
  const { pillars, repos, stack, lastBuild } = BUILD_META;
  return (
    <p
      className="stats-line"
      aria-label={`${pillars} pillars, ${repos} repos, stack ${stack.join(' plus ')}, last build ${lastBuild}`}
    >
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
    </p>
  );
}
