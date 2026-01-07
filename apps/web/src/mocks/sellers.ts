import type { Seller } from "@/types";

export const sellers: Seller[] = [
  {
    id: "1",
    name: "田中デザイン",
    title: "プロのグラフィックデザイナー",
    avatar: "https://ui-avatars.com/api/?name=%E7%94%B0%E4%B8%AD&background=6366f1&color=fff&size=150",
    ratingAvg: 4.9,
    ratingCount: 256,
    completedCount: 312,
    badges: [
      { id: "1", name: "PRO", color: "bg-amber-500 text-white" },
      { id: "2", name: "本人確認済", color: "bg-blue-500 text-white" },
    ],
  },
  {
    id: "2",
    name: "佐藤Web工房",
    title: "フルスタックエンジニア",
    avatar: "https://ui-avatars.com/api/?name=%E4%BD%90%E8%97%A4&background=8b5cf6&color=fff&size=150",
    ratingAvg: 4.8,
    ratingCount: 189,
    completedCount: 245,
    badges: [
      { id: "1", name: "PRO", color: "bg-amber-500 text-white" },
      { id: "3", name: "即日対応", color: "bg-green-500 text-white" },
    ],
  },
  {
    id: "3",
    name: "鈴木ライティング",
    title: "SEOライター・編集者",
    avatar: "https://ui-avatars.com/api/?name=%E9%88%B4%E6%9C%A8&background=ec4899&color=fff&size=150",
    ratingAvg: 4.7,
    ratingCount: 134,
    completedCount: 178,
    badges: [
      { id: "2", name: "本人確認済", color: "bg-blue-500 text-white" },
    ],
  },
  {
    id: "4",
    name: "山本映像制作",
    title: "動画クリエイター",
    avatar: "https://ui-avatars.com/api/?name=%E5%B1%B1%E6%9C%AC&background=f97316&color=fff&size=150",
    ratingAvg: 4.9,
    ratingCount: 98,
    completedCount: 124,
    badges: [
      { id: "1", name: "PRO", color: "bg-amber-500 text-white" },
      { id: "2", name: "本人確認済", color: "bg-blue-500 text-white" },
      { id: "3", name: "即日対応", color: "bg-green-500 text-white" },
    ],
  },
  {
    id: "5",
    name: "高橋マーケティング",
    title: "デジタルマーケター",
    avatar: "https://ui-avatars.com/api/?name=%E9%AB%98%E6%A9%8B&background=14b8a6&color=fff&size=150",
    ratingAvg: 4.6,
    ratingCount: 76,
    completedCount: 89,
    badges: [
      { id: "2", name: "本人確認済", color: "bg-blue-500 text-white" },
    ],
  },
  {
    id: "6",
    name: "伊藤イラスト",
    title: "イラストレーター",
    avatar: "https://ui-avatars.com/api/?name=%E4%BC%8A%E8%97%A4&background=22c55e&color=fff&size=150",
    ratingAvg: 5.0,
    ratingCount: 67,
    completedCount: 72,
    badges: [
      { id: "1", name: "PRO", color: "bg-amber-500 text-white" },
      { id: "4", name: "新着", color: "bg-purple-500 text-white" },
    ],
  },
];
