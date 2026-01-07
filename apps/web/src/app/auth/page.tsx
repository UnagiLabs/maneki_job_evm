"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { session, mockUser } from "@/lib/session";
import { Fingerprint, Loader2, Shield, CheckCircle } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"idle" | "verifying" | "success">("idle");

  const handleWorldIdAuth = () => {
    setLoading(true);
    setStep("verifying");

    // World ID 認証のモック - 段階的なアニメーション
    setTimeout(() => {
      setStep("success");
      setTimeout(() => {
        session.setUser(mockUser);
        toast.success("ログインしました！", {
          description: "World IDによる認証が完了しました。",
        });
        router.push("/");
      }, 800);
    }, 1500);
  };

  const handleMockAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      session.setUser(mockUser);
      toast.success("ログインしました！");
      router.push("/");
    }, 1000);
  };

  return (
    <div className="container max-w-md mx-auto py-12 md:py-20 px-4">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Maneki job にログイン</CardTitle>
          <CardDescription>
            World ID で安全に本人確認を行います
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* World ID 認証 */}
          <div className="space-y-4">
            <Button
              className="w-full h-12"
              size="lg"
              onClick={handleWorldIdAuth}
              disabled={loading}
            >
              {step === "idle" && (
                <>
                  <Fingerprint className="mr-2 h-5 w-5" />
                  World ID で認証
                </>
              )}
              {step === "verifying" && (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  認証中...
                </>
              )}
              {step === "success" && (
                <>
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  認証完了！
                </>
              )}
            </Button>

            {/* World ID の説明 */}
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">
                  World IDとは？
                </p>
                <p>
                  1人1アカウントを保証する分散型IDシステムです。
                  不正アカウントを防ぎ、安全な取引環境を実現します。
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                または
              </span>
            </div>
          </div>

          {/* テスト用ログイン */}
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">ログイン</TabsTrigger>
              <TabsTrigger value="register">新規登録</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="space-y-4 mt-4">
              <form onSubmit={handleMockAuth} className="space-y-4">
                <Input
                  type="email"
                  placeholder="メールアドレス"
                  defaultValue="test@example.com"
                />
                <Input
                  type="password"
                  placeholder="パスワード"
                  defaultValue="password123"
                />
                <Button
                  type="submit"
                  className="w-full"
                  variant="outline"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  ログイン (デモ)
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="register" className="space-y-4 mt-4">
              <form onSubmit={handleMockAuth} className="space-y-4">
                <Input placeholder="ユーザー名" defaultValue="テストユーザー" />
                <Input
                  type="email"
                  placeholder="メールアドレス"
                  defaultValue="test@example.com"
                />
                <Input
                  type="password"
                  placeholder="パスワード"
                  defaultValue="password123"
                />
                <Button
                  type="submit"
                  className="w-full"
                  variant="outline"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  登録 (デモ)
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <p className="text-xs text-center text-muted-foreground">
            ※ ハッカソンデモ用のモック認証です。
            <br />
            実際のWorld ID連携は後日実装予定です。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
