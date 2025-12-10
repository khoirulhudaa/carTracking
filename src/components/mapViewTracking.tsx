// src/TrackingMapFull.tsx
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Globe, Map, Satellite, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Polyline, Popup, TileLayer, Tooltip } from 'react-leaflet';

// Fix default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Ikon mobil
const carIconBlue = L.icon({
  iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png', // biru klasik

  iconSize:     [30, 30],    // ukuran ikon
  iconAnchor:   [15, 46],    // titik tengah bawah ikon (supaya “nempel” di jalan)
  popupAnchor:  [0, -46],    // posisi popup di atas ikon
  shadowUrl:    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  shadowSize:   [41, 41],
});

const destinationIcon = L.icon({
  iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
  iconRetinaUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [30, 30],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface Vehicle {
  id: number;
  plate: string;
  driver: string;
  lat: number;
  lng: number;
  speed: number;
  status: string;
  destination: { lat: number; lng: number; name: string };
}

interface TrackingMapFullProps {
  selectedVehicle: any;
  onSelectVehicle: (vehicle: any) => void;
}

export default function TrackingMapFull({ onSelectVehicle }: TrackingMapFullProps) {
  const [routes, setRoutes] = useState<Record<number, any>>({});
  const [loading, setLoading] = useState(true);
  const [mapStyle, setMapStyle] = useState<string>('satellite-dark');

// Tambahkan interface untuk preset tile
interface MapStylePreset {
  name: string;
  layers: JSX.Element[];
}

  // Daftar preset tile layer
  const mapPresets: Record<string, MapStylePreset> = {
    'satellite-dark': {
      name: 'Satelit + Dark Overlay',
      layers: [
        <TileLayer
          key="esri-satellite"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri"
        />,
        <TileLayer
          key="carto-dark"
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          opacity={0.4}
        />,
      ],
    },
    'satellite-clean': {
      name: 'Satelit Jernih',
      layers: [
        <TileLayer
          key="stadia-outdoors"
          url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
          maxZoom={20}
        />,
        <TileLayer
          key="stadia-satellite-overlay"
          url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.jpg"
          opacity={0.3}
        />,
      ],
    },
    'streets': {
      name: 'Jalan Standar',
      layers: [
        <TileLayer
          key="osm"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        />,
      ],
    },
    'light': {
      name: 'Terang & Bersih',
      layers: [
        <TileLayer
          key="cartolight"
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />,
      ],
    },
  };

  // Tile yang sedang aktif
  const activeLayers = mapPresets[mapStyle]?.layers || mapPresets['satellite-dark'].layers;

  const fleet: Vehicle[] = [
    {
      id: 1,
      plate: 'B 2837 RZ',
      driver: 'XX.XXXXX',
      lat: -6.1751,
      lng: 106.8650,
      speed: 68,
      status: 'Moving',
      destination: { lat: -6.3024, lng: 106.8951, name: 'Bandara Soetta' },
    },
  ];

  const routeColors = ['#3b82f6'];

  const decodePolyline = (t: string): L.LatLngExpression[] => {
    let points: L.LatLngExpression[] = [],
      index = 0,
      len = t.length,
      lat = 0,
      lng = 0;
    while (index < len) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;
      shift = 0;
      result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;
      points.push([lat / 1e5, lng / 1e5]);
    }
    return points;
  };

  useEffect(() => {
    const fetchRoutes = async () => {
      const result: Record<number, any> = {};
      for (const v of fleet) {
        try {
          const res = await axios.get(
            `https://router.project-osrm.org/route/v1/driving/${v.lng},${v.lat};${v.destination.lng},${v.destination.lat}?overview=full&geometries=polyline`
          );
          if (res.data.routes?.[0]) {
            const points = decodePolyline(res.data.routes[0].geometry);
            const dist = (res.data.routes[0].distance / 1000).toFixed(1);
            result[v.id] = {
              points,
              distance: dist,
              color: routeColors[v.id - 1] || '#10b981',
              destName: v.destination.name,
            };
          }
        } catch (e) {
          console.error('Gagal ambil rute', v.plate);
        }
      }
      setRoutes(result);
      setLoading(false);
    };
    fetchRoutes();
  }, []);

  const handleVehicleClick = (v: Vehicle) => {
    onSelectVehicle({
      driverName: v.driver,
      driverId: v.plate,
      status: v.status === 'Moving' ? 'Active' : 'Idle',
      vehicleInfo: {
        truckName: v.plate,
        insurance: 'Aktif s/d Des 2025',
        mileageCode: `MLG-${v.id}2024`,
      },
      routeDistance: routes[v.id]?.distance,
      destination: v.destination.name,
    });
  };

  return (
    <div className="relative w-full h-[80vh] overflow-hidden bg-gray-100">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 ite shadow-lg p-6">
        <div className="mt-3 text-sm flex items-center gap-8">
          {/* <span>Kendaraan: <strong>{fleet.length}</strong></span> */}
          {/* <span>Rute Aktif: <strong>{Object.keys(routes).length}</strong></span> */}
          {loading && <span className="text-orange-600 font-bold">Memuat rute...</span>}
        </div>
      </div>

      {/* Map */}
      <MapContainer 
        zoomControl={false}
        center={[-6.2000, 106.8450]} zoom={11} style={{ height: '100vh', width: '100%' }}>
        {activeLayers}
        {/* Tombol Pemilih Gaya Peta - pojok kanan atas */}
        <div className="absolute z-[1222] top-3 right-3 w-max flex gap-6 bg-white rounded-xl shadow-2xl p-3 border">
          {/* <p className="text-xs font-semibold text-gray-700 px-2 mb-1">Gaya Peta</p> */}
          <button
            onClick={() => setMapStyle('satellite-dark')}
            className={`w-8 h-8 flex items-center justify-center p-1 rounded-lg transition-all ${
              mapStyle === 'satellite-dark'
                ? 'bg-blue-600 text-white shadow-lg scale-110'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            title="Satelit + Gelap"
          >
            <Satellite className="w-5 h-5" />
          </button>

          {/* Satelit Jernih */}
          <button
            onClick={() => setMapStyle('satellite-clean')}
            className={`w-8 h-8 flex items-center justify-center p-1 rounded-lg transition-all ${
              mapStyle === 'satellite-clean'
                ? 'bg-emerald-600 text-white shadow-lg scale-110'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            title="Satelit Jernih"
          >
            <Globe className="w-5 h-5" />
          </button>

          {/* Jalan Standar (OSM) */}
          <button
            onClick={() => setMapStyle('streets')}
            className={`w-8 h-8 flex items-center justify-center p-1 rounded-lg transition-all ${
              mapStyle === 'streets'
                ? 'bg-orange-600 text-white shadow-lg scale-110'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            title="Peta Jalan"
          >
            <Map className="w-5 h-5" />
          </button>

          {/* Terang & Bersih */}
          <button
            onClick={() => setMapStyle('light')}
            className={`w-8 h-8 flex items-center justify-center p-1 rounded-lg transition-all ${
              mapStyle === 'light'
                ? 'bg-purple-600 text-white shadow-lg scale-110'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            title="Peta Terang"
          >
            <Sun className="w-5 h-5" />
          </button>
        </div>
        {/* Routes */}
        {Object.entries(routes).map(([id, r]: [any, any]) => (
          <Polyline key={id} positions={r.points} color={r.color} weight={6} opacity={0.8}>
            <Tooltip permanent direction="center">
              <div className="bg-white/95 px-4 py-2 rounded-full shadow-lg font-bold text-xs">
                {r.distance} km → {r.destName}
              </div>
            </Tooltip>
          </Polyline>
        ))}

        {/* Vehicle Markers */}
        {fleet.map((v) => (
          <Marker
            key={v.id}
            position={[v.lat, v.lng]}
            icon={carIconBlue}
            eventHandlers={{ click: () => handleVehicleClick(v) }}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-bold text-lg">{v.plate}</h3>
                <p className="text-sm text-gray-600">{v.driver}</p>
                <p className="mt-2 text-xs">Tujuan: <strong>{v.destination.name}</strong></p>
                {routes[v.id] && (
                  <p className="text-xs font-bold text-blue-600 mt-1">{routes[v.id].distance} km tersisa</p>
                )}
                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                    v.status === 'Moving' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {v.status} • {v.speed} km/h
                </span>
              </div>
            </Popup>
            <Tooltip permanent direction="top" offset={[0, -40]}>
              <div className="bg-black/80 text-white px-3 py-1.5 rounded font-bold text-xs">
                {v.plate}
              </div>
            </Tooltip>
          </Marker>
        ))}

        {/* Destination Markers */}
        {fleet.map((v) => (
          <Marker
            key={`dest-${v.id}`}
            position={[v.destination.lat, v.destination.lng]}
            icon={destinationIcon}
          >
            <Popup>
              <div className="text-center font-bold text-red-600">
                Tujuan {v.plate}
                <br />
                {v.destination.name}
              </div>
            </Popup>
            <Tooltip permanent direction="bottom">
              <div className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold">
                {v.destination.name}
              </div>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>

      {/* Vehicle List (bottom-left) */}
      <div className="absolute left-4 bottom-8 bg-white rounded-2xl shadow-2xl p-6 w-96 max-h-96 overflow-y-auto border">
        {/* <h2 className="text-xl font-bold mb-4">Daftar Kendaraan</h2> */}
        {fleet.map((v, i) => (
          <div
            key={v.id}
            onClick={() => handleVehicleClick(v)}
            className="flex items-center justify-between p-4 mb-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">
                {i + 1}
              </div>
              <div>
                <p className="font-bold">{v.plate}</p>
                <p className="text-xs text-gray-600">{v.driver} → {v.destination.name}</p>
              </div>
            </div>
            <div className="text-right">
              <span
                className={`block px-3 py-1 rounded-full text-xs font-medium ${
                  v.status === 'Moving' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}
              >
                {v.speed} km/h
              </span>
              {routes[v.id] && (
                <p className="text-xs font-bold mt-1" style={{ color: routeColors[i] }}>
                  {routes[v.id].distance} km
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Refresh Button */}
      <button
        onClick={() => window.location.reload()}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-full shadow-2xl font-bold transition"
      >
        Refresh Rute
      </button>
    </div>
  );
}


// SATU LINE

// import axios from 'axios';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Polyline, Popup, Tooltip } from 'react-leaflet';

// // === SVG ICON UNTUK SEMUA MARKER ===
// const createTruckIcon = (color: string = '#3b82f6') => {
//   return L.divIcon({
//     html: `
//       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="40" height="40">
//         <path fill="${color}" d="M50 18H36V8a4 4 0 0 0-4-4H4a4 4 0 0 0-4 4v36a4 4 0 0 0 4 4h4a8 8 0 0 0 16 0h12a8 8 0 0 0 16 0h2a4 4 0 0 0 4-4V22a4 4 0 0 0-4-4zM12 54a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm28 0a4 4 0 1 1 4-4 4 4 0 0 1-4 4z"/>
//         <path fill="#fff" d="M44 30h-8v-8h8z"/>
//       </svg>
//     `,
//     className: '', // penting: kosongkan agar tidak ada background putih
//     iconSize: [40, 40],
//     iconAnchor: [20, 40],
//     popupAnchor: [0, -40],
//     tooltipAnchor: [0, -30],
//   });
// };

// // Icon khusus untuk kendaraan tujuan (misal warna merah/oranye)
// const destinationTruckIcon = createTruckIcon('#ef4444');

// // Icon default untuk kendaraan lain (biru)
// const defaultTruckIcon = createTruckIcon('#3b82f6');

// export default function TrackingMapFull() {
//   const [route, setRoute] = useState<L.LatLngExpression[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [distance, setDistance] = useState('0.00');

//   // DUMMY DATA
//   const dummyVehicles = [
//     { id: 1, plate: 'B 1234 ABC', driver: 'Ahmad Santoso', lat: -6.1751, lng: 106.8650, status: 'Moving', speed: 68 },
//     { id: 2, plate: 'B 5678 XYZ', driver: 'Siti Nurhaliza', lat: -6.2088, lng: 106.8456, status: 'Moving', speed: 52 },
//     { id: 3, plate: 'B 9012 DEF', driver: 'Budi Pratama', lat: -6.2293, lng: 106.8090, status: 'Idle', speed: 0 },
//     { id: 4, plate: 'B 3456 GHI', driver: 'Rina Wulandari', lat: -6.2887, lng: 106.7976, status: 'Moving', speed: 45 },
//   ];

//   const vehicleA = dummyVehicles[0]; // Start
//   const vehicleB = dummyVehicles[3]; // Tujuan

//   // Decode polyline (sama seperti sebelumnya)
//   const decodePolyline = (encoded: string): L.LatLngExpression[] => {
//     const points: L.LatLngExpression[] = [];
//     let index = 0, len = encoded.length;
//     let lat = 0, lng = 0;

//     while (index < len) {
//       let b, shift = 0, result = 0;
//       do {
//         b = encoded.charCodeAt(index++) - 63;
//         result |= (b & 0x1f) << shift;
//         shift += 5;
//       } while (b >= 0x20);
//       const dlat = (result & 1) ? ~(result >> 1) : (result >> 1);
//       lat += dlat;

//       shift = 0; result = 0;
//       do {
//         b = encoded.charCodeAt(index++) - 63;
//         result |= (b & 0x1f) << shift;
//         shift += 5;
//       } while (b >= 0x20);
//       const dlng = (result & 1) ? ~(result >> 1) : (result >> 1);
//       lng += dlng;

//       points.push([lat / 1e5, lng / 1e5]);
//     }
//     return points;
//   };

//   const fetchRoute = async () => {
//     if (!vehicleA || !vehicleB) return;

//     setIsLoading(true);
//     setRoute([]);

//     try {
//       const start = `${vehicleA.lng},${vehicleA.lat}`;
//       const end = `${vehicleB.lng},${vehicleB.lat}`;

//       const response = await axios.get(
//         `https://router.project-osrm.org/route/v1/driving/${start};${end}?overview=full&geometries=polyline`
//       );

//       if (response.data.routes?.[0]?.geometry) {
//         const decoded = decodePolyline(response.data.routes[0].geometry);
//         setRoute(decoded);
//         const distInMeters = response.data.routes[0].distance;
//         setDistance((distInMeters / 1000).toFixed(2));
//       }
//     } catch (error) {
//       console.error("Gagal ambil rute:", error);
//       alert("Gagal ambil rute dari OSRM");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRoute();
//   }, []);

//   return (
//     <div className="relative w-full h-screen bg-gray-100">
//       {/* Header */}
//       <div className="absolute top-0 left-0 right-0 z-10 bg-white shadow-md p-6">
//         <h1 className="text-3xl font-bold text-gray-800">Live Vehicle Tracking</h1>
//         <div className="mt-3 flex items-center gap-6 text-sm">
//           <div className="flex items-center gap-2">
//             <div className="w-4 h-4 bg-blue-600 rounded"></div>
//             <span>Rute: {vehicleA.plate} to {vehicleB.plate}</span>
//           </div>
//           <div className="font-bold text-blue-600">Jarak: {distance} km</div>
//           {isLoading && <span className="text-orange-600">Mencari rute terbaik...</span>}
//         </div>
//       </div>

//       {/* Map */}
//       <MapContainer center={[-6.2200, 106.8450]} zoom={12} className="w-full h-full" style={{ height: '100vh' }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; OpenStreetMap contributors'
//         />

//         {/* Rute jalan asli */}
//         {route.length > 0 && (
//           <Polyline
//             positions={route}
//             color="#3b82f6"
//             weight={7}
//             opacity={0.9}
//             // dashArray="15, 10"
//           >
//             <Tooltip permanent direction="center">
//               <div className="bg-white/90 backdrop-blur px-3 py-1 rounded shadow font-bold text-sm">
//                 {distance} km
//               </div>
//             </Tooltip>
//           </Polyline>
//         )}

//         {/* Semua kendaraan pakai SVG icon */}
//         {dummyVehicles.map((v) => (
//           <Marker
//             key={v.id}
//             position={[v.lat, v.lng]}
//             icon={v.id === vehicleB.id ? destinationTruckIcon : defaultTruckIcon}
//           >
//             <Popup>
//               <div className="text-center">
//                 <h3 className="font-bold text-lg">{v.plate}</h3>
//                 <p className="text-sm text-gray-600">{v.driver}</p>
//                 <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
//                   v.status === 'Moving' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
//                 }`}>
//                   {v.status} • {v.speed} km/h
//                 </span>
//               </div>
//             </Popup>

//             <Tooltip direction="top" permanent offset={[0, -35]}>
//               <div className="bg-black/80 text-white px-3 py-1 rounded text-xs font-bold backdrop-blur">
//                 {v.plate}
//               </div>
//             </Tooltip>
//           </Marker>
//         ))}
//       </MapContainer>

//       {/* Sidebar */}
//       <div className="absolute left-4 top-32 z-10 bg-white rounded-2xl shadow-2xl p-6 w-96 border">
//         <h2 className="text-xl font-bold mb-4">Kendaraan Aktif</h2>
//         <div className="space-y-3">
//           {dummyVehicles.map((v) => (
//             <div key={v.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:shadow transition">
//               <div>
//                 <p className="font-bold">{v.plate}</p>
//                 <p className="text-sm text-gray-600">{v.driver}</p>
//               </div>
//               <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                 v.status === 'Moving' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
//               }`}>
//                 {v.status} • {v.speed} km/h
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Refresh Button */}
//       <button
//         onClick={fetchRoute}
//         disabled={isLoading}
//         className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white px-8 py-3 rounded-full shadow-lg font-medium transition"
//       >
//         {isLoading ? 'Mencari Rute...' : 'Refresh Rute'}
//       </button>
//     </div>
//   );
// }





// import { Maximize2, Sun, Moon, Globe } from 'lucide-react';

// export default function MapView() {
//   return (
//     <div className="flex-1 relative bg-gray-50">
//       <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
//         <button className="bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-200 flex items-center gap-2 text-sm">
//           <Globe className="w-4 h-4" />
//           <span>English</span>
//         </button>
//         <button className="bg-white p-2 rounded-lg shadow-sm border border-gray-200">
//           <Sun className="w-4 h-4" />
//         </button>
//         <button className="bg-white p-2 rounded-lg shadow-sm border border-gray-200">
//           <Moon className="w-4 h-4" />
//         </button>
//       </div>

//       <div className="absolute bottom-6 right-4 flex flex-col gap-2 z-10">
//         <button className="bg-white p-2 rounded-lg shadow-sm border border-gray-200">
//           <Maximize2 className="w-4 h-4" />
//         </button>
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
//           <button className="p-2 border-b border-gray-200 hover:bg-gray-50">
//             <span className="text-lg font-medium">+</span>
//           </button>
//           <button className="p-2 hover:bg-gray-50">
//             <span className="text-lg font-medium">−</span>
//           </button>
//         </div>
//       </div>

//       <div className="w-full h-full relative">
//         <svg className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
//           <defs>
//             <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
//               <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
//             </pattern>
//           </defs>

//           <rect width="800" height="600" fill="#f9fafb"/>
//           <rect width="800" height="600" fill="url(#grid)"/>

//           <g className="roads">
//             <path d="M 200 100 L 350 100 L 400 150 L 450 200 L 500 300 L 520 380 L 530 450"
//                   stroke="#d1d5db" strokeWidth="8" fill="none" strokeLinecap="round"/>
//             <path d="M 530 450 L 600 480 L 650 500"
//                   stroke="#d1d5db" strokeWidth="8" fill="none" strokeLinecap="round"/>
//             <path d="M 300 200 L 350 250 L 380 300"
//                   stroke="#d1d5db" strokeWidth="6" fill="none" strokeLinecap="round"/>
//           </g>

//           <path d="M 250 120 L 380 120 L 420 160 L 470 220 L 515 310 L 530 370 L 538 440 L 590 465 L 630 480"
//                 stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinecap="round"
//                 strokeLinejoin="round" opacity="0.8"/>

//           <circle cx="250" cy="120" r="8" fill="#3b82f6" stroke="white" strokeWidth="3"/>

//           <g transform="translate(630, 480)">
//             <circle r="18" fill="#3b82f6" stroke="white" strokeWidth="3"/>
//             <circle r="12" fill="white"/>
//             <circle r="6" fill="#3b82f6"/>
//           </g>

//           <g transform="translate(530, 370)">
//             <rect x="-15" y="-8" width="30" height="16" fill="white" stroke="#d1d5db" strokeWidth="1" rx="2"/>
//             <rect x="-12" y="-6" width="10" height="12" fill="#3b82f6"/>
//             <rect x="2" y="-6" width="10" height="12" fill="#60a5fa"/>
//           </g>

//           <text x="100" y="80" fontSize="11" fill="#6b7280" fontWeight="500">E Erins Rd</text>
//           <text x="520" y="180" fontSize="11" fill="#6b7280" fontWeight="500">Seton Med</text>
//           <text x="680" y="520" fontSize="11" fill="#6b7280" fontWeight="500">Harper</text>
//           <text x="200" y="250" fontSize="11" fill="#6b7280" fontWeight="500">Lane Rd</text>
//           <text x="480" y="340" fontSize="11" fill="#6b7280" fontWeight="500">Addison St</text>
//           <text x="350" y="420" fontSize="11" fill="#6b7280" fontWeight="500">Fawell Blvd</text>
//           <text x="580" y="110" fontSize="11" fill="#6b7280" fontWeight="500">Stagecoach Rd</text>
//           <text x="720" y="180" fontSize="11" fill="#6b7280" fontWeight="500">Fawn Dr</text>
//         </svg>
//       </div>
//     </div>
//   );
// }
