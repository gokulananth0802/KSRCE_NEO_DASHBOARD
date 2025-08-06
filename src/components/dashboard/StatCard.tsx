import { ReactNode } from 'react';
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBgColor: string;
  subtitle?: string;
  trend?: {
    value: string | number;
    isPositive: boolean;
  };
  footer?: ReactNode;
}
const StatCard = ({
  title,
  value,
  icon,
  iconBgColor,
  subtitle,
  trend,
  footer
}: StatCardProps) => {
  return <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <div className={`p-2 rounded-md ${iconBgColor}`}>{icon}</div>
      </div>
      <div className="flex items-end">
        <h2 className="text-3xl font-bold text-gray-800">{value}</h2>
        {subtitle && <p className="ml-2 mb-1 text-sm text-gray-500">{subtitle}</p>}
        {trend && <div className={`ml-3 mb-1 flex items-center ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            <span className="text-sm">{trend.value}</span>
          </div>}
      </div>
      {footer && <div className="mt-4">{footer}</div>}
    </div>;
};
export default StatCard;