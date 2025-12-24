// src/components/notifications.tsx
import { AlertTriangle, BellRing, Calendar, CheckCircle, Fuel, Siren, Wrench } from 'lucide-react';
import { useTranslation } from './Dashboard'; // Sesuaikan path jika perlu

export default function NotificationCenter() {
  const { t } = useTranslation();

  const notifications = [
    { id: 1, type: 'fuel', title: t('Low Fuel'), desc: t('B 2345 MNO only 15% left'), time: t('10 minutes ago'), read: false },
    { id: 2, type: 'service', title: t('Service Overdue'), desc: t('B 7890 JKL overdue by 1,200 km'), time: t('2 hours ago'), read: false },
    { id: 3, type: 'emergency', title: t('Emergency Button Pressed'), desc: t('Driver Budi P. (B 9012 DEF)'), time: t('1 day ago'), read: true },
    { id: 4, type: 'geofence', title: t('Exited Area'), desc: t('B 1234 ABC exited office zone'), time: t('3 days ago'), read: true },
  ];

  return (
    <div className="min-h-screen bg-white rounded-xl py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">{t('Notification Center')}</h1>
          <button className="text-blue-600 hover:underline text-sm font-medium">
            {t('Mark all as read')}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 border text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BellRing className="w-9 h-9 text-red-600" />
            </div>
            <p className="text-4xl font-bold text-red-600">8</p>
            <p className="text-gray-600">{t('Unread')}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6 border text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-9 h-9 text-emerald-600" />
            </div>
            <p className="text-4xl font-bold text-emerald-600">42</p>
            <p className="text-gray-600">{t('Total This Month')}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6 border text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-9 h-9 text-blue-600" />
            </div>
            <p className="text-4xl font-bold text-blue-600">5</p>
            <p className="text-gray-600">{t('Today\'s Reminders')}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border">
          <h3 className="text-xl font-bold text-gray-800 mb-6">{t('All Notifications')}</h3>
          <div className="space-y-4">
            {notifications.map((n) => {
              const Icon = n.type === 'fuel' ? Fuel : n.type === 'service' ? Wrench : n.type === 'emergency' ? Siren : AlertTriangle;
              const color = n.type === 'fuel' ? 'orange' : n.type === 'service' ? 'amber' : n.type === 'emergency' ? 'red' : 'blue';

              return (
                <div
                  key={n.id}
                  className={`p-5 rounded-xl border ${n.read ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300 shadow-sm'}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${n.read ? 'bg-gray-200' : `bg-${color}-100`}`}>
                      <Icon className={`w-6 h-6 ${n.read ? 'text-gray-500' : `text-${color}-600`}`} />
                    </div>
                    <div className="flex-1">
                      <p className={`font-bold ${n.read ? 'text-gray-600' : 'text-gray-800'}`}>
                        {n.title}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">{n.desc}</p>
                      <p className="text-xs text-gray-500 mt-2">{n.time}</p>
                    </div>
                    {!n.read && <div className="w-3 h-3 bg-red-600 rounded-full"></div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}