import { useReportStore } from '@/stores/reportStore';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { MapPin, Calendar, AlertCircle } from 'lucide-react';

const severityColors = {
  low: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  high: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  critical: 'bg-destructive/10 text-destructive border-destructive/20',
};

const statusColors = {
  pending: 'bg-secondary',
  verified: 'bg-primary',
  resolved: 'bg-green-500',
};

export const ReportsList = () => {
  const reports = useReportStore((state) => state.reports);

  if (reports.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/50 rounded-lg">
        <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground">No reports yet. Be the first to report an environmental issue.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">Recent Reports</h3>
      <div className="grid gap-6">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-xl">{report.title}</CardTitle>
                <div className="flex gap-2">
                  <Badge className={severityColors[report.severity]} variant="outline">
                    {report.severity}
                  </Badge>
                  <Badge className={statusColors[report.status]}>
                    {report.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{report.description}</p>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{report.latitude.toFixed(4)}, {report.longitude.toFixed(4)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(report.timestamp), 'PPp')}</span>
                </div>
                <Badge variant="secondary">{report.category}</Badge>
              </div>

              {report.photos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {report.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Report photo ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};