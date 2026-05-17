import { BUILD_META } from '@/lib/build-meta';

export default function StatsLine() {
  const { pillars, repos, stack, lastBuild } = BUILD_META;
  return (
    <p className="stats-line" aria-label={`${pillars} pillars, ${repos} repos, stack ${stack.join(' plus ')}, last build ${lastBuild}`}>
      <span>{pillars} pillars</span>
      <span aria-hidden="true">{'  ·  '}</span>
      <span>{repos} repos</span>
      <span aria-hidden="true">{'  ·  '}</span>
      <span>{stack.join(' + ')}</span>
      <span aria-hidden="true">{'  ·  '}</span>
      <span>
        last build <time dateTime={lastBuild}>{lastBuild}</time>
      </span>
    </p>
  );
}
