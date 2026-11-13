import { BookOpen, Download, Library, Trash2 } from 'lucide-react';
import { UIStrings } from '../i18n/translations';
import { BookItem, Locale, ReadingProgress } from '../types';
import { downloadBookAsMarkdown } from '../utils/manuscriptParser';
import { BookCover } from './BookCover';

interface LibrarySectionProps {
  locale: Locale;
  t: UIStrings;
  ownedBooks: BookItem[];
  progressMap: Record<string, ReadingProgress>;
  onOpenReader: (book: BookItem) => void;
  onRemoveCustomBook: (bookId: string) => void;
}

export function LibrarySection({
  locale,
  t,
  ownedBooks,
  progressMap,
  onOpenReader,
  onRemoveCustomBook,
}: LibrarySectionProps) {
  return (
    <section
      id="library"
      className="border-t border-[var(--border-hairline)] bg-[var(--bg-canvas)] py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-16">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              {t.library.heading}
            </h2>
            <p className="mt-2 text-base text-[var(--text-secondary)]">
              {t.library.subheading}
            </p>
          </div>
          <span className="font-mono text-xs tabular-nums text-[var(--text-muted)]">
            {ownedBooks.length} {t.catalog.resultsCount}
          </span>
        </div>

        {ownedBooks.length === 0 ? (
          <div className="mt-10 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-6 py-12 text-center">
            <Library className="mx-auto h-9 w-9 text-[var(--text-muted)]" aria-hidden="true" />
            <h3 className="mt-4 font-serif text-xl font-semibold text-[var(--text-primary)]">
              {t.library.emptyTitle}
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-[var(--text-muted)]">
              {t.library.emptyBody}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#catalog"
                className="inline-flex min-h-[40px] items-center rounded bg-[#f39c12] px-5 py-2 text-xs font-semibold text-[#121316] transition-colors hover:bg-[#ffbe70]"
              >
                {t.library.browseCatalog}
              </a>
              <a
                href="#studio"
                className="inline-flex min-h-[40px] items-center rounded border border-[var(--border-strong)] px-5 py-2 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-[#f39c12]"
              >
                {t.library.publishWork}
              </a>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ownedBooks.map((book) => {
              const title = book.title[locale] || book.title.es;
              const progress = progressMap[book.id];
              const currentChapter = (progress?.chapterIndex ?? 0) + 1;
              return (
                <div
                  key={book.id}
                  className="flex items-start gap-4 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4"
                >
                  <button
                    type="button"
                    onClick={() => onOpenReader(book)}
                    className="w-24 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f39c12] rounded cursor-pointer"
                  >
                    <BookCover
                      title={title}
                      author={book.author}
                      image={book.coverImage}
                      coverStyle={book.coverStyle}
                      editionLang={book.editionLang}
                      showTitleOverlayOnCustom={false}
                    />
                  </button>

                  <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch">
                    <div>
                      <p className="text-xs text-[var(--text-muted)]">
                        {t.library.chapterLabel}{' '}
                        <span className="font-mono tabular-nums">{currentChapter}</span>{' '}
                        {t.library.ofLabel}{' '}
                        <span className="font-mono tabular-nums">
                          {book.chapters.length}
                        </span>
                      </p>
                      <h3 className="mt-1 font-serif text-lg font-semibold leading-snug text-[var(--text-primary)] line-clamp-2">
                        {title}
                      </h3>
                      <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
                        {book.author}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onOpenReader(book)}
                        className="inline-flex min-h-[34px] items-center gap-1.5 rounded bg-[#f39c12] px-3 py-1.5 text-xs font-semibold text-[#121316] whitespace-nowrap transition-colors hover:bg-[#ffbe70] cursor-pointer"
                      >
                        <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{t.library.continueReading}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => downloadBookAsMarkdown(book, locale)}
                        className="inline-flex min-h-[34px] items-center gap-1 rounded border border-[var(--border-strong)] px-2.5 py-1.5 text-xs font-medium text-[var(--text-primary)] whitespace-nowrap hover:border-[#f39c12] cursor-pointer"
                      >
                        <Download className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{t.library.downloadMd}</span>
                      </button>

                      {book.isUserPublished && (
                        <button
                          type="button"
                          onClick={() => onRemoveCustomBook(book.id)}
                          aria-label={`${t.library.removeCustom} ${title}`}
                          className="inline-flex min-h-[34px] items-center gap-1 rounded px-2 py-1.5 text-xs text-[var(--text-muted)] hover:text-[#ffb4ab] cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
