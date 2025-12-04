import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

function TimeManagement() {
  const shifts = [
    {
      id: 1,
      driver: 'David Baker',
      date: '2024-01-15',
      startTime: '09:00',
      endTime: '17:30',
      breakTime: '1h 30m',
      driveTime: '7h 00m',
      restTime: '2h 00m',
      status: 'Active',
      compliance: 'Compliant',
    },
    {
      id: 2,
      driver: 'John Smith',
      date: '2024-01-15',
      startTime: '08:00',
      endTime: '16:00',
      breakTime: '1h 00m',
      driveTime: '6h 30m',
      restTime: '1h 30m',
      status: 'Active',
      compliance: 'Compliant',
    },
    {
      id: 3,
      driver: 'Sarah Johnson',
      date: '2024-01-15',
      startTime: '14:00',
      endTime: '22:00',
      breakTime: '1h 15m',
      driveTime: '6h 15m',
      restTime: '2h 30m',
      status: 'Scheduled',
      compliance: 'Compliant',
    },
    {
      id: 4,
      driver: 'Michael Chen',
      date: '2024-01-15',
      startTime: '07:00',
      endTime: '15:00',
      breakTime: '0h 45m',
      driveTime: '7h 00m',
      restTime: '0h 15m',
      status: 'Completed',
      compliance: 'Warning',
    },
  ];

  const restRequirements = [
    {
      driver: 'David Baker',
      dailyDriving: '7h 00m',
      limit: '9h 00m',
      remaining: '2h 00m',
      status: 'ok',
    },
    {
      driver: 'John Smith',
      dailyDriving: '6h 30m',
      limit: '9h 00m',
      remaining: '2h 30m',
      status: 'ok',
    },
    {
      driver: 'Sarah Johnson',
      dailyDriving: '4h 00m',
      limit: '9h 00m',
      remaining: '5h 00m',
      status: 'ok',
    },
    {
      driver: 'Michael Chen',
      dailyDriving: '8h 45m',
      limit: '9h 00m',
      remaining: '0h 15m',
      status: 'warning',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-blue-100 text-blue-700';
      case 'Scheduled':
        return 'bg-gray-100 text-gray-700';
      case 'Completed':
        return 'bg-emerald-100 text-emerald-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getComplianceIcon = (compliance: string) => {
    switch (compliance) {
      case 'Compliant':
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'Warning':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  return (
     <div className="min-h-screen bg-white rounded-xl py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Time Management</h1>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Schedule Shift
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="border border-black/10  bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Active Shifts</p>
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-800">2</p>
          </div>
          <div className="border border-black/10  bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Total Hours</p>
              <Clock className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-3xl font-bold text-gray-800">27h 45m</p>
          </div>
          <div className="border border-black/10  bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Compliant</p>
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-3xl font-bold text-gray-800">3</p>
          </div>
          <div className="border border-black/10  bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Issues</p>
              <AlertCircle className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-3xl font-bold text-gray-800">1</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Driver Shifts</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Driver</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Time</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Drive Time</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Break</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Compliance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {shifts.map((shift) => (
                      <tr key={shift.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-gray-800">{shift.driver}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{shift.date}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {shift.startTime} - {shift.endTime}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800">{shift.driveTime}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{shift.breakTime}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(shift.status)}`}>
                            {shift.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            {getComplianceIcon(shift.compliance)}
                            <span className="text-sm text-gray-700">{shift.compliance}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Drive Time Limits</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {restRequirements.map((item) => (
                <div key={item.driver} className="p-4">
                  <p className="text-sm font-medium text-gray-800 mb-2">{item.driver}</p>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Daily Driving</span>
                        <span>{item.dailyDriving} / {item.limit}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.status === 'ok' ? 'bg-emerald-500' : 'bg-yellow-500'}`}
                          style={{
                            width: `${(parseFloat(item.dailyDriving.split('h')[0]) / parseFloat(item.limit.split('h')[0])) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">
                      Remaining: <span className="font-medium">{item.remaining}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeManagement;
