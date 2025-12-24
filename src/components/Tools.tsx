import { Wrench, Settings, BarChart3, AlertCircle, Download, Plus } from 'lucide-react';
import { useTranslation } from '../components/Dashboard'; // Sesuaikan path jika perlu

function Tools() {
  const { t } = useTranslation();

  const tools = [
    {
      id: 1,
      name: t('Maintenance Scheduler') || 'Maintenance Scheduler',
      description: t('Schedule and track vehicle maintenance tasks') || 'Schedule and track vehicle maintenance tasks',
      category: t('Maintenance'),
      status: t('Active'),
      lastUsed: '2024-01-15 14:30',
      icon: Wrench,
    },
    {
      id: 2,
      name: t('Route Planner') || 'Route Planner',
      description: t('Optimize routes and calculate fuel consumption') || 'Optimize routes and calculate fuel consumption',
      category: t('Planning'),
      status: t('Active'),
      lastUsed: '2024-01-15 13:15',
      icon: BarChart3,
    },
    {
      id: 3,
      name: t('Document Manager') || 'Document Manager',
      description: t('Manage vehicle documents and licenses') || 'Manage vehicle documents and licenses',
      category: t('Documentation'),
      status: t('Active'),
      lastUsed: '2024-01-14 10:45',
      icon: Download,
    },
    {
      id: 4,
      name: t('Fuel Analysis') || 'Fuel Analysis',
      description: t('Analyze fuel consumption and costs') || 'Analyze fuel consumption and costs',
      category: t('Analytics'),
      status: t('Active'),
      lastUsed: '2024-01-15 11:20',
      icon: BarChart3,
    },
  ];

  const settings = [
    {
      id: 1,
      name: t('Alert Preferences') || 'Alert Preferences',
      description: t('Configure which alerts to receive') || 'Configure which alerts to receive',
      icon: AlertCircle,
    },
    {
      id: 2,
      name: t('GPS Settings') || 'GPS Settings',
      description: t('Adjust GPS tracking frequency') || 'Adjust GPS tracking frequency',
      icon: Settings,
    },
    {
      id: 3,
      name: t('Speed Limits') || 'Speed Limits',
      description: t('Set speed limit thresholds by zone') || 'Set speed limit thresholds by zone',
      icon: Settings,
    },
    {
      id: 4,
      name: t('Report Templates') || 'Report Templates',
      description: t('Customize report templates') || 'Customize report templates',
      icon: BarChart3,
    },
  ];

  const utilities = [
    {
      id: 1,
      name: t('Backup Database') || 'Backup Database',
      description: t('Create and manage database backups') || 'Create and manage database backups',
      action: t('Backup Now') || 'Backup Now',
    },
    {
      id: 2,
      name: t('Export Data') || 'Export Data',
      description: t('Export data in CSV or Excel format') || 'Export data in CSV or Excel format',
      action: t('Export') || 'Export',
    },
    {
      id: 3,
      name: t('Import Data') || 'Import Data',
      description: t('Import driver or vehicle data') || 'Import driver or vehicle data',
      action: t('Import') || 'Import',
    },
    {
      id: 4,
      name: t('System Health') || 'System Health',
      description: t('Check system status and performance') || 'Check system status and performance',
      action: t('Check Status') || 'Check Status',
    },
  ];

  return (
    <div className="min-h-screen bg-white rounded-xl py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-7">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">{t('Other Tools') || 'Tools & Utilities'}</h1>
        </div>

        <div className="space-y-6">
          {/* Fleet Management Tools */}
          <div>
            <div className="md:flex items-center justify-between mb-4">
              <h2 className="md:flex hidden text-xl font-semibold text-gray-800">
                {t('Fleet Management Tools') || 'Fleet Management Tools'}
              </h2>
              <button className="w-full md:w-max flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Plus className="w-4 h-4" />
                <span>{t('Add Tool') || 'Add Tool'}</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={tool.id}
                    className="border border-black/10 bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{tool.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{tool.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-4">
                        <span className="inline-block px-2.5 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          {tool.category}
                        </span>
                        <span className="text-xs text-gray-500">{tool.lastUsed}</span>
                      </div>
                      <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                        {t('Open') || 'Open'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Settings */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {t('Settings') || 'Settings'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {settings.map((setting) => {
                const Icon = setting.icon;
                return (
                  <div
                    key={setting.id}
                    className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="md:flex items-start justify-between">
                      <div className="flex items-center md:items-start space-x-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-gray-800">{setting.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{setting.description}</p>
                        </div>
                      </div>
                      <button className="w-full md:w-max ml-auto md:ml-0 md:mt-0 mt-4 px-3 py-2 md:py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                        {t('Configure') || 'Configure'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Utilities */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {t('Utilities') || 'Utilities'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {utilities.map((utility) => (
                <div
                  key={utility.id}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-gray-800">{utility.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{utility.description}</p>
                    </div>
                    <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      {utility.action}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tools;