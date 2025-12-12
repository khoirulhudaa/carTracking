import { AlertCircle, AlertTriangle, CheckCircle, Clock, MapPin } from 'lucide-react';
import { useTranslation } from './Dashboard';

function Events() {
  const { t } = useTranslation();

   const events = [
    {
      id: 1,
      type: 'Speeding',
      severity: 'critical',
      time: '2024-01-15 14:32',
      location: 'Main Street, Downtown',
      speed: '85 km/h',
      limit: '60 km/h',
      driver: 'David Baker',
      vehicle: 'Tesla Model X',
    },
    {
      id: 2,
      type: 'Hard Braking',
      severity: 'warning',
      time: '2024-01-15 13:15',
      location: 'Highway Exit 5',
      speed: '45 km/h',
      limit: 'N/A',
      driver: 'John Smith',
      vehicle: 'Tesla Model Y',
    },
    {
      id: 3,
      type: 'Harsh Acceleration',
      severity: 'info',
      time: '2024-01-15 11:45',
      location: 'Warehouse District',
      speed: '30 km/h',
      limit: 'N/A',
      driver: 'David Baker',
      vehicle: 'Tesla Model X',
    },
    {
      id: 4,
      type: 'Maintenance Alert',
      severity: 'warning',
      time: '2024-01-15 09:30',
      location: 'Service Center',
      speed: '0 km/h',
      limit: 'N/A',
      driver: 'System',
      vehicle: 'Tesla Model X',
    },
  ];

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getSeverityBgColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-50 border-l-4 border-red-500';
      case 'warning':
        return 'bg-yellow-50 border-l-4 border-yellow-500';
      case 'info':
        return 'bg-blue-50 border-l-4 border-blue-500';
      default:
        return 'bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-white rounded-xl py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="md:flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">{t('Events Data')}</h1>
          <div className="flex md:mt-0 mt-4 items-center space-x-3">
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option>{t('All Severity')}</option>
              <option>{t('Critical')}</option>
              <option>{t('Warning')}</option>
              <option>{t('Info')}</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option>{t('Last 24 Hours')}</option>
              <option>{t('Last 7 Days')}</option>
              <option>{t('Last 30 Days')}</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className={`p-4 rounded-lg ${getSeverityBgColor(event.severity)} transition-all hover:shadow-md`}>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">{getSeverityIcon(event.severity)}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{t(event.type)}</h3>
                    <span className="text-xs text-gray-500 flex items-center space-x-1">
                      <Clock className="w-3 h-3" /><span>{event.time}</span>
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-start"><MapPin className="w-4 h-4 text-gray-400 mt-0.5 hidden md:flex" /><div><p className="text-gray-600">{t('Location')}</p><p className="font-medium text-gray-800">{event.location}</p></div></div>
                    <div><p className="text-gray-600">{t('Current Speed')}</p><p className="font-medium text-gray-800">{event.speed}</p></div>
                    <div><p className="text-gray-600">{t('Speed Limit')}</p><p className="font-medium text-gray-800">{event.limit}</p></div>
                    <div><p className="text-gray-600">{t('Driver')}</p><p className="font-medium text-gray-800">{event.driver}</p></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Events;