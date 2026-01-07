import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchBox } from "@/components/common/SearchBox";

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-background py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-6">
          あなたの「得意」を
          <br />
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            世界に届けよう
          </span>
        </h1>
        <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
          スマートコントラクトで守られた安心取引。
          <br className="hidden md:block" />
          JPYCで日本円感覚のグローバルスキルマーケット。
        </p>
        <div className="max-w-md mx-auto mb-8">
          <SearchBox placeholder="何をお探しですか？（例：ロゴ作成、Web制作）" />
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/categories/design">
            <Button size="lg" className="font-semibold">
              サービスを探す
            </Button>
          </Link>
          <Link href="/auth">
            <Button size="lg" variant="outline" className="font-semibold">
              出品する
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
