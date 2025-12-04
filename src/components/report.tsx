// components/pages/Reports.tsx
import { FileText, Download, Calendar, Filter, TrendingUp, DollarSign } from 'lucide-react';

export default function Reports() {
  const available = [
    { name: 'Laporan Perjalanan Bulanan', period: 'November 2025', size: '2.4 MB', type: 'Trip' },
    { name: 'Laporan Biaya BBM & Service', period: 'November 2025', size: '1.8 MB', type: 'Finance' },
    { name: 'Laporan Emergency & Accident', period: 'Q4 2025', size: '890 KB', type: 'Safety' },
    { name: 'Analisis Efisiensi Rute', period: 'Oktober-November 2025', size: '3.1 MB', type: 'Optimization' },
  ];

  return (
    <div className="space-y-8 pb-20 lg:pb-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Reports / Laporan</h1>
        <button className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl flex items-center gap-3">
          <FileText className="w-5 h-5" /> Buat Laporan Baru
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
          <DollarSign className="w-10 h-10 text-blue-600 mb-3" />
          <p className="text-blue-700 text-sm font-medium">Total Biaya Operasional</p>
          <p className="text-3xl font-bold text-blue-800 mt-1">Rp 1.42 M</p>
          <p className="text-xs text-blue-600 mt-2">November 2025</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border border-emerald-200">
          <TrendingUp className="w-10 h-10 text-emerald-600 mb-3" />
          <p className="text-emerald-700 text-sm font-medium">Total KM</p>
          <p className="text-3xl font-bold text-emerald-800 mt-1">48.920 km</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
          <Calendar className="w-10 h-10 text-purple-600 mb-3" />
          <p className="text-purple-700 text-sm font-medium">Laporan Dibuat</p>
          <p className="text-3xl font-bold text-purple-800 mt-1">24</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200">
          <Filter className="w-10 h-10 text-orange-600 mb-3" />
          <p className="text-orange-700 text-sm font-medium">Menunggu Export</p>
          <p className="text-3xl font-bold text-orange-800 mt-1">3</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 border">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Laporan Tersedia</h3>
          <button className="px-4 py-2 border rounded-lg flex items-center gap-2 text-sm hover:bg-gray-50">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
        <div className="space-y-4">
          {available.map((r, i) => (
            <div key={i} className="p-5 bg-gray-50 rounded-xl flex items-center justify-between hover:bg-gray-100 transition">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-800">{r.name}</p>
                  <p className="text-sm text-gray-600">{r.period} • {r.size}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 text-sm hover:bg-blue-700">
                  <Download className="w-4 h-4" /> PDF
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white">
                  Excel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}