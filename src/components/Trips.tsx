import { MapPin, Clock, Fuel, AlertCircle } from 'lucide-react';

function Trips() {
  const trips = [
    {
      id: 1,
      start: 'Warehouse A',
      end: 'Distribution Center B',
      date: '2024-01-15',
      time: '09:30',
      distance: '45.2 km',
      duration: '2h 15m',
      fuel: '8.5L',
      driver: 'David Baker',
      status: 'Completed',
    },
    {
      id: 2,
      start: 'Distribution Center B',
      end: 'Customer Point C',
      date: '2024-01-15',
      time: '14:00',
      distance: '32.8 km',
      duration: '1h 45m',
      fuel: '6.2L',
      driver: 'John Smith',
      status: 'Ongoing',
    },
    {
      id: 3,
      start: 'Customer Point C',
      end: 'Warehouse A',
      date: '2024-01-15',
      time: '17:30',
      distance: '38.5 km',
      duration: '2h 10m',
      fuel: '7.8L',
      driver: 'David Baker',
      status: 'Scheduled',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-100 text-emerald-700';
      case 'Ongoing':
        return 'bg-blue-100 text-blue-700';
      case 'Scheduled':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Trips</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          New Trip
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Route</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Distance</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Fuel</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Driver</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {trips.map((trip) => (
                <tr key={trip.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-800">{trip.start}</p>
                        <p className="text-gray-500 text-xs">→ {trip.end}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-700">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <div>
                        <p>{trip.date}</p>
                        <p className="text-gray-500 text-xs">{trip.time}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{trip.distance}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{trip.duration}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1 text-sm text-gray-700">
                      <Fuel className="w-4 h-4 text-orange-500" />
                      <span>{trip.fuel}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{trip.driver}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(trip.status)}`}>
                      {trip.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Trips;
