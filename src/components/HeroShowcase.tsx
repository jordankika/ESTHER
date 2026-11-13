import { useState } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { HERO_IMAGE } from '../data/books';
import { UIStrings } from '../i18n/translations';

interface HeroShowcaseProps {
  t: UIStrings;
}

export function HeroShowcase({ t }: HeroShowcaseProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="top"
      className="border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-stretch gap-8 px-4 py-10 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-16 lg:py-14">
        <div className="flex flex-col justify-between lg:col-span-6 lg:py-2">
          <div>
            <p className="text-xs font-semibold tracking-wider text-[var(--accent-ochre)]">
              {t.hero.kicker}
            </p>
            <h1
              className="mt-4 font-serif text-4xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-[54px] lg:leading-[1.12]"
              style={{ textWrap: 'balance' }}
            >
              {t.hero.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
              {t.hero.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#catalog"
                className="inline-flex min-h-[44px] items-center gap-2 rounded bg-[#f39c12] px-6 py-2.5 text-sm font-semibold text-[#121316] whitespace-nowrap shrink-0 transition-all duration-150 hover:bg-[#ffbe70] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffbe70]"
              >
                <span>{t.hero.primaryCta}</span>
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
              <a
                href="#studio"
                className="inline-flex min-h-[44px] items-center gap-2 rounded border border-[var(--border-strong)] bg-transparent px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-[#f39c12] hover:bg-[#f39c12]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f39c12]"
              >
                <span>{t.hero.secondaryCta}</span>
              </a>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-[var(--border-hairline)] pt-6">
            <div>
              <p className="text-xs text-[var(--text-muted)]">{t.hero.editionLabel}</p>
              <p className="mt-1 text-sm font-medium text-[var(--text-primary)]">
                {t.hero.editionValue}
              </p>
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)]">{t.hero.formatsLabel}</p>
              <p className="mt-1 font-mono text-xs font-medium text-[var(--text-primary)]">
                {t.hero.formatsValue}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative h-full min-h-[260px] w-full overflow-hidden rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)]">
            {!imgError ? (
              <img
                src={HERO_IMAGE}
                alt={t.hero.title}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="aspect-[16/9] h-full w-full object-cover lg:aspect-auto"
              />
            ) : (
              <div className="flex h-full min-h-[300px] flex-col items-center justify-center bg-gradient-to-br from-[#1b1b1f] to-[#121316] p-8 text-center">
                <BookOpen className="h-10 w-10 text-[#f39c12]" aria-hidden="true" />
                <p className="mt-4 font-serif text-xl text-[#e3e2e6]">{t.brandName}</p>
              </div>
            )}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#121316]/65 via-transparent to-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
