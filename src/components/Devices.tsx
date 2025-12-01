import { Smartphone, Wifi, AlertCircle, CheckCircle, Clock } from 'lucide-react';

function Devices() {
  const devices = [
    {
      id: 1,
      name: 'Main GPS Unit',
      vehicle: 'Tesla Model X',
      type: 'GPS Tracker',
      imei: '123456789012345',
      model: 'TK-915',
      status: 'Online',
      lastSeen: '2024-01-15 15:45:00',
      signalStrength: 95,
      firmwareVersion: '2.5.1',
    },
    {
      id: 2,
      name: 'Backup Unit',
      vehicle: 'Tesla Model X',
      type: 'GPS Tracker',
      imei: '234567890123456',
      model: 'TK-915',
      status: 'Online',
      lastSeen: '2024-01-15 15:44:55',
      signalStrength: 88,
      firmwareVersion: '2.5.1',
    },
    {
      id: 3,
      name: 'OBD Device',
      vehicle: 'Tesla Model X',
      type: 'Diagnostics',
      imei: '345678901234567',
      model: 'OBD-X1',
      status: 'Online',
      lastSeen: '2024-01-15 15:45:05',
      signalStrength: 92,
      firmwareVersion: '1.8.3',
    },
    {
      id: 4,
      name: 'Secondary Tracker',
      vehicle: 'Tesla Model Y',
      type: 'GPS Tracker',
      imei: '456789012345678',
      model: 'TK-915',
      status: 'Offline',
      lastSeen: '2024-01-15 12:30:00',
      signalStrength: 0,
      firmwareVersion: '2.4.8',
    },
    {
      id: 5,
      name: 'Camera Unit',
      vehicle: 'Tesla Model Y',
      type: 'Dash Cam',
      imei: '567890123456789',
      model: 'DC-2000',
      status: 'Online',
      lastSeen: '2024-01-15 15:43:30',
      signalStrength: 85,
      firmwareVersion: '3.1.2',
    },
  ];

  const getStatusIcon = (status: string) => {
    return status === 'Online' ? (
      <CheckCircle className="w-5 h-5 text-emerald-500" />
    ) : (
      <AlertCircle className="w-5 h-5 text-red-500" />
    );
  };

  const getStatusColor = (status: string) => {
    return status === 'Online' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700';
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'GPS Tracker':
        return 'bg-blue-100 text-blue-700';
      case 'Diagnostics':
        return 'bg-purple-100 text-purple-700';
      case 'Dash Cam':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Devices</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Add Device
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
        {devices.map((device) => (
          <div key={device.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <Smartphone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{device.name}</h3>
                  <p className="text-sm text-gray-500">IMEI: {device.imei}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(device.status)}
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(device.status)}`}>
                    {device.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pb-4 border-b border-gray-200">
              <div>
                <p className="text-xs text-gray-500 mb-1">Vehicle</p>
                <p className="text-sm font-medium text-gray-800">{device.vehicle}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Type</p>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(device.type)}`}>
                  {device.type}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Model</p>
                <p className="text-sm font-medium text-gray-800">{device.model}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Firmware</p>
                <p className="text-sm font-medium text-gray-800">{device.firmwareVersion}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1 flex items-center space-x-1">
                  <Wifi className="w-3 h-3" />
                  <span>Signal Strength</span>
                </p>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500"
                      style={{ width: `${device.signalStrength}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-800">{device.signalStrength}%</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1 flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>Last Seen</span>
                </p>
                <p className="text-sm font-medium text-gray-800">{device.lastSeen}</p>
              </div>
              <div className="flex justify-end space-x-2 pt-5">
                <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                  Configure
                </button>
                <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Devices;
