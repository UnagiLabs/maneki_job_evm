import { Hero } from "@/components/sections/Hero";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { SceneGrid } from "@/components/sections/SceneGrid";
import { Benefits } from "@/components/sections/Benefits";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FeaturedServices } from "@/components/sections/FeaturedServices";
import { FeaturedSellers } from "@/components/sections/FeaturedSellers";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <SceneGrid />
      <CtaBanner />
      <Benefits />
      <FeaturedServices />
      <FeaturedSellers />
    </>
  );
}
