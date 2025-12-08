import { Calendar, CheckCircle, Fuel, Gauge, MapPin, Timer, TrendingUp, Truck } from 'lucide-react';
import Chart from 'react-apexcharts';

interface Trip {
  id: number;
  start: string;
  end: string;
  date: string;
  time: string;
  distance: string;
  duration: string;
  fuel: string;
  driver: string;
  status: 'Completed' | 'Ongoing' | 'Scheduled';
}

export default function Trips() {
  const trips: Trip[] = [
    { id: 1, start: 'Warehouse A', end: 'Distribution Center B', date: '2024-01-15', time: '09:30', distance: '45.2 km', duration: '2h 15m', fuel: '8.5L', driver: 'David Baker', status: 'Completed' },
    { id: 2, start: 'Distribution Center B', end: 'Customer Point C', date: '2024-01-15', time: '14:00', distance: '32.8 km', duration: '1h 45m', fuel: '6.2L', driver: 'John Smith', status: 'Ongoing' },
    { id: 3, start: 'Customer Point C', end: 'Warehouse A', date: '2024-01-15', time: '17:30', distance: '38.5 km', duration: '2h 10m', fuel: '7.8L', driver: 'David Baker', status: 'Scheduled' },
    { id: 4, start: 'Warehouse A', end: 'Retail Store D', date: '2024-01-16', time: '08:00', distance: '28.4 km', duration: '1h 30m', fuel: '5.9L', driver: 'Sarah Chen', status: 'Completed' },
    { id: 5, start: 'Retail Store D', end: 'Warehouse A', date: '2024-01-16', time: '16:45', distance: '29.1 km', duration: '1h 35m', fuel: '6.0L', driver: 'Mike Johnson', status: 'Completed' },
  ];

  const stats = {
    total: trips.length,
    completed: trips.filter(t => t.status === 'Completed').length,
    ongoing: trips.filter(t => t.status === 'Ongoing').length,
    scheduled: trips.filter(t => t.status === 'Scheduled').length,
    totalDistance: trips.reduce((a, t) => a + parseFloat(t.distance), 0).toFixed(1),
    totalFuel: trips.reduce((a, t) => a + parseFloat(t.fuel), 0).toFixed(1),
  };

  const weeklyTripsOptions: ApexCharts.ApexOptions = {
    chart: { type: 'bar', toolbar: { show: false } },
    plotOptions: { bar: { borderRadius: 6, columnWidth: '45%' } },
    dataLabels: { enabled: false },
    xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
    colors: ['#3b82f6'],
    grid: { show: false },
    yaxis: { show: false },
  };

  const weeklyTripsSeries = [{ name: 'Trips', data: [8, 12, 10, 15, 18, 6, 3] }];

  const statusDonutOptions: ApexCharts.ApexOptions = {
    chart: { type: 'donut' },
    labels: ['Completed', 'Ongoing', 'Scheduled'],
    colors: ['#10b981', '#3b82f6', '#f59e0b'],
    legend: { show: false },
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              fontSize: '14px',
              color: '#6b7280',
            }
          }
        }
      }
    },
  };

  const statusDonutSeries = [stats.completed, stats.ongoing, stats.scheduled];

  const getStatusBadge = (status: string) => {
    const styles = {
      Completed: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
      Ongoing: 'bg-blue-100 text-blue-700 border border-blue-200',
      Scheduled: 'bg-amber-100 text-amber-700 border border-amber-200',
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-700';
  };

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="min-h-screen bg-white rounded-xl py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Trips Data</h1>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-normal rounded-lg shadow-sm transition flex items-center gap-2">
            <Truck className="w-5 h-5" />
            Create New Trip
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Trips</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +23% this week
                </p>
              </div>
              <div className="p-4 bg-blue-100 rounded-xl">
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.completed}</p>
                <p className="text-xs text-emerald-600 mt-2">98.2% success rate</p>
              </div>
              <div className="p-4 bg-emerald-100 rounded-xl">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Distance</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalDistance} km</p>
              </div>
              <div className="p-4 bg-purple-100 rounded-xl">
                <Gauge className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Trips This Week</h3>
            <Chart options={weeklyTripsOptions} series={weeklyTripsSeries} type="bar" height={280} />
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Trip Status Overview</h3>
            <Chart options={statusDonutOptions} series={statusDonutSeries} type="donut" height={280} />
            <div className="mt-4 space-y-3">
              {[
                { label: 'Completed', value: stats.completed, color: '#10b981' },
                { label: 'Ongoing', value: stats.ongoing, color: '#3b82f6' },
                { label: 'Scheduled', value: stats.scheduled, color: '#f59e0b' },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                    <span className="text-sm text-gray-700">{label}</span>
                  </div>
                  <span className="font-semibold text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Trips Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Trips</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Route</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Schedule</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Distance</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Fuel</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Driver</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {trips.map((trip) => (
                  <tr key={trip.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">{trip.start}</p>
                          <p className="text-sm text-gray-500">→ {trip.end}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {trip.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Timer className="w-4 h-4" />
                          {trip.time}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">{trip.distance}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Fuel className="w-4 h-4 text-orange-500" />
                        <span className="font-medium">{trip.fuel}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold shadow">
                          {getInitials(trip.driver)}
                        </div>
                        <span className="font-medium">{trip.driver}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusBadge(trip.status)}`}>
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
    </div>
  );
}



  // import { Calendar, CheckCircle, Fuel, Gauge, MapPin, Timer, TrendingUp, Truck } from 'lucide-react';
  // import Chart from 'react-apexcharts';
  // import { useTranslation } from './Dashboard';

  // interface Trip {
  //   id: number;
  //   start: string;
  //   end: string;
  //   date: string;
  //   time: string;
  //   distance: string;
  //   duration: string;
  //   fuel: string;
  //   driver: string;
  //   status: 'Completed' | 'Ongoing' | 'Scheduled';
  // }

  // export default function Trips() {
  //   const { t } = useTranslation();

  //   const trips: Trip[] = [
  //     { id: 1, start: 'Warehouse A', end: 'Distribution Center B', date: '2024-01-15', time: '09:30', distance: '45.2 km', duration: '2h 15m', fuel: '8.5L', driver: 'David Baker', status: 'Completed' },
  //     { id: 2, start: 'Distribution Center B', end: 'Customer Point C', date: '2024-01-15', time: '14:00', distance: '32.8 km', duration: '1h 45m', fuel: '6.2L', driver: 'John Smith', status: 'Ongoing' },
  //     { id: 3, start: 'Customer Point C', end: 'Warehouse A', date: '2024-01-15', time: '17:30', distance: '38.5 km', duration: '2h 10m', fuel: '7.8L', driver: 'David Baker', status: 'Scheduled' },
  //     { id: 4, start: 'Warehouse A', end: 'Retail Store D', date: '2024-01-16', time: '08:00', distance: '28.4 km', duration: '1h 30m', fuel: '5.9L', driver: 'Sarah Chen', status: 'Completed' },
  //     { id: 5, start: 'Retail Store D', end: 'Warehouse A', date: '2024-01-16', time: '16:45', distance: '29.1 km', duration: '1h 35m', fuel: '6.0L', driver: 'Mike Johnson', status: 'Completed' },
  //   ];

  //   const stats = {
  //     total: trips.length,
  //     completed: trips.filter(t => t.status === 'Completed').length,
  //     ongoing: trips.filter(t => t.status === 'Ongoing').length,
  //     scheduled: trips.filter(t => t.status === 'Scheduled').length,
  //     totalDistance: trips.reduce((a, t) => a + parseFloat(t.distance), 0).toFixed(1),
  //     totalFuel: trips.reduce((a, t) => a + parseFloat(t.fuel), 0).toFixed(1),
  //   };

  //   const weeklyTripsOptions: ApexCharts.ApexOptions = { /* tetap sama */ };
  //   const weeklyTripsSeries = [{ name: 'Trips', data: [8, 12, 10, 15, 18, 6, 3] }];

  //   const statusDonutOptions: ApexCharts.ApexOptions = {
  //     chart: { type: 'donut' },
  //     labels: [t('Completed'), t('Ongoing'), t('Scheduled')],
  //     colors: ['#10b981', '#3b82f6', '#f59e0b'],
  //     legend: { show: false },
  //     dataLabels: { enabled: false },
  //     plotOptions: { pie: { donut: { size: '70%' } } },
  //   };
  //   const statusDonutSeries = [stats.completed, stats.ongoing, stats.scheduled];

  //   const getStatusBadge = (status: string) => {
  //     const map: Record<string, string> = {
  //       Completed: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  //       Ongoing: 'bg-blue-100 text-blue-700 border border-blue-200',
  //       Scheduled: 'bg-amber-100 text-amber-700 border border-amber-200',
  //     };
  //     return map[status] || 'bg-gray-100 text-gray-700';
  //   };

  //   const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  //   return (
  //     <div className="min-h-screen bg-white rounded-xl py-8 px-4 sm:px-6 lg:px-8">
  //       <div className="max-w-7xl mx-auto space-y-8">
  //         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
  //           <div>
  //             <h1 className="text-3xl font-bold text-gray-900">{t('Trips Data')}</h1>
  //           </div>
  //           <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-normal rounded-lg shadow-sm transition flex items-center gap-2">
  //             <Truck className="w-5 h-5" />
  //             {t('Create New Trip')}
  //           </button>
  //         </div>

  //         {/* Stats Cards */}
  //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  //           <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
  //             <div className="flex items-center justify-between">
  //               <div>
  //                 <p className="text-sm text-gray-600">{t('Total Trips')}</p>
  //                 <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
  //                 <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
  //                   <TrendingUp className="w-3 h-3" /> +23% this week
  //                 </p>
  //               </div>
  //               <div className="p-4 bg-blue-100 rounded-xl"><Truck className="w-8 h-8 text-blue-600" /></div>
  //             </div>
  //           </div>

  //           <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
  //             <div className="flex items-center justify-between">
  //               <div>
  //                 <p className="text-sm text-gray-600">{t('Completed')}</p>
  //                 <p className="text-3xl font-bold text-gray-900 mt-2">{stats.completed}</p>
  //                 <p className="text-xs text-emerald-600 mt-2">98.2% success rate</p>
  //               </div>
  //               <div className="p-4 bg-emerald-100 rounded-xl"><CheckCircle className="w-8 h-8 text-emerald-600" /></div>
  //             </div>
  //           </div>

  //           <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
  //             <div className="flex items-center justify-between">
  //               <div>
  //                 <p className="text-sm text-gray-600">{t('Total Distance')}</p>
  //                 <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalDistance} km</p>
  //               </div>
  //               <div className="p-4 bg-purple-100 rounded-xl"><Gauge className="w-8 h-8 text-purple-600" /></div>
  //             </div>
  //           </div>
  //         </div>

  //         {/* Charts */}
  //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  //           <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
  //             <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('Trips This Week')}</h3>
  //             <Chart options={weeklyTripsOptions} series={weeklyTripsSeries} type="bar" height={280} />
  //           </div>

  //           <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
  //             <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('Trip Status Overview')}</h3>
  //             <Chart options={statusDonutOptions} series={statusDonutSeries} type="donut" height={280} />
  //             <div className="mt-4 space-y-3">
  //               {[t('Completed'), t('Ongoing'), t('Scheduled')].map((label, i) => (
  //                 <div key={label} className="flex items-center justify-between">
  //                   <div className="flex items-center gap-3">
  //                     <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ['#10b981', '#3b82f6', '#f59e0b'][i] }} />
  //                     <span className="text-sm text-gray-700">{label}</span>
  //                   </div>
  //                   <span className="font-semibold text-gray-900">{statusDonutSeries[i]}</span>
  //                 </div>
  //               ))}
  //             </div>
  //           </div>
  //         </div>

  //         {/* Table */}
  //         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
  //           <div className="px-6 py-5 border-b border-gray-200">
  //             <h2 className="text-lg font-semibold text-gray-900">{t('Recent Trips')}</h2>
  //           </div>
  //           <div className="overflow-x-auto">
  //             <table className="w-full">
  //               <thead className="bg-gray-50">
  //                 <tr>
  //                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('Route')}</th>
  //                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('Schedule')}</th>
  //                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('Distance')}</th>
  //                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('Fuel')}</th>
  //                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('Driver')}</th>
  //                   <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('Status')}</th>
  //                 </tr>
  //               </thead>
  //               <tbody className="divide-y divide-gray-100">
  //                 {trips.map((trip) => (
  //                   <tr key={trip.id} className="hover:bg-gray-50 transition">
  //                     <td className="px-6 py-4">
  //                       <div className="flex items-center gap-3">
  //                         <MapPin className="w-5 h-5 text-gray-400" />
  //                         <div>
  //                           <p className="font-medium text-gray-900">{trip.start}</p>
  //                           <p className="text-sm text-gray-500">→ {trip.end}</p>
  //                         </div>
  //                       </div>
  //                     </td>
  //                     <td className="px-6 py-4 text-sm text-gray-600">
  //                       <div className="flex items-center gap-4">
  //                         <div className="flex items-center gap-1"><Calendar className="w-4 h-4" />{trip.date}</div>
  //                         <div className="flex items-center gap-1"><Timer className="w-4 h-4" />{trip.time}</div>
  //                       </div>
  //                     </td>
  //                     <td className="px-6 py-4 font-medium">{trip.distance}</td>
  //                     <td className="px-6 py-4"><div className="flex items-center gap-2"><Fuel className="w-4 h-4 text-orange-500" /><span className="font-medium">{trip.fuel}</span></div></td>
  //                     <td className="px-6 py-4">
  //                       <div className="flex items-center gap-3">
  //                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold shadow">
  //                           {getInitials(trip.driver)}
  //                         </div>
  //                         <span className="font-medium">{trip.driver}</span>
  //                       </div>
  //                     </td>
  //                     <td className="px-6 py-4">
  //                       <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusBadge(trip.status)}`}>
  //                         {t(trip.status)}
  //                       </span>
  //                     </td>
  //                   </tr>
  //                 ))}
  //               </tbody>
  //             </table>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }