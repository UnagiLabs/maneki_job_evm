"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchBox } from "@/components/common/SearchBox";
import { session } from "@/lib/session";
import type { User } from "@/types";
import { Menu, X, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setUser(session.getUser());
  }, []);

  const handleLogout = () => {
    session.clear();
    setUser(null);
    window.location.href = "/";
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* ロゴ */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Maneki job
          </span>
        </Link>

        {/* 検索 (デスクトップ) */}
        <div className="hidden flex-1 max-w-md mx-8 lg:block">
          <SearchBox placeholder="サービスを探す" />
        </div>

        {/* バッジ (デスクトップ) */}
        <div className="hidden md:flex items-center gap-2 mr-4">
          <Badge variant="outline" className="text-xs">
            JPYC決済
          </Badge>
          <Badge variant="outline" className="text-xs">
            World ID対応
          </Badge>
        </div>

        {/* ナビゲーション (デスクトップ) */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link
            href="/categories/design"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            サービスを探す
          </Link>
          {user ? (
            <>
              <Link
                href="/me"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                マイページ
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-1" />
                ログアウト
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth">
                <Button variant="ghost" size="sm">
                  ログイン
                </Button>
              </Link>
              <Link href="/auth">
                <Button size="sm">新規登録</Button>
              </Link>
            </>
          )}
        </nav>

        {/* モバイルメニューボタン */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="メニューを開く"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* モバイルメニュー */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto p-4 space-y-4">
            <SearchBox placeholder="サービスを探す" />
            <div className="flex gap-2">
              <Badge variant="outline" className="text-xs">
                JPYC決済
              </Badge>
              <Badge variant="outline" className="text-xs">
                World ID対応
              </Badge>
            </div>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/categories/design"
                className="py-2 text-sm hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                サービスを探す
              </Link>
              {user ? (
                <>
                  <Link
                    href="/me"
                    className="py-2 text-sm hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    マイページ
                  </Link>
                  <button
                    className="py-2 text-sm text-left hover:text-primary"
                    onClick={handleLogout}
                  >
                    ログアウト
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth"
                    className="py-2 text-sm hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    ログイン
                  </Link>
                  <Link
                    href="/auth"
                    className="py-2 text-sm font-medium text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    新規登録
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
