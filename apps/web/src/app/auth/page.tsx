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
        </CardContent>
      </Card>
    </div>
  );
}
