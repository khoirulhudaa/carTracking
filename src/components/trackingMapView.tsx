// components/pages/TrackingMapView.tsx
import { Filter, History, Map } from 'lucide-react';

export default function TrackingMapView() {
  const activeVehicles = 18;
  const moving = 12;
  const idle = 4;
  const parked = 2;

  const liveVehicles = [
    { id: 1, plate: 'B 1234 ABC', driver: 'Ahmad S.', status: 'Moving', speed: 68, location: 'Jl. Sudirman → Thamrin', fuel: 74 },
    { id: 2, plate: 'B 5678 XYZ', driver: 'Siti N.', status: 'Idle', speed: 0, location: 'Kantor Pusat', fuel: 45 },
    { id: 3, plate: 'B 9012 DEF', driver: 'Budi P.', status: 'Moving', speed: 52, location: 'Bandara Soetta', fuel: 88 },
  ];

  return (
    <div className="space-y-8 pb-20 lg:pb-6">
      <h1 className="text-3xl font-bold text-gray-800">Tracking & Map View</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
          <p className="text-blue-700 text-sm font-medium">Total Aktif</p>
          <p className="text-4xl font-bold text-blue-800 mt-1">{activeVehicles}</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border border-emerald-200">
          <p className="text-emerald-700 text-sm font-medium">Sedang Berjalan</p>
          <p className="text-4xl font-bold text-emerald-800 mt-1">{moving}</p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-200">
          <p className="text-amber-700 text-sm font-medium">Idle</p>
          <p className="text-4xl font-bold text-amber-800 mt-1">{idle}</p>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
          <p className="text-gray-700 text-sm font-medium">Parkir</p>
          <p className="text-4xl font-bold text-gray-800 mt-1">{parked}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Peta Real-time Armada</h3>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-2 text-sm">
                <Filter className="w-4 h-4" /> Filter
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 text-sm">
                <History className="w-4 h-4" /> Replay Rute
              </button>
            </div>
          </div>
          <div className="h-96 bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl border-2 border-dashed border-blue-300 flex items-center justify-center">
            <div className="text-center">
              <Map className="w-20 h-20 text-blue-500 mx-auto mb-4" />
              <p className="text-xl font-semibold text-gray-700">Live Tracking Map</p>
              <p className="text-sm text-gray-500 mt-1">18 kendaraan sedang dipantau</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border">
          <h3 className="text-xl font-bold text-gray-800 mb-5">Kendaraan Aktif</h3>
          <div className="space-y-4">
            {liveVehicles.map((v) => (
              <div key={v.id} className="p-4 bg-gray-50 rounded-xl hover:shadow-md transition">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-bold text-gray-800">{v.plate}</p>
                    <p className="text-sm text-gray-600">{v.driver}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    v.status === 'Moving' ? 'bg-emerald-100 text-emerald-700' : 
                    v.status === 'Idle' ? 'bg-amber-100 text-amber-700' : 
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {v.status} {v.speed > 0 && `• ${v.speed} km/h`}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">{v.location}</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Fuel</span>
                      <span>{v.fuel}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${v.fuel > 30 ? 'bg-emerald-500' : 'bg-red-500'}`} style={{ width: `${v.fuel}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}