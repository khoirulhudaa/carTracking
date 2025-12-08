import { TrendingUp } from 'lucide-react';

function ActivityChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 h-max">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Activity</h3>
        <button className="text-sm text-gray-500 hover:text-gray-700">View All</button>
      </div>
      <div className="relative h-max">
        <div className="absolute top-0 left-0 flex items-center space-x-1 text-emerald-600">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-medium">89%</span>
        </div>
        <div className="absolute top-8 right-0">
          <span className="text-2xl font-bold text-gray-800">50 km</span>
        </div>
        <svg viewBox="0 0 300 100" className="w-full h-full mt-8">
          <path
            d="M 0 80 Q 30 60 60 70 Q 90 80 120 60 Q 150 40 180 50 Q 210 60 240 40 Q 270 20 300 30"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 0 80 Q 30 60 60 70 Q 90 80 120 60 Q 150 40 180 50 Q 210 60 240 40 Q 270 20 300 30 L 300 100 L 0 100 Z"
            fill="url(#gradient)"
            opacity="0.1"
          />
          <circle cx="300" cy="30" r="4" fill="#3b82f6" />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>07:00</span>
          <span>08:00</span>
          <span>09:00</span>
          <span>10:00</span>
          <span>11:00</span>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="relative">
          <div className="relative top-0 left-0 w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityChart;


// import { TrendingUp } from 'lucide-react';
// import { useTranslation } from './Dashboard';

// function ActivityChart() {
//   const { t } = useTranslation();

//   return (
//     <div className="bg-white rounded-xl shadow-sm p-6 h-max">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-lg font-semibold text-gray-800">{t('Activity')}</h3>
//         <button className="text-sm text-gray-500 hover:text-gray-700">{t('View All')}</button>
//       </div>
//       {/* SVG chart tetap sama */}
//       <div className="relative h-max">
//         <div className="absolute top-0 left-0 flex items-center space-x-1 text-emerald-600">
//           <TrendingUp className="w-4 h-4" />
//           <span className="text-sm font-medium">89%</span>
//         </div>
//         <div className="absolute top-8 right-0">
//           <span className="text-2xl font-bold text-gray-800">50 km</span>
//         </div>
//         <svg viewBox="0 0 300 100" className="w-full h-full mt-8">
//            <path
//              d="M 0 80 Q 30 60 60 70 Q 90 80 120 60 Q 150 40 180 50 Q 210 60 240 40 Q 270 20 300 30"
//              fill="none"
//              stroke="#3b82f6"
//              strokeWidth="2"
//              strokeLinecap="round"
//            />
//            <path
//              d="M 0 80 Q 30 60 60 70 Q 90 80 120 60 Q 150 40 180 50 Q 210 60 240 40 Q 270 20 300 30 L 300 100 L 0 100 Z"
//              fill="url(#gradient)"
//              opacity="0.1"
//            />
//            <circle cx="300" cy="30" r="4" fill="#3b82f6" />
//            <defs>
//              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
//                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
//                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
//              </linearGradient>
//            </defs>
//          </svg>
//          <div className="flex justify-between text-xs text-gray-400 mt-2">
//            <span>07:00</span>
//            <span>08:00</span>
//            <span>09:00</span>
//            <span>10:00</span>
//            <span>11:00</span>
//          </div>
//        </div>
//        <div className="mt-4 pt-4 border-t border-gray-200">
//          <div className="relative">
//            <div className="relative top-0 left-0 w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
//              <div className="absolute inset-0 flex items-center justify-center">
//                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
//              </div>
//            </div>
//          </div>
//       </div>
//     </div>
//   );
// }

// export default ActivityChart;