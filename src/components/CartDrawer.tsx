import { FormEvent, useState } from 'react';
import { CheckCircle2, ShoppingBag, Trash2, X } from 'lucide-react';
import { UIStrings } from '../i18n/translations';
import { BookItem, CartItem, Locale, OrderReceipt } from '../types';
import { BookCover } from './BookCover';

interface CartDrawerProps {
  isOpen: boolean;
  locale: Locale;
  t: UIStrings;
  cart: CartItem[];
  books: BookItem[];
  lastReceipt: OrderReceipt | null;
  onRemoveItem: (bookId: string) => void;
  onCompleteOrder: (customerName: string, customerEmail: string) => void;
  onClearReceipt: () => void;
  onClose: () => void;
}

export function CartDrawer({
  isOpen,
  locale,
  t,
  cart,
  books,
  lastReceipt,
  onRemoveItem,
  onCompleteOrder,
  onClearReceipt,
  onClose,
}: CartDrawerProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  if (!isOpen) return null;

  const cartBooks = cart
    .map((item) => {
      const book = books.find((b) => b.id === item.bookId);
      return book ? { ...item, book } : null;
    })
    .filter((entry): entry is { bookId: string; quantity: number; book: BookItem } => entry !== null);

  const subtotal = cartBooks.reduce(
    (sum, entry) => sum + entry.book.price * entry.quantity,
    0
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (cartBooks.length === 0) return;
    const safeName = customerName.trim() || (locale === 'es' ? 'Lector Invitado' : 'Lecteur Invité');
    const safeEmail = customerEmail.trim() || 'lector@obsidian.press';
    onCompleteOrder(safeName, safeEmail);
    setCustomerName('');
    setCustomerEmail('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={t.cart.title}
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <aside className="relative z-10 flex h-full w-full max-w-[480px] flex-col border-l border-[var(--border-hairline)] bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[var(--border-hairline)] px-6 py-5">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-[#f39c12]" aria-hidden="true" />
            <h2 className="font-serif text-xl font-semibold">{t.cart.title}</h2>
          </div>
          <button
            type="button"
            onClick={() => {
              onClearReceipt();
              onClose();
            }}
            aria-label={t.cart.closeBtn}
            className="inline-flex h-10 w-10 items-center justify-center rounded border border-[var(--border-hairline)] hover:border-[#f39c12] cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {lastReceipt ? (
            <div className="rounded-lg border border-[#f39c12]/35 bg-[var(--bg-surface)] p-6">
              <div className="flex items-center gap-3 text-[#f39c12]">
                <CheckCircle2 className="h-6 w-6 shrink-0" aria-hidden="true" />
                <h3 className="font-serif text-2xl font-semibold text-[var(--text-primary)]">
                  {t.cart.receiptTitle}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                {t.cart.receiptSubtitle}
              </p>

              <div className="mt-6 space-y-2 border-y border-[var(--border-hairline)] py-4 text-xs">
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">{t.cart.receiptOrderNo}</span>
                  <span className="font-mono font-semibold tabular-nums">
                    {lastReceipt.orderNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">{t.cart.customerNameLabel}</span>
                  <span className="font-medium">{lastReceipt.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">{t.cart.total}</span>
                  <span className="font-mono font-semibold tabular-nums">
                    €{lastReceipt.total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xs font-semibold text-[var(--text-muted)]">
                  {t.cart.receiptUnlocked}
                </p>
                <ul className="mt-2 space-y-1.5 text-sm">
                  {lastReceipt.items.map((item) => (
                    <li key={item.bookId} className="font-serif font-medium">
                      {item.title}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#library"
                onClick={() => {
                  onClearReceipt();
                  onClose();
                }}
                className="mt-6 inline-flex min-h-[42px] w-full items-center justify-center rounded bg-[#f39c12] px-5 py-2.5 text-sm font-semibold text-[#121316] transition-colors hover:bg-[#ffbe70]"
              >
                {t.cart.openLibraryBtn}
              </a>
            </div>
          ) : cartBooks.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-16 text-center">
              <ShoppingBag className="h-10 w-10 text-[var(--text-muted)]" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-xl font-semibold">{t.cart.emptyTitle}</h3>
              <p className="mt-2 max-w-xs text-sm text-[var(--text-muted)]">
                {t.cart.emptyBody}
              </p>
              <a
                href="#catalog"
                onClick={onClose}
                className="mt-6 inline-flex min-h-[40px] items-center rounded border border-[var(--border-strong)] px-5 py-2 text-xs font-semibold hover:border-[#f39c12]"
              >
                {t.cart.exploreBtn}
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {cartBooks.map(({ book }) => {
                const title = book.title[locale] || book.title.es;
                return (
                  <div
                    key={book.id}
                    className="flex items-start gap-4 border-b border-[var(--border-hairline)] pb-4"
                  >
                    <div className="w-16 shrink-0">
                      <BookCover
                        title={title}
                        author={book.author}
                        image={book.coverImage}
                        coverStyle={book.coverStyle}
                        editionLang={book.editionLang}
                        showTitleOverlayOnCustom={false}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-serif text-base font-semibold leading-snug">
                        {title}
                      </h3>
                      <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                        {book.author} · {book.editionLang.toUpperCase()}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="font-mono text-sm font-semibold tabular-nums">
                          €{book.price.toFixed(2)}
                        </span>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(book.id)}
                          className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[#ffb4ab] cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>{t.cart.removeItem}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {!lastReceipt && cartBooks.length > 0 && (
          <form
            onSubmit={handleSubmit}
            className="border-t border-[var(--border-hairline)] bg-[var(--bg-surface)] px-6 py-5"
          >
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)]">
                  {t.cart.customerNameLabel}
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={t.cart.customerNamePlaceholder}
                  className="mt-1 w-full rounded-t border-b border-[var(--border-strong)] bg-[var(--bg-input)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#f39c12] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)]">
                  {t.cart.customerEmailLabel}
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder={t.cart.customerEmailPlaceholder}
                  className="mt-1 w-full rounded-t border-b border-[var(--border-strong)] bg-[var(--bg-input)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#f39c12] focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-4 space-y-1.5 border-t border-[var(--border-hairline)] pt-4 text-sm">
              <div className="flex justify-between text-xs text-[var(--text-muted)]">
                <span>{t.cart.subtotal}</span>
                <span className="font-mono tabular-nums">€{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-[var(--text-muted)]">
                <span>{t.cart.digitalDelivery}</span>
                <span>{t.cart.freeLabel}</span>
              </div>
              <div className="flex justify-between pt-1 text-base font-semibold">
                <span>{t.cart.total}</span>
                <span className="font-mono tabular-nums">€{subtotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="mt-5 min-h-[44px] w-full rounded bg-[#f39c12] px-5 py-2.5 text-sm font-semibold text-[#121316] transition-colors hover:bg-[#ffbe70] cursor-pointer"
            >
              {t.cart.checkoutBtn}
            </button>
          </form>
        )}
      </aside>
    </div>
  );
}
