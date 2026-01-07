export interface Category {
  id: string;
  slug: string;
  name: string;
  icon: string;
}

export interface Scene {
  id: string;
  slug: string;
  name: string;
  image: string;
}

export interface Service {
  id: string;
  title: string;
  summary: string;
  description: string;
  priceJpyc: number;
  categorySlug: string;
  sellerId: string;
  ratingAvg: number;
  ratingCount: number;
  thumbnail: string;
  deliveryDays: number;
}

export interface Badge {
  id: string;
  name: string;
  color: string;
}

export interface Seller {
  id: string;
  name: string;
  title: string;
  avatar: string;
  ratingAvg: number;
  ratingCount: number;
  completedCount: number;
  badges: Badge[];
}

export interface Review {
  id: string;
  serviceId: string;
  rating: number;
  comment: string;
  authorName: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  createdAt: string;
}
