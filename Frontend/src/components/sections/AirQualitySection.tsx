import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Wind, Droplets, ThermometerSun, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAirQuality } from "@/hooks/useAirQuality";
import { Skeleton } from "@/components/ui/skeleton";

const AirQualitySection = () => {
  const { data, loading, refetch } = useAirQuality();

  return (
    <section id="air-quality" className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Real-Time Air Quality Monitor
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get instant insights about the air you breathe and understand environmental conditions in your area
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Current Location
                </CardTitle>
                <Badge variant="secondary">Live</Badge>
              </div>
              <CardDescription>Location-based air quality data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ) : data ? (
                  <>
                    <div 
                      className="flex items-center justify-between p-4 rounded-lg"
                      style={{ backgroundColor: `${data.color}15`, borderLeft: `4px solid ${data.color}` }}
                    >
                      <div className="flex items-center gap-3">
                        <Wind className="h-6 w-6" style={{ color: data.color }} />
                        <div>
                          <p className="font-medium">AQI</p>
                          <p className="text-sm text-muted-foreground">{data.pollutant}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold" style={{ color: data.color }}>{data.aqi}</p>
                        <p className="text-sm text-muted-foreground">{data.category}</p>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium">{data.city}, {data.country}</p>
                      <p className="text-xs">Last updated: {new Date(data.timestamp).toLocaleTimeString()}</p>
                    </div>
                    <Button className="w-full" variant="outline" onClick={refetch} disabled={loading}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Update Location
                    </Button>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No data available</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Environmental Conditions</CardTitle>
              <CardDescription>Additional metrics for your area</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : data ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <ThermometerSun className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">Temperature</span>
                    </div>
                    <span className="text-sm font-bold">{data.temperature || '--'}°C</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Droplets className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">Humidity</span>
                    </div>
                    <span className="text-sm font-bold">{data.humidity || '--'}%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Wind className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">Wind Speed</span>
                    </div>
                    <span className="text-sm font-bold">{data.windSpeed || '--'} km/h</span>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AirQualitySection;
