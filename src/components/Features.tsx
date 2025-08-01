import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Zap, BarChart3, Users, Calendar, PenTool } from "lucide-react";
import aiCopywriter from "@/assets/ai-copywriter.jpg";
import analytics from "@/assets/analytics.jpg";

export const Features = () => {
  const features = [
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Campaign Management",
      description: "Organize campaigns like projects with tasks, deadlines, and team collaboration.",
      image: null,
      benefits: ["Kanban boards", "Task assignments", "Progress tracking", "Team collaboration"]
    },
    {
      icon: <PenTool className="h-6 w-6" />,
      title: "AI Copywriting Assistant",
      description: "Generate compelling ad copy, captions, and marketing content with AI.",
      image: aiCopywriter,
      benefits: ["Smart prompts", "Brand voice training", "Multi-platform optimization", "A/B testing"]
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Campaign Analytics",
      description: "Track performance across all campaigns with detailed insights and reporting.",
      image: analytics,
      benefits: ["Real-time metrics", "Custom dashboards", "Performance insights", "ROI tracking"]
    }
  ];

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            <Zap className="mr-2 h-4 w-4" />
            Powerful Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything you need to manage 
            <span className="bg-gradient-primary bg-clip-text text-transparent"> ad campaigns</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From planning to execution to analysis - AdFlow has you covered
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                {features[0].icon}
              </div>
              <h3 className="text-2xl font-bold">{features[0].title}</h3>
            </div>
            <p className="text-muted-foreground text-lg mb-6">{features[0].description}</p>
            <div className="grid grid-cols-2 gap-3">
              {features[0].benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <Card className="overflow-hidden border-none shadow-card bg-gradient-card">
            <CardHeader className="pb-0">
              <div className="h-48 bg-gradient-hero rounded-lg flex items-center justify-center">
                <div className="grid grid-cols-3 gap-2 p-4">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="h-16 bg-white/10 backdrop-blur-sm rounded border border-white/20" />
                  ))}
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center mb-16">
          <Card className="overflow-hidden border-none shadow-card bg-gradient-card order-2 lg:order-1">
            <CardHeader className="pb-0">
              <img 
                src={aiCopywriter} 
                alt="AI Copywriting Assistant" 
                className="rounded-lg w-full h-48 object-cover"
              />
            </CardHeader>
          </Card>
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                {features[1].icon}
              </div>
              <h3 className="text-2xl font-bold">{features[1].title}</h3>
            </div>
            <p className="text-muted-foreground text-lg mb-6">{features[1].description}</p>
            <div className="grid grid-cols-2 gap-3">
              {features[1].benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                {features[2].icon}
              </div>
              <h3 className="text-2xl font-bold">{features[2].title}</h3>
            </div>
            <p className="text-muted-foreground text-lg mb-6">{features[2].description}</p>
            <div className="grid grid-cols-2 gap-3">
              {features[2].benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <Card className="overflow-hidden border-none shadow-card bg-gradient-card">
            <CardHeader className="pb-0">
              <img 
                src={analytics} 
                alt="Campaign Analytics" 
                className="rounded-lg w-full h-48 object-cover"
              />
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
};