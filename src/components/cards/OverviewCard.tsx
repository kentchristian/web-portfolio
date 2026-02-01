import { CreditCard, Package, Star, TrendingUp, User } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import type { overViewType } from "../../lib/types/dashboard-types"
import CardContainer from "../containers/CardContainer"
const OverviewCard = () => {
  const overViewItems: overViewType[] = [
    {
      key: uuidv4(),
      icon: <CreditCard className="w-6 h-6 text-blue-500" />,
      amount: 12500,
      trends: "+12%",
      title: "Total Balance",
    },
    {
      key: uuidv4(),
      icon: <TrendingUp className="w-6 h-6 text-green-500" />,
      amount: 3200,
      trends: "+8%",
      title: "Monthly Profit",
    },
    {
      key: uuidv4(),
      icon: <User className="w-6 h-6 text-purple-500" />,
      amount: 48,
      trends: "+5%",
      title: "New Investors",
    },
    {
      key: uuidv4(),
      icon: <Package className="w-6 h-6 text-yellow-500" />,
      amount: 150,
      trends: "-2%",
      title: "Stocks Purchased",
    },
    {
      key: uuidv4(),
      icon: <Star className="w-6 h-6 text-orange-500" />,
      amount: 4.8,
      trends: "+0%",
      title: "Portfolio Rating",
    },
  ];


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

