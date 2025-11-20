import Navigation from "@/components/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import SDGSection from "@/components/sections/SDGSection";
import AirQualitySection from "@/components/sections/AirQualitySection";
import ClimateMapSection from "@/components/sections/ClimateMapSection";
import ClimateShopSection from "@/components/sections/ClimateShopSection";
import ReportingSection  from "@/components/sections/ReportingSection";
import HelpFAQSection from "@/components/sections/HelpFAQSection";


const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <AirQualitySection />
        <ClimateMapSection />
        <ReportingSection />
        <ClimateShopSection />
        <SDGSection />
        <HelpFAQSection/>
       

      </main>
      <footer className="border-t border-border bg-muted/30 py-8 mt-16">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 Lovable Climate Action. Supporting SDG 13: Climate Action</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
