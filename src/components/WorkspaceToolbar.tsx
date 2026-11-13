import { Globe, Moon, Search, Sun, X } from 'lucide-react';
import { UIStrings } from '../i18n/translations';
import { CategoryKey, EditionLanguageFilter, Locale, ThemeMode } from '../types';

interface WorkspaceToolbarProps {
  t: UIStrings;
  locale: Locale;
  onLocaleChange: (next: Locale) => void;
  theme: ThemeMode;
  onThemeChange: (next: ThemeMode) => void;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedCategory: CategoryKey;
  onCategoryChange: (cat: CategoryKey) => void;
  editionFilter: EditionLanguageFilter;
  onEditionFilterChange: (lang: EditionLanguageFilter) => void;
}

const CATEGORIES: CategoryKey[] = ['all', 'fiction', 'essay', 'poetry', 'architecture'];

export function WorkspaceToolbar({
  t,
  locale,
  onLocaleChange,
  theme,
  onThemeChange,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  editionFilter,
  onEditionFilterChange,
}: WorkspaceToolbarProps) {
  return (
    <div className="border-b border-[var(--border-hairline)] bg-[var(--bg-surface)]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-4 py-5 sm:px-8 lg:px-16">
        {/* Top utility row: Search + Bilingual Switcher + Paper Theme Switch */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1 max-w-xl">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.toolbar.searchPlaceholder}
              aria-label={t.toolbar.searchPlaceholder}
              className="w-full min-h-[42px] rounded-t border-b-2 border-[var(--border-strong)] bg-[var(--bg-input)] py-2.5 pl-10 pr-10 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors duration-150 focus:border-[#f39c12] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Bilingual Switcher ES | FR */}
            <div
              className="inline-flex items-center gap-1 rounded border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-1"
              role="group"
              aria-label={t.toolbar.languageLabel}
            >
              <Globe
                className="ml-2 mr-1 h-3.5 w-3.5 text-[var(--text-muted)]"
                aria-hidden="true"
              />
              <button
                type="button"
                onClick={() => onLocaleChange('es')}
                className={`min-h-[32px] rounded-sm px-3 py-1 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer ${
                  locale === 'es'
                    ? 'bg-[#f39c12] text-[#121316]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Español
              </button>
              <button
                type="button"
                onClick={() => onLocaleChange('fr')}
                className={`min-h-[32px] rounded-sm px-3 py-1 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer ${
                  locale === 'fr'
                    ? 'bg-[#f39c12] text-[#121316]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Français
              </button>
            </div>

            {/* Paper Mode Switcher: Obsidian | Parchment */}
            <div
              className="inline-flex items-center gap-1 rounded border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-1"
              role="group"
              aria-label={t.toolbar.themeLabel}
            >
              <button
                type="button"
                onClick={() => onThemeChange('dark')}
                className={`inline-flex min-h-[32px] items-center gap-1.5 rounded-sm px-3 py-1 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-[#292a2d] text-[#ffbe70]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Moon className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t.toolbar.themeDark}</span>
              </button>
              <button
                type="button"
                onClick={() => onThemeChange('light')}
                className={`inline-flex min-h-[32px] items-center gap-1.5 rounded-sm px-3 py-1 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer ${
                  theme === 'light'
                    ? 'bg-[#e9e1d2] text-[#1a1816]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Sun className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t.toolbar.themeLight}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom filter row: Category segmented controls + Edition language filter */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-1.5" role="tablist">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => onCategoryChange(cat)}
                  className={`min-h-[36px] rounded px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer ${
                    active
                      ? 'bg-[var(--text-primary)] text-[var(--bg-canvas)]'
                      : 'border border-[var(--border-hairline)] bg-[var(--bg-canvas)]/60 text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {t.categories[cat]}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[var(--text-muted)] whitespace-nowrap">
              {t.toolbar.editionFilterLabel}
            </span>
            {(['all', 'es', 'fr'] as EditionLanguageFilter[]).map((langOpt) => {
              const active = editionFilter === langOpt;
              const label =
                langOpt === 'all'
                  ? t.toolbar.editionAll
                  : langOpt === 'es'
                    ? 'ES'
                    : 'FR';
              return (
                <button
                  key={langOpt}
                  type="button"
                  onClick={() => onEditionFilterChange(langOpt)}
                  className={`min-h-[32px] rounded px-2.5 py-1 font-mono text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer ${
                    active
                      ? 'border border-[#f39c12] bg-[#f39c12]/15 text-[var(--accent-amber-bright)]'
                      : 'border border-[var(--border-hairline)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
