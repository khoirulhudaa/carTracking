import {
  AlertCircle,
  BarChart3,
  Map,
  Package,
  Users
} from 'lucide-react';

interface BottomNavProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

const navItems = [
  { id: 'map',      label: 'Map',      icon: Map },
  { id: 'assets',   label: 'Assets',   icon: Package },
  { id: 'trips',    label: 'Trips',    icon: BarChart3 },
  { id: 'events',   label: 'Events',   icon: AlertCircle },
  { id: 'drivers',  label: 'Drivers',  icon: Users },
  // Jika ingin semua item di bottom nav, uncomment baris di bawah ini
  // { id: 'sensors',  label: 'Sensors',  icon: Smartphone },
  // { id: 'devices',  label: 'Devices',  icon: Package },
  // { id: 'logs',     label: 'Logs',     icon: History },
  // { id: 'time',     label: 'Time',     icon: Clock },
  // { id: 'tools',    label: 'Tools',    icon: Settings },
  // { id: 'reports',  label: 'Reports',  icon: FileText },
];

function BottomNav({ activePage, onPageChange }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="grid grid-cols-5 gap-1 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`flex flex-col items-center justify-center py-2.5 rounded-lg transition-colors ${
                isActive
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default BottomNav;