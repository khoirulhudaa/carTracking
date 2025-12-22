// src/components/Sidebar.tsx
import {
  AlertCircle, BarChart3,
  Camera, Car,
  Clock,
  FileText,
  Fuel,
  History,
  Home, Map, Navigation,
  Package,
  Settings,
  Smartphone, Wrench
} from 'lucide-react';
import { useTranslation } from './Dashboard';

interface SidebarProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

function Sidebar({ activePage, onPageChange }: SidebarProps) {
  const { t } = useTranslation();

  const menuItems = [
    { icon: Home,        label: t('Map Overview'),   id: 'map' },
    { icon: Package,     label: t('Assets Car'),     id: 'assets' },
    { icon: BarChart3,   label: t('Trips Car'),      id: 'trips' },
    { icon: AlertCircle, label: t('My Events'),      id: 'events' },
    { icon: Wrench,      label: t('Maintenance'),    id: 'maintenance' },
    { icon: Fuel,        label: t('Fuel Car'),       id: 'fuel' },
    { icon: Map,         label: t('Tracking'),       id: 'tracking' },
    { icon: Car,         label: t('Engine Car'),     id: 'telemetry' },
    { icon: Smartphone, label: 'Sensors', id: 'sensors' },
    { icon: Camera,      label: 'Audio/Video',id: 'monitoring' },
    { icon: Package, label: 'Devices', id: 'devices' },
    { icon: History, label: 'Logs Driver', id: 'logs' },
    { icon: Settings, label: 'Other Tools', id: 'tools' },
    { icon: Clock, label: 'Time Driver', id: 'time' },
    { icon: FileText, label: 'Report Car', id: 'reports' }, 
    // { icon: Siren,       label: 'Emergency',       id: 'emergency' },
    // { icon: BellRing,    label: 'Notifications',         id: 'notifications' },
    // { icon: Settings,    label: 'Settings',              id: 'settings' },
  ];

  const lastEnabledIndex = menuItems.findIndex(i => i.id === 'reports');

  return (
    <aside className="w-full md:w-64 h-screen bg-white border-r border-gray-200 overflow-y-auto">
      <div className="md:p-6 sticky top-0 bg-white z-10 md:border-b">
        <div className="hidden md:flex items-center space-x-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
            <Navigation className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-800">Tracker</span>
        </div>
      </div>

      <nav className="p-4 space-y-1">
        {menuItems.map((item, idx) => {
          const disabled = idx > lastEnabledIndex;
          const active = activePage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => !disabled && onPageChange(item.id)}
              disabled={disabled}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all text-left font-medium group ${
                active && !disabled ? 'bg-blue-50 text-blue-700 shadow-sm' :
                disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <item.icon className={`w-5 h-5 ${disabled ? 'text-gray-300' : active ? 'text-blue-700' : 'text-gray-500 group-hover:text-gray-700'}`} />
              <span className={disabled ? 'text-gray-300' : ''}>
                {item.label}
                {disabled && <span className="ml-2 text-xs font-normal text-gray-400">({t('Soon')})</span>}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;