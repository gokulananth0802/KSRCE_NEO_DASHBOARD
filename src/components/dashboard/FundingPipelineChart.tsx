const FundingPipelineChart = () => {
  const fundingData = [{
    status: 'Draft',
    count: 5,
    color: 'bg-gray-200'
  }, {
    status: 'Submitted',
    count: 7,
    color: 'bg-blue-200'
  }, {
    status: 'Reviewed',
    count: 4,
    color: 'bg-yellow-200'
  }, {
    status: 'Approved',
    count: 3,
    color: 'bg-green-200'
  }, {
    status: 'Declined',
    count: 1,
    color: 'bg-red-200'
  }];
  return <div className="space-y-4">
      {fundingData.map((item, index) => <div key={index} className="flex items-center">
          <div className="w-24 text-sm text-gray-700">{item.status}</div>
          <div className="flex-1 mx-2">
            <div className={`h-2 rounded-full ${item.color}`} style={{
          width: `${item.count * 10}%`
        }}></div>
          </div>
          <div className="w-6 text-right text-sm text-gray-700">
            {item.count}
          </div>
        </div>)}
    </div>;
};
export default FundingPipelineChart;