import { BookChapter, BookItem, Locale } from '../types';

export function parseMarkdownChapters(
  rawText: string,
  lang: 'es' | 'fr',
  fallbackTitle: string
): { detectedTitle: string; chapters: BookChapter[]; estimatedPages: number } {
  const lines = rawText.replace(/\r\n/g, '\n').split('\n');
  let detectedTitle = '';
  const sections: Array<{ title: string; bodyLines: string[] }> = [];
  let current: { title: string; bodyLines: string[] } | null = null;

  for (const line of lines) {
    const h1Match = line.match(/^#\s+(.+)$/);
    const h2Match = line.match(/^##\s+(.+)$/);

    if (h1Match && !detectedTitle && sections.length === 0 && !current) {
      detectedTitle = h1Match[1].trim();
      continue;
    }

    if (h1Match || h2Match) {
      const heading = (h1Match ? h1Match[1] : h2Match![1]).trim();
      if (current && (current.bodyLines.some((l) => l.trim().length > 0) || sections.length > 0)) {
        sections.push(current);
      }
      current = { title: heading, bodyLines: [] };
    } else {
      if (!current) {
        current = {
          title: lang === 'es' ? 'Capítulo I' : 'Chapitre I',
          bodyLines: [],
        };
      }
      current.bodyLines.push(line);
    }
  }

  if (current) {
    sections.push(current);
  }

  const validSections = sections.filter((s) =>
    s.bodyLines.some((line) => line.trim().length > 0)
  );

  const normalizedSections =
    validSections.length > 0
      ? validSections
      : [
          {
            title: lang === 'es' ? 'Capítulo I' : 'Chapitre I',
            bodyLines: [
              rawText.trim() ||
                (lang === 'es'
                  ? 'Texto del manuscrito pendiente de redacción.'
                  : 'Texte du manuscrit en cours de rédaction.'),
            ],
          },
        ];

  const chapters: BookChapter[] = normalizedSections.map((sec, idx) => {
    const paragraphs = sec.bodyLines
      .join('\n')
      .split(/\n\s*\n+/)
      .map((p) => p.trim())
      .filter(Boolean);

    const safeParagraphs =
      paragraphs.length > 0
        ? paragraphs
        : [
            lang === 'es'
              ? 'Contenido preparado para lectura digital.'
              : 'Contenu prêt pour la lecture numérique.',
          ];

    return {
      id: `custom-ch-${idx + 1}`,
      title: {
        es: sec.title,
        fr: sec.title,
      },
      paragraphs: {
        es: safeParagraphs,
        fr: safeParagraphs,
      },
    };
  });

  const wordCount = rawText.trim().split(/\s+/).filter(Boolean).length;
  const estimatedPages = Math.max(12, Math.round(wordCount / 220) * 8 + 24);

  return {
    detectedTitle: detectedTitle || fallbackTitle,
    chapters,
    estimatedPages,
  };
}

export function downloadBookAsMarkdown(book: BookItem, locale: Locale): void {
  const title = book.title[locale] || book.title.es;
  const subtitle = book.subtitle[locale] || book.subtitle.es;
  const parts: string[] = [
    `# ${title}`,
    subtitle ? `*${subtitle}*` : '',
    `${book.author} · ${book.year} · ISBN ${book.isbn}`,
    '',
  ];

  for (const ch of book.chapters) {
    const chTitle = ch.title[locale] || ch.title.es;
    const paragraphs = ch.paragraphs[locale]?.length
      ? ch.paragraphs[locale]
      : ch.paragraphs.es;
    parts.push(`## ${chTitle}`, '', ...paragraphs.map((p) => `${p}\n`));
  }

  const blob = new Blob([parts.join('\n')], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-|-$/g, '');
  link.download = `${slug || 'edicion-obsidian'}.md`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
