import { Battery, CheckCircle, Gauge, Thermometer } from 'lucide-react';

function Sensors() {
  const sensors = [
    {
      id: 1,
      name: 'GPS Tracker',
      vehicle: 'Tesla Model X',
      type: 'Location',
      status: 'Active',
      lastUpdate: '2024-01-15 15:45:23',
      battery: 92,
      signal: 'Strong',
      accuracy: '±5m',
    },
    {
      id: 2,
      name: 'Temperature Sensor',
      vehicle: 'Tesla Model X',
      type: 'Temperature',
      status: 'Active',
      lastUpdate: '2024-01-15 15:45:18',
      battery: 78,
      signal: 'Strong',
      value: '22.5°C',
    },
    {
      id: 3,
      name: 'Fuel Level Sensor',
      vehicle: 'Tesla Model X',
      type: 'Fuel',
      status: 'Active',
      lastUpdate: '2024-01-15 15:45:10',
      battery: 85,
      signal: 'Strong',
      value: '75%',
    },
    {
      id: 4,
      name: 'Door Sensor - Rear Left',
      vehicle: 'Tesla Model X',
      type: 'Door',
      status: 'Inactive',
      lastUpdate: '2024-01-15 12:30:45',
      battery: 15,
      signal: 'Weak',
      value: 'Closed',
    },
    {
      id: 5,
      name: 'OBD Scanner',
      vehicle: 'Tesla Model X',
      type: 'Diagnostics',
      status: 'Active',
      lastUpdate: '2024-01-15 15:45:00',
      battery: 100,
      signal: 'Strong',
      value: 'Normal',
    },
    {
      id: 6,
      name: 'Speed Sensor',
      vehicle: 'Tesla Model Y',
      type: 'Speed',
      status: 'Active',
      lastUpdate: '2024-01-15 15:43:50',
      battery: 88,
      signal: 'Strong',
      value: '0 km/h',
    },
  ];

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700';
  };

  const getSensorIcon = (type: string) => {
    switch (type) {
      case 'Temperature':
        return <Thermometer className="w-5 h-5" />;
      case 'Fuel':
        return <Gauge className="w-5 h-5" />;
      case 'Battery':
        return <Battery className="w-5 h-5" />;
      default:
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  return (
     <div className="min-h-screen bg-white rounded-xl py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Sensors</h1>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Add Sensor
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Sensor Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Vehicle</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Battery</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Signal</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Last Update</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sensors.map((sensor) => (
                  <tr key={sensor.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="text-blue-600">
                          {getSensorIcon(sensor.type)}
                        </div>
                        <span className="text-sm font-medium text-gray-800">{sensor.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{sensor.vehicle}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{sensor.type}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(sensor.status)}`}>
                        {sensor.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{sensor.value}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${sensor.battery > 50 ? 'bg-emerald-500' : sensor.battery > 20 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${sensor.battery}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-700">{sensor.battery}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-medium ${sensor.signal === 'Strong' ? 'text-emerald-600' : 'text-yellow-600'}`}>
                        {sensor.signal}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{sensor.lastUpdate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sensors;
