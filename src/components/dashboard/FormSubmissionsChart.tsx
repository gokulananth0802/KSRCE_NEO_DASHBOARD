import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
const data = [{
  name: 'Jun 1',
  value: 4
}, {
  name: 'Jun 8',
  value: 7
}, {
  name: 'Jun 15',
  value: 5
}, {
  name: 'Jun 22',
  value: 8
}, {
  name: 'Jun 29',
  value: 12
}, {
  name: 'Jul 6',
  value: 10
}];
const FormSubmissionsChart = () => {
  return <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{
        top: 5,
        right: 20,
        bottom: 5,
        left: 0
      }}>
          <XAxis dataKey="name" tick={{
          fontSize: 12
        }} tickLine={false} axisLine={false} />
          <YAxis hide domain={[0, 'dataMax + 5']} />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} dot={{
          stroke: '#3B82F6',
          strokeWidth: 2,
          r: 4,
          fill: '#fff'
        }} activeDot={{
          r: 6,
          stroke: '#3B82F6',
          strokeWidth: 2,
          fill: '#3B82F6'
        }} />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex items-center justify-between mt-2">
        <div>
          <div className="text-lg font-semibold">32 submissions</div>
          <div className="text-sm text-gray-500">this month</div>
        </div>
        <div className="flex items-center text-green-600">
          <span className="text-sm">18% vs last month</span>
        </div>
      </div>
    </div>;
};
export default FormSubmissionsChart;