import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import type { Service, Seller } from "@/types";
import { formatJpyc, formatRating } from "@/lib/format";

export interface ServiceCardProps {
  service: Service;
  seller?: Seller;
}

export function ServiceCard({ service, seller }: ServiceCardProps) {
  return (
    <Link href={`/services/${service.id}`}>
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
        <div className="relative aspect-video">
          <Image
            src={service.thumbnail}
            alt={service.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium line-clamp-2 mb-2 min-h-[2.5rem]">
            {service.title}
          </h3>

          {seller && (
            <div className="flex items-center gap-2 mb-2">
              <Image
                src={seller.avatar}
                alt={seller.name}
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="text-sm text-muted-foreground truncate">
                {seller.name}
              </span>
            </div>
          )}

          <div className="flex items-center gap-1 mb-2">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium">
              {formatRating(service.ratingAvg)}
            </span>
            <span className="text-sm text-muted-foreground">
              ({service.ratingCount})
            </span>
          </div>

          <p className="font-bold text-primary">{formatJpyc(service.priceJpyc)}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
