import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "1",
    title: "プロがあなたのロゴをデザインします",
    summary: "シンプルで印象的なロゴを3案提案。修正無制限でご満足いただけるまで対応します。",
    description: `ロゴデザインのプロフェッショナルが、あなたのビジネスにぴったりのロゴを制作します。

【サービス内容】
- ヒアリングシートによる詳細な要望確認
- 3案のロゴデザイン提案
- 修正は納得いただけるまで無制限
- 最終納品：AI/PNG/JPG/PDF形式

【こんな方におすすめ】
- 新規事業を始める方
- ブランドイメージを刷新したい方
- プロ品質のロゴが欲しい方`,
    priceJpyc: 10000,
    categorySlug: "design",
    sellerId: "1",
    ratingAvg: 4.9,
    ratingCount: 128,
    thumbnail: "https://placehold.co/600x400/6366f1/ffffff.png?text=Logo",
    deliveryDays: 5,
  },
  {
    id: "2",
    title: "レスポンシブ対応のWebサイトを制作します",
    summary: "モダンなデザインで、スマホ・タブレット対応のWebサイトを制作。",
    description: `フルスタックエンジニアが、モダンな技術でWebサイトを制作します。

【サービス内容】
- ワイヤーフレーム作成
- デザイン制作
- コーディング（HTML/CSS/JavaScript）
- レスポンシブ対応
- 公開サポート

【使用技術】
Next.js / React / Tailwind CSS`,
    priceJpyc: 50000,
    categorySlug: "web",
    sellerId: "2",
    ratingAvg: 4.8,
    ratingCount: 89,
    thumbnail: "https://placehold.co/600x400/8b5cf6/ffffff.png?text=Web",
    deliveryDays: 14,
  },
  {
    id: "3",
    title: "SEO対策込み！高品質な記事を執筆します",
    summary: "検索上位を狙える、読みやすく価値のある記事を作成します。",
    description: `SEOを意識した、読者に価値を提供する記事を執筆します。

【サービス内容】
- キーワード調査
- 構成案作成
- 本文執筆（3000文字程度）
- SEO最適化
- 修正1回無料`,
    priceJpyc: 8000,
    categorySlug: "writing",
    sellerId: "3",
    ratingAvg: 4.7,
    ratingCount: 67,
    thumbnail: "https://placehold.co/600x400/ec4899/ffffff.png?text=SEO",
    deliveryDays: 3,
  },
  {
    id: "4",
    title: "YouTube動画の編集を代行します",
    summary: "テロップ、BGM、効果音入りの高品質な動画編集。",
    description: `YouTubeクリエイター向けの動画編集サービスです。

【サービス内容】
- カット編集
- テロップ入れ
- BGM・効果音追加
- カラーグレーディング
- サムネイル作成（オプション）

【納品形式】
MP4 / MOV`,
    priceJpyc: 15000,
    categorySlug: "video",
    sellerId: "4",
    ratingAvg: 4.9,
    ratingCount: 56,
    thumbnail: "https://placehold.co/600x400/f97316/ffffff.png?text=Video",
    deliveryDays: 5,
  },
  {
    id: "5",
    title: "SNS運用の戦略立案・運用代行",
    summary: "Instagram・Twitter・TikTokの運用をまるっとお任せ。",
    description: `SNSマーケティングのプロが、あなたのアカウントを成長させます。

【サービス内容】
- アカウント分析
- 投稿戦略立案
- 月間投稿作成（10投稿）
- エンゲージメント分析レポート

【対応SNS】
Instagram / Twitter / TikTok`,
    priceJpyc: 30000,
    categorySlug: "marketing",
    sellerId: "5",
    ratingAvg: 4.6,
    ratingCount: 42,
    thumbnail: "https://placehold.co/600x400/14b8a6/ffffff.png?text=SNS",
    deliveryDays: 7,
  },
  {
    id: "6",
    title: "オリジナルキャラクターを制作します",
    summary: "商用利用OK！あなただけのオリジナルキャラクターを描きます。",
    description: `イラストレーターがオリジナルキャラクターを制作します。

【サービス内容】
- ラフ案3種
- 線画
- カラーリング
- 背景（シンプル）
- 商用利用OK

【納品形式】
PNG / PSD`,
    priceJpyc: 20000,
    categorySlug: "illustration",
    sellerId: "6",
    ratingAvg: 5.0,
    ratingCount: 38,
    thumbnail: "https://placehold.co/600x400/22c55e/ffffff.png?text=Character",
    deliveryDays: 7,
  },
  {
    id: "7",
    title: "ビジネス英語の翻訳・校正を行います",
    summary: "ネイティブチェック込みの高品質な英日・日英翻訳。",
    description: `ビジネス文書の翻訳を承ります。

【対応言語】
英語 ⇔ 日本語

【サービス内容】
- 翻訳（1000文字まで）
- ネイティブチェック
- 2回まで修正対応

【対応分野】
ビジネス / IT / マーケティング / 契約書`,
    priceJpyc: 5000,
    categorySlug: "translation",
    sellerId: "3",
    ratingAvg: 4.8,
    ratingCount: 29,
    thumbnail: "https://placehold.co/600x400/3b82f6/ffffff.png?text=Translation",
    deliveryDays: 2,
  },
  {
    id: "8",
    title: "Webアプリ開発のコンサルティング",
    summary: "技術選定から実装まで、Webアプリ開発の相談に乗ります。",
    description: `Webアプリケーション開発の技術コンサルティングを行います。

【サービス内容】
- 要件ヒアリング（60分）
- 技術選定アドバイス
- アーキテクチャ設計支援
- コードレビュー

【得意分野】
React / Next.js / Node.js / AWS`,
    priceJpyc: 12000,
    categorySlug: "it",
    sellerId: "2",
    ratingAvg: 4.9,
    ratingCount: 45,
    thumbnail: "https://placehold.co/600x400/6366f1/ffffff.png?text=Consulting",
    deliveryDays: 3,
  },
  {
    id: "9",
    title: "名刺デザイン - 両面フルカラー",
    summary: "印象に残るおしゃれな名刺をデザインします。入稿データまで対応。",
    description: `ビジネスに使える名刺をデザインします。

【サービス内容】
- 両面デザイン
- 2案提案
- 修正2回まで無料
- 入稿用データ納品

【納品形式】
AI / PDF（入稿用）`,
    priceJpyc: 5000,
    categorySlug: "design",
    sellerId: "1",
    ratingAvg: 4.8,
    ratingCount: 92,
    thumbnail: "https://placehold.co/600x400/8b5cf6/ffffff.png?text=Card",
    deliveryDays: 3,
  },
  {
    id: "10",
    title: "LP（ランディングページ）制作",
    summary: "コンバージョン重視のLPをデザイン・コーディングします。",
    description: `売上につながるランディングページを制作します。

【サービス内容】
- ワイヤーフレーム作成
- デザイン制作
- コーディング
- スマホ対応
- フォーム実装

【特徴】
A/Bテスト用に複数パターン対応可能`,
    priceJpyc: 80000,
    categorySlug: "web",
    sellerId: "2",
    ratingAvg: 4.9,
    ratingCount: 34,
    thumbnail: "https://placehold.co/600x400/ec4899/ffffff.png?text=LP",
    deliveryDays: 10,
  },
];
