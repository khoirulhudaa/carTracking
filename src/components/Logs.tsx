import { AlertCircle, Clock, Filter, User } from 'lucide-react';

function Logs() {
  const logs = [
    {
      id: 1,
      timestamp: '2024-01-15 15:45:23',
      type: 'Location Update',
      vehicle: 'Tesla Model X',
      driver: 'David Baker',
      details: 'GPS coordinates updated',
      status: 'success',
    },
    {
      id: 2,
      timestamp: '2024-01-15 15:44:15',
      type: 'Speed Event',
      vehicle: 'Tesla Model X',
      driver: 'David Baker',
      details: 'Speed exceeded 85 km/h in 60 km/h zone',
      status: 'warning',
    },
    {
      id: 3,
      timestamp: '2024-01-15 15:40:08',
      type: 'Device Connection',
      vehicle: 'Tesla Model Y',
      driver: 'John Smith',
      details: 'Secondary GPS device disconnected',
      status: 'error',
    },
    {
      id: 4,
      timestamp: '2024-01-15 15:35:42',
      type: 'Trip Start',
      vehicle: 'Tesla Model X',
      driver: 'David Baker',
      details: 'Trip from Warehouse A to Distribution Center B',
      status: 'success',
    },
    {
      id: 5,
      timestamp: '2024-01-15 15:30:19',
      type: 'Sensor Reading',
      vehicle: 'Tesla Model X',
      driver: 'David Baker',
      details: 'Fuel level: 75%, Temperature: 22.5°C',
      status: 'success',
    },
    {
      id: 6,
      timestamp: '2024-01-15 15:25:05',
      type: 'Maintenance Alert',
      vehicle: 'Tesla Model X',
      driver: 'System',
      details: 'Oil change due in 500 km',
      status: 'warning',
    },
    {
      id: 7,
      timestamp: '2024-01-15 14:32:50',
      type: 'Hard Braking',
      vehicle: 'Tesla Model Y',
      driver: 'John Smith',
      details: 'Hard braking detected - 0.8G deceleration',
      status: 'warning',
    },
    {
      id: 8,
      timestamp: '2024-01-15 14:15:33',
      type: 'Trip End',
      vehicle: 'Tesla Model X',
      driver: 'David Baker',
      details: 'Trip completed - 45.2 km traveled',
      status: 'success',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700';
      case 'warning':
        return 'bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700';
      case 'error':
        return 'bg-red-50 border-l-4 border-red-500 text-red-700';
      default:
        return 'bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <div className="w-2 h-2 rounded-full bg-emerald-500" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Location Update':
      case 'Trip Start':
      case 'Trip End':
        return 'bg-blue-100 text-blue-700';
      case 'Speed Event':
      case 'Hard Braking':
      case 'Maintenance Alert':
        return 'bg-orange-100 text-orange-700';
      case 'Device Connection':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
     <div className="min-h-screen bg-white rounded-xl py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">System Logs</h1>
          <div className="flex items-center space-x-3">
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option>All Types</option>
              <option>Location Updates</option>
              <option>Events</option>
              <option>Maintenance</option>
              <option>Connections</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {logs.map((log) => (
            <div key={log.id} className={`p-4 rounded-lg ${getStatusColor(log.status)} transition-all hover:shadow-sm`}>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(log.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(log.type)}`}>
                        {log.type}
                      </span>
                      <span className="text-sm font-medium text-gray-700">{log.vehicle}</span>
                    </div>
                    <span className="text-xs text-gray-500 flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{log.timestamp}</span>
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{log.details}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-600">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{log.driver}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center pt-4">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logs;
