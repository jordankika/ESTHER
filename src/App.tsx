import { useEffect, useMemo, useState } from 'react';
import { BookCard } from './components/BookCard';
import { CartDrawer } from './components/CartDrawer';
import { Header } from './components/Header';
import { HeroShowcase } from './components/HeroShowcase';
import { ImprintSection } from './components/ImprintSection';
import { LibrarySection } from './components/LibrarySection';
import { ManuscriptStudio } from './components/ManuscriptStudio';
import { ReaderDrawer } from './components/ReaderDrawer';
import { WorkspaceToolbar } from './components/WorkspaceToolbar';
import { INITIAL_BOOKS } from './data/books';
import { TRANSLATIONS } from './i18n/translations';
import {
  BookItem,
  CartItem,
  CategoryKey,
  EditionLanguageFilter,
  Locale,
  OrderReceipt,
  ReaderFontSize,
  ReaderTheme,
  ReadingProgress,
  ThemeMode,
} from './types';

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [locale, setLocale] = useState<Locale>(() =>
    readStorage<Locale>('obsidian_locale', 'es')
  );
  const [theme, setTheme] = useState<ThemeMode>(() =>
    readStorage<ThemeMode>('obsidian_theme', 'dark')
  );
  const [customBooks, setCustomBooks] = useState<BookItem[]>(() =>
    readStorage<BookItem[]>('obsidian_custom_books', [])
  );
  const [ownedBookIds, setOwnedBookIds] = useState<string[]>(() =>
    readStorage<string[]>('obsidian_owned_ids', ['anatomia-margen'])
  );
  const [cart, setCart] = useState<CartItem[]>(() =>
    readStorage<CartItem[]>('obsidian_cart', [])
  );
  const [progressMap, setProgressMap] = useState<Record<string, ReadingProgress>>(
    () => readStorage<Record<string, ReadingProgress>>('obsidian_progress', {})
  );
  const [readerTheme, setReaderTheme] = useState<ReaderTheme>(() =>
    readStorage<ReaderTheme>('obsidian_reader_theme', 'obsidian')
  );
  const [fontSize, setFontSize] = useState<ReaderFontSize>(() =>
    readStorage<ReaderFontSize>('obsidian_font_size', 'md')
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all');
  const [editionFilter, setEditionFilter] = useState<EditionLanguageFilter>('all');

  const [activeReaderBook, setActiveReaderBook] = useState<BookItem | null>(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastReceipt, setLastReceipt] = useState<OrderReceipt | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const t = TRANSLATIONS[locale];

  // Sync HTML lang attribute and Tailwind v4 dark class
  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('obsidian_locale', JSON.stringify(locale));
    localStorage.setItem('obsidian_theme', JSON.stringify(theme));
  }, [locale, theme]);

  useEffect(() => {
    localStorage.setItem('obsidian_custom_books', JSON.stringify(customBooks));
  }, [customBooks]);

  useEffect(() => {
    localStorage.setItem('obsidian_owned_ids', JSON.stringify(ownedBookIds));
  }, [ownedBookIds]);

  useEffect(() => {
    localStorage.setItem('obsidian_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('obsidian_progress', JSON.stringify(progressMap));
  }, [progressMap]);

  useEffect(() => {
    localStorage.setItem('obsidian_reader_theme', JSON.stringify(readerTheme));
  }, [readerTheme]);

  useEffect(() => {
    localStorage.setItem('obsidian_font_size', JSON.stringify(fontSize));
  }, [fontSize]);

  useEffect(() => {
    if (!toastMsg) return;
    const timer = window.setTimeout(() => setToastMsg(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toastMsg]);

  const allBooks = useMemo(
    () => [...customBooks, ...INITIAL_BOOKS],
    [customBooks]
  );

  const filteredBooks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allBooks.filter((book) => {
      if (selectedCategory !== 'all' && book.category !== selectedCategory) {
        return false;
      }
      if (editionFilter !== 'all' && book.editionLang !== editionFilter) {
        return false;
      }
      if (!q) return true;
      const titleEs = book.title.es.toLowerCase();
      const titleFr = book.title.fr.toLowerCase();
      const author = book.author.toLowerCase();
      const synEs = book.synopsis.es.toLowerCase();
      const synFr = book.synopsis.fr.toLowerCase();
      return (
        titleEs.includes(q) ||
        titleFr.includes(q) ||
        author.includes(q) ||
        synEs.includes(q) ||
        synFr.includes(q)
      );
    });
  }, [allBooks, selectedCategory, editionFilter, searchQuery]);

  const ownedBooks = useMemo(
    () =>
      allBooks.filter(
        (b) => b.isUserPublished || ownedBookIds.includes(b.id)
      ),
    [allBooks, ownedBookIds]
  );

  const handleOpenReader = (book: BookItem) => {
    const savedProgress = progressMap[book.id];
    setActiveReaderBook(book);
    setActiveChapterIndex(savedProgress?.chapterIndex ?? 0);
  };

  const handleChapterChange = (index: number) => {
    setActiveChapterIndex(index);
    if (activeReaderBook && !activeReaderBook.id.startsWith('draft-')) {
      setProgressMap((prev) => ({
        ...prev,
        [activeReaderBook.id]: {
          chapterIndex: index,
          updatedAt: new Date().toISOString(),
        },
      }));
    }
  };

  const handleAddToCart = (bookId: string) => {
    if (ownedBookIds.includes(bookId)) return;
    setCart((prev) => {
      if (prev.some((item) => item.bookId === bookId)) return prev;
      return [...prev, { bookId, quantity: 1 }];
    });
    setLastReceipt(null);
    setToastMsg(t.toast.addedToBag);
  };

  const handleRemoveFromCart = (bookId: string) => {
    setCart((prev) => prev.filter((item) => item.bookId !== bookId));
  };

  const handleCompleteOrder = (customerName: string, customerEmail: string) => {
    const purchasedItems = cart
      .map((item) => {
        const book = allBooks.find((b) => b.id === item.bookId);
        if (!book) return null;
        return {
          bookId: book.id,
          title: book.title[locale] || book.title.es,
          price: book.price,
          quantity: item.quantity,
        };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);

    if (purchasedItems.length === 0) return;

    const total = purchasedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const receipt: OrderReceipt = {
      orderNumber: `OBS-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName,
      customerEmail,
      items: purchasedItems,
      total,
      createdAt: new Date().toISOString(),
    };

    const newOwnedIds = purchasedItems.map((i) => i.bookId);
    setOwnedBookIds((prev) => Array.from(new Set([...prev, ...newOwnedIds])));
    setCart([]);
    setLastReceipt(receipt);
    setToastMsg(t.toast.orderComplete);
  };

  const handlePublishBook = (newBook: BookItem) => {
    setCustomBooks((prev) => [newBook, ...prev]);
    setOwnedBookIds((prev) => Array.from(new Set([...prev, newBook.id])));
    setToastMsg(t.toast.manuscriptPublished);
  };

  const handleRemoveCustomBook = (bookId: string) => {
    setCustomBooks((prev) => prev.filter((b) => b.id !== bookId));
    setOwnedBookIds((prev) => prev.filter((id) => id !== bookId));
    setCart((prev) => prev.filter((item) => item.bookId !== bookId));
    if (activeReaderBook?.id === bookId) {
      setActiveReaderBook(null);
    }
    setToastMsg(t.toast.manuscriptRemoved);
  };

  const handlePreviewDraft = (draft: BookItem) => {
    const draftBook: BookItem = { ...draft, id: `draft-${Date.now()}` };
    setActiveReaderBook(draftBook);
    setActiveChapterIndex(0);
  };

  const handleThemeSwitch = (nextTheme: ThemeMode) => {
    setTheme(nextTheme);
    setReaderTheme(nextTheme === 'dark' ? 'obsidian' : 'alabaster');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)]">
      <Header
        t={t}
        cartCount={cart.length}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main>
        <HeroShowcase t={t} />

        <WorkspaceToolbar
          t={t}
          locale={locale}
          onLocaleChange={setLocale}
          theme={theme}
          onThemeChange={handleThemeSwitch}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          editionFilter={editionFilter}
          onEditionFilterChange={setEditionFilter}
        />

        {/* Featured & Filterable Catalog Grid */}
        <section id="catalog" className="py-16 lg:py-20">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-16">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-serif text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                  {t.catalog.heading}
                </h2>
                <p className="mt-2 text-base text-[var(--text-secondary)]">
                  {t.catalog.subheading}
                </p>
              </div>
              <p className="font-mono text-xs tabular-nums text-[var(--text-muted)]">
                {filteredBooks.length} {t.catalog.resultsCount}
              </p>
            </div>

            {filteredBooks.length === 0 ? (
              <div className="mt-10 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-6 py-12 text-center">
                <h3 className="font-serif text-xl font-semibold text-[var(--text-primary)]">
                  {t.catalog.emptyTitle}
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-[var(--text-muted)]">
                  {t.catalog.emptyBody}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setEditionFilter('all');
                  }}
                  className="mt-6 inline-flex min-h-[40px] items-center rounded bg-[#f39c12] px-5 py-2 text-xs font-semibold text-[#121316] transition-colors hover:bg-[#ffbe70] cursor-pointer"
                >
                  {t.catalog.resetFilters}
                </button>
              </div>
            ) : (
              <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredBooks.map((book) => {
                  const isOwned =
                    Boolean(book.isUserPublished) ||
                    ownedBookIds.includes(book.id);
                  const isInCart = cart.some((item) => item.bookId === book.id);
                  return (
                    <BookCard
                      key={book.id}
                      book={book}
                      locale={locale}
                      t={t}
                      isOwned={isOwned}
                      isInCart={isInCart}
                      onOpenReader={handleOpenReader}
                      onAddToCart={handleAddToCart}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <LibrarySection
          locale={locale}
          t={t}
          ownedBooks={ownedBooks}
          progressMap={progressMap}
          onOpenReader={handleOpenReader}
          onRemoveCustomBook={handleRemoveCustomBook}
        />

        <ManuscriptStudio
          locale={locale}
          t={t}
          onPreviewDraft={handlePreviewDraft}
          onPublishBook={handlePublishBook}
          onSampleLoaded={() => setToastMsg(t.toast.sampleLoaded)}
        />

        <ImprintSection t={t} locale={locale} onLocaleChange={setLocale} />
      </main>

      {/* Slide-over Reader Drawer */}
      <ReaderDrawer
        book={activeReaderBook}
        locale={locale}
        t={t}
        isOwned={
          activeReaderBook
            ? activeReaderBook.id.startsWith('draft-') ||
              Boolean(activeReaderBook.isUserPublished) ||
              ownedBookIds.includes(activeReaderBook.id)
            : false
        }
        isInCart={
          activeReaderBook
            ? cart.some((item) => item.bookId === activeReaderBook.id)
            : false
        }
        activeChapterIndex={activeChapterIndex}
        onChapterChange={handleChapterChange}
        readerTheme={readerTheme}
        onReaderThemeChange={setReaderTheme}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        onAddToCart={handleAddToCart}
        onClose={() => setActiveReaderBook(null)}
      />

      {/* Slide-over Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        locale={locale}
        t={t}
        cart={cart}
        books={allBooks}
        lastReceipt={lastReceipt}
        onRemoveItem={handleRemoveFromCart}
        onCompleteOrder={handleCompleteOrder}
        onClearReceipt={() => setLastReceipt(null)}
        onClose={() => setIsCartOpen(false)}
      />

      {/* Subtle Non-Intrusive Toast Feedback */}
      {toastMsg && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-40 rounded border border-[#f39c12]/40 bg-[var(--bg-surface-elevated)] px-4 py-3 text-xs font-semibold text-[var(--text-primary)] shadow-xl backdrop-blur-md"
        >
          {toastMsg}
        </div>
      )}
    </div>
  );
}
