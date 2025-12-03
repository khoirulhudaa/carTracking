import { AlertCircle, BarChart3, Clock, FileText, History, Map, Navigation, Package, Settings, Smartphone, Users } from 'lucide-react';

interface SidebarProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

function Sidebar({ activePage, onPageChange }: SidebarProps) {
  const menuItems = [
    { icon: Map, label: 'Map Overview', id: 'map' },
    { icon: Package, label: 'Assets', id: 'assets' },
    { icon: BarChart3, label: 'Trips', id: 'trips' },
    { icon: AlertCircle, label: 'Events', id: 'events' },
    { icon: Users, label: 'Drivers', id: 'drivers' },
    { icon: Smartphone, label: 'Sensors', id: 'sensors' },
    { icon: Package, label: 'Devices', id: 'devices' },
    { icon: History, label: 'Logs', id: 'logs' },
    { icon: Clock, label: 'Time Management', id: 'time' },
    { icon: Settings, label: 'Tools', id: 'tools' },
    { icon: FileText, label: 'Reports', id: 'reports' },
  ];

  // indeks item "Events"
  const eventsIndex = menuItems.findIndex(item => item.id === 'events');

  return (
    <aside className="w-full md:w-64 h-screen bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-6 top-0 bg-white border-0 md:border-b border-gray-200">
        <div className="hidden md:flex items-center space-x-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Navigation className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-800">Truckly</span>
        </div>
      </div>

      <nav className="px-3 space-y-1 md:mt-0 -mt-8 p-0 md:p-3">
        {menuItems.map((item, index) => {
          // semua item setelah "Events" (index > eventsIndex) akan disabled
          const isDisabled = index > eventsIndex;

          return (
            <button
              key={item.id}
              onClick={() => !isDisabled && onPageChange(item.id)}   // klik diabaikan kalau disabled
              disabled={isDisabled}                                 // native disabled
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
                activePage === item.id && !isDisabled
                  ? 'bg-blue-50 text-blue-600'
                  : isDisabled
                    ? 'text-gray-400 cursor-not-allowed hover:bg-transparent'
                    : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${isDisabled ? 'text-gray-300' : ''}`} />
              <span className={`text-sm font-medium ${isDisabled ? 'text-gray-300' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;