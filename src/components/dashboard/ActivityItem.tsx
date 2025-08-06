import { ReactNode } from 'react';
interface ActivityItemProps {
  icon: ReactNode;
  title: string;
  time: string;
}
const ActivityItem = ({
  icon,
  title,
  time
}: ActivityItemProps) => {
  return <div className="flex items-start py-3 border-b border-gray-100 last:border-0">
      <div className="p-2 rounded-md bg-blue-100 text-blue-600 mr-3">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-800">{title}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
    </div>;
};
export default ActivityItem;