import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sparkles } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-24">
      <div className="container px-4 mx-auto">
        <Card className="relative overflow-hidden border-none shadow-elegant bg-gradient-card">
          <div className="absolute inset-0 bg-gradient-hero" />
          <CardContent className="relative z-10 p-12 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                Limited Time Offer
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to transform your 
                <span className="bg-gradient-primary bg-clip-text text-transparent"> ad campaigns?</span>
              </h2>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join hundreds of agencies already using AdFlow to streamline their workflow 
                and boost campaign performance.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button variant="hero" size="lg" className="px-8 py-6 text-lg">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
                  Schedule a Demo
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground mt-6">
                14-day free trial • No credit card required • Cancel anytime
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};