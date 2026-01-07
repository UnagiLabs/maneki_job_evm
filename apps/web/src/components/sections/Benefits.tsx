import { Shield, Zap, Globe } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "スマートコントラクトで安心",
    description:
      "取引はプログラムで自動管理。運営の介入なしに安全な受発注を実現します。",
  },
  {
    icon: Zap,
    title: "低コストな手数料",
    description:
      "自動化により中間コストを最小化。クリエイターにより多くの報酬をお届けします。",
  },
  {
    icon: Globe,
    title: "世界と仕事ができる",
    description:
      "JPYCで日本円感覚のまま、海外クライアントとも対等に取引できます。",
  },
];

export function Benefits() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-orange-50 to-amber-50">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-8 md:mb-12">
          Maneki job が選ばれる理由
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 mb-4">
                <benefit.icon className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
