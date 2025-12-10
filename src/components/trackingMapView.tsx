// components/pages/TrackingMapView.tsx
import { useEffect, useState } from 'react';
import MapView from './mapViewTracking';
import Sidebar from './sidebarTracking';

export default function TrackingMapView() {
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

  useEffect(() => {
    const defaultVehicle = {
      driverName: 'XX.XXXXX',
      driverId: 'B 2837 RZ',
      status: 'Active',
      vehicleInfo: {
        truckName: 'B 2837 RZ',
        insurance: 'Aktif s/d Des 2025',
        mileageCode: 'MLG-12024',
      },
      routeDistance: undefined, // akan diisi oleh MapView setelah fetch rute
      destination: 'Bandara Soetta',
    };

    setSelectedVehicle(defaultVehicle);

  }, []);
  return (
    <div className="space-y-8 pb-20 lg:pb-6">
      <div className="relative w-full h-max">
        <MapView
          selectedVehicle={selectedVehicle}
          onSelectVehicle={setSelectedVehicle}
        />

        {selectedVehicle && (
          <Sidebar
            driverName={selectedVehicle.driverName}
            driverId={selectedVehicle.driverId}
            status={selectedVehicle.status}
            vehicleInfo={selectedVehicle.vehicleInfo}
            routeDistance={selectedVehicle.routeDistance}
            destination={selectedVehicle.destination}
            onClose={() => setSelectedVehicle(null)}
          />
        )}
      </div>
    </div>
  );
}