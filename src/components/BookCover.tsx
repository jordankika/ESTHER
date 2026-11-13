import { useState } from 'react';
import { CoverStyleId } from '../types';

interface BookCoverProps {
  title: string;
  author: string;
  image?: string;
  coverStyle: CoverStyleId;
  editionLang: 'es' | 'fr';
  className?: string;
  showTitleOverlayOnCustom?: boolean;
}

const STYLE_MAP: Record<
  CoverStyleId,
  {
    bg: string;
    border: string;
    accent: string;
    text: string;
    subtext: string;
    motifStroke: string;
  }
> = {
  'obsidian-gold': {
    bg: 'bg-[#17181d]',
    border: 'border-[#ffbe70]/35',
    accent: 'text-[#ffbe70]',
    text: 'text-[#e3e2e6]',
    subtext: 'text-[#d8c3ad]',
    motifStroke: '#f39c12',
  },
  'parchment-indigo': {
    bg: 'bg-[#f4efe6]',
    border: 'border-[#3131c0]/25',
    accent: 'text-[#3131c0]',
    text: 'text-[#1a1816]',
    subtext: 'text-[#5c5349]',
    motifStroke: '#4f46e5',
  },
  'crimson-linen': {
    bg: 'bg-[#2a1719]',
    border: 'border-[#e0a96d]/35',
    accent: 'text-[#fac082]',
    text: 'text-[#f6efe8]',
    subtext: 'text-[#d8c3ad]',
    motifStroke: '#e0a96d',
  },
};

export function BookCover({
  title,
  author,
  image,
  coverStyle,
  editionLang,
  className = '',
  showTitleOverlayOnCustom = true,
}: BookCoverProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const palette = STYLE_MAP[coverStyle];

  if (image && !imgFailed) {
    return (
      <div
        className={`relative aspect-[3/4] w-full overflow-hidden rounded bg-[#181a1f] ${className}`}
      >
        <img
          src={image}
          alt={title}
          referrerPolicy="no-referrer"
          onError={() => setImgFailed(true)}
          className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
        />
        <div
          aria-hidden="true"
          className="book-spine-crease pointer-events-none absolute inset-y-0 left-0 w-4"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex aspect-[3/4] w-full flex-col justify-between overflow-hidden rounded p-5 ${palette.bg} ${className}`}
    >
      <div
        aria-hidden="true"
        className="book-spine-crease pointer-events-none absolute inset-y-0 left-0 w-4"
      />
      <div
        className={`relative z-10 flex h-full flex-col justify-between border p-4 ${palette.border}`}
      >
        <div className="flex items-center justify-between">
          <span className={`font-mono text-[10px] tracking-[0.14em] uppercase ${palette.accent}`}>
            Obsidian
          </span>
          <span className={`font-mono text-[10px] tracking-[0.12em] uppercase ${palette.subtext}`}>
            {editionLang.toUpperCase()}
          </span>
        </div>

        <div className="my-auto flex flex-col items-center py-3 text-center">
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            aria-hidden="true"
            className="mb-4 opacity-85"
          >
            <circle cx="22" cy="22" r="18" stroke={palette.motifStroke} strokeWidth="1" />
            <circle cx="22" cy="22" r="10" stroke={palette.motifStroke} strokeWidth="0.9" />
            <line x1="22" y1="2" x2="22" y2="42" stroke={palette.motifStroke} strokeWidth="0.75" />
          </svg>
          {showTitleOverlayOnCustom && (
            <h4
              className={`font-serif text-lg leading-snug font-semibold line-clamp-3 ${palette.text}`}
              style={{ textWrap: 'balance' }}
            >
              {title}
            </h4>
          )}
        </div>

        <div className="border-t pt-2.5 text-center border-current/15">
          <p className={`truncate text-[11px] font-medium tracking-wide ${palette.subtext}`}>
            {author}
          </p>
        </div>
      </div>
    </div>
  );
}
