export interface EnvironmentalReport {
  id: string;
  title: string;
  description: string;
  category: 'pollution' | 'hazardous' | 'waste' | 'deforestation' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  latitude: number;
  longitude: number;
  photos: string[]; // base64 encoded images
  timestamp: string;
  status: 'pending' | 'verified' | 'resolved';
}