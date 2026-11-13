import { ShoppingBag } from 'lucide-react';
import { UIStrings } from '../i18n/translations';

interface HeaderProps {
  t: UIStrings;
  cartCount: number;
  onOpenCart: () => void;
}

export function Header({ t, cartCount, onOpenCart }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-8 px-4 py-3.5 sm:px-8 lg:px-16">
        <a
          href="#top"
          className="font-serif text-xl font-semibold tracking-tight text-[var(--text-primary)] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-amber)] rounded-sm"
        >
          EDITORIAL ESTHER
        </a>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[var(--text-secondary)]">
          <a
            href="#catalog"
            className="whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[var(--accent-amber-bright)] hover:underline underline-offset-4"
          >
            {t.nav.catalog}
          </a>
          <a
            href="#library"
            className="whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[var(--accent-amber-bright)] hover:underline underline-offset-4"
          >
            {t.nav.library}
          </a>
          <a
            href="#studio"
            className="whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[var(--accent-amber-bright)] hover:underline underline-offset-4"
          >
            {t.nav.studio}
          </a>
          <a
            href="#imprint"
            className="whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[var(--accent-amber-bright)] hover:underline underline-offset-4"
          >
            {t.nav.imprint}
          </a>
        </nav>

        <div className="shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex min-h-[40px] items-center gap-2 rounded bg-[#f39c12] px-4 py-2 text-sm font-semibold text-[#121316] whitespace-nowrap shrink-0 transition-all duration-150 hover:bg-[#ffbe70] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffbe70] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-canvas)] cursor-pointer"
          >
            <ShoppingBag className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{t.bagButton}</span>
            <span className="font-mono text-xs tabular-nums">({cartCount})</span>
          </button>
        </div>
      </div>
    </header>
  );
}
