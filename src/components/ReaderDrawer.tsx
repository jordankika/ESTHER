import {
  ChevronLeft,
  ChevronRight,
  Download,
  Lock,
  Plus,
  X,
} from 'lucide-react';
import { UIStrings } from '../i18n/translations';
import {
  BookItem,
  Locale,
  ReaderFontSize,
  ReaderTheme,
} from '../types';
import { downloadBookAsMarkdown } from '../utils/manuscriptParser';

interface ReaderDrawerProps {
  book: BookItem | null;
  locale: Locale;
  t: UIStrings;
  isOwned: boolean;
  isInCart: boolean;
  activeChapterIndex: number;
  onChapterChange: (index: number) => void;
  readerTheme: ReaderTheme;
  onReaderThemeChange: (theme: ReaderTheme) => void;
  fontSize: ReaderFontSize;
  onFontSizeChange: (size: ReaderFontSize) => void;
  onAddToCart: (bookId: string) => void;
  onClose: () => void;
}

const FONT_SIZE_CLASSES: Record<ReaderFontSize, string> = {
  sm: 'text-[15px] leading-[1.75]',
  md: 'text-[17px] leading-[1.8]',
  lg: 'text-[19px] leading-[1.82]',
  xl: 'text-[21px] leading-[1.85]',
};

const PAPER_THEME_CLASSES: Record<
  ReaderTheme,
  {
    drawerBg: string;
    surface: string;
    text: string;
    muted: string;
    border: string;
  }
> = {
  obsidian: {
    drawerBg: 'bg-[#17181d] text-[#e3e2e6]',
    surface: 'bg-[#1f2229]',
    text: 'text-[#e3e2e6]',
    muted: 'text-[#b7a694]',
    border: 'border-white/10',
  },
  sepia: {
    drawerBg: 'bg-[#f4ebd9] text-[#2b2218]',
    surface: 'bg-[#eadec7]',
    text: 'text-[#2b2218]',
    muted: 'text-[#6e5c48]',
    border: 'border-[#2b2218]/12',
  },
  alabaster: {
    drawerBg: 'bg-[#fdfbf7] text-[#1a1816]',
    surface: 'bg-[#f4efe6]',
    text: 'text-[#1a1816]',
    muted: 'text-[#6a6056]',
    border: 'border-[#1a1816]/10',
  },
};

export function ReaderDrawer({
  book,
  locale,
  t,
  isOwned,
  isInCart,
  activeChapterIndex,
  onChapterChange,
  readerTheme,
  onReaderThemeChange,
  fontSize,
  onFontSizeChange,
  onAddToCart,
  onClose,
}: ReaderDrawerProps) {
  if (!book) return null;

  const palette = PAPER_THEME_CLASSES[readerTheme];
  const safeChapterIdx = Math.min(
    Math.max(0, activeChapterIndex),
    Math.max(0, book.chapters.length - 1)
  );
  const currentChapter = book.chapters[safeChapterIdx];
  const isChapterLocked = !isOwned && safeChapterIdx > 0;
  const title = book.title[locale] || book.title.es;
  const chapterTitle = currentChapter?.title[locale] || currentChapter?.title.es || '';
  const paragraphs =
    currentChapter?.paragraphs[locale]?.length
      ? currentChapter.paragraphs[locale]
      : currentChapter?.paragraphs.es || [];

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <aside
        className={`relative z-10 flex h-full w-full max-w-[540px] flex-col border-l shadow-2xl transition-colors duration-200 ${palette.drawerBg} ${palette.border}`}
      >
        {/* Top Reader Header */}
        <div className={`flex items-start justify-between gap-4 border-b px-6 py-5 ${palette.border}`}>
          <div className="min-w-0">
            <p className={`text-xs font-semibold ${palette.muted}`}>
              {isOwned ? t.reader.fullAccessBadge : t.reader.sampleBadge}
              <span className="mx-1.5" aria-hidden="true">·</span>
              <span>{book.author}</span>
            </p>
            <h2 className="mt-1 font-serif text-2xl font-semibold leading-tight truncate">
              {title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={t.reader.closeBtn}
            className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded border transition-colors cursor-pointer ${palette.border} hover:border-[#f39c12]`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Reading Controls: Font Size + Paper Theme + Chapters */}
        <div className={`border-b px-6 py-3.5 ${palette.surface} ${palette.border}`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Font size selector */}
            <div className="flex items-center gap-1.5">
              <span className={`mr-1 text-xs ${palette.muted}`}>
                {t.reader.fontSizeLabel}
              </span>
              {(['sm', 'md', 'lg', 'xl'] as ReaderFontSize[]).map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => onFontSizeChange(sz)}
                  className={`min-h-[30px] min-w-[30px] rounded px-2 text-xs font-semibold uppercase transition-colors cursor-pointer ${
                    fontSize === sz
                      ? 'bg-[#f39c12] text-[#121316]'
                      : `border ${palette.border} ${palette.muted} hover:opacity-100`
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>

            {/* Paper Theme Switcher */}
            <div className="flex items-center gap-1.5">
              <span className={`mr-1 text-xs ${palette.muted}`}>
                {t.reader.paperThemeLabel}
              </span>
              {(['obsidian', 'sepia', 'alabaster'] as ReaderTheme[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => onReaderThemeChange(mode)}
                  className={`min-h-[30px] rounded px-2.5 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    readerTheme === mode
                      ? 'bg-[#f39c12] text-[#121316]'
                      : `border ${palette.border} ${palette.muted}`
                  }`}
                >
                  {t.reader.paperThemes[mode]}
                </button>
              ))}
            </div>
          </div>

          {/* Chapter Tabs */}
          <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1">
            {book.chapters.map((ch, idx) => {
              const active = idx === safeChapterIdx;
              const locked = !isOwned && idx > 0;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => onChapterChange(idx)}
                  className={`inline-flex min-h-[32px] items-center gap-1.5 rounded px-3 py-1 text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#f39c12]/20 text-[#f39c12] ring-1 ring-[#f39c12]/50'
                      : `border ${palette.border} ${palette.muted}`
                  }`}
                >
                  {locked && <Lock className="h-3 w-3 shrink-0" aria-hidden="true" />}
                  <span>{ch.title[locale] || ch.title.es}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Reading Body */}
        <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-8">
          <div className="mx-auto max-w-prose">
            <h3 className="font-serif text-2xl font-semibold leading-snug">
              {chapterTitle}
            </h3>

            {isChapterLocked ? (
              <div className={`mt-8 rounded-lg border p-6 text-center ${palette.surface} ${palette.border}`}>
                <Lock className="mx-auto h-7 w-7 text-[#f39c12]" aria-hidden="true" />
                <p className={`mt-4 text-sm leading-relaxed ${palette.muted}`}>
                  {t.reader.lockedNotice}
                </p>
                <button
                  type="button"
                  onClick={() => onAddToCart(book.id)}
                  disabled={isInCart}
                  className="mt-5 inline-flex min-h-[42px] items-center gap-2 rounded bg-[#f39c12] px-5 py-2 text-sm font-semibold text-[#121316] transition-colors hover:bg-[#ffbe70] disabled:opacity-60 cursor-pointer"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  <span>
                    {isInCart
                      ? t.catalog.inBagCta
                      : `${t.reader.unlockCta} · €${book.price.toFixed(2)}`}
                  </span>
                </button>
              </div>
            ) : (
              <div className={`mt-6 space-y-5 font-serif ${FONT_SIZE_CLASSES[fontSize]}`}>
                {paragraphs.map((p, index) => (
                  <p key={index}>{p}</p>
                ))}
              </div>
            )}

            {/* Edition Colophon */}
            <div className={`mt-12 grid grid-cols-3 gap-4 border-t pt-6 text-xs ${palette.border}`}>
              <div>
                <p className={palette.muted}>{t.reader.metadataIsbn}</p>
                <p className="mt-1 font-mono tabular-nums">{book.isbn}</p>
              </div>
              <div>
                <p className={palette.muted}>{t.reader.metadataEdition}</p>
                <p className="mt-1 font-mono uppercase">{book.editionLang}</p>
              </div>
              <div>
                <p className={palette.muted}>{t.reader.metadataBinding}</p>
                <p className="mt-1">{book.binding[locale] || book.binding.es}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Chapter Navigation & Action Bar */}
        <div className={`flex items-center justify-between gap-3 border-t px-6 py-4 ${palette.border}`}>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={safeChapterIdx <= 0}
              onClick={() => onChapterChange(safeChapterIdx - 1)}
              className={`inline-flex min-h-[38px] items-center gap-1 rounded border px-3 py-1.5 text-xs font-semibold disabled:opacity-40 cursor-pointer ${palette.border}`}
            >
              <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t.reader.prevChapter}</span>
            </button>
            <button
              type="button"
              disabled={safeChapterIdx >= book.chapters.length - 1}
              onClick={() => onChapterChange(safeChapterIdx + 1)}
              className={`inline-flex min-h-[38px] items-center gap-1 rounded border px-3 py-1.5 text-xs font-semibold disabled:opacity-40 cursor-pointer ${palette.border}`}
            >
              <span>{t.reader.nextChapter}</span>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>

          {isOwned ? (
            <button
              type="button"
              onClick={() => downloadBookAsMarkdown(book, locale)}
              className="inline-flex min-h-[38px] items-center gap-1.5 rounded bg-[#f39c12] px-4 py-1.5 text-xs font-semibold text-[#121316] whitespace-nowrap transition-colors hover:bg-[#ffbe70] cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t.reader.downloadBtn}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onAddToCart(book.id)}
              disabled={isInCart}
              className="inline-flex min-h-[38px] items-center gap-1.5 rounded bg-[#f39c12] px-4 py-1.5 text-xs font-semibold text-[#121316] whitespace-nowrap transition-colors hover:bg-[#ffbe70] disabled:opacity-60 cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              <span>
                {isInCart
                  ? t.catalog.inBagCta
                  : `${t.catalog.addToBagCta} · €${book.price.toFixed(2)}`}
              </span>
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}
