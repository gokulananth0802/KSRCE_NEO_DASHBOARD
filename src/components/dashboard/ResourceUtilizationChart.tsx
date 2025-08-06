import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
const data = [{
  name: '3D Printer',
  value: 38
}, {
  name: 'VR Lab',
  value: 25
}, {
  name: 'Electronics',
  value: 30
}, {
  name: 'Meeting Room',
  value: 40
}, {
  name: 'Workshop',
  value: 28
}];
const ResourceUtilizationChart = () => {
  return <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}>
          <XAxis type="number" hide domain={[0, 50]} />
          <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={100} tick={{
          fontSize: 12
        }} />
          <Bar dataKey="value" fill="#8884d8" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <div className="text-sm text-gray-500 mt-2">
        Based on bookings for the last 30 days
      </div>
    </div>;
};
export default ResourceUtilizationChart;