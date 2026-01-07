"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Scene } from "@/types";
import { mockApi } from "@/lib/mockApi";
import { Skeleton } from "@/components/ui/skeleton";

export function SceneGrid() {
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockApi.getScenes().then((data) => {
      setScenes(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold mb-8">人気のご利用シーン</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/3] rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold mb-8">人気のご利用シーン</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {scenes.map((scene) => (
            <Link
              key={scene.id}
              href={`/categories/${scene.slug}`}
              className="group relative aspect-[4/3] rounded-lg overflow-hidden"
            >
              <Image
                src={scene.image}
                alt={scene.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="text-white font-semibold text-sm md:text-base">
                  {scene.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
