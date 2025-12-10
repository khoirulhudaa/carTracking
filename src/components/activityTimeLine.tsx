import { Truck, AlertTriangle, MapPin, Navigation } from 'lucide-react';

interface Activity {
  id: number;
  time: string;
  status: string;
  description: string;
  location: string;
  icon: 'new' | 'driving' | 'warning' | 'stopped';
  badges?: string[];
}

const activities: Activity[] = [
  {
    id: 1,
    time: '12:11',
    status: 'New',
    description: '124 Maple Street, Spring, IL 62704, United States',
    location: '',
    icon: 'new',
    badges: ['87%', 'Great', '78%'],
  },
  {
    id: 2,
    time: '09:38',
    status: 'Driving',
    description: '',
    location: '124 Maple Street, Spring, IL 62704, United States',
    icon: 'driving',
  },
  {
    id: 3,
    time: '09:34',
    status: 'Harsh braking',
    description: '',
    location: '45 Abbey Road, London W8 6HR, United States',
    icon: 'warning',
  },
  {
    id: 4,
    time: '09:23',
    status: 'Stopped',
    description: '',
    location: '123 Cherry Lane, Mexico-Mu, United States',
    icon: 'stopped',
  },
  {
    id: 5,
    time: '06:49',
    status: 'Started Driving',
    description: '',
    location: '123 Maple Street, Spring, IL 62704, United States',
    icon: 'driving',
  },
  {
    id: 6,
    time: '06:43',
    status: 'Driving',
    description: '',
    location: '123 Maple Street, Spring, IL 62704, United States',
    icon: 'driving',
  },
];

export default function ActivityTimeline() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'new':
        return <MapPin className="w-4 h-4" />;
      case 'driving':
        return <Navigation className="w-4 h-4" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />;
      case 'stopped':
        return <MapPin className="w-4 h-4" />;
      default:
        return <Truck className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-4">
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={activity.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                activity.icon === 'warning'
                  ? 'bg-orange-100 text-orange-600'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {getIcon(activity.icon)}
              </div>
              {index < activities.length - 1 && (
                <div className="w-0.5 h-full bg-gray-200 mt-1"></div>
              )}
            </div>
            <div className="flex-1 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-gray-500">{activity.time}</span>
                <h4 className="text-sm font-medium text-gray-900">{activity.status}</h4>
              </div>
              {activity.badges && (
                <div className="flex gap-2 mb-2">
                  {activity.badges.map((badge, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-0.5 text-xs font-medium rounded ${
                        idx === 1
                          ? 'bg-green-500 text-white'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}
              {(activity.description || activity.location) && (
                <p className="text-xs text-gray-500">
                  {activity.description || activity.location}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
