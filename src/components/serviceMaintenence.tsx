import {
  AlertTriangle,
  Calendar,
  Clock,
  DollarSign,
  QrCode,
  TrendingUp,
  Wrench,
} from 'lucide-react';
import { useTranslation } from './Dashboard'; // ⬅️ sesuaikan path

export default function ServiceMaintenance() {
  const { t } = useTranslation();

  const upcoming = 7;
  const overdue = 3;
  const inService = 2;
  const totalCost = 127450000;

  const history = [
    {
      id: 1,
      vehicle: 'B 1234 ABC',
      type: 'Ganti Oli Mesin',
      cost: 2850000,
      mechanic: 'PT. Surya Mekanik',
      date: '28 Nov 2025',
      status: 'completed',
    },
    {
      id: 2,
      vehicle: 'B 5678 XYZ',
      type: 'Service Rem & Kampas',
      cost: 8900000,
      mechanic: 'Bengkel Resmi Isuzu',
      date: '25 Nov 2025',
      status: 'completed',
    },
    {
      id: 3,
      vehicle: 'B 9012 DEF',
      type: 'Ganti Aki',
      cost: 4200000,
      mechanic: 'Internal Workshop',
      date: '20 Nov 2025',
      status: 'completed',
    },
  ];

  const reminders = [
    {
      vehicle: 'B 3456 GHI',
      type: 'Service 40.000 km',
      dueIn: '1.200 km',
      dueDate: '15 Des 2025',
      priority: 'high',
    },
    {
      vehicle: 'B 7890 JKL',
      type: 'Ganti Oli Transmisi',
      dueIn: '500 km',
      dueDate: '10 Des 2025',
      priority: 'critical',
    },
    {
      vehicle: 'B 2345 MNO',
      type: 'Cek Rutin Bulanan',
      dueIn: '5 hari',
      dueDate: '09 Des 2025',
      priority: 'medium',
    },
  ];

  const predictive = [
    {
      vehicle: 'B 1234 ABC',
      nextService: 'Battery Health Check',
      predicted: 'March 2026',
      confidence: 92,
    },
    {
      vehicle: 'B 5678 XYZ',
      nextService: 'Clutch Replacement',
      predicted: 'May 2026',
      confidence: 87,
    },
  ];

  return (
    <div className="min-h-screen bg-white rounded-xl py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {t('Service & Maintenance')}
          </h1>

          <button className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl flex items-center gap-3 shadow-md">
            <QrCode className="w-5 h-5" />
            <span className="font-medium">
              {t('Scan Mechanic QR')}
            </span>
          </button>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <KpiCard
            label={t('Upcoming')}
            value={upcoming}
            icon={<Calendar className="w-10 h-10 text-amber-600 opacity-80" />}
            color="amber"
          />
          <KpiCard
            label={t('Overdue')}
            value={overdue}
            icon={<AlertTriangle className="w-10 h-10 text-red-600 opacity-80" />}
            color="red"
          />
          <KpiCard
            label={t('In Service')}
            value={inService}
            icon={<Wrench className="w-10 h-10 text-blue-600 opacity-80" />}
            color="blue"
          />
          <KpiCard
            label={t('Total Cost This Month')}
            value={`Rp ${totalCost.toLocaleString()}`}
            icon={<DollarSign className="w-10 h-10 text-emerald-600 opacity-80" />}
            color="emerald"
          />
        </div>

        {/* Reminder & Predictive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Reminder */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border">
            <h3 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-2">
              <Clock className="w-6 h-6 text-orange-600" />
              {t('Upcoming Service Reminders')}
            </h3>

            <div className="space-y-4">
              {reminders.map((r) => (
                <div
                  key={r.vehicle}
                  className={`p-4 rounded-xl border-l-4 ${
                    r.priority === 'critical'
                      ? 'border-red-500 bg-red-50'
                      : r.priority === 'high'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-300 bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-800">
                        {r.vehicle}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {r.type}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-200 text-orange-800">
                      {r.dueIn}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {t('Due Date')}: {r.dueDate}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Predictive */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border">
            <h3 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-purple-600" />
              {t('Predictive Maintenance')}
            </h3>

            <div className="space-y-4">
              {predictive.map((p) => (
                <div
                  key={p.vehicle}
                  className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 border"
                >
                  <p className="font-semibold text-gray-800">{p.vehicle}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {p.nextService}
                  </p>

                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span>{t('Prediction Accuracy')}</span>
                      <span>{p.confidence}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: `${p.confidence}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {t('Estimated')}: {p.predicted}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* History */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border overflow-hidden">
          <h3 className="text-xl font-bold text-gray-800 mb-5">
            {t('Service History')}
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-600 font-medium">
                  <th>{t('Vehicle')}</th>
                  <th>{t('Service Type')}</th>
                  <th>{t('Cost')}</th>
                  <th>{t('Mechanic')}</th>
                  <th>{t('Date')}</th>
                  <th>{t('Status')}</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h) => (
                  <tr key={h.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 font-medium">{h.vehicle}</td>
                    <td className="py-4">{h.type}</td>
                    <td className="py-4 font-semibold text-emerald-600">
                      Rp {h.cost.toLocaleString()}
                    </td>
                    <td className="py-4 text-gray-600">{h.mechanic}</td>
                    <td className="py-4">{h.date}</td>
                    <td className="py-4">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                        {t('Completed')}
                      </span>
                    </td>
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

/* KPI Component */
function KpiCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div
      className={`bg-gradient-to-br from-${color}-50 to-${color}-100 rounded-2xl p-6 border border-${color}-200`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-${color}-700 text-sm font-medium`}>
            {label}
          </p>
          <p className={`text-3xl font-bold text-${color}-800 mt-1`}>
            {value}
          </p>
        </div>
        {icon}
      </div>
    </div>
  );
}
