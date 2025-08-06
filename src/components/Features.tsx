import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MessageCircle, Calendar, TrendingUp, BookOpen, Users } from "lucide-react";

const Features = () => {
  // Core features focused on plant-based dining
  const features = [
    {
      icon: Search,
      title: "Plant-Based Restaurant Discovery",
      description: "Find 100% vegan, vegetarian, and veg-friendly restaurants with detailed filters for dietary needs and preferences.",
      stats: "800+ verified locations"
    },
    {
      icon: MessageCircle,
      title: "Summarized Reviews",
      description: "Read concise, helpful reviews from fellow plant-based food lovers that focus on taste, atmosphere, and community.",
      stats: "12,000+ authentic reviews"
    },
    {
      icon: Calendar,
      title: "Instant Reservations",
      description: "Book tables seamlessly at your favorite plant-based spots with real-time availability and confirmation.",
      stats: "Available 24/7"
    }
  ];

  return (
    <section className="py-20 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        {/* Features Section */}
        <div className="text-center mb-16">
          <h2 className="heading-primary mb-6">Everything You Need</h2>
          <p className="body-text max-w-2xl mx-auto">
            Discover, review, and reserve at the best plant-based dining spots 
            in your community with our inclusive platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="feature-card text-center">
              <CardContent className="p-8">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="heading-tertiary mb-4">{feature.title}</h3>
                <p className="body-text mb-4">{feature.description}</p>
                <div className="bg-accent/10 rounded-full px-4 py-2 inline-block">
                  <span className="body-text-small font-medium text-accent">{feature.stats}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Community Stats */}
        <div className="bg-card rounded-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="heading-secondary mb-4">Our Growing Community</h3>
            <p className="body-text">
              Join thousands of plant-curious and plant-proud food lovers across the country.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="heading-secondary text-primary mb-2">15,000+</div>
              <p className="body-text-small">Active community members</p>
            </div>
            <div>
              <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6 text-accent" />
              </div>
              <div className="heading-secondary text-accent mb-2">800+</div>
              <p className="body-text-small">Verified restaurants</p>
            </div>
            <div>
              <div className="bg-secondary/50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div className="heading-secondary text-primary mb-2">2,500+</div>
              <p className="body-text-small">Monthly reservations</p>
            </div>
          </div>
        </div>

        {/* Know Your Community Section */}
        <div className="bg-card rounded-lg p-8">
          <div className="text-center mb-8">
            <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-8 h-8 text-accent" />
            </div>
            <h3 className="heading-secondary mb-4">Know Your Community</h3>
            <p className="body-text max-w-2xl mx-auto">
              Stay informed about plant-based trends, community insights, and the growing 
              movement toward sustainable dining choices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-background rounded-lg p-6 text-center">
              <h4 className="heading-tertiary mb-3">Plant-Based Growth</h4>
              <p className="body-text-small mb-2">
                <strong>23%</strong> of Americans are reducing meat consumption
              </p>
              <p className="body-text-small text-muted-foreground">
                2024 Plant-Based Survey
              </p>
            </div>
            <div className="bg-background rounded-lg p-6 text-center">
              <h4 className="heading-tertiary mb-3">Market Expansion</h4>
              <p className="body-text-small mb-2">
                <strong>$8.1B</strong> plant-based food market in the US
              </p>
              <p className="body-text-small text-muted-foreground">
                Good Food Institute
              </p>
            </div>
            <div className="bg-background rounded-lg p-6 text-center">
              <h4 className="heading-tertiary mb-3">Restaurant Growth</h4>
              <p className="body-text-small mb-2">
                <strong>300%</strong> increase in vegan menu options
              </p>
              <p className="body-text-small text-muted-foreground">
                Past 5 years
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button className="secondary-button">
              EXPLORE COMMUNITY INSIGHTS
            </Button>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="heading-secondary mb-4">Ready to Explore?</h3>
          <p className="body-text mb-8 max-w-xl mx-auto">
            Join our welcoming community and discover amazing plant-based 
            dining experiences that align with your values.
          </p>
          <Button className="cta-button text-lg px-8 py-4">
            START DISCOVERING
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Features;