import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const features = [
  "World IDで本人確認、不正を抑止",
  "取引手数料10%固定",
  "エスクローで安心決済",
];

export function CtaBanner() {
  return (
    <section className="py-12 md:py-16 bg-muted/50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
          今すぐ始めよう
        </h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          5分で登録完了、すぐに取引開始できます。
        </p>
        <ul className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <CheckCircle className="h-4 w-4 text-green-500" />
              {feature}
            </li>
          ))}
        </ul>
        <Link href="/auth">
          <Button size="lg" className="font-semibold">
            無料で会員登録
          </Button>
        </Link>
      </div>
    </section>
  );
}
