// components/pages/AudioVideoMonitoring.tsx
import {
  AlertCircle,
  Camera,
  Car,
  ChevronRight,
  Circle,
  Download,
  Filter,
  Maximize2,
  Search,
  Video,
  Volume2,
  VolumeX,
  X
} from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from './Dashboard';

interface CameraFeed {
  id: string;
  plate: string;
  type: string;
  status: 'Live' | 'Offline' | 'Recording Only';
  recording: boolean;
  hasAudio: boolean;
  lastSeen?: string;
}

interface Vehicle {
  plate: string;
  model: string;
  cameraCount: number;
  liveCount: number;
}

const initialCameras: CameraFeed[] = [
  { id: '1', plate: 'B 1234 ABC', type: 'Dashcam Depan', status: 'Live', recording: true, hasAudio: true },
  { id: '2', plate: 'B 1234 ABC', type: 'Kamera Belakang', status: 'Live', recording: true, hasAudio: false },
  { id: '3', plate: 'B 5678 XYZ', type: 'Dashcam Depan', status: 'Offline', recording: false, hasAudio: false, lastSeen: '2 jam lalu' },
  { id: '4', plate: 'D 9999 ZZZ', type: 'Kamera Kabin', status: 'Live', recording: true, hasAudio: true },
  { id: '5', plate: 'B 1111 AAA', type: 'Dashcam Depan', status: 'Live', recording: false, hasAudio: true },
  { id: '6', plate: 'B 2222 BBB', type: 'Kamera Samping Kanan', status: 'Live', recording: true, hasAudio: false },
  { id: '7', plate: 'B 2222 BBB', type: 'Dashcam Depan', status: 'Live', recording: true, hasAudio: true },
  { id: '8', plate: 'L 8888 WWW', type: 'Dashcam Depan', status: 'Live', recording: true, hasAudio: true },
];

const getVehicles = (cameras: CameraFeed[]): Vehicle[] => {
  const map = new Map<string, Vehicle>();
  cameras.forEach(cam => {
    if (!map.has(cam.plate)) {
      map.set(cam.plate, {
        plate: cam.plate,
        model: cam.plate.startsWith('B') ? 'Toyota Avanza' : cam.plate.startsWith('D') ? 'Honda HR-V' : 'Mitsubishi Xpander',
        cameraCount: 0,
        liveCount: 0,
      });
    }
    const v = map.get(cam.plate)!;
    v.cameraCount++;
    if (cam.status === 'Live') v.liveCount++;
  });
  return Array.from(map.values()).sort((a, b) => a.plate.localeCompare(b.plate));
};

export default function AudioVideoMonitoring() {
  const { t } = useTranslation(); // ← tambahkan ini

  const [cameras] = useState<CameraFeed[]>(initialCameras);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'All' | 'Live' | 'Offline' | 'Recording'>('All');
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [audioStates, setAudioStates] = useState<Record<string, boolean>>({});

  const vehicles = getVehicles(cameras);

  const filteredCameras = cameras.filter(cam => {
    const matchesSearch = cam.plate.toLowerCase().includes(search.toLowerCase()) ||
                         cam.type.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' ||
                         (filter === 'Live' && cam.status === 'Live') ||
                         (filter === 'Offline' && cam.status === 'Offline') ||
                         (filter === 'Recording' && cam.recording);
    const matchesVehicle = !selectedVehicle || cam.plate === selectedVehicle;
    return matchesSearch && matchesFilter && matchesVehicle;
  });

  const total = cameras.length;
  const live = cameras.filter(c => c.status === 'Live').length;
  const recording = cameras.filter(c => c.recording).length;
  const offline = cameras.filter(c => c.status === 'Offline').length;

  const toggleAudio = (id: string) => {
    setAudioStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{t('Audio/Video')}</h1>
            </div>

            <button
              onClick={() => setShowVehicleModal(true)}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2 transition"
            >
              <Car className="w-5 h-5" />
              {t('View All Vehicle')} ({vehicles.length})
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"> {/* gap lebih besar untuk breathing */}
          {/* Total Kamera */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 border border-indigo-200 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex flex-col justify-between items-start">
              <Camera className="w-8 h-8 mb-5 text-indigo-600 opacity-90" />
              <div className="text-left">
                <p className="text-indigo-700 text-sm font-semibold uppercase tracking-wider">{t('Total Cameras')}</p>
                <p className="text-5xl font-bold text-indigo-900 mt-3">{total}</p>
              </div>
            </div>
          </div>

          {/* Live Streaming */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 border border-emerald-200 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex flex-col justify-between items-start">
              <Video className="w-8 h-8 mb-5 text-emerald-600 opacity-90" />
              <div className="text-left">
                <p className="text-emerald-700 text-sm font-semibold uppercase tracking-wider">{t('Siaran Langsung')}</p>
                <p className="text-5xl font-bold text-emerald-900 mt-3">{live}</p>
              </div>
            </div>
          </div>

          {/* Sedang Merekam */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 p-4 border border-amber-200 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex flex-col justify-between items-start">
              <div className="relative">
                <Circle className="w-8 h-8 mb-5 text-red-500" />
                <Circle className="w-8 h-8 mb-5 text-red-500 animate-ping absolute inset-0" /> {/* pulse lebih halus */}
              </div>
              <div className="text-left">
                <p className="text-amber-700 text-sm font-semibold uppercase tracking-wider">{t('Recording')}</p>
                <p className="text-5xl font-bold text-amber-900 mt-3">{recording}</p>
              </div>
            </div>
          </div>

          {/* Offline */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-4 border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex flex-col justify-between items-start">
              <AlertCircle className="w-8 h-8 mb-5 text-gray-500 opacity-90" />
              <div className="text-left">
                <p className="text-gray-700 text-sm font-semibold uppercase tracking-wider">{t('Offline')}</p>
                <p className="text-5xl font-bold text-gray-800 mt-3">{offline}</p>
              </div>
            </div>
          </div>
        </div>

          {/* Search + Filter */}
          <div className="bg-white rounded-2xl shadow-sm border p-5">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('Cari plat nomor atau tipe kamera...')}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full md:w-[400px] pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-full flex gap-2">
                <div className="w-full md:w-max flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-xl">
                  <Filter className="w-5 h-5 text-gray-600" />
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as any)}
                    className="w-full bg-transparent outline-none font-medium text-gray-700"
                  >
                    <option value="All">{t('Semua')}</option>
                    <option value="Live">{t('Live')}</option>
                    <option value="Recording">{t('Sedang Merekam')}</option>
                    <option value="Offline">{t('Offline')}</option>
                  </select>
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              {t('Menampilkan')} {filteredCameras.length} {t('dari')} {total} {t('kamera')}
            </p>
          </div>

          {/* Camera Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCameras.map((cam) => (
              <div key={cam.id} className="bg-white rounded-2xl shadow-md border overflow-hidden hover:shadow-xl transition-all group">
                <div className="relative aspect-video bg-black">
                  {cam.status === 'Live' ? (
                    <>
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                        <Video className="w-20 h-20 text-gray-600" />
                      </div>
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center gap-1 animate-pulse">
                          <Circle className="w-3 h-3 fill-current" /> LIVE
                        </span>
                        {cam.recording && (
                          <span className="px-3 py-1.5 bg-red-600/80 text-white text-xs rounded-full">REC</span>
                        )}
                      </div>
                      {cam.hasAudio && (
                        <button
                          onClick={() => toggleAudio(cam.id)}
                          className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white backdrop-blur-sm"
                        >
                          {audioStates[cam.id] ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                        </button>
                      )}
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-gray-500">
                      <Camera className="w-16 h-16 mb-3" />
                      <p className="text-lg font-medium">{t('Offline')}</p>
                      {cam.lastSeen && <p className="text-sm">{t('Terakhir aktif')} {cam.lastSeen}</p>}
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <p className="font-bold text-lg text-gray-900">{cam.plate}</p>
                    <p className="text-sm text-gray-600">{cam.type}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2.5 bg-indigo-600 text-white rounded-lg flex items-center justify-center gap-2 text-sm font-medium hover:bg-indigo-700">
                      Playback
                    </button>
                    <button className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50"><Download className="w-5 h-5" /></button>
                    <button className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 opacity-0 group-hover:opacity-100 transition">
                      <Maximize2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showVehicleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">{t('Daftar Kendaraan')}</h2>
              <button onClick={() => setShowVehicleModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[60vh]">
              {vehicles.map((vehicle) => (
                <button
                  key={vehicle.plate}
                  onClick={() => {
                    setSelectedVehicle(vehicle.plate);
                    setShowVehicleModal(false);
                  }}
                  className="w-full p-5 border-b border-gray-100 hover:bg-gray-50 transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 mb-5 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Car className="w-7 h-7 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-gray-900">{vehicle.plate}</p>
                      <p className="text-sm text-gray-600">{vehicle.model}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{vehicle.cameraCount} {t('kamera')}</p>
                    <p className="text-xs text-emerald-600 font-medium">{vehicle.liveCount} live</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                </button>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <p className="text-sm text-gray-600 text-center">
                {t('Total')} {vehicles.length} {t('kendaraan terdaftar')}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}