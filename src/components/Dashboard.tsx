// import { useState } from 'react';
// import ActivityChart from './ActivityChart';
// import Devices from './Devices';
// import Drivers from './Drivers';
// import Events from './Events';
// import Header from './Header';
// import Logs from './Logs';
// import MapOverview from './MapOverview';
// import RemindersPanel from './RemindersPanel';
// import Reports from './Reports';
// import Sensors from './Sensors';
// import Sidebar from './Sidebar';
// import TabsContent from './tabsContent';
// import TimeManagement from './TimeManagement';
// import Tools from './Tools';
// import Trips from './Trips';
// import VehicleProfile from './VehicleProfile';

// function Dashboard() {
//   const [activePage, setActivePage] = useState('assets');

//   const renderPage = () => {
//     switch (activePage) {
//       case 'assets':
//         return (
//           <div>
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//               <div className="lg:col-span-2 h-full">
//                 <VehicleProfile />
//               </div>
//               <div className="space-y-6">
//                 <ActivityChart />
//                 <RemindersPanel />
//               </div>
//             </div>
//             <div className='mt-6'>
//               <TabsContent />
//             </div>
//           </div>
//         );
//       case 'map':
//         return <MapOverview />;
//       case 'trips':
//         return <Trips />;
//       case 'events':
//         return <Events />;
//       case 'drivers':
//         return <Drivers />;
//       case 'sensors':
//         return <Sensors />;
//       case 'devices':
//         return <Devices />;
//       case 'logs':
//         return <Logs />;
//       case 'time':
//         return <TimeManagement />;
//       case 'tools':
//         return <Tools />;
//       case 'reports':
//         return <Reports />;
//       default:
//         return (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             <div className="lg:col-span-2">
//               <VehicleProfile />
//             </div>
//             <div className="space-y-6">
//               <ActivityChart />
//               <RemindersPanel />
//             </div>
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar activePage={activePage} onPageChange={setActivePage} />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header />
//         <main className="flex-1 overflow-y-auto p-6">
//           {renderPage()}
//         </main>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;


import { AlertCircle, BarChart3, Map, Menu, Navigation, Package, Users, X } from 'lucide-react';
import { useState } from 'react';
import ActivityChart from './ActivityChart';
import Devices from './Devices';
import Drivers from './Drivers';
import Events from './Events';
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
  const [activePage, setActivePage] = useState('map');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case 'assets':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <VehicleProfile />
              </div>
              <div className="space-y-6">
                <ActivityChart />
                <RemindersPanel />
              </div>
            </div>
            <div className="mt-6">
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
        return <VehicleProfile />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar activePage={activePage} onPageChange={setActivePage} />
      </div>

      {/* Mobile Drawer Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Drawer */}
          <div className="absolute left-0 top-0 h-full w-screen bg-white shadow-xl">
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <Navigation className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-800">Truckly</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <Sidebar activePage={activePage} onPageChange={(page) => {
              setActivePage(page);
              setMobileMenuOpen(false);
            }} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header dengan hamburger di mobile */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
            <h2 className="text-xl font-semibold text-gray-800 capitalize">
              {activePage === 'map' ? 'Map Overview' : activePage}
            </h2>
            <div className="w-10" /> {/* spacer */}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {renderPage()}
        </main>

        {/* Bottom Navigation (Mobile only) */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="grid grid-cols-5 gap-1 py-2">
            {[
              { id: 'map', icon: Map, label: 'Map' },
              { id: 'assets', icon: Package, label: 'Assets' },
              { id: 'trips', icon: BarChart3, label: 'Trips' },
              { id: 'events', icon: AlertCircle, label: 'Events' },
              { id: 'drivers', icon: Users, label: 'Drivers' },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              const isDisabled = ['drivers'].includes(item.id); // contoh disabled

              return (
                <button
                  key={item.id}
                  onClick={() => !isDisabled && setActivePage(item.id)}
                  disabled={isDisabled}
                  className={`flex flex-col items-center py-2 px-1 ${
                    isActive
                      ? 'text-blue-600'
                      : isDisabled
                      ? 'text-gray-400'
                      : 'text-gray-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs mt-1">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Dashboard;