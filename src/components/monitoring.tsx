// components/pages/AudioVideoMonitoring.tsx
import { Camera, History, PlayCircle, Video, Volume2 } from 'lucide-react';

export default function AudioVideoMonitoring() {
  const cameras = [
    { plate: 'B 1234 ABC', type: 'Dashcam Depan', status: 'Live', recording: true },
    { plate: 'B 1234 ABC', type: 'Kamera Belakang', status: 'Live', recording: true },
    { plate: 'B 5678 XYZ', type: 'Dashcam Depan', status: 'Offline', recording: false },
  ];

  return (
    <div className="min-h-screen bg-white rounded-xl py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">Audio/Video Monitoring</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-6 border border-indigo-200">
            <p className="text-indigo-700 text-sm font-medium">Kamera Aktif</p>
            <p className="text-4xl font-bold text-indigo-800 mt-1">42</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border border-emerald-200">
            <p className="text-emerald-700 text-sm font-medium">Sedang Merekam</p>
            <p className="text-4xl font-bold text-emerald-800 mt-1">38</p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
            <p className="text-gray-700 text-sm font-medium">Offline</p>
            <p className="text-4xl font-bold text-gray-800 mt-1">4</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
            <p className="text-purple-700 text-sm font-medium">Total Storage</p>
            <p className="text-3xl font-bold text-purple-800 mt-1">2.8 TB</p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {cameras.map((cam) => (
            <div key={`${cam.plate}-${cam.type}`} className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                <div className="relative">
                <div className="h-56 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    {cam.status === 'Live' ? (
                    <>
                        <Video className="w-20 h-20 text-gray-400" />
                        <div className="absolute top-3 right-3 flex gap-2">
                        <span className="px-3 py-1 bg-red-600 text-white text-xs rounded-full animate-pulse">LIVE</span>
                        {cam.recording && <Volume2 className="w-6 h-6 text-red-600 animate-pulse" />}
                        </div>
                    </>
                    ) : (
                    <div className="text-center">
                        <Camera className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500">Offline</p>
                    </div>
                    )}
                </div>
                </div>
                <div className="p-4">
                <p className="font-bold text-gray-800">{cam.plate}</p>
                <p className="text-sm text-gray-600">{cam.type}</p>
                <div className="mt-3 flex gap-2">
                    <button className="flex-1 py-2 bg-indigo-600 text-white rounded-lg flex items-center justify-center gap-2 text-sm hover:bg-indigo-700">
                    <PlayCircle className="w-4 h-4" /> Playback
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <History className="w-4 h-4" />
                    </button>
                </div>
                </div>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
}