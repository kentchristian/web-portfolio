import { CreditCard, Package, Star, TrendingUp, User } from "lucide-react";
import overviewData from "../../data/overview-data.json";
import type { overViewType } from "../../types/dashboard-types";

type OverviewItemData = {
  id: string;
  icon: string;
  iconClassName: string;
  amount: number;
  trends: string;
  title: string;
};

const ICON_MAP = {
  CreditCard,
  TrendingUp,
  User,
  Package,
  Star,
};

export const overViewItems: overViewType[] = (overviewData as OverviewItemData[]).map((item) => {
  const Icon = ICON_MAP[item.icon as keyof typeof ICON_MAP] ?? CreditCard;
  return {
    key: item.id,
    icon: <Icon className={item.iconClassName} />,
    amount: item.amount,
    trends: item.trends,
    title: item.title,
  };
});
