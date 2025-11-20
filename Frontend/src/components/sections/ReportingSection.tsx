// components/ReportingSection.tsx
import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ReportForm from "@/components/ReportForm";
import { ReportsList } from "@/components/ReportsList";

export const ReportingSection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <section id="report" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Environmental Reporting</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Report pollution, hazardous conditions, and environmental issues in your area
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-xl border border-border p-8 mb-8">
            <h3 className="text-2xl font-semibold mb-4">Report an Issue</h3>
            <p className="text-muted-foreground mb-6">
              Document environmental concerns with photos and location data.
            </p>
            <Button onClick={() => setIsDialogOpen(true)} size="lg" className="w-full sm:w-auto">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Create New Report
            </Button>
          </div>

          <ReportsList />
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Submit Environmental Report</DialogTitle>
              <DialogDescription>
                Fill out the form below to report an environmental issue. Location and photos help authorities respond.
              </DialogDescription>
            </DialogHeader>
            <ReportForm onSuccess={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
 export default ReportingSection;
