import { ReactNode } from 'react';
interface QuickActionButtonProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}
const QuickActionButton = ({
  icon,
  label,
  onClick
}: QuickActionButtonProps) => {
  return <button onClick={onClick} className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="p-3 rounded-md bg-blue-100 text-blue-600 mb-2">
        {icon}
      </div>
      <span className="text-sm text-gray-700">{label}</span>
    </button>;
};
export default QuickActionButton;