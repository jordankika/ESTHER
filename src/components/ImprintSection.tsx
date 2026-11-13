import { UIStrings } from '../i18n/translations';
import { Locale } from '../types';

interface ImprintSectionProps {
  t: UIStrings;
  locale: Locale;
  onLocaleChange: (next: Locale) => void;
}

export function ImprintSection({ t, locale, onLocaleChange }: ImprintSectionProps) {
  return (
    <>
      <section
        id="imprint"
        className="border-t border-[var(--border-hairline)] bg-[var(--bg-canvas)] py-16 lg:py-20"
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-16">
          <div className="max-w-2xl">
            <h2
              className="font-serif text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              {t.imprint.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)]">
              {t.imprint.body}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 border-t border-[var(--border-hairline)] pt-10 md:grid-cols-3">
            {t.imprint.pillars.map((pillar) => (
              <div key={pillar.index}>
                <p className="font-mono text-xs font-semibold text-[var(--accent-ochre)]">
                  {pillar.index}.
                </p>
                <h3 className="mt-2 font-serif text-xl font-semibold text-[var(--text-primary)]">
                  {pillar.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {pillar.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--border-hairline)] bg-[var(--bg-surface)] py-10">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-8 lg:px-16">
          <div>
            <p className="font-serif text-lg font-semibold text-[var(--text-primary)]">
              {t.brandName}
            </p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              {t.footer.tagline} · {t.footer.cities}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onLocaleChange('es')}
                className={`cursor-pointer transition-colors ${
                  locale === 'es'
                    ? 'font-semibold text-[var(--accent-amber-bright)]'
                    : 'hover:text-[var(--text-primary)]'
                }`}
              >
                Español
              </button>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => onLocaleChange('fr')}
                className={`cursor-pointer transition-colors ${
                  locale === 'fr'
                    ? 'font-semibold text-[var(--accent-amber-bright)]'
                    : 'hover:text-[var(--text-primary)]'
                }`}
              >
                Français
              </button>
            </div>
            <span aria-hidden="true">·</span>
            <span>{t.footer.rights}</span>
          </div>
        </div>
      </footer>
    </>
  );
}
