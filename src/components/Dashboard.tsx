import { useState } from 'react';
import ActivityChart from './ActivityChart';
import Devices from './Devices';
import Drivers from './Drivers';
import Events from './Events';
import Header from './Header';
import Logs from './Logs';
import MapOverview from './MapOverview';
import RemindersPanel from './RemindersPanel';
import Reports from './Reports';
import Sensors from './Sensors';
import Sidebar from './Sidebar';
import TabsContent from './tabsContent';
import TimeManagement from './TimeManagement';
import Tools from './Tools';
import Trips from './Trips';
import VehicleProfile from './VehicleProfile';

function Dashboard() {
  const [activePage, setActivePage] = useState('assets');

  const renderPage = () => {
    switch (activePage) {
      case 'assets':
        return (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 h-full">
                <VehicleProfile />
              </div>
              <div className="space-y-6">
                <ActivityChart />
                <RemindersPanel />
              </div>
            </div>
            <div className='mt-6'>
              <TabsContent />
            </div>
          </div>
        );
      case 'map':
        return <MapOverview />;
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
      case 'time':
        return <TimeManagement />;
      case 'tools':
        return <Tools />;
      case 'reports':
        return <Reports />;
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <VehicleProfile />
            </div>
            <div className="space-y-6">
              <ActivityChart />
              <RemindersPanel />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
