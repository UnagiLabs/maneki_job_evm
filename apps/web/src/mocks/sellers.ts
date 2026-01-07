import type { Seller } from "@/types";

export const sellers: Seller[] = [
  {
    id: "1",
    name: "田中デザイン",
    title: "プロのグラフィックデザイナー",
    avatar: "https://placehold.co/150x150/6366f1/ffffff.png?text=TD",
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
    avatar: "https://placehold.co/150x150/8b5cf6/ffffff.png?text=SW",
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
    avatar: "https://placehold.co/150x150/ec4899/ffffff.png?text=SL",
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
    avatar: "https://placehold.co/150x150/f97316/ffffff.png?text=YM",
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
    avatar: "https://placehold.co/150x150/14b8a6/ffffff.png?text=TM",
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
    avatar: "https://placehold.co/150x150/22c55e/ffffff.png?text=II",
    ratingAvg: 5.0,
    ratingCount: 67,
    completedCount: 72,
    badges: [
      { id: "1", name: "PRO", color: "bg-amber-500 text-white" },
      { id: "4", name: "新着", color: "bg-purple-500 text-white" },
    ],
  },
];
