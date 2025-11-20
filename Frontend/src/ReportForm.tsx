import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { MapPin, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useReportStore } from '@/stores/reportStore';

const reportSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100),
  description: z.string().min(10, 'Description must be at least 10 characters').max(1000),
  category: z.enum(['pollution', 'hazardous', 'waste', 'deforestation', 'other']),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
});

type ReportFormData = z.infer<typeof reportSchema>;

interface ReportFormProps {
  onSuccess?: () => void;
}

export const ReportForm = ({ onSuccess }: ReportFormProps) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const addReport = useReportStore((state) => state.addReport);

  const form = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      title: '',
      description: '',
      category: 'pollution',
      severity: 'medium',
    },
  });

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        toast.success('Location captured successfully');
        setIsGettingLocation(false);
      },
      (error) => {
        toast.error(`Failed to get location: ${error.message}`);
        setIsGettingLocation(false);
      }
    );
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large. Max size is 5MB`);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (data: ReportFormData) => {
    if (!location) {
      toast.error('Please capture your location before submitting');
      return;
    }

    if (photos.length === 0) {
      toast.error('Please upload at least one photo');
      return;
    }

    addReport({
      title: data.title,
      description: data.description,
      category: data.category,
      severity: data.severity,
      latitude: location.lat,
      longitude: location.lng,
      photos,
    });

    toast.success('Environmental report submitted successfully');
    form.reset();
    setPhotos([]);
    setLocation(null);
    onSuccess?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Report Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Air pollution near factory" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the environmental issue in detail..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pollution">Air/Water Pollution</SelectItem>
                    <SelectItem value="hazardous">Hazardous Conditions</SelectItem>
                    <SelectItem value="waste">Waste Dumping</SelectItem>
                    <SelectItem value="deforestation">Deforestation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="severity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Severity</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormLabel>Location</FormLabel>
          <Button
            type="button"
            variant="outline"
            className="w-full mt-2"
            onClick={getCurrentLocation}
            disabled={isGettingLocation}
          >
            <MapPin className="mr-2 h-4 w-4" />
            {location
              ? `Location: ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`
              : isGettingLocation
              ? 'Getting location...'
              : 'Capture Current Location'}
          </Button>
        </div>

        <div>
          <FormLabel>Photos</FormLabel>
          <div className="mt-2">
            <label htmlFor="photo-upload" className="cursor-pointer">
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Click to upload photos (max 5MB each)
                </p>
              </div>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
          </div>

          {photos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <img
                    src={photo}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <Button type="submit" className="w-full">
          Submit Report
        </Button>
      </form>
    </Form>
  );
};
