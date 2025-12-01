import { Phone, Copy } from 'lucide-react';

function DriverInfo() {
  const driverDetails = [
    { label: 'Phone', value: '380938800089' },
    { label: 'VID', value: '124 km' },
    { label: 'Mail', value: '380948800089' },
    { label: 'Number', value: '2hr 43min' },
    { label: 'Mass', value: '380948800089' },
    { label: 'MMMSS', value: '380954800695' },
  ];

  const vehicleInfo = [
    { label: 'Body Type', value: 'UTILITY CAR' },
    { label: 'Colour', value: 'White' },
    { label: 'OVW', value: '5 tons' },
    { label: 'Regions REG', value: 'MODEL X' },
    { label: 'Registration Exp', value: '2010/10/12' },
    { label: 'Registration State', value: 'QLD' },
    { label: 'Registration Status', value: 'REGISTERED' },
    { label: 'Year', value: '2010' },
  ];

  return (
    <div className="p-6">
      <div className="flex flex-col items-start justify-start space-y-3">
        <div className="border-b flex items-center gap-3 justify-between w-full pb-3">
          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23e5e7eb' width='100' height='100' rx='50'/%3E%3Cpath d='M50 45 Q40 35 30 45 Q20 55 30 65 Q40 75 50 65 Q60 75 70 65 Q80 55 70 45 Q60 35 50 45' fill='%239ca3af'/%3E%3C/svg%3E"
            alt="Driver"
            className="w-20 h-20 rounded-full"
          />
          <div className="m-0 left-0 w-max text-center">
            <span className="inline-block px-2 py-1 text-xs font-medium text-emerald-700 bg-emerald-100 rounded">
              ASSIGNED
            </span>
          </div>
        </div>

        <div className='w-full flex space-y-4'>
          <div className="w-[40%]">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-800">David Baker</h3>
              <Phone className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center space-x-1">
                <span className="font-medium">12 Users</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-orange-500">●</span>
                <span className="font-medium">5 Skills</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>Bond M.</span>
              </div>
            </div>
            <div className="flex items-center space-x-3 mb-6">
              <span className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded">
                Cool Transport
              </span>
              <span className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded">
                Petrol
              </span>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-3">
              {driverDetails.map((item) => (
                <div key={item.label}>
                  <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                  <p className="text-sm font-medium text-gray-800">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-l pl-4 flex-1 pt-3">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-gray-800">Info</h4>
              <button className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200">
                Add
              </button>
            </div>
            <div className="space-y-3">
              {vehicleInfo.map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-800">{item.value}</span>
                    <Copy className="w-3 h-3 text-gray-400 cursor-pointer hover:text-gray-600" />
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

export default DriverInfo;
