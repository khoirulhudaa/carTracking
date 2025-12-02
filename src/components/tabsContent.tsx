import { useState } from 'react';
import Devices from './Devices';
import Drivers from './Drivers';
import Events from './Events';
import Logs from './Logs';
import Sensors from './Sensors';
import Trips from './Trips';

 const RenderContent = ({activeTab}: {activeTab: string}) => {
    switch (activeTab) {
      case 'trips':
        return <Trips />;
      case 'events':
        return <Events />;
      case 'drivers':
        return <Drivers />;
      case 'sensors':
        return <Sensors />;
      case 'devices':
        return <Devices />;
      case 'logs':
        return <Logs />;
      default:
        return <Trips />;
    }
  };

const TabsContent = () => {

  const [activeTab, setActiveTab] = useState('trips')

  return (
    <div className="w-full bg-white rounded-xl shadow-sm">
      <div className="border-t border-gray-200">
        <div className="flex border-b border-gray-200 justify-between px-4">
          <button
            onClick={() => setActiveTab('trips')}
            className={`w-full px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'trips'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Trips
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`w-full px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'events'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Events
          </button>

          <button
            onClick={() => setActiveTab('drivers')}
            className={`w-full px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'drivers'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Drivers
          </button>

          <button
            onClick={() => setActiveTab('sensors')}
            className={`w-full px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'sensors'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Sensors
          </button>

          <button
            onClick={() => setActiveTab('devices')}
            className={`w-full px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'devices'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Devices
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            className={`w-full px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'logs'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Logs
          </button>
        </div>
        <div className='w-full h-max p-7'>
          <RenderContent activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
}

export default TabsContent;
