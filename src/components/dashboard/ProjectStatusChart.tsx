import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
const data = [{
  name: 'In Progress',
  value: 12,
  color: '#FFCA28'
}, {
  name: 'Prototype',
  value: 8,
  color: '#9C27B0'
}, {
  name: 'Idea',
  value: 9,
  color: '#3B82F6'
}, {
  name: 'Completed',
  value: 4,
  color: '#22C55E'
}];
const ProjectStatusChart = () => {
  return <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
            {data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {data.map((item, index) => <div key={index} className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-2" style={{
          backgroundColor: item.color
        }} />
            <span className="text-sm text-gray-600">
              {item.name} ({item.value})
            </span>
          </div>)}
      </div>
    </div>;
};
export default ProjectStatusChart;