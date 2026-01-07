"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Seller } from "@/types";
import { mockApi } from "@/lib/mockApi";
import { SellerCard } from "@/components/cards/SellerCard";
import { SellerCardSkeleton } from "@/components/cards/SellerCardSkeleton";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FeaturedSellers() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockApi.getSellers({ limit: 6 }).then((data) => {
      setSellers(data);
      setLoading(false);
    });
  }, []);

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl md:text-2xl font-bold">おすすめユーザー</h2>
          <Link href="/sellers">
            <Button variant="ghost" size="sm">
              もっと見る
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="snap-start">
                  <SellerCardSkeleton />
                </div>
              ))
            : sellers.map((seller) => (
                <div key={seller.id} className="snap-start">
                  <SellerCard seller={seller} />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
