import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap, Marker } from 'react-leaflet';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Layers, AlertTriangle } from 'lucide-react';
import { useReportStore } from '@/stores/reportStore';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface AQILocation {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  aqi: number;
  category: string;
  color: string;
}

const getAQICategory = (aqi: number): string => {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
};

const getAQIColor = (aqi: number): string => {
  if (aqi <= 50) return '#10b981'; // Green
  if (aqi <= 100) return '#eab308'; // Yellow
  if (aqi <= 150) return '#f97316'; // Orange
  if (aqi <= 200) return '#ef4444'; // Red
  if (aqi <= 300) return '#a855f7'; // Purple
  return '#7c2d12'; // Maroon
};

// Sample AQI data for major cities worldwide
const sampleLocations: AQILocation[] = [
  { id: '1', name: 'Lagos', country: 'Nigeria', lat: 6.5244, lng: 3.3792, aqi: 87, category: '', color: '' },
  { id: '2', name: 'New York', country: 'USA', lat: 40.7128, lng: -74.0060, aqi: 45, category: '', color: '' },
  { id: '3', name: 'London', country: 'UK', lat: 51.5074, lng: -0.1278, aqi: 62, category: '', color: '' },
  { id: '4', name: 'Beijing', country: 'China', lat: 39.9042, lng: 116.4074, aqi: 156, category: '', color: '' },
  { id: '5', name: 'New Delhi', country: 'India', lat: 28.6139, lng: 77.2090, aqi: 201, category: '', color: '' },
  { id: '6', name: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503, aqi: 38, category: '', color: '' },
  { id: '7', name: 'São Paulo', country: 'Brazil', lat: -23.5505, lng: -46.6333, aqi: 72, category: '', color: '' },
  { id: '8', name: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357, aqi: 168, category: '', color: '' },
  { id: '9', name: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093, aqi: 28, category: '', color: '' },
  { id: '10', name: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522, aqi: 54, category: '', color: '' },
  { id: '11', name: 'Mumbai', country: 'India', lat: 19.0760, lng: 72.8777, aqi: 178, category: '', color: '' },
  { id: '12', name: 'Los Angeles', country: 'USA', lat: 34.0522, lng: -118.2437, aqi: 89, category: '', color: '' },
].map(loc => ({
  ...loc,
  category: getAQICategory(loc.aqi),
  color: getAQIColor(loc.aqi),
}));

const MapUpdater = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 3);
  }, [center, map]);
  return null;
};

const reportIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const ClimateMapSection = () => {
  const [locations] = useState<AQILocation[]>(sampleLocations);
  const [selectedLocation, setSelectedLocation] = useState<AQILocation | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([20, 0]);
  const reports = useReportStore((state) => state.reports);

  const handleLocationClick = (location: AQILocation) => {
    setSelectedLocation(location);
    setMapCenter([location.lat, location.lng]);
  };

  return (
    <section id="climate-map" className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Global Air Quality Map
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore real-time air quality data across major cities worldwide with interactive color-coded zones
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <Card className="lg:col-span-3 p-0 overflow-hidden h-[600px]">
            <MapContainer
              center={mapCenter}
              zoom={3}
              scrollWheelZoom={true}
              className="h-full w-full"
            >
              <MapUpdater center={mapCenter} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {locations.map((location) => (
                <CircleMarker
                  key={location.id}
                  center={[location.lat, location.lng]}
                  radius={15}
                  pathOptions={{
                    fillColor: location.color,
                    color: location.color,
                    weight: 2,
                    opacity: 0.8,
                    fillOpacity: 0.6,
                  }}
                  eventHandlers={{
                    click: () => handleLocationClick(location),
                  }}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-bold text-foreground">{location.name}, {location.country}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-2xl font-bold" style={{ color: location.color }}>
                          {location.aqi}
                        </span>
                        <div className="text-sm">
                          <p className="font-medium">{location.category}</p>
                          <p className="text-muted-foreground">AQI</p>
                        </div>
                      </div>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}

              {/* Environmental Reports Markers */}
              {reports.map((report) => (
                <Marker
                  key={report.id}
                  position={[report.latitude, report.longitude]}
                  icon={reportIcon}
                >
                  <Popup>
                    <div className="p-2 min-w-[200px]">
                      <div className="flex items-start gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                        <h3 className="font-bold text-foreground">{report.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                      <div className="flex gap-1 mb-2">
                        <Badge variant="outline" className="text-xs">{report.category}</Badge>
                        <Badge variant="outline" className="text-xs">{report.severity}</Badge>
                      </div>
                      {report.photos.length > 0 && (
                        <img 
                          src={report.photos[0]} 
                          alt="Report" 
                          className="w-full h-24 object-cover rounded mt-2"
                        />
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </Card>

          <div className="lg:col-span-1 space-y-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">AQI Legend</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#10b981' }}></div>
                  <span>0-50 Good</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#eab308' }}></div>
                  <span>51-100 Moderate</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#f97316' }}></div>
                  <span>101-150 Unhealthy for Sensitive</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#ef4444' }}></div>
                  <span>151-200 Unhealthy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#a855f7' }}></div>
                  <span>201-300 Very Unhealthy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#7c2d12' }}></div>
                  <span>300+ Hazardous</span>
                </div>
              </div>
            </Card>

            {selectedLocation && (
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Selected Location</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-lg font-bold text-foreground">{selectedLocation.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedLocation.country}</p>
                  </div>
                  <div 
                    className="p-3 rounded-lg"
                    style={{ 
                      backgroundColor: `${selectedLocation.color}15`,
                      borderLeft: `4px solid ${selectedLocation.color}`
                    }}
                  >
                    <p className="text-2xl font-bold" style={{ color: selectedLocation.color }}>
                      {selectedLocation.aqi}
                    </p>
                    <p className="text-sm text-muted-foreground">{selectedLocation.category}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => setMapCenter([selectedLocation.lat, selectedLocation.lng])}
                  >
                    Center on Map
                  </Button>
                </div>
              </Card>
            )}

            <Card className="p-4">
              <h3 className="font-semibold mb-3">Quick Locations</h3>
              <div className="space-y-2">
                {locations.slice(0, 5).map((location) => (
                  <Button
                    key={location.id}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-left"
                    onClick={() => handleLocationClick(location)}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: location.color }}
                      ></div>
                      <span className="flex-1 truncate">{location.name}</span>
                      <span className="font-bold text-xs">{location.aqi}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClimateMapSection;
