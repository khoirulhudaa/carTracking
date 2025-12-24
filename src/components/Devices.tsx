import { Smartphone, Wifi, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { useTranslation } from './Dashboard'; // ⬅️ sesuaikan path jika perlu

type DeviceStatus = 'online' | 'offline';
type DeviceType = 'gps' | 'diagnostics' | 'dashcam';

interface Device {
  id: number;
  name: string;
  vehicle: string;
  type: DeviceType;
  imei: string;
  model: string;
  status: DeviceStatus;
  lastSeen: string;
  signalStrength: number;
  firmwareVersion: string;
}

function Devices() {
  const { t } = useTranslation();

  const devices: Device[] = [
    {
      id: 1,
      name: 'Main GPS Unit',
      vehicle: 'Tesla Model X',
      type: 'gps',
      imei: '123456789012345',
      model: 'TK-915',
      status: 'online',
      lastSeen: '2024-01-15 15:45:00',
      signalStrength: 95,
      firmwareVersion: '2.5.1',
    },
    {
      id: 2,
      name: 'Backup Unit',
      vehicle: 'Tesla Model X',
      type: 'gps',
      imei: '234567890123456',
      model: 'TK-915',
      status: 'online',
      lastSeen: '2024-01-15 15:44:55',
      signalStrength: 88,
      firmwareVersion: '2.5.1',
    },
    {
      id: 3,
      name: 'OBD Device',
      vehicle: 'Tesla Model X',
      type: 'diagnostics',
      imei: '345678901234567',
      model: 'OBD-X1',
      status: 'online',
      lastSeen: '2024-01-15 15:45:05',
      signalStrength: 92,
      firmwareVersion: '1.8.3',
    },
    {
      id: 4,
      name: 'Secondary Tracker',
      vehicle: 'Tesla Model Y',
      type: 'gps',
      imei: '456789012345678',
      model: 'TK-915',
      status: 'offline',
      lastSeen: '2024-01-15 12:30:00',
      signalStrength: 0,
      firmwareVersion: '2.4.8',
    },
    {
      id: 5,
      name: 'Camera Unit',
      vehicle: 'Tesla Model Y',
      type: 'dashcam',
      imei: '567890123456789',
      model: 'DC-2000',
      status: 'online',
      lastSeen: '2024-01-15 15:43:30',
      signalStrength: 85,
      firmwareVersion: '3.1.2',
    },
  ];

  const getStatusIcon = (status: DeviceStatus) =>
    status === 'online' ? (
      <CheckCircle className="w-5 h-5 text-emerald-500" />
    ) : (
      <AlertCircle className="w-5 h-5 text-red-500" />
    );

  const getStatusColor = (status: DeviceStatus) =>
    status === 'online'
      ? 'bg-emerald-100 text-emerald-700'
      : 'bg-red-100 text-red-700';

  const getTypeLabel = (type: DeviceType) => {
    switch (type) {
      case 'gps':
        return t('GPS Tracker');
      case 'diagnostics':
        return t('Diagnostics');
      case 'dashcam':
        return t('Dash Cam');
      default:
        return type;
    }
  };

  const getTypeColor = (type: DeviceType) => {
    switch (type) {
      case 'gps':
        return 'bg-blue-100 text-blue-700';
      case 'diagnostics':
        return 'bg-purple-100 text-purple-700';
      case 'dashcam':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-white rounded-xl py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">
            {t('Devices')}
          </h1>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            {t('Add Device')}
          </button>
        </div>

        {/* Device List */}
        <div className="grid grid-cols-1 gap-4">
          {devices.map((device) => (
            <div
              key={device.id}
              className="border border-black/10 bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              {/* Top */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <Smartphone className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {device.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {t('IMEI')}: {device.imei}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {getStatusIcon(device.status)}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(device.status)}`}
                  >
                    {device.status === 'online'
                      ? t('Online')
                      : t('Offline')}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pb-4 border-b border-gray-200">
                <div>
                  <p className="text-xs text-gray-500 mb-1">{t('Vehicle')}</p>
                  <p className="text-sm font-medium text-gray-800">
                    {device.vehicle}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">{t('Type')}</p>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(device.type)}`}
                  >
                    {getTypeLabel(device.type)}
                  </span>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">{t('Model')}</p>
                  <p className="text-sm font-medium text-gray-800">
                    {device.model}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">{t('Firmware')}</p>
                  <p className="text-sm font-medium text-gray-800">
                    {device.firmwareVersion}
                  </p>
                </div>
              </div>

              {/* Bottom */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                    <Wifi className="w-3 h-3" />
                    {t('Signal Strength')}
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500"
                        style={{ width: `${device.signalStrength}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      {device.signalStrength}%
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {t('Last Seen')}
                  </p>
                  <p className="text-sm font-medium text-gray-800">
                    {device.lastSeen}
                  </p>
                </div>

                <div className="flex justify-start md:justify-end items-end space-x-2">
                  <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                    {t('Configure')}
                  </button>
                  <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                    {t('Details')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Devices;
