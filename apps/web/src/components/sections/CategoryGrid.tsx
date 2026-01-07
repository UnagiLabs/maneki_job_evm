"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Palette,
  Globe,
  PenTool,
  Video,
  Music,
  Languages,
  Briefcase,
  Code,
  TrendingUp,
  Brush,
  Camera,
  MessageSquare,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";
import type { Category } from "@/types";
import { mockApi } from "@/lib/mockApi";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap: Record<string, LucideIcon> = {
  Palette,
  Globe,
  PenTool,
  Video,
  Music,
  Languages,
  Briefcase,
  Code,
  TrendingUp,
  Brush,
  Camera,
  MessageSquare,
  HelpCircle,
};

export function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockApi.getCategories().then((data) => {
      setCategories(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold mb-8">カテゴリから探す</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold mb-8">カテゴリから探す</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon] || HelpCircle;
            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="flex flex-col items-center justify-center p-4 md:p-6 rounded-lg bg-background border hover:border-primary hover:shadow-md transition-all duration-200"
              >
                <IconComponent className="h-6 w-6 md:h-8 md:w-8 mb-2 md:mb-3 text-primary" />
                <span className="text-sm font-medium text-center">
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
