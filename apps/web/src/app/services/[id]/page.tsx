"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Star, Clock, CheckCircle, Shield, ArrowLeft } from "lucide-react";
import type { Service, Seller, Review } from "@/types";
import { mockApi } from "@/lib/mockApi";
import {
  formatJpyc,
  formatRating,
  formatRelativeDate,
  formatDeliveryDays,
} from "@/lib/format";
import { session } from "@/lib/session";

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [service, setService] = useState<Service | null>(null);
  const [seller, setSeller] = useState<Seller | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const id = params.id as string;
    Promise.all([
      mockApi.getServiceById(id),
      mockApi.getReviewsByServiceId(id),
    ]).then(async ([serviceData, reviewsData]) => {
      setService(serviceData);
      setReviews(reviewsData);
      if (serviceData) {
        const sellerData = await mockApi.getSellerById(serviceData.sellerId);
        setSeller(sellerData);
      }
      setLoading(false);
    });
  }, [params.id]);

  const handlePurchase = () => {
    if (!session.isAuthenticated()) {
      toast.error("購入にはログインが必要です", {
        action: {
          label: "ログイン",
          onClick: () => router.push("/auth"),
        },
      });
      setDialogOpen(false);
      return;
    }
    setPurchasing(true);
    setTimeout(() => {
      setPurchasing(false);
      setDialogOpen(false);
      toast.success("購入が完了しました！", {
        description: "取引ページで確認できます。",
      });
    }, 1500);
  };

  if (loading) {
    return <ServiceDetailSkeleton />;
  }

  if (!service) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">サービスが見つかりません</h1>
        <p className="text-muted-foreground mb-8">
          お探しのサービスは存在しないか、削除された可能性があります。
        </p>
        <Link href="/">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            トップに戻る
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* パンくずリスト */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">
          トップ
        </Link>
        <span>/</span>
        <Link
          href={`/categories/${service.categorySlug}`}
          className="hover:text-foreground"
        >
          カテゴリ
        </Link>
        <span>/</span>
        <span className="text-foreground truncate max-w-[200px]">
          {service.title}
        </span>
      </nav>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* メインコンテンツ */}
        <div className="lg:col-span-2 space-y-8">
          {/* サムネイル */}
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={service.thumbnail}
              alt={service.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* タイトル・評価 */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              {service.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                <span className="font-semibold">
                  {formatRating(service.ratingAvg)}
                </span>
                <span className="text-muted-foreground">
                  ({service.ratingCount}件のレビュー)
                </span>
              </div>
            </div>
          </div>

          {/* 説明 */}
          <Card>
            <CardHeader>
              <CardTitle>サービス内容</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap leading-relaxed">
                {service.description}
              </p>
            </CardContent>
          </Card>

          {/* レビュー */}
          <Card>
            <CardHeader>
              <CardTitle>レビュー ({reviews.length}件)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {reviews.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  まだレビューはありません
                </p>
              ) : (
                reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b pb-6 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-muted"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium">
                        {review.authorName}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {formatRelativeDate(review.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed">{review.comment}</p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* サイドバー */}
        <div className="space-y-6">
          {/* 購入カード */}
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <p className="text-3xl font-bold text-primary mb-2">
                {formatJpyc(service.priceJpyc)}
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                納期目安: {formatDeliveryDays(service.deliveryDays)}
              </p>

              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full" size="lg">
                    購入手続きへ
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>購入確認</DialogTitle>
                    <DialogDescription>
                      以下のサービスを購入します
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="font-semibold mb-2">{service.title}</p>
                    <p className="text-2xl font-bold text-primary">
                      {formatJpyc(service.priceJpyc)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Shield className="h-4 w-4" />
                    <span>エスクローで安全に取引できます</span>
                  </div>
                  <Button
                    onClick={handlePurchase}
                    disabled={purchasing}
                    className="w-full"
                  >
                    {purchasing ? "処理中..." : "JPYCで購入を確定する"}
                  </Button>
                </DialogContent>
              </Dialog>

              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 flex-shrink-0" />
                  <span>納期: {formatDeliveryDays(service.deliveryDays)}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 flex-shrink-0" />
                  <span>エスクロー保護</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 flex-shrink-0" />
                  <span>スマートコントラクトで自動管理</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* 出品者情報 */}
          {seller && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">出品者情報</CardTitle>
              </CardHeader>
              <CardContent>
                <Link
                  href={`/sellers/${seller.id}`}
                  className="flex items-center gap-4 mb-4 hover:opacity-80 transition-opacity"
                >
                  <Image
                    src={seller.avatar}
                    alt={seller.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{seller.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {seller.title}
                    </p>
                  </div>
                </Link>
                <div className="flex flex-wrap gap-2 mb-4">
                  {seller.badges.map((badge) => (
                    <Badge key={badge.id} className={badge.color}>
                      {badge.name}
                    </Badge>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4 text-center text-sm border-t pt-4">
                  <div>
                    <p className="font-semibold text-lg">
                      {formatRating(seller.ratingAvg)}
                    </p>
                    <p className="text-muted-foreground">評価</p>
                  </div>
                  <div>
                    <p className="font-semibold text-lg">
                      {seller.completedCount}
                    </p>
                    <p className="text-muted-foreground">完了件数</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function ServiceDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-4 w-48 mb-6" />
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Skeleton className="aspect-video rounded-lg" />
          <div>
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-5 w-48" />
          </div>
          <Skeleton className="h-64 rounded-lg" />
          <Skeleton className="h-48 rounded-lg" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-64 rounded-lg" />
          <Skeleton className="h-48 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
