// import { User } from 'lucide-react';

// function RemindersPanel() {
//   const reminders = [
//     { title: 'Service Reminders', distance: '185 000km', color: 'blue' },
//     { title: '155 000km', distance: '185 000km', color: 'blue' },
//     { title: '175 000km', distance: '185 000km', color: 'blue' },
//   ];

//   return (
//     <div className="bg-white rounded-xl shadow-sm p-6">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-lg font-semibold text-gray-800">Reminders (1)</h3>
//         <button className="text-sm text-gray-500 hover:text-gray-700">View All</button>
//       </div>
//       <div className="space-y-3">
//         {reminders.map((reminder, index) => (
//           <div key={index} className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0">
//             <div>
//               <p className="text-sm font-medium text-gray-800">{reminder.title}</p>
//               <p className="text-xs text-blue-600">{reminder.distance}</p>
//             </div>
//             <div className="text-right">
//               <p className="text-sm font-semibold text-gray-800">{reminder.distance}</p>
//             </div>
//           </div>
//         ))}
//         <button className="w-full py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
//           Add
//         </button>
//       </div>
//       <div className="mt-6 pt-6 border-t border-gray-200">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
//               <User className="w-5 h-5 text-gray-600" />
//             </div>
//             <span className="text-sm font-medium text-gray-800">David Baker</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RemindersPanel;



import { TrendingUp } from 'lucide-react';
import { useTranslation } from './Dashboard';

function ActivityChart() {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 h-max">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{t('Activity')}</h3>
        <button className="text-sm text-gray-500 hover:text-gray-700">{t('View All')}</button>
      </div>
      {/* SVG chart tetap sama */}
      <div className="relative h-max">
        <div className="absolute top-0 left-0 flex items-center space-x-1 text-emerald-600">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-medium">89%</span>
        </div>
        <div className="absolute top-8 right-0">
          <span className="text-2xl font-bold text-gray-800">50 km</span>
        </div>
        {/* ... SVG tetap sama */}
      </div>
    </div>
  );
}

export default ActivityChart;