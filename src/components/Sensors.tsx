import { useState } from 'react';
import {
  Battery,
  CheckCircle,
  Gauge,
  Thermometer,
  MapPin,
  Car,
  AlertTriangle,
  Wifi,
  RefreshCw,
  Download,
  Filter,
  Plus,
  X,
} from 'lucide-react';
import { useTranslation } from '../components/Dashboard'; // Sesuaikan path jika perlu

interface Sensor {
  id: number;
  name: string;
  vehicle: string;
  type: string;
  status: 'Active' | 'Inactive';
  lastUpdate: string;
  battery: number;
  signal: 'Strong' | 'Weak';
  value?: string;
  accuracy?: string;
}

export default function Sensors() {
  const { t } = useTranslation();

  const [sensors, setSensors] = useState<Sensor[]>([
    {
      id: 1,
      name: 'GPS Tracker',
      vehicle: 'Tesla Model X',
      type: 'Location',
      status: 'Active',
      lastUpdate: '2024-01-15 15:45:23',
      battery: 92,
      signal: 'Strong',
      accuracy: '±5m',
    },
    {
      id: 2,
      name: 'Temperature Sensor',
      vehicle: 'Tesla Model X',
      type: 'Temperature',
      status: 'Active',
      lastUpdate: '2024-01-15 15:45:18',
      battery: 78,
      signal: 'Strong',
      value: '22.5°C',
    },
    {
      id: 3,
      name: 'Fuel Level Sensor',
      vehicle: 'Tesla Model X',
      type: 'Fuel',
      status: 'Active',
      lastUpdate: '2024-01-15 15:45:10',
      battery: 85,
      signal: 'Strong',
      value: '75%',
    },
    {
      id: 4,
      name: 'Door Sensor - Rear Left',
      vehicle: 'Tesla Model X',
      type: 'Door',
      status: 'Inactive',
      lastUpdate: '2024-01-15 12:30:45',
      battery: 15,
      signal: 'Weak',
      value: 'Closed',
    },
    {
      id: 5,
      name: 'OBD Scanner',
      vehicle: 'Tesla Model X',
      type: 'Diagnostics',
      status: 'Active',
      lastUpdate: '2024-01-15 15:45:00',
      battery: 100,
      signal: 'Strong',
      value: 'Normal',
    },
    {
      id: 6,
      name: 'Speed Sensor',
      vehicle: 'Tesla Model Y',
      type: 'Speed',
      status: 'Active',
      lastUpdate: '2024-01-15 15:43:50',
      battery: 88,
      signal: 'Strong',
      value: '0 km/h',
    },
  ]);

  const [filter, setFilter] = useState<'All' | 'Active' | 'Inactive'>('All');
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newSensor, setNewSensor] = useState({
    name: '',
    vehicle: 'Tesla Model X',
    type: 'Temperature',
    status: 'Active' as 'Active' | 'Inactive',
    battery: 100,
  });

  const filteredSensors = sensors.filter((s) =>
    filter === 'All' ? true : s.status === filter
  );

  const total = sensors.length;
  const active = sensors.filter((s) => s.status === 'Active').length;
  const lowBattery = sensors.filter((s) => s.battery <= 20).length;
  const weakSignal = sensors.filter((s) => s.signal === 'Weak').length;

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
      setSensors((prev) =>
        prev.map((s) => ({
          ...s,
          lastUpdate: now,
          battery: Math.max(0, s.battery + Math.floor(Math.random() * 11) - 5),
        }))
      );
      setLoading(false);
    }, 1000);
  };

  const handleExport = () => {
    const headers = [
      'ID',
      t('Name') || 'Name',
      t('Vehicle') || 'Vehicle',
      t('Type') || 'Type',
      t('Status') || 'Status',
      t('Value/Accuracy') || 'Value/Accuracy',
      t('Battery (%)') || 'Battery (%)',
      t('Signal') || 'Signal',
    ];

    const rows = filteredSensors.map((s) => [
      s.id,
      s.name,
      s.vehicle,
      s.type,
      s.status,
      s.value || s.accuracy || '-',
      s.battery,
      s.signal,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers, ...rows].map((e) => e.join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sensors_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddSensor = () => {
    if (!newSensor.name.trim()) return;

    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const sensorBaru: Sensor = {
      id: Math.max(...sensors.map((s) => s.id)) + 1,
      name: newSensor.name,
      vehicle: newSensor.vehicle,
      type: newSensor.type,
      status: newSensor.status,
      lastUpdate: now,
      battery: newSensor.battery,
      signal: 'Strong',
      value:
        newSensor.type === 'Temperature'
          ? '23°C'
          : newSensor.type === 'Fuel'
          ? '80%'
          : undefined,
      accuracy: newSensor.type === 'Location' ? '±3m' : undefined,
    };

    setSensors((prev) => [...prev, sensorBaru]);
    setShowAddModal(false);
    setNewSensor({ name: '', vehicle: 'Tesla Model X', type: 'Temperature', status: 'Active', battery: 100 });
  };

  const getSensorIcon = (type: string) => {
    switch (type) {
      case 'Temperature':
        return <Thermometer className="w-6 h-6" />;
      case 'Fuel':
      case 'Speed':
        return <Gauge className="w-6 h-6" />;
      case 'Location':
        return <MapPin className="w-6 h-6" />;
      default:
        return <CheckCircle className="w-6 h-6" />;
    }
  };

  const getBatteryColor = (percent: number) =>
    percent > 50 ? 'bg-emerald-500' : percent > 20 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <>
      <div className="min-h-screen bg-white rounded-xl py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{t('Sensors') || 'Sensors Dashboard'}</h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-60"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                {loading ? t('Refreshing...') || 'Refreshing...' : t('Refresh') || 'Refresh'}
              </button>

              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Download className="w-4 h-4" />
                {t('Export CSV') || 'Export CSV'}
              </button>

              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                <Plus className="w-5 h-5" />
                {t('Add Sensor') || 'Add Sensor'}
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('Total Sensors') || 'Total Sensors'}</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">{total}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Car className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('Active') || 'Active'}</p>
                  <p className="mt-2 text-3xl font-bold text-emerald-600">{active}</p>
                </div>
                <div className="p-3 bg-emerald-100 rounded-lg">
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('Low Battery') || 'Low Battery'}</p>
                  <p className="mt-2 text-3xl font-bold text-red-600">{lowBattery}</p>
                </div>
                <div className="p-3 bg-red-100 rounded-lg">
                  <Battery className="w-8 h-8 text-red-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('Weak Signal') || 'Weak Signal'}</p>
                  <p className="mt-2 text-3xl font-bold text-yellow-600">{weakSignal}</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Wifi className="w-8 h-8 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filter + Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">{t('Filter by status') || 'Filter by status'}:</span>
                <div className="flex gap-2">
                  {(['All', 'Active', 'Inactive'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        filter === f
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {t(f) || f}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600">
                {t('Showing') || 'Showing'} {filteredSensors.length} {t('of') || 'of'} {total} {t('sensors') || 'sensors'}
              </p>
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      {t('Sensor') || 'Sensor'}
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      {t('Vehicle') || 'Vehicle'}
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      {t('Type') || 'Type'}
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      {t('Status') || 'Status'}
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      {t('Value') || 'Value'}
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      {t('Battery') || 'Battery'}
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      {t('Signal') || 'Signal'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredSensors.map((sensor) => (
                    <tr key={sensor.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="text-blue-600">{getSensorIcon(sensor.type)}</div>
                          <div className="text-sm font-medium text-gray-900">{sensor.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{sensor.vehicle}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{t(sensor.type) || sensor.type}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                            sensor.status === 'Active'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {t(sensor.status) || sensor.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {sensor.value || sensor.accuracy || '-'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all ${getBatteryColor(sensor.battery)}`}
                              style={{ width: `${sensor.battery}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-gray-700">{sensor.battery}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-sm font-medium ${
                            sensor.signal === 'Strong' ? 'text-emerald-600' : 'text-yellow-600'
                          }`}
                        >
                          {t(sensor.signal) || sensor.signal}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden divide-y divide-gray-200">
              {filteredSensors.map((sensor) => (
                <div key={sensor.id} className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-blue-600">{getSensorIcon(sensor.type)}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{sensor.name}</h3>
                        <p className="text-sm text-gray-600">{sensor.vehicle}</p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        sensor.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {t(sensor.status) || sensor.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">{t('Type') || 'Type'}</p>
                      <p className="font-medium">{t(sensor.type) || sensor.type}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">{t('Value') || 'Value'}</p>
                      <p className="font-medium">{sensor.value || sensor.accuracy || '-'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">{t('Battery') || 'Battery'}</p>
                      <p className="font-medium">{sensor.battery}%</p>
                    </div>
                    <div>
                      <p className="text-gray-500">{t('Signal') || 'Signal'}</p>
                      <p className="font-medium">{t(sensor.signal) || sensor.signal}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Add Sensor */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">{t('Add New Sensor') || 'Add New Sensor'}</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('Sensor Name') || 'Sensor Name'}
                </label>
                <input
                  type="text"
                  value={newSensor.name}
                  onChange={(e) => setNewSensor({ ...newSensor, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={t('e.g. Pressure Sensor Front') || 'e.g. Pressure Sensor Front'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('Vehicle') || 'Vehicle'}
                </label>
                <select
                  value={newSensor.vehicle}
                  onChange={(e) => setNewSensor({ ...newSensor, vehicle: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Tesla Model X</option>
                  <option>Tesla Model Y</option>
                  <option>Tesla Model 3</option>
                  <option>Tesla Model S</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('Type') || 'Type'}
                </label>
                <select
                  value={newSensor.type}
                  onChange={(e) => setNewSensor({ ...newSensor, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Temperature</option>
                  <option>Fuel</option>
                  <option>Location</option>
                  <option>Speed</option>
                  <option>Door</option>
                  <option>Diagnostics</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('Initial Battery (%)') || 'Initial Battery (%)'}
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={newSensor.battery}
                  onChange={(e) => setNewSensor({ ...newSensor, battery: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('Status') || 'Status'}
                </label>
                <select
                  value={newSensor.status}
                  onChange={(e) => setNewSensor({ ...newSensor, status: e.target.value as 'Active' | 'Inactive' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex gap-3 justify-end">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                {t('Cancel') || 'Cancel'}
              </button>
              <button
                onClick={handleAddSensor}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                {t('Add Sensor') || 'Add Sensor'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}