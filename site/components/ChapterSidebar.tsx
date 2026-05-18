import Link from 'next/link';

export type SidebarChapter = {
  number: string;
  slug: string;
  title: string;
};

export default function ChapterSidebar({
  bookLabel,
  bookHref,
  basePath,
  chapters,
  currentSlug,
}: {
  bookLabel: string;
  bookHref: string;
  basePath: string;
  chapters: ReadonlyArray<SidebarChapter>;
  currentSlug: string;
}) {
  return (
    <aside className="chapter-sidebar" aria-label="Book contents">
      <Link href={bookHref} className="chapter-sidebar__book">
        {bookLabel}
      </Link>
      <ol className="chapter-sidebar__list">
        {chapters.map((c) => {
          const isCurrent = c.slug === currentSlug;
          return (
            <li
              key={c.slug}
              className={
                isCurrent
                  ? 'chapter-sidebar__item is-current'
                  : 'chapter-sidebar__item'
              }
            >
              <Link
                href={`${basePath}${c.slug}/`}
                className="chapter-sidebar__link"
                aria-current={isCurrent ? 'page' : undefined}
              >
                <span className="chapter-sidebar__num">{c.number}</span>
                <span className="chapter-sidebar__title">{c.title}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
