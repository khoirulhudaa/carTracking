// // import { AlertCircle, BarChart3, Clock, FileText, History, Map, Navigation, Package, Settings, Smartphone, Users } from 'lucide-react';

// // interface SidebarProps {
// //   activePage: string;
// //   onPageChange: (page: string) => void;
// // }

// // function Sidebar({ activePage, onPageChange }: SidebarProps) {
// //   const menuItems = [
// //     { icon: Map, label: 'Map Overview', id: 'map' },
// //     { icon: Package, label: 'Assets', id: 'assets' },
// //     { icon: BarChart3, label: 'Trips', id: 'trips' },
// //     { icon: AlertCircle, label: 'Events', id: 'events' },
// //     { icon: Users, label: 'Drivers', id: 'drivers' },
// //     { icon: Smartphone, label: 'Sensors', id: 'sensors' },
// //     { icon: Package, label: 'Devices', id: 'devices' },
// //     { icon: History, label: 'Logs', id: 'logs' },
// //     { icon: Clock, label: 'Time Management', id: 'time' },
// //     { icon: Settings, label: 'Tools', id: 'tools' },
// //     { icon: FileText, label: 'Reports', id: 'reports' },
// //   ];

// //   // indeks item "Events"
// //   const eventsIndex = menuItems.findIndex(item => item.id === 'events');

// //   return (
// //     <aside className="w-full md:w-64 h-screen bg-white border-r border-gray-200 overflow-y-auto">
// //       <div className="p-6 top-0 bg-white border-0 md:border-b border-gray-200">
// //         <div className="hidden md:flex items-center space-x-2">
// //           <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
// //             <Navigation className="w-5 h-5 text-white" />
// //           </div>
// //           <span className="text-xl font-bold text-gray-800">Truckly</span>
// //         </div>
// //       </div>

// //       <nav className="px-3 space-y-1 md:mt-0 -mt-8 p-0 md:p-3">
// //         {menuItems.map((item, index) => {
// //           // semua item setelah "Events" (index > eventsIndex) akan disabled
// //           const isDisabled = index > eventsIndex;

// //           return (
// //             <button
// //               key={item.id}
// //               onClick={() => !isDisabled && onPageChange(item.id)}   // klik diabaikan kalau disabled
// //               disabled={isDisabled}                                 // native disabled
// //               className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
// //                 activePage === item.id && !isDisabled
// //                   ? 'bg-blue-50 text-blue-600'
// //                   : isDisabled
// //                     ? 'text-gray-400 cursor-not-allowed hover:bg-transparent'
// //                     : 'text-gray-600 hover:bg-gray-50'
// //               }`}
// //             >
// //               <item.icon className={`w-5 h-5 flex-shrink-0 ${isDisabled ? 'text-gray-300' : ''}`} />
// //               <span className={`text-sm font-medium ${isDisabled ? 'text-gray-300' : ''}`}>
// //                 {item.label}
// //               </span>
// //             </button>
// //           );
// //         })}
// //       </nav>
// //     </aside>
// //   );
// // }

// // export default Sidebar;

// import {
//   AlertCircle,
//   BarChart3,
//   BellRing,
//   Camera,
//   Car,
//   Clock,
//   FileText,
//   Fuel,
//   History,
//   Home,
//   Map,
//   Navigation,
//   Package,
//   Settings,
//   Siren,
//   Smartphone,
//   Users,
//   Wrench
// } from 'lucide-react';

// interface SidebarProps {
//   activePage: string;
//   onPageChange: (page: string) => void;
// }

// function Sidebar({ activePage, onPageChange }: SidebarProps) {
//   const menuItems = [
//     { icon: Home,        label: 'Map Overview',      id: 'map' },
//     { icon: Package,     label: 'Assets Car',            id: 'assets' },
//     { icon: BarChart3,   label: 'Trips Car',             id: 'trips' },
//     { icon: AlertCircle, label: 'My Events',            id: 'events' },
    
//     // { icon: Users, label: 'Drivers Data', id: 'drivers' },
//     // { icon: Smartphone, label: 'Sensors', id: 'sensors' },
//     // { icon: Package, label: 'Devices', id: 'devices' },
//     // { icon: History, label: 'Logs Driver', id: 'logs' },
//     // { icon: Clock, label: 'Time Driver', id: 'time' },
//     // { icon: Settings, label: 'Other Tools', id: 'tools' },
//     // { icon: FileText, label: 'Report Car', id: 'reports' },

//     // === Menu Baru (semua disabled sementara karena fitur "coming soon") ===
//     { icon: Wrench,      label: 'Maintenance', id: 'maintenance' },
//     { icon: Fuel,        label: 'Fuel Car',       id: 'fuel' },
//     { icon: Map,         label: 'Tracking',   id: 'tracking' },
//     { icon: Car,         label: 'Engine Car',    id: 'telemetry' },
//     // { icon: Camera,      label: 'Audio/Video',id: 'monitoring' },
//     // { icon: Siren,       label: 'Emergency',       id: 'emergency' },
//     // { icon: BellRing,    label: 'Notifications',         id: 'notifications' },
//     // { icon: Settings,    label: 'Settings',              id: 'settings' },
//   ];

//   const eventsIndex = menuItems.findIndex(item => item.id === 'telemetry');

//   return (
//     <aside className="w-full md:w-64 h-screen bg-white border-r border-gray-200 overflow-y-auto">
//       <div className="md:p-6 sticky top-0 bg-white z-10 md:border-b border-gray-200">
//         <div className="hidden md:flex items-center space-x-3">
//           <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
//             <Navigation className="w-6 h-6 text-white" />
//           </div>
//           <span className="text-2xl font-bold text-gray-800">Truckly</span>
//         </div>
//       </div>

//       <nav className="p-4 space-y-1">
//         {menuItems.map((item, index) => {
//           const isDisabled = index > eventsIndex;
//           const isActive = activePage === item.id;

//           return (
//             <button
//               key={item.id}
//               onClick={() => !isDisabled && onPageChange(item.id)}
//               disabled={isDisabled}
//               className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all text-left font-medium ${
//                 isActive && !isDisabled
//                   ? 'bg-blue-50 text-blue-700 shadow-sm'
//                   : isDisabled
//                   ? 'text-gray-400 cursor-not-allowed hover:bg-transparent'
//                   : 'text-gray-700 hover:bg-gray-50'
//               }`}
//             >
//               <item.icon className={`w-5 h-5 flex-shrink-0 ${isDisabled ? 'text-gray-300' : ''}`} />
//               <span className={isDisabled ? 'text-gray-300' : ''}>
//                 {item.label}
//                 {/* {isDisabled && <span className="ml-2 text-xs text-gray-400">(Soon)</span>} */}
//               </span>
//             </button>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// }

// export default Sidebar;

// src/components/Sidebar.tsx
import {
  AlertCircle, BarChart3, Car, Fuel, Home, Map, Navigation,
  Package, Wrench
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
  ];

  const lastEnabledIndex = menuItems.findIndex(i => i.id === 'telemetry');

  return (
    <aside className="w-full md:w-64 h-screen bg-white border-r border-gray-200 overflow-y-auto">
      <div className="md:p-6 sticky top-0 bg-white z-10 md:border-b">
        <div className="hidden md:flex items-center space-x-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
            <Navigation className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-800">Truckly</span>
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