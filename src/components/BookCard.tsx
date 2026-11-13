import { BookOpen, Check, Plus } from 'lucide-react';
import { UIStrings } from '../i18n/translations';
import { BookItem, Locale } from '../types';
import { BookCover } from './BookCover';

interface BookCardProps {
  book: BookItem;
  locale: Locale;
  t: UIStrings;
  isOwned: boolean;
  isInCart: boolean;
  onOpenReader: (book: BookItem) => void;
  onAddToCart: (bookId: string) => void;
}

export function BookCard({
  book,
  locale,
  t,
  isOwned,
  isInCart,
  onOpenReader,
  onAddToCart,
}: BookCardProps) {
  const title = book.title[locale] || book.title.es;
  const categoryLabel = t.categories[book.category];
  const langLabel = book.editionLang.toUpperCase();

  return (
    <article className="group flex flex-col justify-between rounded-md border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5 transition-colors duration-200 hover:border-[var(--border-strong)]">
      <div>
        {/* 3:4 Cover Stage with 3D hover tilt & indigo ambient glow */}
        <button
          type="button"
          onClick={() => onOpenReader(book)}
          className="book-jacket-stage relative block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f39c12] rounded cursor-pointer"
          aria-label={`${t.catalog.previewCta}: ${title}`}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-2 rounded-lg bg-[#6366f1]/0 blur-xl transition-all duration-300 group-hover:bg-[#6366f1]/15"
          />
          <div className="book-jacket-card relative shadow-lg">
            <BookCover
              title={title}
              author={book.author}
              image={book.coverImage}
              coverStyle={book.coverStyle}
              editionLang={book.editionLang}
            />
          </div>
        </button>

        {/* Clean Unboxed Metadata (Zero-Pill Discipline) */}
        <div className="mt-5 flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <span>{categoryLabel}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono">{langLabel}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono tabular-nums">
            {book.pages} {t.catalog.pagesUnit}
          </span>
        </div>

        <h3 className="mt-2 font-serif text-xl font-semibold leading-snug text-[var(--text-primary)] line-clamp-2">
          <button
            type="button"
            onClick={() => onOpenReader(book)}
            className="text-left transition-colors duration-150 hover:text-[var(--accent-amber-bright)] cursor-pointer"
          >
            {title}
          </button>
        </h3>

        <p className="mt-1 text-sm font-medium text-[var(--text-secondary)]">
          {book.author}
        </p>

        <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-muted)] line-clamp-2">
          {book.synopsis[locale] || book.synopsis.es}
        </p>
      </div>

      {/* Price & Functional Action Footer */}
      <div className="mt-6 flex items-center justify-between gap-3 border-t border-[var(--border-hairline)] pt-4">
        <div className="min-w-0">
          {isOwned ? (
            <span className="text-xs font-semibold text-[var(--accent-ochre)]">
              {book.isUserPublished ? t.catalog.authorPublishedLabel : t.catalog.ownedLabel}
            </span>
          ) : (
            <span className="font-mono text-base font-semibold tabular-nums text-[var(--text-primary)]">
              €{book.price.toFixed(2)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onOpenReader(book)}
            className="inline-flex min-h-[38px] items-center gap-1.5 rounded border border-[var(--border-strong)] px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)] whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-[#f39c12] hover:bg-[#f39c12]/10 cursor-pointer"
          >
            <BookOpen className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>{isOwned ? t.catalog.readFullCta : t.catalog.previewCta}</span>
          </button>

          {!isOwned && (
            <button
              type="button"
              onClick={() => onAddToCart(book.id)}
              disabled={isInCart}
              className={`inline-flex min-h-[38px] items-center gap-1 rounded px-3 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-all duration-150 cursor-pointer ${
                isInCart
                  ? 'border border-[#f39c12]/40 bg-[#f39c12]/15 text-[var(--accent-amber-bright)] cursor-default'
                  : 'bg-[#f39c12] text-[#121316] hover:bg-[#ffbe70]'
              }`}
            >
              {isInCart ? (
                <>
                  <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{t.catalog.inBagCta}</span>
                </>
              ) : (
                <>
                  <Plus className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{t.catalog.addToBagCta}</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
