export type Locale = 'es' | 'fr';

export type ThemeMode = 'dark' | 'light';

export type CategoryKey = 'all' | 'fiction' | 'essay' | 'poetry' | 'architecture';

export type EditionLanguageFilter = 'all' | 'es' | 'fr';

export type ReaderTheme = 'obsidian' | 'sepia' | 'alabaster';

export type ReaderFontSize = 'sm' | 'md' | 'lg' | 'xl';

export type CoverStyleId = 'obsidian-gold' | 'parchment-indigo' | 'crimson-linen';

export interface LocalizedText {
  es: string;
  fr: string;
}

export interface BookChapter {
  id: string;
  title: LocalizedText;
  paragraphs: {
    es: string[];
    fr: string[];
  };
}

export interface BookItem {
  id: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  author: string;
  category: Exclude<CategoryKey, 'all'>;
  editionLang: 'es' | 'fr';
  price: number;
  pages: number;
  year: number;
  isbn: string;
  binding: LocalizedText;
  synopsis: LocalizedText;
  coverImage?: string;
  coverStyle: CoverStyleId;
  chapters: BookChapter[];
  isUserPublished?: boolean;
  sourceFileName?: string;
  sourceFormat?: string;
}

export interface CartItem {
  bookId: string;
  quantity: number;
}

export interface ReadingProgress {
  chapterIndex: number;
  updatedAt: string;
}

export interface OrderReceipt {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    bookId: string;
    title: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  createdAt: string;
}
