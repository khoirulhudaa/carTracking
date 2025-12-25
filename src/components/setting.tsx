// components/pages/Settings.tsx
import {
  Bell,
  Clock,
  Database,
  Fuel,
  Globe,
  Key,
  Lock,
  Mail,
  MessageSquare,
  QrCode,
  Settings,
  Shield,
  Smartphone,
  Users,
} from 'lucide-react';
import { useTranslation } from './Dashboard';

export default function SettingsPage() {
  const { t } = useTranslation();

  const roles = ['Admin', 'Kepala Dinas', 'Pengawas', 'Mekanik', 'Driver'];

  return (
    <div className="min-h-screen bg-white rounded-xl py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">{t('Settings')}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Role & Permission Management */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-8 h-8 text-blue-600" />
              <h3 className="text-xl font-bold text-gray-800">{t('Role & Permission Management')}</h3>
            </div>

            <div className="space-y-4">
              {roles.map((role) => (
                <div
                  key={role}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-800">{role}</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition">
                    {t('Edit Hak Akses')} →
                  </button>
                </div>
              ))}
            </div>

            {/* MFA */}
            <div className="mt-7 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="font-medium text-gray-800">{t('Multi-Factor Authentication (MFA)')}</p>
                    <p className="text-sm text-gray-600">{t('Wajib untuk Admin & Kepala Dinas')}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Vehicle Threshold Settings */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border">
            <div className="flex items-center gap-3 mb-6">
              <Settings className="w-8 h-8 text-emerald-600" />
              <h3 className="text-xl font-bold text-gray-800">{t('Vehicle Threshold Settings')}</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Fuel className="w-4 h-4" />
                  {t('Fuel Low Alert')}
                </label>
                <input
                  type="range"
                  min="5"
                  max="50"
                  defaultValue="20"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2 accent-orange-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>5%</span>
                  <span className="font-medium text-orange-600">20%</span>
                  <span>50%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">{t('Max Speed Limit')}</label>
                  <div className="flex items-center mt-1">
                    <input type="number" defaultValue="100" className="w-full px-3 py-2 border rounded-lg text-right" />
                    <span className="ml-2 text-gray-600">km/h</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">{t('Service Interval')}</label>
                  <div className="flex items-center mt-1">
                    <input type="number" defaultValue="10000" className="w-full px-3 py-2 border rounded-lg text-right" />
                    <span className="ml-2 text-gray-600">km</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Channels */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-8 h-8 text-purple-600" />
              <h3 className="text-xl font-bold text-gray-800">{t('Notification Channels')}</h3>
            </div>

            <div className="space-y-5">
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-purple-600" />
                  <span className="font-medium">{t('Push Notification (App)')}</span>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 text-purple-600" />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">{t('Email')}</span>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600" />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-emerald-600" />
                  <span className="font-medium">{t('SMS (Critical Only)')}</span>
                </div>
                <input type="checkbox" className="w-5 h-5 text-emerald-600" />
              </label>
            </div>
          </div>

          {/* QR Code Management */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border">
            <div className="flex items-center gap-3 mb-6">
              <QrCode className="w-8 h-8 text-orange-600" />
              <h3 className="text-xl font-bold text-gray-800">{t('QR Code Management')}</h3>
            </div>

            <div className="space-y-4">
              <button className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-medium transition flex items-center justify-center gap-2">
                <QrCode className="w-5 h-5" />
                {t('Generate QR Baru (100 unit)')}
              </button>
              <button className="w-full py-3 border border-orange-600 text-orange-600 hover:bg-orange-50 rounded-xl font-medium transition">
                {t('Download Semua QR (PDF)')}
              </button>
            </div>
          </div>

          {/* Backup & Security Summary */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 border">
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-8 h-8 text-gray-700" />
              <h3 className="text-xl font-bold text-gray-800">{t('Backup & Security Summary')}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl">
                <Globe className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                <p className="text-3xl font-bold text-emerald-700">99.99%</p>
                <p className="text-sm text-gray-600">{t('Uptime Bulan Ini')}</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <Key className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                <p className="text-3xl font-bold text-blue-700">{t('Daily')}</p>
                <p className="text-sm text-gray-600">{t('Encrypted Backup')}</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                <Shield className="w-10 h-10 text-purple-600 mx-auto mb-3" />
                <p className="text-3xl font-bold text-purple-700">AES-256</p>
                <p className="text-sm text-gray-600">{t('Data Encryption')}</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                <Clock className="w-10 h-10 text-orange-600 mx-auto mb-3" />
                <p className="text-3xl font-bold text-orange-700">2 {t('Lokasi')}</p>
                <p className="text-sm text-gray-600">{t('Cloud + On-Premise')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}