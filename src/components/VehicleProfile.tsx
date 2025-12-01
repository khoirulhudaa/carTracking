import { Calendar, FileText, MapPin, X } from 'lucide-react';
import DriverInfo from './DriverInfo';
import GaugeChart from './GaugeChart';
import Local3DViewer, { default as ThreeDModel } from './modelViewer';

function VehicleProfile() {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-semibold text-gray-800">Tesla Model X</h2>
              <X className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500 mt-1">WMSP1JD3S1645NDF</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-3 gap-6 mb-8">
          <GaugeChart label="Oil" value={35} color="red" />
          <GaugeChart label="Fuel" value={157} max={200} unit="km" color="blue" />
          <GaugeChart label="Battery" value={8} color="orange" />
        </div>
        <Local3DViewer modelName="lexus.glb" scale={100} rotationSpeed={0.8} />

        <div className="relative">
          <div className="absolute shadow-sm w-max gap-20 mx-auto border bg-white rounded-lg py-3 px-7 bottom-4 left-0 right-0 flex justify-around text-center">
            <div>
              <MapPin className="w-4 h-4 text-gray-400 mx-auto mb-1" />
              <p className="text-2xl font-bold text-gray-800">25 psi</p>
              <p className="text-xs text-gray-500">FL</p>
            </div>
            <div>
              <MapPin className="w-4 h-4 text-gray-400 mx-auto mb-1" />
              <p className="text-2xl font-bold text-gray-800">26 psi</p>
              <p className="text-xs text-gray-500">FR</p>
            </div>
            <div>
              <Calendar className="w-4 h-4 text-gray-400 mx-auto mb-1" />
              <p className="text-2xl font-bold text-gray-800">25 psi</p>
              <p className="text-xs text-gray-500">RL</p>
            </div>
            <div>
              <FileText className="w-4 h-4 text-gray-400 mx-auto mb-1" />
              <p className="text-2xl font-bold text-gray-800">13 psi</p>
              <p className="text-xs text-gray-500">RR</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="flex border-b border-gray-200">
          <button className="px-6 py-3 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
            Dashboard
          </button>
          <button className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-700">
            Trips
          </button>
          <button className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-700">
            Events
          </button>
          <button className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-700">
            Drivers
          </button>
          <button className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-700">
            Sensors
          </button>
          <button className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-700">
            Devices
          </button>
          <button className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-700">
            Logs
          </button>
        </div>
        <DriverInfo />
      </div>
    </div>
  );
}

export default VehicleProfile;
