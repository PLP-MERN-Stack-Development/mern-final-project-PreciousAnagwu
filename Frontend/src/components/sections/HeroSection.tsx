import { Button } from "@/components/ui/button";
import { Cloud, Leaf, AlertTriangle } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-climate-light-blue to-climate-light-green py-20 md:py-32">
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center gap-4 mb-6">
            <Cloud className="h-12 w-12 text-primary" />
            <Leaf className="h-12 w-12 text-secondary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Take Climate Action Today
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Monitor real-time air quality, track your carbon footprint, and join a community
            working towards SDG 13: Climate Action.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
  size="lg"
  className="gap-2"
  onClick={() => {
    const section = document.getElementById("air-quality");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }}
>
  <AlertTriangle className="h-5 w-5" />
  Check Air Quality
</Button>

            <Button
  size="lg"
  variant="outline"
  onClick={() => {
    const section = document.getElementById("sdg13");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }}
>
  Learn About SDG 13
</Button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default HeroSection;
