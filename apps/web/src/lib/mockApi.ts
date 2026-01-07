import { categories } from "@/mocks/categories";
import { scenes } from "@/mocks/scenes";
import { services } from "@/mocks/services";
import { sellers } from "@/mocks/sellers";
import { reviews } from "@/mocks/reviews";
import type { Category, Scene, Service, Seller, Review } from "@/types";

const DELAY_MS = 600;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  // カテゴリ
  getCategories: async (): Promise<Category[]> => {
    await delay(DELAY_MS);
    return categories;
  },

  getCategoryBySlug: async (slug: string): Promise<Category | null> => {
    await delay(DELAY_MS);
    return categories.find((c) => c.slug === slug) || null;
  },

  // シーン
  getScenes: async (): Promise<Scene[]> => {
    await delay(DELAY_MS);
    return scenes;
  },

  // サービス一覧
  getServices: async (options?: {
    categorySlug?: string;
    sellerId?: string;
    limit?: number;
  }): Promise<Service[]> => {
    await delay(DELAY_MS);
    let result = [...services];
    if (options?.categorySlug) {
      result = result.filter((s) => s.categorySlug === options.categorySlug);
    }
    if (options?.sellerId) {
      result = result.filter((s) => s.sellerId === options.sellerId);
    }
    if (options?.limit) {
      result = result.slice(0, options.limit);
    }
    return result;
  },

  // サービス詳細
  getServiceById: async (id: string): Promise<Service | null> => {
    await delay(DELAY_MS);
    return services.find((s) => s.id === id) || null;
  },

  // 出品者一覧
  getSellers: async (options?: { limit?: number }): Promise<Seller[]> => {
    await delay(DELAY_MS);
    let result = [...sellers];
    if (options?.limit) {
      result = result.slice(0, options.limit);
    }
    return result;
  },

  // 出品者詳細
  getSellerById: async (id: string): Promise<Seller | null> => {
    await delay(DELAY_MS);
    return sellers.find((s) => s.id === id) || null;
  },

  // レビュー
  getReviewsByServiceId: async (serviceId: string): Promise<Review[]> => {
    await delay(DELAY_MS);
    return reviews.filter((r) => r.serviceId === serviceId);
  },

  // 検索
  searchServices: async (query: string): Promise<Service[]> => {
    await delay(DELAY_MS);
    const lowerQuery = query.toLowerCase();
    return services.filter(
      (s) =>
        s.title.toLowerCase().includes(lowerQuery) ||
        s.summary.toLowerCase().includes(lowerQuery)
    );
  },
};
