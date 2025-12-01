import { LayoutDashboard, Package, Clock, Navigation, BarChart3, Settings, FileText, Map, Users, AlertCircle, Smartphone, History } from 'lucide-react';

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

  return (
    <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-6 sticky top-0 bg-white border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Navigation className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-800">Truckly</span>
        </div>
      </div>
      <nav className="px-3 space-y-1 p-3">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
              activePage === item.id
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
