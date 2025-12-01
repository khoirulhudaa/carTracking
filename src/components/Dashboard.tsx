import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import VehicleProfile from './VehicleProfile';
import ActivityChart from './ActivityChart';
import RemindersPanel from './RemindersPanel';
import Trips from './Trips';
import Events from './Events';
import Drivers from './Drivers';
import Sensors from './Sensors';
import Devices from './Devices';
import Logs from './Logs';
import MapOverview from './MapOverview';
import TimeManagement from './TimeManagement';
import Tools from './Tools';
import Reports from './Reports';

function Dashboard() {
  const [activePage, setActivePage] = useState('assets');

  const renderPage = () => {
    switch (activePage) {
      case 'assets':
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
    <div className="flex h-screen bg-gray-50">
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
