import { AlertCircle, BarChart3, ChevronDown, Globe, LogOut, Map, Menu, Navigation, Package, User, Users, X } from 'lucide-react';
import { useState } from 'react';
import ActivityChart from './ActivityChart';
import Devices from './Devices';
import Drivers from './Drivers';
import EmergencyAlert from './emergency';
import EngineTelemetry from './EngineTelemetry';
import Events from './Events';
import FuelManagement from './fuelManagement';
import Login from './login';
import Logs from './Logs';
import MapOverview from './MapOverview';
import AudioVideoMonitoring from './monitoring';
import NotificationCenter from './notifications';
import Signup from './register';
import RemindersPanel from './RemindersPanel';
import Reports from './Reports';
import Sensors from './Sensors';
import ServiceMaintenance from './serviceMaintenence';
import SettingsPage from './setting';
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
      case 'maintenance':
        return <ServiceMaintenance />;
      case 'fuel':
        return <FuelManagement />;
      case 'tracking':
        return <Reports />;
      case 'telemetry':
        return <EngineTelemetry />;
      case 'monitoring':
        return <AudioVideoMonitoring />;
      case 'emergency':
        return <EmergencyAlert />;
      case 'notifications':
        return <NotificationCenter />;
      case 'settings':
        return <SettingsPage />;
      case 'login':
        return <Login />;
      case 'register':
        return <Signup />;
      default:
        return <VehicleProfile />;
    }
  };

  function Header({ 
    onMobileMenuToggle,
    setActivePage,
    activePage          // TAMBAHKAN INI
  }: { 
    onMobileMenuToggle: () => void;
    setActivePage: (page: string) => void;
    activePage: string;                    // TAMBAHKAN TIPE
  }) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState<'id' | 'en'>('id');

    const user = { name: 'Ahmad Fauzi', email: 'ahmad@company.co' };
    const languages = [
      { code: 'id', name: 'Indonesia', flag: 'ID' },
      { code: 'en', name: 'English', flag: 'US' },
    ];

    const currentLanguage = languages.find(l => l.code === currentLang) || languages[0];

    // MAP ID → Nama halaman yang rapi (bisa diatur sesuai keinginan)
    const pageTitles: Record<string, string> = {
      map: 'Map Overview',
      assets: 'Assets Car',
      trips: 'Trips Car',
      events: 'My Events',
      drivers: 'Drivers Data',
      sensors: 'Sensors',
      devices: 'Devices',
      logs: 'Logs Driver',
      time: 'Time Driver',
      tools: 'Other Tools',
      reports: 'Report Car',
      maintenance: 'Maintenance',
      fuel: 'Fuel Car',
      tracking: 'Tracking',
      telemetry: 'Engine Car',
      monitoring: 'Audio/Video',
      emergency: 'Emergency',
      notifications: 'Notifications',
      settings: 'Settings',
      profile: 'Profile Saya',
      login: 'Login',
    };

    const currentTitle = pageTitles[activePage] || 'Dashboard';

    const getInitials = (name: string) => 
      name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

    return (
      <header className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 py-4 flex items-center justify-between">

          {/* Left: Hamburger + Judul Halaman */}
          <div className="flex items-center gap-4 flex-1">
            {/* Hamburger (mobile only) */}
            <button onClick={onMobileMenuToggle} className="lg:hidden">
              <Menu className="w-6 h-6 text-gray-700" />
            </button>

            {/* Judul Halaman Aktif */}
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
              {currentTitle}
            </h1>
          </div>

          {/* Right Side: Language + Profile */}
          <div className="flex items-center space-x-1">

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition text-sm font-medium text-gray-700"
              >
                <Globe className="w-5 h-5 text-gray-600" />
                <span className="hidden sm:inline">{currentLanguage.name}</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLanguageOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsLanguageOpen(false)} />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLang(lang.code as 'id' | 'en');
                          setIsLanguageOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition ${
                          currentLang === lang.code 
                            ? 'bg-blue-50 text-blue-700 font-medium' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <div className="w-6 h-4 rounded-sm overflow-hidden border border-gray-300">
                          <div className={`w-full h-full flex items-center justify-center text-xs font-bold ${
                            lang.flag === 'ID' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'
                          }`}>
                            {lang.flag}
                          </div>
                        </div>
                        <span>{lang.name}</span>
                        {currentLang === lang.code && (
                          <svg className="w-4 h-4 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                  {getInitials(user.name)}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProfileOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => { setIsProfileOpen(false); setActivePage('profile'); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                      >
                        <User className="w-4 h-4" /> Profile Saya
                      </button>
                    </div>
                    <div className="border-t border-gray-100 pt-1">
                      <button
                        onClick={() => { setIsProfileOpen(false); setActivePage('login'); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-medium flex items-center gap-3"
                      >
                        <LogOut className="w-4 h-4" /> Keluar
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }

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
        <Header 
          onMobileMenuToggle={() => setMobileMenuOpen(true)} 
          setActivePage={setActivePage}   // ← tambahkan ini
          activePage={activePage}
        />

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
              // const isDisabled = ['drivers'].includes(item.id); // contoh disabled

              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  // disabled={isDisabled}
                  className={`flex flex-col items-center py-2 px-1 ${
                    isActive
                      ? 'text-blue-600'
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