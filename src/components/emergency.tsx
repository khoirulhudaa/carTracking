// src/components/emergency.tsx  (atau path yang sesuai)
import { Siren, MapPin, Phone, AlertTriangle, User, Clock } from 'lucide-react';
import { useTranslation } from './Dashboard'; // Sesuaikan path jika perlu

export default function EmergencyAlert() {
  const { t } = useTranslation();

  const active = [
    { 
      id: 1, 
      plate: 'B 9012 DEF', 
      driver: 'Budi Prasetyo', 
      type: t('Accident Detected'), // akan diterjemahkan
      location: 'Jl. Tol Jagorawi KM 34', 
      time: '08:15 WIB', 
      photo: true 
    },
  ];

  const history = [
    { plate: 'B 2345 MNO', type: t('Manual Emergency Button'), time: '27 Nov 2025 14:30', resolved: true },
    { plate: 'B 6789 PQR', type: t('Hard Braking + Impact'), time: '25 Nov 2025 09:12', resolved: true },
  ];

  return (
    <div className="min-h-screen bg-white rounded-xl py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">{t('Emergency / Accident Alert')}</h1>

        {/* Active Emergency */}
        {active.length > 0 ? (
          <div className="bg-red-50 border-2 border-red-500 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <Siren className="w-12 h-12 text-red-600 animate-pulse" />
              <div>
                <h2 className="text-2xl font-bold text-red-800">{t('ACTIVE EMERGENCY ALERT!')}</h2>
                <p className="text-red-700">{t('Vehicle detected in accident')}</p>
              </div>
            </div>
            {active.map((e) => (
              <div key={e.id} className="bg-white rounded-xl p-5 border border-red-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="font-bold text-xl">{e.plate}</p>
                    <p className="text-gray-600 flex items-center gap-2">
                      <User className="w-4 h-4" /> {e.driver}
                    </p>
                    <p className="text-gray-600 flex items-center gap-2 mt-2">
                      <Clock className="w-4 h-4" /> {e.time}
                    </p>
                    <p className="text-red-700 font-medium mt-3 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" /> {e.type}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <button className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium flex items-center justify-center gap-2">
                      <Phone className="w-5 h-5" /> {t('Call Driver Now')}
                    </button>
                    <button className="w-full py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-xl font-medium">
                      {t('Send Medical & Police Team')}
                    </button>
                  </div>
                </div>
                <div className="mt-5 h-64 bg-gray-200 rounded-xl border-2 border-dashed border-gray-400 flex items-center justify-center">
                  <MapPin className="w-16 h-16 text-red-600" />
                  <p className="ml-3 text-lg font-medium">{t('Location')}: {e.location}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-8 text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Siren className="w-12 h-12 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-emerald-800">{t('No Active Emergency')}</p>
            <p className="text-emerald-700 mt-2">{t('All vehicles are safe')}</p>
          </div>
        )}

        {/* History */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border">
          <h3 className="text-xl font-bold text-gray-800 mb-5">{t('Emergency History (Last 7 Days)')}</h3>
          <div className="space-y-4">
            {history.map((h, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-xl flex justify-between items-center">
                <div>
                  <p className="font-bold">{h.plate}</p>
                  <p className="text-sm text-gray-600">{h.type} • {h.time}</p>
                </div>
                <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                  {t('Resolved')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}