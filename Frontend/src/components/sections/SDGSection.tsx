import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Users, TrendingDown, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SDGSection = () => {
  const targets = [
    {
      id: "13.1",
      title: "Strengthen resilience",
      description: "Strengthen resilience and adaptive capacity to climate-related hazards"
    },
    {
      id: "13.2",
      title: "Integrate climate measures",
      description: "Integrate climate change measures into policies and planning"
    },
    {
      id: "13.3",
      title: "Improve education",
      description: "Improve education and awareness on climate change mitigation"
    }
  ];

  const impacts = [
    { icon: Users, value: "10K+", label: "Active Users" },
    { icon: TrendingDown, value: "5M kg", label: "CO₂ Reduced" },
    { icon: CheckCircle, value: "50K+", label: "Climate Actions" }
  ];

  return (
    <section id="sdg13" className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">SDG 13</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Climate Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take urgent action to combat climate change and its impacts
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {impacts.map((impact) => {
            const Icon = impact.icon;
            return (
              <Card key={impact.label} className="text-center">
                <CardContent className="pt-6">
                  <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <p className="text-3xl font-bold text-foreground mb-2">{impact.value}</p>
                  <p className="text-sm text-muted-foreground">{impact.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              Key Targets
            </CardTitle>
            <CardDescription>
              How we're contributing to UN Sustainable Development Goal 13
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {targets.map((target) => (
                <div key={target.id} className="flex gap-4 p-4 bg-muted rounded-lg">
                  <Badge variant="outline" className="h-fit">{target.id}</Badge>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{target.title}</h4>
                    <p className="text-sm text-muted-foreground">{target.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SDGSection;
