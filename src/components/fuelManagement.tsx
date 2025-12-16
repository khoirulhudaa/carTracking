// components/pages/FuelManagement.tsx
import { AlertCircle, DollarSign, Fuel, MapPin } from 'lucide-react';
import { useTranslation } from './Dashboard';

export default function FuelManagement() {
  const { t } = useTranslation();

  const totalSpent = 184750000;
  const totalLiters = 12560;
  const avgConsumption = 8.4;

  const recentRefills = [
    {
      id: 1,
      vehicle: 'B 1234 ABC',
      liters: 65,
      cost: 975000,
      spbu: 'SPBU Pertamina 34-10101',
      date: '29 Nov 2025 14:22',
      type: 'Solar',
    },
    {
      id: 2,
      vehicle: 'B 5678 XYZ',
      liters: 48,
      cost: 720000,
      spbu: 'SPBU Internal Dinas',
      date: '28 Nov 2025 09:15',
      type: 'Solar',
    },
    {
      id: 3,
      vehicle: 'B 9012 DEF',
      liters: 80,
      cost: 1200000,
      spbu: 'SPBU Shell Jakarta',
      date: '27 Nov 2025 16:40',
      type: 'Pertalite',
    },
  ];

  const lowFuel = [
    { vehicle: 'B 2345 MNO', level: 18, driver: 'Ahmad S.', lastRefill: '5 hari lalu' },
    { vehicle: 'B 6789 PQR', level: 12, driver: 'Siti N.', lastRefill: '8 hari lalu' },
  ];

  return (
    <div className="min-h-screen bg-white rounded-xl py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {t('Fuel Management')}
          </h1>

          <button className="px-5 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl flex items-center gap-3">
            <Fuel className="w-5 h-5" />
            <span className="font-medium">
              {t('Manual Fuel Input')}
            </span>
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-700 text-sm font-medium">
                  {t('Total Fuel Cost')}
                </p>
                <p className="text-3xl font-bold text-orange-800 mt-1">
                  Rp {totalSpent.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
            <p className="text-blue-700 text-sm font-medium">
              {t('Total Liters')}
            </p>
            <p className="text-3xl font-bold text-blue-800 mt-1">
              {totalLiters.toLocaleString()} L
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
            <p className="text-purple-700 text-sm font-medium">
              {t('Average Consumption')}
            </p>
            <p className="text-3xl font-bold text-purple-800 mt-1">
              {avgConsumption} km/L
            </p>
          </div>
        </div>

        {/* Recent Refills + Low Fuel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Recent Refills */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 border">
            <h3 className="text-xl font-bold text-gray-800 mb-5">
              {t('Recent Refuel History')}
            </h3>

            <div className="space-y-4">
              {recentRefills.map(r => (
                <div
                  key={r.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Fuel className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{r.vehicle}</p>
                      <p className="text-sm text-gray-600">{r.spbu}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-lg text-emerald-600">
                      Rp {r.cost.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      {r.liters} L • {r.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Low Fuel Alert */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border">
            <h3 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-red-600" />
              {t('Low Fuel Alert')}
            </h3>

            <div className="space-y-4">
              {lowFuel.map(f => (
                <div
                  key={f.vehicle}
                  className="p-4 bg-red-50 border border-red-200 rounded-xl"
                >
                  <p className="font-semibold text-gray-800">{f.vehicle}</p>
                  <p className="text-sm text-gray-600">
                    {t('Driver')}: {f.driver}
                  </p>

                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span>{t('Fuel Level')}</span>
                      <span className="font-medium text-red-700">
                        {f.level}%
                      </span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-red-600 h-3 rounded-full"
                        style={{ width: `${f.level}%` }}
                      />
                    </div>

                    <p className="text-xs text-gray-500 mt-2">
                      {t('Last Refill')}: {f.lastRefill}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border">
          <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-5">
            {t('Refill Map This Month')}
          </h3>

          <div className="h-60 md:h-96 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-700">
                {t('Interactive Map')}
              </p>
              <p className="text-sm text-gray-500">
                {t('Click point for station & transaction detail')}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
