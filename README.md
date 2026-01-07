# Maneki Job EVM

World ID × JPYC エスクローで動くスキル売買プラットフォーム

## 概要

- **認証**: World ID（1人1アカウント）
- **決済**: JPYC（ERC-20）エスクロー
- **対応チェーン**: Polygon（MVP）、Ethereum、Gnosis、Avalanche、Astar

## 構成

```
├── apps/
│   ├── web/          # フロントエンド（Next.js）
│   └── contracts/    # スマートコントラクト（Foundry）※予定
├── packages/
│   └── contract-types/  # ABI・型定義 ※予定
└── docs/
    └── requirements/    # 要件定義
```

## セットアップ

```bash
# 依存インストール
pnpm install

# 開発サーバー起動
pnpm dev
```

## スクリプト

| コマンド | 説明 |
|---------|------|
| `pnpm dev` | 開発サーバー起動 |
| `pnpm build` | ビルド |
| `pnpm lint` | Lint実行 |
| `pnpm format` | フォーマット（Biome） |

## 技術スタック

- **パッケージ管理**: pnpm workspaces
- **ビルド**: Turborepo
- **Linter/Formatter**: Biome
- **フロントエンド**: Next.js 16 + TypeScript + Tailwind CSS
- **コントラクト**: Solidity + Foundry（予定）

## ドキュメント

- [要件定義](./docs/requirements/overview.md)
- [フロントエンド構成](./docs/architecture/frontend.md)
