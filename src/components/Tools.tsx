import { Wrench, Settings, BarChart3, AlertCircle, Download, Plus } from 'lucide-react';

function Tools() {
  const tools = [
    {
      id: 1,
      name: 'Maintenance Scheduler',
      description: 'Schedule and track vehicle maintenance tasks',
      category: 'Maintenance',
      status: 'Active',
      lastUsed: '2024-01-15 14:30',
      icon: Wrench,
    },
    {
      id: 2,
      name: 'Route Planner',
      description: 'Optimize routes and calculate fuel consumption',
      category: 'Planning',
      status: 'Active',
      lastUsed: '2024-01-15 13:15',
      icon: BarChart3,
    },
    {
      id: 3,
      name: 'Document Manager',
      description: 'Manage vehicle documents and licenses',
      category: 'Documentation',
      status: 'Active',
      lastUsed: '2024-01-14 10:45',
      icon: Download,
    },
    {
      id: 4,
      name: 'Fuel Analysis',
      description: 'Analyze fuel consumption and costs',
      category: 'Analytics',
      status: 'Active',
      lastUsed: '2024-01-15 11:20',
      icon: BarChart3,
    },
  ];

  const settings = [
    {
      id: 1,
      name: 'Alert Preferences',
      description: 'Configure which alerts to receive',
      icon: AlertCircle,
    },
    {
      id: 2,
      name: 'GPS Settings',
      description: 'Adjust GPS tracking frequency',
      icon: Settings,
    },
    {
      id: 3,
      name: 'Speed Limits',
      description: 'Set speed limit thresholds by zone',
      icon: Settings,
    },
    {
      id: 4,
      name: 'Report Templates',
      description: 'Customize report templates',
      icon: BarChart3,
    },
  ];

  const utilities = [
    {
      id: 1,
      name: 'Backup Database',
      description: 'Create and manage database backups',
      action: 'Backup Now',
    },
    {
      id: 2,
      name: 'Export Data',
      description: 'Export data in CSV or Excel format',
      action: 'Export',
    },
    {
      id: 3,
      name: 'Import Data',
      description: 'Import driver or vehicle data',
      action: 'Import',
    },
    {
      id: 4,
      name: 'System Health',
      description: 'Check system status and performance',
      action: 'Check Status',
    },
  ];

  return (
     <div className="min-h-screen bg-white rounded-xl py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-7">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Tools & Utilities</h1>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Fleet Management Tools</h2>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Plus className="w-4 h-4" />
                <span>Add Tool</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <div key={tool.id} className="border border-black/10 bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
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
                        Open
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {settings.map((setting) => {
                const Icon = setting.icon;
                return (
                  <div key={setting.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-gray-800">{setting.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{setting.description}</p>
                        </div>
                      </div>
                      <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                        Configure
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Utilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {utilities.map((utility) => (
                <div key={utility.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
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
