import { Phone, Mail, MapPin, Calendar, Edit2, Copy, Check } from 'lucide-react';
import { useState } from 'react';

function AccountProfile() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const personalInfo = [
    { label: 'Full Name', value: 'David Baker', icon: <Edit2 className="w-4 h-4" /> },
    { label: 'Phone', value: '+62 809 388 00089', icon: <Phone className="w-4 h-4" /> },
    { label: 'Email', value: 'david.baker@example.com', icon: <Mail className="w-4 h-4" /> },
    { label: 'Location', value: 'Queensland, Australia', icon: <MapPin className="w-4 h-4" /> },
    { label: 'Joined Date', value: '12 October 2018', icon: <Calendar className="w-4 h-4" /> },
  ];

  const accountDetails = [
    { label: 'User ID', value: 'USR-2025-1247' },
    { label: 'Role', value: 'Driver / Operator' },
    { label: 'Company', value: 'Cool Transport Pty Ltd' },
    { label: 'License Number', value: 'QLD-88900234' },
    { label: 'License Expiry', value: '15 March 2028' },
    { label: 'Status', value: 'Active' },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header dengan foto dan status */}
        <div className="p-8 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23e5e7eb' width='100' height='100' rx='50'/%3E%3Cpath d='M50 45 Q40 35 30 45 Q20 55 30 65 Q40 75 50 65 Q60 75 70 65 Q80 55 70 45 Q60 35 50 45' fill='%239ca3af'/%3E%3C/svg%3E"
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-md"
            />
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">David Baker</h1>
                <span className="inline-block px-3 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full">
                  ACTIVE
                </span>
              </div>
              <p className="text-gray-600 mb-4">Senior Driver • Cool Transport</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded">
                  Petrol Specialist
                </span>
                <span className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded">
                  Heavy Vehicle Licensed
                </span>
                <span className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded">
                  5+ Years Experience
                </span>
              </div>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 flex items-center gap-2">
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
            <div className="space-y-4">
              {personalInfo.map((item) => (
                <div key={item.label} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="text-gray-400">{item.icon}</div>
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">{item.value}</span>
                    {item.label === 'Phone' || item.label === 'Email' ? (
                      <button
                        onClick={() => handleCopy(item.value, item.label)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {copiedField === item.label ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Account Details */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Account Details</h3>
              <button className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200">
                View History
              </button>
            </div>
            <div className="space-y-4">
              {accountDetails.map((item) => (
                <div key={item.label} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${item.label === 'Status' ? 'text-emerald-700' : 'text-gray-900'}`}>
                      {item.value}
                    </span>
                    {(item.label === 'User ID' || item.label === 'License Number') && (
                      <button
                        onClick={() => handleCopy(item.value, item.label)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {copiedField === item.label ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Optional: Stats atau Activity Summary */}
        <div className="px-8 pb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Summary</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">124</p>
              <p className="text-sm text-gray-600">Total Trips</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">98.2%</p>
              <p className="text-sm text-gray-600">On-Time Rate</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">4.9</p>
              <p className="text-sm text-gray-600">Rating</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">5</p>
              <p className="text-sm text-gray-600">Active Skills</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountProfile;