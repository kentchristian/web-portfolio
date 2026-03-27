import { CreditCard, Package, Star, TrendingUp, User } from "lucide-react";
import CardContainer from "../containers/CardContainer";
import overviewData from "../../lib/data/overview-data.json";
import type { overViewType } from "../../lib/types/dashboard-types";

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

const OverviewCard = () => {
  const overViewItems: overViewType[] = (overviewData as OverviewItemData[]).map((item) => {
    const Icon = ICON_MAP[item.icon as keyof typeof ICON_MAP] ?? CreditCard;
    return {
      key: item.id,
      icon: <Icon className={item.iconClassName} />,
      amount: item.amount,
      trends: item.trends,
      title: item.title,
    };
  });


  return (
    overViewItems.map(({
      key,
      icon,
      trends,
      amount,
      title
    }: overViewType) => (
      <CardContainer key={key} className={`border flex flex-col justify-between`}>
        {/* 1st row */}
        <div className="flex flex-row items-center justify-between">
          <div>{icon}</div>
          <div className="flex justify-end">{trends}</div>
        </div>
        {/* Amount */}
        <div className="text-3xl">
          {amount}
        </div>

        {/* Desription */}
        <div>{title}</div>
      </CardContainer>
    ))
  )
}

export default OverviewCard
