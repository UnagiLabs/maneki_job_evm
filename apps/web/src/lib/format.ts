export const formatJpyc = (amount: number): string => {
  return `${amount.toLocaleString("ja-JP")} JPYC`;
};

export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatRelativeDate = (isoString: string): string => {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "今日";
  if (diffDays === 1) return "昨日";
  if (diffDays < 7) return `${diffDays}日前`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}週間前`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}ヶ月前`;
  return formatDate(isoString);
};

export const formatDeliveryDays = (days: number): string => {
  return `約${days}日`;
};
