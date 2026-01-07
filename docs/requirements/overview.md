# JPYC（EVM）版 要件定義書（v1.0 / ドラフト）

対象：World IDログイン × JPYC（ERC-20）エスクローで動く「ココナラ型」スキル売買サービス（EVM特化）

---

## 1. 目的・前提

### 1.1 目的

- スキル売買（依頼→納品→検収→評価）を、**JPYC（ERC-20）決済**で提供する。
- ログインに **World ID** を用い、**1人1アカウント**で不正（多重アカウント）を抑止する。
- 取引フロー（承諾/差し戻し/自動クローズ/評価公開）は **ココナラ準拠**を基本とする。

### 1.2 決済・資金移動の原則

- エスクローと資金移動は **EVM上のスマートコントラクト（Solidity）**のみで完結。
- 運営は **裁量で資金を動かせない**（管理者が返金/支払いを強制する権限は持たない）。
- 運営手数料：**10%固定**をコントラクトで自動分配（Treasuryへ送金）。

---

## 2. 対象チェーン・トークン

### 2.1 対象チェーン（JPYC対応）

- JPYC Prepaid v2 の開発者向け資料では、**Ethereum / Polygon / Avalanche** がサポート対象として挙げられている。

### 2.2 JPYCコントラクト

- JPYC社の告知で、v2の新コントラクトアドレスとして **0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB** が示されている。
- 実運用では、対象チェーンのブロックエクスプローラ（例：PolygonScan / Etherscan）で**コントラクトの検証済み表示**とトークン情報を確認して、アドレスを固定する（偽トークン対策）。

> MVP推奨：**Polygon**（ガスが軽くUXを作りやすい）
> ※ただし要件上はチェーン非依存（上記対応チェーンを追加可能）

---

## 3. 用語・役割

- 購入者（Buyer）：サービス購入・支払い・検収・評価
- 出品者（Seller）：サービス提供・納品・評価
- 取引（Order）：1回の契約単位（オンチェーンOrderID + Web2メタ）
- 正式な納品：Sellerが「納品」アクションを実行し、検収待ちになる状態
- 差し戻し：Buyerが修正依頼として正式納品を差し戻す（本仕様：**1回まで**）
- 紛争（DISPUTED）：通常フローで合意できない状態（ただし解決はオンチェルールのみ）
- Treasury：運営手数料の受け取り先アドレス（コントラクトで固定）

---

## 4. 取引フロー（ココナラ準拠 + 本サービスの差分）

### 4.1 納品確認（準拠点）

- ココナラ：正式な納品後、一定時間内に承諾/差し戻しが無いと自動承諾でクローズ。
- ココナラ：承諾後は「評価入力」または「24時間経過」でクローズ。

### 4.2 本サービスの差分（確定事項）

- **deadlineは丸めずに「納品時刻から72時間後」**（コントラクト実装簡易化のため）。
  ※ココナラは「72時間後の翌00分以内」表現だが、本サービスは"72hちょうど"へ簡略化する。
- 差し戻し：**1回まで**（2回目納品後は差し戻し不可）。

---

## 5. 機能要件

### 5.1 認証（World ID）

#### 5.1.1 実装方式（必須）

- **IDKitでproof取得 → バックエンドでCloud Verification**により検証。
- "Sign in with World ID v1" は **2026-01-31 に停止予定**のため、依存しない。

#### 5.1.2 1人1アカウント（必須）

- Developer Portalで **登録用Action（incognito action）**を作り、**max_verifications=1** 相当で二重登録を防ぐ（同一人物が再登録できない）。
- DB側でも `nullifier_hash`（または同等の一意キー）にユニーク制約。

#### 5.1.3 ウォレット紐付け

- EVMウォレット（EOA）をプロフィールに紐付け（署名で所有証明）。
- 取引・支払いは当該ウォレットからのみ実行可能。

---

### 5.2 出品（Service）

- 作成/編集/公開/非公開
- 項目（MVP）：
  - タイトル、説明、価格（JPYC）、カテゴリ、納期目安、対応範囲、注意事項
- 検索/一覧/詳細表示

---

### 5.3 取引（Order）＆チャット

#### 5.3.1 取引開始

- Buyerが購入→JPYCをエスクローにデポジットして取引開始（オンチェーンTx）
- Web2に「取引メタ（service_id, buyer_user_id, seller_user_id, order_contract_id 等）」を保持

#### 5.3.2 メッセージ

- Web2で保存（DB）。
- 添付（納品物参照）は署名付きURL等で提供（後述）。

---

### 5.4 納品・検収・自動クローズ

#### 5.4.1 正式な納品

- Sellerが `deliver(order, delivery_ref)` 実行
- コントラクトは `deliveredAt = block.timestamp` を保存し、`deadline = deliveredAt + 72 hours` をセット

#### 5.4.2 検収（Buyer）

- `accept(order)`：承諾→支払い確定
- `requestRevision(order)`：差し戻し（**1回まで**）
- 2回目納品は最終納品扱い（差し戻し不可）

#### 5.4.3 自動クローズ

- `block.timestamp >= deadline` で `autoClose(order)` が実行可能（誰でも実行可）
- `autoClose` は承諾相当として支払い確定

#### 5.4.4 承諾後クローズ（評価猶予）

- 承諾後、評価入力が無くても **24時間後にクローズ確定**（ココナラ準拠）。

---

### 5.5 紛争（DISPUTED）— 運営介入なし・オンチェ完結

#### 5.5.1 紛争開始

- BuyerまたはSellerが `openDispute(order, reason_hash)` を実行（条件：DELIVERED中等）

#### 5.5.2 解決方法（オンチェのみ）

- 合意解決（双方合意）：
  - `proposeSettlement(order, buyerBps)` を各当事者が提出
  - 提案一致で `settle(order)`（JPYCを按分して分配）
- タイムアウト解決（**本仕様で固定**）：
  - `disputeOpenedAt + DISPUTE_TIMEOUT` 経過で誰でも `resolveDisputeTimeout(order)` 実行可
  - **デフォルト結論：Buyerへ全額返金**
  - `DISPUTE_TIMEOUT`：14日（定数、デプロイ時固定）

> ※運営が裁量で資金移動する権限は持たない（Adminによる強制解決なし）。

---

### 5.6 手数料（10%固定）

- 支払い確定時（accept / autoClose / settle）に、
  - 10% → Treasury
  - 90% → Seller
- 返金（cancel/timeout返金）時は手数料0（全額返金）

---

### 5.7 評価（ココナラ準拠）

#### 5.7.1 収集・表示

- 総合★（1〜5）＋コメント（公開）
- 項目別（クオリティ、コミュニケーション等）も入力し、集計表示を行う（ココナラと同様の見せ方に寄せる）。

#### 5.7.2 公開タイミング（準拠）

- 双方入力完了で同時公開、片方のみ入力の場合は期限経過で入力済みのみ公開。
- 評価期限：評価可能になった翌日から **10日間**（準拠）。

※評価データはWeb2（DB）に保存（改ざん対策として評価確定ハッシュをイベント発火するのは任意）。

---

## 6. スマートコントラクト要件（Solidity）

### 6.1 コントラクト構成

- `EscrowMarketplace`（単一コントラクト）
  - JPYC（ERC-20）を扱う
  - Orderをmappingで管理（もしくはOrder NFT方式も可）

### 6.2 Orderデータ（例）

- `buyer`, `seller`
- `amount`（総額）
- `feeBps = 1000`
- `state`
- `revisionUsed`（bool）
- `deliveredAt`, `deadline`
- `acceptedAt`
- `disputeOpenedAt`
- `deliveryRefHash`（URL直置きは避け、参照ID/ハッシュ推奨）

### 6.3 エントリポイント（例）

- `createOrder(serviceId, seller, amount, clientSalt)`（JPYC transferFrom）
- `deliver(orderId, deliveryRefHash)`
- `requestRevision(orderId)`（1回まで）
- `accept(orderId)`
- `autoClose(orderId)`
- `openDispute(orderId, reasonHash)`
- `proposeSettlement(orderId, buyerBps)` / `settle(orderId)`
- `resolveDisputeTimeout(orderId)`（14日→全額返金）

### 6.4 セキュリティ要件（必須）

- ERC-20送金は **SafeERC20** を使用（失敗/非標準ERC-20対策）。
- 再入可能性対策：**ReentrancyGuard** を適用。
- 重大バグ時の緊急停止：**Pausable**（ただし「資金を運営が動かす権限」ではなく、機能停止のみ）。
- 重要イベント emit：
  - `OrderCreated, Delivered, RevisionRequested, Accepted, AutoClosed, DisputeOpened, SettlementProposed, Settled, DisputeTimedOut, Refunded`

---

## 7. Web2要件（納品物保存・DB・API）

### 7.1 納品物（Web2でOK）

- 物理ファイルはWeb2ストレージに保存（例：Cloudflare R2 / S3互換）
- チャット内には「参照ID or 署名付きURL」を掲載
- アクセス制御：buyer/sellerのみ（署名付きURLの発行はAPI）

### 7.2 DB（必須）

- User（world_id_nullifier, wallet, profile）
- Service（出品情報）
- OrderMeta（onchain orderId, chainId, status cache）
- Message（chat）
- Rating（評価、公開状態、期限）
- Abuse/Report（通報）

### 7.3 バックエンド（必須）

- World ID proof 検証（Cloud Verification）
- 署名付きURL発行
- チェーン同期（イベント購読 → DB反映）
- 通知送信（メール等）

---

## 8. インフラ選定（推奨）と概略コスト

### 8.1 推奨スタック（MVP）

- フロント：Vercel（Next.js）
  - 追加seat $20/月（Owner/Member）
- DB：Supabase Pro $25/月〜
- ストレージ：Cloudflare R2
  - Free tier（10GB-month等）＋ egress無料、以降従量
- メール：Resend（Free 3,000通/月、Pro $20/50,000通）
- 監視：Sentry（価格体系あり）
- RPC：Alchemy Free（30M CU/月）
  伸びたらQuickNode Build $49/月（80M API credits）等

### 8.2 月額概算（目安）

- MVP最小：Supabase $25 +（Vercel/Resend/R2/RPCが無料枠内） → **$25〜$60/月程度**
- 小規模本番：Vercel seat増 + Resend Pro + Sentry + RPC有料 → **$120〜$250/月程度**

---

## 9. 受け入れ条件（Acceptance Criteria）

- 同一人物が2回目のサインアップを試みると失敗（World ID Action制限 + DB一意制約）。
- JPYCで `createOrder` すると、コントラクトがJPYCを保持し、取引状態がOPENになる。
- `deliver` で `deadline = deliveredAt + 72h` が記録される。
- 差し戻しは1回まで。2回目納品後は差し戻しできない。
- `autoClose` が期限到来で誰でも実行でき、売上（90%）と手数料（10%）が自動分配される。
- DISPUTEDで、運営が資金移動できない（当事者合意 or タイムアウトのみで解決）。
- 評価は双方入力で同時公開、片方のみ入力なら期限後に入力済みだけ公開（10日）。

---

## 10. リスク・注意事項（実装必須の対策）

- JPYC v2コントラクトアドレスは公式告知に基づき、チェーンごとに**固定＆検証**して扱う（偽トークン回避）。
- World IDは v1のSign-in終了があるため、IDKit + Cloud Verificationで実装する。
- ERC-20取扱いはSafeERC20、reentrancy対策・緊急停止を入れる。
