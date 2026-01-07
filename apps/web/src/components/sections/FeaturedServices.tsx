"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Service, Seller } from "@/types";
import { mockApi } from "@/lib/mockApi";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { ServiceCardSkeleton } from "@/components/cards/ServiceCardSkeleton";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FeaturedServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [sellers, setSellers] = useState<Map<string, Seller>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      mockApi.getServices({ limit: 8 }),
      mockApi.getSellers(),
    ]).then(([servicesData, sellersData]) => {
      setServices(servicesData);
      const sellerMap = new Map(sellersData.map((s) => [s.id, s]));
      setSellers(sellerMap);
      setLoading(false);
    });
  }, []);

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl md:text-2xl font-bold">おすすめサービス</h2>
          <Link href="/categories/design">
            <Button variant="ghost" size="sm">
              もっと見る
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <ServiceCardSkeleton key={i} />
              ))
            : services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  seller={sellers.get(service.sellerId)}
                />
              ))}
        </div>
      </div>
    </section>
  );
}
