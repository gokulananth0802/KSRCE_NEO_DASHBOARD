import { ReactNode } from 'react';
import { MoreHorizontal } from 'lucide-react';
interface ChartCardProps {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  subtitle?: string;
  footer?: ReactNode;
}
const ChartCard = ({
  title,
  children,
  actions,
  subtitle,
  footer
}: ChartCardProps) => {
  return <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-gray-700 font-medium">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className="flex items-center">
          {actions}
          <button className="ml-2 text-gray-400 hover:text-gray-600">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>
      <div>{children}</div>
      {footer && <div className="mt-4">{footer}</div>}
    </div>;
};
export default ChartCard;