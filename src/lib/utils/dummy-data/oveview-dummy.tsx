import { CreditCard, TrendingUp, User, Package, Star } from "lucide-react";
import type { overViewType } from "../../types/dashboard-types";

export const overViewItems: overViewType[] = [
  {
    icon: <CreditCard className="w-6 h-6 text-blue-500" />,
    amount: 12500,
    trends: "+12%",
    title: "Total Balance",
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-green-500" />,
    amount: 3200,
    trends: "+8%",
    title: "Monthly Profit",
  },
  {
    icon: <User className="w-6 h-6 text-purple-500" />,
    amount: 48,
    trends: "+5%",
    title: "New Investors",
  },
  {
    icon: <Package className="w-6 h-6 text-yellow-500" />,
    amount: 150,
    trends: "-2%",
    title: "Stocks Purchased",
  },
  {
    icon: <Star className="w-6 h-6 text-orange-500" />,
    amount: 4.8,
    trends: "+0%",
    title: "Portfolio Rating",
  },
];
