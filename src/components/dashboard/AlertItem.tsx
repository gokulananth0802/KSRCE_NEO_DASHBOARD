import { ReactNode } from 'react';
interface AlertItemProps {
  title: string;
  description: string;
  time: string;
  color: string;
  actions?: ReactNode;
}
const AlertItem = ({
  title,
  description,
  time,
  color,
  actions
}: AlertItemProps) => {
  return <div className="border-l-4 pl-4 py-3 mb-4" style={{
    borderColor: color
  }}>
      <div className="flex justify-between">
        <h4 className="font-medium text-gray-800">{title}</h4>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
      {actions && <div className="mt-3 flex space-x-3">{actions}</div>}
    </div>;
};
export default AlertItem;