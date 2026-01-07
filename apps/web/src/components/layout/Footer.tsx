import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg font-bold mb-4">Maneki job</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              運営に頼らず、世界と仕事できるスキルマーケット。
              スマートコントラクトで守られる安心取引。
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-3">サービス</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/categories/design"
                  className="hover:text-foreground transition-colors"
                >
                  カテゴリ一覧
                </Link>
              </li>
              <li>
                <Link
                  href="/sellers"
                  className="hover:text-foreground transition-colors"
                >
                  出品者を探す
                </Link>
              </li>
              <li>
                <Link
                  href="/auth"
                  className="hover:text-foreground transition-colors"
                >
                  出品する
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3">ヘルプ</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/about"
                  className="hover:text-foreground transition-colors"
                >
                  サービスについて
                </Link>
              </li>
              <li>
                <Link
                  href="/guide"
                  className="hover:text-foreground transition-colors"
                >
                  ご利用ガイド
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-foreground transition-colors"
                >
                  よくある質問
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3">法的情報</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/terms"
                  className="hover:text-foreground transition-colors"
                >
                  利用規約
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-foreground transition-colors"
                >
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link
                  href="/legal"
                  className="hover:text-foreground transition-colors"
                >
                  特定商取引法に基づく表記
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; 2025 Maneki job. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Powered by Polygon Network / JPYC
          </p>
        </div>
      </div>
    </footer>
  );
}
