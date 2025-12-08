import { Calendar, FileText, MapPin, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import GaugeChart from './GaugeChart';
import Local3DViewer from './modelViewer';

const VehicleProfile = () => {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm h-full">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-semibold text-gray-800">Tesla Model X</h2>
              <X className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500 mt-1">WMSP1JD3S1645NDF</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-3 gap-6 mb-8">
          <GaugeChart label="Oil" value={35} color="red" />
          <GaugeChart label="Fuel" value={157} max={200} unit="km" color="blue" />
          <GaugeChart label="Battery" value={8} color="orange" />
        </div>
        <Local3DViewer 
          modelName="lexus.glb" 
          scale={isMobile ? 80 : 100} 
        />
        <div className="relative">
          <div className="relative md:absolute shadow-sm space-y-12 md:py-3 py-10 md:space-y-0 w-full md:w-max gap-20 mx-auto border rounded-lg px-7 bottom-4 left-0 right-0 md:flex justify-around text-center">
            <div className='w-full md:pb-0 pb-4 border-b md:border-0'>
              <MapPin className="w-4 h-4 text-gray-400 mx-auto mb-1" />
              <p className="text-2xl font-bold text-gray-800">25 psi</p>
              <p className="text-xs text-gray-500">FL</p>
            </div>
            <div className='w-full md:pb-0 pb-4 border-b md:border-0'>
              <MapPin className="w-4 h-4 text-gray-400 mx-auto mb-1" />
              <p className="text-2xl font-bold text-gray-800">26 psi</p>
              <p className="text-xs text-gray-500">FR</p>
            </div>
            <div className='w-full md:pb-0 pb-4 border-b md:border-0'>
              <Calendar className="w-4 h-4 text-gray-400 mx-auto mb-1" />
              <p className="text-2xl font-bold text-gray-800">25 psi</p>
              <p className="text-xs text-gray-500">RL</p>
            </div>
            <div className='w-full md:pb-0 pb-4 border-b md:border-0'>
              <FileText className="w-4 h-4 text-gray-400 mx-auto mb-1" />
              <p className="text-2xl font-bold text-gray-800">13 psi</p>
              <p className="text-xs text-gray-500">RR</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleProfile;



// import { Calendar, FileText, MapPin, X } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import GaugeChart from './GaugeChart';
// import Local3DViewer from './modelViewer';
// import { useTranslation } from './Dashboard';

// const VehicleProfile = () => {
//   const { t } = useTranslation();
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth <= 768);
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   return (
//     <div className="bg-white rounded-xl shadow-sm h-full">
//       <div className="p-6 border-b border-gray-200">
//         <div className="flex items-center justify-between">
//           <div>
//             <div className="flex items-center space-x-2">
//               <h2 className="text-lg font-semibold text-gray-800">Tesla Model X</h2>
//               <X className="w-5 h-5 text-gray-400" />
//             </div>
//             <p className="text-sm text-gray-500 mt-1">WMSP1JD3S1645NDF</p>
//           </div>
//         </div>
//       </div>

//       <div className="p-6">
//         <div className="grid grid-cols-3 gap-6 mb-8">
//           <GaugeChart label={t('Oil')} value={35} color="red" />
//           <GaugeChart label={t('Fuel')} value={157} max={200} unit="km" color="blue" />
//           <GaugeChart label={t('Battery')} value={8} color="orange" />
//         </div>

//         <Local3DViewer modelName="lexus.glb" scale={isMobile ? 80 : 100} />

//         <div className="relative">
//           <div className="relative md:absolute shadow-sm space-y-12 md:py-3 py-10 md:space-y-0 w-full md:w-max gap-20 mx-auto border rounded-lg px-7 bottom-4 left-0 right-0 md:flex justify-around text-center">
//             <div className='w-full md:pb-0 pb-4 border-b md:border-0'><MapPin className="w-4 h-4 text-gray-400 mx-auto mb-1" /><p className="text-2xl font-bold text-gray-800">25 psi</p><p className="text-xs text-gray-500">FL</p></div>
//             <div className='w-full md:pb-0 pb-4 border-b md:border-0'><MapPin className="w-4 h-4 text-gray-400 mx-auto mb-1" /><p className="text-2xl font-bold text-gray-800">26 psi</p><p className="text-xs text-gray-500">FR</p></div>
//             <div className='w-full md:pb-0 pb-4 border-b md:border-0'><Calendar className="w-4 h-4 text-gray-400 mx-auto mb-1" /><p className="text-2xl font-bold text-gray-800">25 psi</p><p className="text-xs text-gray-500">RL</p></div>
//             <div className='w-full md:pb-0 pb-4 border-b md:border-0'><FileText className="w-4 h-4 text-gray-400 mx-auto mb-1" /><p className="text-2xl font-bold text-gray-800">13 psi</p><p className="text-xs text-gray-500">RR</p></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default VehicleProfile;