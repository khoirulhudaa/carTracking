// src/Sidebar.tsx
import { X } from 'lucide-react';
import { useState } from 'react';
import ActivityChart from './ActivityChart';
import ActivityTimeline from './activityTimeLine';

interface SidebarProps {
  driverName: string;
  driverId: string;
  status: string;
  vehicleInfo: {
    truckName: string;
    insurance: string;
    mileageCode: string;
  };
  routeDistance?: string;
  destination?: string;
  onClose: () => void;
}

type TabType = 'tracking' | 'analytics' | 'details';

export default function Sidebar({
  driverName,
  driverId,
  status,
  vehicleInfo,
  routeDistance,
  destination,
  onClose,
}: SidebarProps) {
  const [activeTab, setActiveTab] = useState<TabType>('tracking');

  return (
    <div className="absolute left-[-52px] -top-[94px] scale-[0.7] z-[2222] w-[420px] h-[108vh] bg-white border border-gray-300 rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-left">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-lg bg-red-500 text-white hover:bg-red-600"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{driverName}</h2>
            <p className="text-sm text-gray-600 mt-1">{driverId}</p>
          </div>
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="p-6 border-b border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className='border rounded-lg p-3'>
            <p className="text-gray-500">Nomor Polisi</p>
            <p className="font-bold text-lg">{vehicleInfo.truckName}</p>
          </div>
          <div className='border rounded-lg p-3'>
            <p className="text-gray-500">Mileage Cert</p>
            <p className="font-bold text-lg">{vehicleInfo.mileageCode}</p>
          </div>
        </div>

        {routeDistance && destination && (
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-sm text-gray-600">Tujuan Saat Ini</p>
            <p className="font-bold text-lg">{destination}</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{routeDistance} km</p>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex px-6 border-b border-gray-200 bg-white">
        <button
          onClick={() => setActiveTab('tracking')}
          className={`flex-1 px-4 py-4 text-sm font-bold transition-all ${
            activeTab === 'tracking'
              ? 'text-blue-600 border-b-4 border-blue-600'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          Tracking
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex-1 px-4 py-4 text-sm font-bold transition-all ${
            activeTab === 'analytics'
              ? 'text-blue-600 border-b-4 border-blue-600'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          Analytics
        </button>
        <button
          onClick={() => setActiveTab('details')}
          className={`flex-1 px-4 py-4 text-sm font-bold transition-all ${
            activeTab === 'details'
              ? 'text-blue-600 border-b-4 border-blue-600'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          Details
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        {activeTab === 'tracking' && (
          <div className="p-6 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Aktivitas 24 Jam Terakhir</h3>
                <span className="text-sm text-gray-500">08 Des 2025</span>
              </div>
              <ActivityChart />
            </div>
            <div>
              <ActivityTimeline />
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4">Analytics (Coming Soon)</h3>
            <div className="bg-white rounded-xl p-8 text-center text-gray-500 border-2 border-dashed border-gray-300">
              <p className="text-6xl mb-4">📊</p>
              <p>Statistik mengemudi, efisiensi bahan bakar, dan performa akan ditampilkan di sini.</p>
            </div>
          </div>
        )}

        {activeTab === 'details' && (
          <div className="p-6 space-y-6">
            <h3 className="text-lg font-bold">Detail Pengemudi & Kendaraan</h3>
            <div className="bg-white rounded-xl p-5 space-y-4 border">
              <div>
                <p className="text-sm text-gray-500">Nama Lengkap</p>
                <p className="font-semibold">{driverName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">ID Pengemudi</p>
                <p className="font-semibold">{driverId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Nomor Polisi</p>
                <p className="font-semibold">{vehicleInfo.truckName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Asuransi</p>
                <p className="font-semibold">{vehicleInfo.insurance || 'Tidak tersedia'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Mileage Certificate</p>
                <p className="font-semibold">{vehicleInfo.mileageCode}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}