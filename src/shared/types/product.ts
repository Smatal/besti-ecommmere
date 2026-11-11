export interface ProductFaq {
  q: string;
  a: string;
}

export interface ProductComparison {
  feature: string;
  bestie: string;
  market: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  categoryName: string;
  concern: string;
  skinType: string;
  subtitle: string;
  image: string;
  singlePrice: number;
  singleMrp: number;
  duoPrice: number;
  duoMrp: number;
  volume: string;
  rating: number;
  reviewsCount: number;
  badge: string;
  badgeType: string;
  themeColor: string;
  highlights: string[];
  actives: string;
  description: string;
  howToUse: string[];
  inci: string;
  faqs?: ProductFaq[];
  benefits?: string[];
  specs?: Record<string, string>;
  comparison?: ProductComparison[];
}

export interface BundleKit {
  id: string;
  title: string;
  subtitle: string;
  items: string[];
  itemNames: string;
  price: number;
  mrp: number;
  savings: string;
  freebie: string;
  badge: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  subtitle?: string;
  pack: 'single' | 'duo' | 'kit';
  packLabel: string;
  price: number;
  mrp: number;
  image: string;
  quantity: number;
  volume?: string;
  savings?: string;
  freebie?: string;
}

export interface RoutineStep {
  step: number;
  title: string;
  timeOfDay: 'Morning (AM)' | 'Night (PM)';
  description: string;
  productId: string;
}
