import { ChangeEvent, DragEvent, FormEvent, useMemo, useRef, useState } from 'react';
import { BookPlus, Eye, FileText, Sparkles, UploadCloud } from 'lucide-react';
import { SAMPLE_MANUSCRIPTS } from '../data/books';
import { UIStrings } from '../i18n/translations';
import { BookItem, CategoryKey, CoverStyleId, Locale } from '../types';
import { parseMarkdownChapters } from '../utils/manuscriptParser';
import { BookCover } from './BookCover';

interface ManuscriptStudioProps {
  locale: Locale;
  t: UIStrings;
  onPreviewDraft: (book: BookItem) => void;
  onPublishBook: (book: BookItem) => void;
  onSampleLoaded: () => void;
}

export function ManuscriptStudio({
  locale,
  t,
  onPreviewDraft,
  onPublishBook,
  onSampleLoaded,
}: ManuscriptStudioProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loadedFileName, setLoadedFileName] = useState('');
  const [binaryNote, setBinaryNote] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState<Exclude<CategoryKey, 'all'>>('fiction');
  const [editionLang, setEditionLang] = useState<'es' | 'fr'>(locale);
  const [price, setPrice] = useState('16');
  const [coverStyle, setCoverStyle] = useState<CoverStyleId>('obsidian-gold');
  const [synopsis, setSynopsis] = useState('');
  const [rawContent, setRawContent] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const parsed = useMemo(() => {
    const fallbackTitle =
      title.trim() ||
      (editionLang === 'es' ? 'Manuscrito sin título' : 'Manuscrit sans titre');
    return parseMarkdownChapters(rawContent, editionLang, fallbackTitle);
  }, [rawContent, editionLang, title]);

  const processFile = async (file: File) => {
    setErrorMsg('');
    setLoadedFileName(file.name);
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    const cleanBaseName = file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ');

    if (ext === 'md' || ext === 'txt' || file.type.startsWith('text/')) {
      setBinaryNote(false);
      const text = await file.text();
      setRawContent(text);
      const result = parseMarkdownChapters(text, editionLang, cleanBaseName);
      if (!title.trim()) {
        setTitle(result.detectedTitle || cleanBaseName);
      }
    } else {
      setBinaryNote(true);
      if (!title.trim()) {
        setTitle(cleanBaseName);
      }
      if (!rawContent.trim()) {
        setRawContent(SAMPLE_MANUSCRIPTS[editionLang]);
      }
    }
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await processFile(file);
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await processFile(file);
    }
    e.target.value = '';
  };

  const handleLoadSample = () => {
    setErrorMsg('');
    setBinaryNote(false);
    const activeLang = locale;
    setEditionLang(activeLang);
    setLoadedFileName(activeLang === 'es' ? 'jardin-letras-perdidas.md' : 'jardin-lettres-retrouvees.md');
    setTitle(
      activeLang === 'es'
        ? 'El Jardín de las Letras Perdidas'
        : 'Le Jardin des Lettres Retrouvées'
    );
    setSubtitle(
      activeLang === 'es'
        ? 'Cuadernos de edición y memoria tipográfica'
        : 'Carnets d’édition et mémoire typographique'
    );
    setAuthor(activeLang === 'es' ? 'Sofía Alarcón' : 'Camille Verrier');
    setSynopsis(
      activeLang === 'es'
        ? 'Un manuscrito hallado en una vieja imprenta de provincia desvela los secretos de la edición artesanal y el oficio silencioso de los libros.'
        : 'Un manuscrit retrouvé dans une ancienne imprimerie révèle les secrets de l’édition artisanale et du métier silencieux des livres.'
    );
    setRawContent(SAMPLE_MANUSCRIPTS[activeLang]);
    onSampleLoaded();
  };

  const buildBookObject = (): BookItem => {
    const cleanTitle =
      title.trim() ||
      parsed.detectedTitle ||
      (editionLang === 'es' ? 'Edición de Autor' : 'Édition d’Auteur');
    const cleanSubtitle =
      subtitle.trim() ||
      (editionLang === 'es' ? 'Edición digital independiente' : 'Édition numérique indépendante');
    const cleanAuthor = author.trim() || (editionLang === 'es' ? 'Autor Independiente' : 'Auteur Indépendant');
    const cleanSynopsis =
      synopsis.trim() ||
      (editionLang === 'es'
        ? 'Obra publicada directamente desde el Estudio Editorial Obsidian.'
        : 'Ouvrage publié directement depuis l’Atelier Éditions Obsidienne.');
    const parsedPrice = Math.max(0, Number.parseFloat(price) || 0);

    return {
      id: `custom-${Date.now()}`,
      title: { es: cleanTitle, fr: cleanTitle },
      subtitle: { es: cleanSubtitle, fr: cleanSubtitle },
      author: cleanAuthor,
      category,
      editionLang,
      price: parsedPrice,
      pages: parsed.estimatedPages,
      year: 2026,
      isbn: `978-84-${String(Math.floor(100000 + Math.random() * 899999))}-0`,
      binding: {
        es: 'Edición de autor · Manuscrito digital',
        fr: 'Édition d’auteur · Manuscrit numérique',
      },
      synopsis: { es: cleanSynopsis, fr: cleanSynopsis },
      coverStyle,
      chapters: parsed.chapters,
      isUserPublished: true,
      sourceFileName: loadedFileName || undefined,
    };
  };

  const handlePreview = () => {
    setErrorMsg('');
    onPreviewDraft(buildBookObject());
  };

  const handlePublish = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg(t.studio.validationTitle);
      return;
    }
    if (!author.trim()) {
      setErrorMsg(t.studio.validationAuthor);
      return;
    }
    setErrorMsg('');
    const newBook = buildBookObject();
    onPublishBook(newBook);
    setTitle('');
    setSubtitle('');
    setAuthor('');
    setSynopsis('');
    setRawContent('');
    setLoadedFileName('');
    setBinaryNote(false);
  };

  const handleReset = () => {
    setTitle('');
    setSubtitle('');
    setAuthor('');
    setSynopsis('');
    setRawContent('');
    setLoadedFileName('');
    setBinaryNote(false);
    setErrorMsg('');
  };

  return (
    <section
      id="studio"
      className="border-t border-[var(--border-hairline)] bg-[var(--bg-surface)] py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2
              className="font-serif text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              {t.studio.heading}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--text-secondary)]">
              {t.studio.subheading}
            </p>
          </div>
          <button
            type="button"
            onClick={handleLoadSample}
            className="inline-flex min-h-[40px] items-center gap-2 self-start rounded border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-4 py-2 text-xs font-semibold text-[var(--text-primary)] whitespace-nowrap shrink-0 transition-colors hover:border-[#f39c12] hover:text-[#ffbe70] cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#f39c12]" aria-hidden="true" />
            <span>{t.studio.loadSampleBtn}</span>
          </button>
        </div>

        <form
          onSubmit={handlePublish}
          className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12"
        >
          {/* Left Column: Drag & Drop + Live Cover Preview */}
          <div className="space-y-6 lg:col-span-5">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`rounded-lg border-[1.5px] border-dashed p-7 text-center transition-colors duration-200 ${
                isDragging
                  ? 'dropzone-active border-[#f39c12] bg-[#f39c12]/10'
                  : 'border-[#f39c12]/35 bg-[radial-gradient(circle_at_top,rgba(243,156,18,0.08),transparent_70%)]'
              }`}
            >
              <UploadCloud
                className="mx-auto h-9 w-9 text-[#f39c12]"
                aria-hidden="true"
              />
              <h3 className="mt-4 font-serif text-xl font-semibold text-[var(--text-primary)]">
                {t.studio.dropTitle}
              </h3>
              <p className="mt-2 text-xs text-[var(--text-muted)]">
                {t.studio.dropSubtitle}
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept=".md,.markdown,.txt,.epub,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-5 inline-flex min-h-[40px] items-center gap-2 rounded bg-[#f39c12] px-4 py-2 text-xs font-semibold text-[#121316] transition-colors hover:bg-[#ffbe70] cursor-pointer"
              >
                <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t.studio.browseFiles}</span>
              </button>

              {loadedFileName && (
                <p className="mt-4 font-mono text-xs text-[var(--accent-ochre)]">
                  {t.studio.loadedFileLabel} {loadedFileName}
                </p>
              )}
              {binaryNote && (
                <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                  {t.studio.binaryFileNote}
                </p>
              )}
            </div>

            {/* Live Book Cover Preview */}
            <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-6">
              <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                <span>{t.studio.formCoverLabel}</span>
                <span className="font-mono tabular-nums">
                  {parsed.chapters.length} {t.studio.detectedChapters}
                </span>
              </div>

              <div className="mx-auto mt-5 w-48">
                <BookCover
                  title={title.trim() || t.studio.formTitlePlaceholder}
                  author={author.trim() || t.studio.formAuthorPlaceholder}
                  coverStyle={coverStyle}
                  editionLang={editionLang}
                />
              </div>

              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {(
                  [
                    { id: 'obsidian-gold', label: t.studio.coverOptions.obsidianGold },
                    { id: 'parchment-indigo', label: t.studio.coverOptions.parchmentIndigo },
                    { id: 'crimson-linen', label: t.studio.coverOptions.crimsonLinen },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setCoverStyle(opt.id)}
                    className={`min-h-[34px] rounded px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      coverStyle === opt.id
                        ? 'bg-[#f39c12] text-[#121316]'
                        : 'border border-[var(--border-hairline)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Clean Editorial Metadata & Chapter Content Editor */}
          <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-6 sm:p-8 lg:col-span-7">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[var(--text-secondary)]">
                  {t.studio.formTitleLabel} *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t.studio.formTitlePlaceholder}
                  className="mt-1.5 w-full rounded-t border-b border-[var(--border-strong)] bg-[var(--bg-input)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#f39c12] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)]">
                  {t.studio.formAuthorLabel} *
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder={t.studio.formAuthorPlaceholder}
                  className="mt-1.5 w-full rounded-t border-b border-[var(--border-strong)] bg-[var(--bg-input)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#f39c12] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)]">
                  {t.studio.formSubtitleLabel}
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder={t.studio.formSubtitlePlaceholder}
                  className="mt-1.5 w-full rounded-t border-b border-[var(--border-strong)] bg-[var(--bg-input)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#f39c12] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)]">
                  {t.studio.formCategoryLabel}
                </label>
                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as Exclude<CategoryKey, 'all'>)
                  }
                  className="mt-1.5 w-full rounded-t border-b border-[var(--border-strong)] bg-[var(--bg-input)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] focus:border-[#f39c12] focus:outline-none"
                >
                  <option value="fiction">{t.categories.fiction}</option>
                  <option value="essay">{t.categories.essay}</option>
                  <option value="poetry">{t.categories.poetry}</option>
                  <option value="architecture">{t.categories.architecture}</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)]">
                    {t.studio.formEditionLangLabel}
                  </label>
                  <select
                    value={editionLang}
                    onChange={(e) => setEditionLang(e.target.value as 'es' | 'fr')}
                    className="mt-1.5 w-full rounded-t border-b border-[var(--border-strong)] bg-[var(--bg-input)] px-3 py-2.5 text-sm text-[var(--text-primary)] focus:border-[#f39c12] focus:outline-none"
                  >
                    <option value="es">Español (ES)</option>
                    <option value="fr">Français (FR)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)]">
                    {t.studio.formPriceLabel}
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="mt-1.5 w-full rounded-t border-b border-[var(--border-strong)] bg-[var(--bg-input)] px-3 py-2.5 font-mono text-sm tabular-nums text-[var(--text-primary)] focus:border-[#f39c12] focus:outline-none"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[var(--text-secondary)]">
                  {t.studio.formSynopsisLabel}
                </label>
                <textarea
                  rows={2}
                  value={synopsis}
                  onChange={(e) => setSynopsis(e.target.value)}
                  placeholder={t.studio.formSynopsisPlaceholder}
                  className="mt-1.5 w-full rounded-t border-b border-[var(--border-strong)] bg-[var(--bg-input)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#f39c12] focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <div className="flex items-center justify-between gap-2">
                  <label className="block text-xs font-semibold text-[var(--text-secondary)]">
                    {t.studio.formContentLabel}
                  </label>
                  <span className="font-mono text-[11px] text-[var(--text-muted)] tabular-nums">
                    {parsed.chapters.length} {t.studio.detectedChapters}
                  </span>
                </div>
                <textarea
                  rows={7}
                  value={rawContent}
                  onChange={(e) => setRawContent(e.target.value)}
                  placeholder={SAMPLE_MANUSCRIPTS[editionLang]}
                  className="mt-1.5 w-full rounded-t border-b border-[var(--border-strong)] bg-[var(--bg-input)] px-3.5 py-3 font-mono text-xs leading-relaxed text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#f39c12] focus:outline-none"
                />
                <p className="mt-1.5 text-xs text-[var(--text-muted)]">
                  {t.studio.formContentHint}
                </p>
              </div>
            </div>

            {errorMsg && (
              <p className="mt-4 rounded border border-[#ffb4ab]/40 bg-[#93000a]/25 px-3.5 py-2 text-xs font-medium text-[#ffb4ab]">
                {errorMsg}
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-hairline)] pt-5">
              <button
                type="button"
                onClick={handleReset}
                className="min-h-[40px] rounded px-3 py-2 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                {t.studio.clearBtn}
              </button>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handlePreview}
                  className="inline-flex min-h-[42px] items-center gap-2 rounded border border-[var(--border-strong)] px-4 py-2 text-xs font-semibold text-[var(--text-primary)] whitespace-nowrap transition-colors hover:border-[#f39c12] cursor-pointer"
                >
                  <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{t.studio.previewDraftBtn}</span>
                </button>

                <button
                  type="submit"
                  className="inline-flex min-h-[42px] items-center gap-2 rounded bg-[#f39c12] px-5 py-2 text-xs font-semibold text-[#121316] whitespace-nowrap transition-colors hover:bg-[#ffbe70] cursor-pointer"
                >
                  <BookPlus className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{t.studio.publishBtn}</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
