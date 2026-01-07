import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import type { Seller } from "@/types";
import { formatRating } from "@/lib/format";

export interface SellerCardProps {
  seller: Seller;
}

export function SellerCard({ seller }: SellerCardProps) {
  return (
    <Link href={`/sellers/${seller.id}`}>
      <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1 min-w-[200px]">
        <CardContent className="p-6 text-center">
          <Image
            src={seller.avatar}
            alt={seller.name}
            width={80}
            height={80}
            className="rounded-full mx-auto mb-4"
          />
          <h3 className="font-semibold mb-1 truncate">{seller.name}</h3>
          <p className="text-sm text-muted-foreground mb-3 truncate">
            {seller.title}
          </p>

          <div className="flex justify-center flex-wrap gap-1 mb-3 min-h-[1.5rem]">
            {seller.badges.slice(0, 2).map((badge) => (
              <Badge key={badge.id} className={badge.color} variant="secondary">
                {badge.name}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium">
              {formatRating(seller.ratingAvg)}
            </span>
            <span className="text-sm text-muted-foreground">
              ({seller.completedCount}件)
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
