import { BarChart3, Calendar, Download, Filter, Plus, TrendingUp } from 'lucide-react';

function Reports() {
  const reports = [
    {
      id: 1,
      name: 'Fleet Summary Report',
      description: 'Overview of fleet performance and metrics',
      generated: '2024-01-15 10:30',
      period: 'January 1-15, 2024',
      format: 'PDF',
      status: 'Ready',
    },
    {
      id: 2,
      name: 'Driver Performance',
      description: 'Individual driver metrics and compliance',
      generated: '2024-01-15 09:15',
      period: 'January 2024',
      format: 'Excel',
      status: 'Ready',
    },
    {
      id: 3,
      name: 'Fuel Consumption Analysis',
      description: 'Detailed fuel usage and cost analysis',
      generated: '2024-01-14 16:45',
      period: 'January 2024',
      format: 'PDF',
      status: 'Ready',
    },
    {
      id: 4,
      name: 'Maintenance Schedule',
      description: 'Upcoming maintenance tasks and history',
      generated: '2024-01-14 14:20',
      period: 'Q1 2024',
      format: 'Excel',
      status: 'Ready',
    },
  ];

  const reportTemplates = [
    {
      id: 1,
      name: 'Daily Summary',
      description: 'Daily fleet overview',
      frequency: 'Daily',
      enabled: true,
    },
    {
      id: 2,
      name: 'Weekly Performance',
      description: 'Weekly driver and vehicle performance',
      frequency: 'Weekly',
      enabled: true,
    },
    {
      id: 3,
      name: 'Monthly Report',
      description: 'Comprehensive monthly analysis',
      frequency: 'Monthly',
      enabled: true,
    },
    {
      id: 4,
      name: 'Compliance Report',
      description: 'Regulatory compliance tracking',
      frequency: 'Monthly',
      enabled: false,
    },
  ];

  const metrics = [
    { label: 'Total Reports', value: 24, icon: BarChart3, color: 'blue' },
    { label: 'This Month', value: 12, icon: Calendar, color: 'green' },
    { label: 'Pending', value: 2, icon: TrendingUp, color: 'orange' },
    { label: 'Archived', value: 10, icon: Download, color: 'purple' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Reports</h1>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          <span>Generate Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const colorClasses = {
            blue: 'bg-blue-100 text-blue-600',
            green: 'bg-emerald-100 text-emerald-600',
            orange: 'bg-orange-100 text-orange-600',
            purple: 'bg-purple-100 text-purple-600',
          };
          return (
            <div key={metric.label} className="bg-white rounded-lg shadow-sm p-6">
              <div className={`w-12 h-12 rounded-lg ${colorClasses[metric.color as keyof typeof colorClasses]} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
              <p className="text-3xl font-bold text-gray-800">{metric.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Recent Reports</h2>
              <button className="p-2 hover:bg-gray-50 rounded-lg">
                <Filter className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div className="divide-y divide-gray-200">
              {reports.map((report) => (
                <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-800">{report.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                      <div className="flex items-center space-x-4 mt-3 text-xs text-gray-500">
                        <span>{report.period}</span>
                        <span>•</span>
                        <span>{report.generated}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 ml-4">
                      <span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {report.format}
                      </span>
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                        {report.status}
                      </span>
                      <button className="flex items-center space-x-1 px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm">
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Report Schedule</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {reportTemplates.map((template) => (
              <div key={template.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-800">{template.name}</h3>
                    <p className="text-xs text-gray-600 mt-1">{template.description}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      <span className="font-medium">{template.frequency}</span>
                    </p>
                  </div>
                  <button
                    className={`w-10 h-6 rounded-full transition-colors ${
                      template.enabled ? 'bg-emerald-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        template.enabled ? 'translate-x-4.5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">Pro Tip</h3>
        <p className="text-sm text-blue-700">
          Schedule automated reports to be generated and sent to your email daily, weekly, or monthly.
          This helps you stay informed about your fleet's performance without manual effort.
        </p>
      </div>
    </div>
  );
}

export default Reports;
