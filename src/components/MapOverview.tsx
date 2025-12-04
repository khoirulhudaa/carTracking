import { AlertCircle, MapPin, Navigation, Truck, Users } from 'lucide-react';

function MapOverview() {
  const vehicles = [
    { id: 1, name: 'Tesla Model X', driver: 'David Baker', status: 'In Transit', lat: 40.7128, lng: -74.006, speed: 45 },
    { id: 2, name: 'Tesla Model Y', driver: 'John Smith', status: 'Idle', lat: 40.758, lng: -73.9855, speed: 0 },
    { id: 3, name: 'Tesla S', driver: 'Sarah Johnson', status: 'In Transit', lat: 40.6892, lng: -74.0445, speed: 32 },
  ];

  const alerts = [
    { id: 1, type: 'Speeding', vehicle: 'Tesla Model X', severity: 'high' },
    { id: 2, type: 'Low Fuel', vehicle: 'Tesla Model Y', severity: 'medium' },
  ];

  const stats = [
    { label: 'Total Vehicles', value: 12, icon: Truck, color: 'blue' },
    { label: 'Active Trips', value: 8, icon: Navigation, color: 'green' },
    { label: 'Alerts', value: 2, icon: AlertCircle, color: 'red' },
    { label: 'Drivers Online', value: 11, icon: Users, color: 'purple' },
  ];

  return (
    <div className="space-y-6 pb-20 lg:pb-6">

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colorClasses: any = {
            blue: 'bg-blue-100 text-blue-600',
            green: 'bg-emerald-100 text-emerald-600',
            red: 'bg-red-100 text-red-600',
            purple: 'bg-purple-100 text-purple-600',
          };
          return (
            <div key={stat.label} className="bg-white rounded-lg shadow-sm p-5">
              <div className={`w-12 h-12 rounded-lg ${colorClasses[stat.color]} flex items-center justify-center mb-3`}>
                <Icon className="w-6 h-6" />
              </div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Map + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Interactive Map</p>
                <p className="text-sm text-gray-500">Displaying live vehicle locations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-4">
          {/* Active Vehicles */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Active Vehicles</h3>
            <div className="space-y-3">
              {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{vehicle.name}</p>
                    <p className="text-xs text-gray-500">{vehicle.driver}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      vehicle.status === 'In Transit' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {vehicle.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{vehicle.speed} km/h</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Alerts */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Active Alerts</h3>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border-l-4 ${
                    alert.severity === 'high' ? 'bg-red-50 border-red-500' : 'bg-yellow-50 border-yellow-500'
                  }`}
                >
                  <p className="text-sm font-medium text-gray-800">{alert.type}</p>
                  <p className="text-xs text-gray-600">{alert.vehicle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fleet Summary */}
      <div className="bg-white rounded-lg shadow-sm p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Fleet Summary</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center">
          <div><p className="text-2xl font-bold text-emerald-600">8</p><p className="text-xs text-gray-500">In Transit</p></div>
          <div><p className="text-2xl font-bold text-blue-600">3</p><p className="text-xs text-gray-500">Idle</p></div>
          <div><p className="text-2xl font-bold text-gray-600">1</p><p className="text-xs text-gray-500">Offline</p></div>
          <div><p className="text-2xl font-bold text-orange-600">234</p><p className="text-xs text-gray-500">Total km</p></div>
          <div><p className="text-2xl font-bold text-purple-600">45.2</p><p className="text-xs text-gray-500">Avg Speed</p></div>
          <div><p className="text-2xl font-bold text-red-600">2</p><p className="text-xs text-gray-500">Alerts</p></div>
        </div>
      </div>
    </div>
  );
}

export default MapOverview;