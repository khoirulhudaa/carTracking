// src/components/EngineTelemetry.tsx
import { Activity, AlertTriangle, Battery, Car, Lock, Thermometer } from 'lucide-react';
import { useTranslation } from './Dashboard';   // pastikan path-nya benar sesuai struktur folder kamu

export default function EngineTelemetry() {
  const { t } = useTranslation();

  const liveData = [
    { plate: 'B 1234 ABC', rpm: 2450, temp: 92, oil: 78, battery: 12.8, error: 'None', status: 'Normal' },
    { plate: 'B 5678 XYZ', rpm: 0,    temp: 45, oil: 85, battery: 12.4, error: 'P0299 Turbo Underboost', status: 'Warning' },
    { plate: 'B 9012 DEF', rpm: 3100, temp: 108,oil: 42, battery: 11.9, error: 'High Coolant Temp',        status: 'Critical' },
  ];

  // Terjemahan status (biar warnanya tetap sesuai tapi teksnya berubah bahasa)
  const statusLabel = (status: string) => {
    if (status === 'Normal')   return t('Normal')   || 'Normal';
    if (status === 'Warning')  return t('Warning')  || 'Warning';
    if (status === 'Critical') return t('Critical') || 'Critical';
    return status;
  };

  return (
    <div className="min-h-screen bg-white py-9 rounded-xl px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header + Remote Stop Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold text-gray-900">{t('Engine Car') || 'Engine & Telemetry'}</h1>
          {/* <button className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl flex items-center gap-3 shadow-md transition">
            <Lock className="w-5 h-5" />
            <span className="font-medium">{t('Remote Engine Stop (MFA)')}</span>
          </button> */}
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-700 text-sm font-medium">{t('Aktif Telemetry')}</p>
                <p className="text-4xl font-bold text-purple-800 mt-1">24</p>
              </div>
              <Activity className="w-10 h-10 text-purple-600 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200">
            <div>
              <p className="text-orange-700 text-sm font-medium">{t('Warning')}</p>
              <p className="text-4xl font-bold text-orange-800 mt-1">5</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border border-red-200">
            <div>
              <p className="text-red-700 text-sm font-medium">{t('Critical Alert')}</p>
              <p className="text-4xl font-bold text-red-800 mt-1">2</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border border-emerald-200">
            <div>
              <p className="text-emerald-700 text-sm font-medium">{t('Normal')}</p>
              <p className="text-4xl font-bold text-emerald-800 mt-1">17</p>
            </div>
          </div>
        </div>

        {/* Live Telemetry List */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border">
          <h3 className="text-xl font-bold text-gray-900 mb-6">{t('Live Engine Data')}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {liveData.map((v) => (
              <div
                key={v.plate}
                className={`p-5 rounded-xl border-2 ${
                  v.status === 'Critical'
                    ? 'border-red-500 bg-red-50'
                    : v.status === 'Warning'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-bold text-lg text-gray-900">{v.plate}</p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        v.status === 'Critical'
                          ? 'bg-red-200 text-red-800'
                          : v.status === 'Warning'
                          ? 'bg-orange-200 text-orange-800'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {statusLabel(v.status)}
                    </span>
                  </div>
                  <Car className="w-8 h-8 text-gray-600" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">RPM</p>
                    <p className="font-bold text-xl">{v.rpm}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 flex items-center gap-1">
                      <Thermometer className="w-4 h-4" /> {t('Temp')}
                    </p>
                    <p className="font-bold text-xl">{v.temp}°C</p>
                  </div>
                  <div>
                    <p className="text-gray-600">{t('Oil Level')}</p>
                    <p className="font-bold text-xl">{v.oil}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600 flex items-center gap-1">
                      <Battery className="w-4 h-4" /> {t('Battery')}
                    </p>
                    <p className="font-bold text-xl">{v.battery}V</p>
                  </div>
                </div>

                {v.error !== 'None' && (
                  <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg">
                    <p className="text-xs font-medium text-red-800 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      {t('Error Code')}: {v.error}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Predictive Analysis */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border">
          <h3 className="text-xl font-bold text-gray-900 mb-5">{t('Predictive Engine Health')}</h3>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border">
              <p className="font-semibold">B 5678 XYZ – Turbocharger</p>
              <p className="text-sm text-gray-600">
                {t('Prediksi kerusakan dalam 1.200 km atau 45 hari')}
              </p>
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>{t('Kemungkinan')}</span>
                  <span>78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-red-600 h-3 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}