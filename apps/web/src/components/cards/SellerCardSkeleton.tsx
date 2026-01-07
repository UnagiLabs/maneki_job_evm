import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SellerCardSkeleton() {
  return (
    <Card className="min-w-[200px]">
      <CardContent className="p-6 text-center space-y-3">
        <Skeleton className="h-20 w-20 rounded-full mx-auto" />
        <Skeleton className="h-5 w-24 mx-auto" />
        <Skeleton className="h-4 w-32 mx-auto" />
        <div className="flex justify-center gap-1">
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-4 w-20 mx-auto" />
      </CardContent>
    </Card>
  );
}
