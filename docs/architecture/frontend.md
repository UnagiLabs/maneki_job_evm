# フロントエンド構成計画

## 概要

Feature-based構成を採用し、機能単位での凝集度を高める。

## ディレクトリ構成

```
apps/web/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # 認証関連グループ
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── (main)/                   # メインレイアウトグループ
│   │   │   ├── services/             # 出品一覧・詳細・検索
│   │   │   │   ├── [id]/
│   │   │   │   └── new/
│   │   │   ├── orders/               # 取引一覧・詳細
│   │   │   │   └── [id]/
│   │   │   ├── messages/             # メッセージ
│   │   │   │   └── [orderId]/
│   │   │   ├── profile/              # プロフィール
│   │   │   │   └── [userId]/
│   │   │   └── settings/             # 設定
│   │   ├── api/                      # API Routes
│   │   │   ├── auth/
│   │   │   ├── services/
│   │   │   ├── orders/
│   │   │   └── upload/
│   │   ├── layout.tsx
│   │   └── page.tsx                  # LP
│   │
│   ├── features/                     # 機能ごとのモジュール
│   │   ├── auth/
│   │   │   ├── components/           # WorldIDButton, WalletConnect等
│   │   │   ├── hooks/                # useWorldID, useWallet
│   │   │   └── lib/                  # 認証ロジック
│   │   ├── services/
│   │   │   ├── components/           # ServiceCard, ServiceForm等
│   │   │   ├── hooks/
│   │   │   └── types/
│   │   ├── orders/
│   │   │   ├── components/           # OrderStatus, DeliveryForm等
│   │   │   ├── hooks/
│   │   │   └── types/
│   │   ├── messages/
│   │   │   ├── components/
│   │   │   └── hooks/
│   │   ├── ratings/
│   │   │   ├── components/           # RatingForm, StarDisplay等
│   │   │   └── hooks/
│   │   └── escrow/                   # スマコン連携
│   │       ├── hooks/                # useEscrow, useOrder
│   │       ├── lib/                  # コントラクト呼び出し
│   │       └── abi/                  # ABI定義
│   │
│   ├── components/                   # 共通UIコンポーネント
│   │   ├── ui/                       # Button, Input, Modal等
│   │   ├── layout/                   # Header, Footer, Sidebar
│   │   └── common/                   # Avatar, Badge等
│   │
│   ├── lib/                          # 共通ユーティリティ
│   │   ├── web3/                     # wagmi設定, チェーン定義
│   │   ├── api/                      # APIクライアント
│   │   └── utils/                    # 汎用関数
│   │
│   ├── hooks/                        # 共通hooks
│   │
│   ├── types/                        # 共通型定義
│   │   ├── order.ts
│   │   ├── service.ts
│   │   └── user.ts
│   │
│   ├── constants/                    # 定数
│   │   ├── chains.ts                 # チェーン設定
│   │   ├── contracts.ts              # コントラクトアドレス
│   │   └── config.ts
│   │
│   └── styles/
│       └── globals.css
│
├── public/
├── next.config.ts
├── package.json
└── tsconfig.json
```

## 設計方針

### Feature-based構成の理由

| ポイント | 理由 |
|----------|------|
| `features/` | 機能単位で凝集度を高める。auth/orders/escrow等が独立して開発・テスト可能 |
| `features/escrow/` | スマコン連携を分離。ABI・hooks・libを1箇所に集約 |
| `app/(auth)`, `(main)` | Route Groupsでレイアウト分離（認証前/後で異なるレイアウト） |
| `components/ui/` | shadcn/ui等を配置。デザインシステムとして再利用 |
| `constants/contracts.ts` | チェーンごとのJPYCアドレス等を一元管理（偽トークン対策） |

### featuresの責務

| Feature | 責務 |
|---------|------|
| `auth` | World ID認証、ウォレット接続、セッション管理 |
| `services` | 出品CRUD、検索、一覧表示 |
| `orders` | 取引管理、ステータス表示 |
| `messages` | チャット、ファイル添付 |
| `ratings` | 評価入力、★表示 |
| `escrow` | コントラクト連携（createOrder, deliver, accept等） |

## モノレポ全体構成

```
maneki_job_evm/
├── apps/
│   ├── web/              # フロントエンド（Next.js）
│   └── contracts/        # スマートコントラクト（Foundry）
├── packages/
│   └── contract-types/   # ABI・型定義（生成物）
└── docs/
    ├── requirements/     # 要件定義
    ├── architecture/     # アーキテクチャ
    └── specs/            # 詳細仕様
```

### apps/contracts/

```
apps/contracts/
├── src/                    # Solidityソース
│   └── EscrowMarketplace.sol
├── test/                   # コントラクトテスト
├── script/                 # デプロイスクリプト
├── foundry.toml            # Foundry設定
└── package.json
```

### packages/contract-types/

```
packages/contract-types/
├── abis/                   # ABI JSON（ビルド後コピー）
│   └── EscrowMarketplace.json
├── types/                  # TypeChain/wagmi生成型
└── index.ts                # エクスポート
```

## 技術選定

| 領域 | 技術 |
|------|------|
| フレームワーク | Next.js 16 (App Router) |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS |
| UIライブラリ | shadcn/ui（予定） |
| Web3 | wagmi + viem |
| 認証 | World ID (IDKit) |
| 状態管理 | Tanstack Query + Zustand（必要に応じて） |
| フォーム | React Hook Form + Zod |
