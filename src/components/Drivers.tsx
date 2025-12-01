import { Phone, Mail, MapPin, Star, AlertCircle, TrendingUp } from 'lucide-react';

function Drivers() {
  const drivers = [
    {
      id: 1,
      name: 'David Baker',
      email: 'david.baker@company.com',
      phone: '+1 (555) 123-4567',
      license: 'DL123456789',
      status: 'Active',
      rating: 4.8,
      trips: 342,
      violations: 2,
      lastTrip: '2024-01-15 17:30',
      experience: '8 years',
    },
    {
      id: 2,
      name: 'John Smith',
      email: 'john.smith@company.com',
      phone: '+1 (555) 234-5678',
      license: 'DL987654321',
      status: 'Active',
      rating: 4.6,
      trips: 289,
      violations: 1,
      lastTrip: '2024-01-15 16:00',
      experience: '5 years',
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      phone: '+1 (555) 345-6789',
      license: 'DL456789123',
      status: 'On Leave',
      rating: 4.9,
      trips: 256,
      violations: 0,
      lastTrip: '2024-01-10 14:30',
      experience: '6 years',
    },
    {
      id: 4,
      name: 'Michael Chen',
      email: 'michael.chen@company.com',
      phone: '+1 (555) 456-7890',
      license: 'DL789123456',
      status: 'Inactive',
      rating: 4.3,
      trips: 128,
      violations: 5,
      lastTrip: '2024-01-08 10:15',
      experience: '2 years',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-100 text-emerald-700';
      case 'On Leave':
        return 'bg-blue-100 text-blue-700';
      case 'Inactive':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Drivers</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Add Driver
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
        {drivers.map((driver) => (
          <div key={driver.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{driver.name}</h3>
                <p className="text-sm text-gray-500">License: {driver.license}</p>
              </div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(driver.status)}`}>
                {driver.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{driver.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{driver.phone}</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-4 pb-4 border-b border-gray-200">
              <div>
                <p className="text-xs text-gray-500 mb-1">Rating</p>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold text-gray-800">{driver.rating}</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Trips</p>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  <span className="font-semibold text-gray-800">{driver.trips}</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Violations</p>
                <div className="flex items-center space-x-1">
                  <AlertCircle className={`w-4 h-4 ${driver.violations > 0 ? 'text-red-500' : 'text-green-500'}`} />
                  <span className="font-semibold text-gray-800">{driver.violations}</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Experience</p>
                <span className="font-semibold text-gray-800">{driver.experience}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Last Trip</p>
                <p className="text-sm font-medium text-gray-800">{driver.lastTrip}</p>
              </div>
              <div className="flex justify-end space-x-2">
                <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                  View
                </button>
                <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Drivers;
