import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Users, Star, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";
import AuthModal from "@/components/AuthModal";
import BroccoliWallet from "@/components/BroccoliWallet";

const Hero = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [broccoliPoints, setBroccoliPoints] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Award points for login
        if (event === 'SIGNED_IN' && session?.user) {
          setBroccoliPoints(prev => prev + 4);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        setBroccoliPoints(4); // Default points for existing session
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setBroccoliPoints(0);
  };

  return (
    <>
      <BroccoliWallet />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="heading-secondary">PlantSpot</div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/explore" className="nav-link">DISCOVER</a>
              <a href="#reviews" className="nav-link">REVIEWS</a>
              <a href="#reserve" className="nav-link">RESERVE</a>
              <a href="/wallet" className="nav-link">🥦 WALLET</a>
            </div>
            {user ? (
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Welcome back!</div>
                  <div className="font-medium">🥦 {broccoliPoints} points</div>
                </div>
                <Button 
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => setIsAuthModalOpen(true)}
                className="cta-button"
              >
                Login (+4 🥦)
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="heading-primary mb-6">
              Discover Plant-Based<br />
              Dining Near You
            </h1>
            <p className="body-text max-w-2xl mx-auto mb-8">
              Find inclusive, welcoming restaurants that celebrate plant-based cuisine. 
              From 100% vegan spots to veg-friendly establishments, discover your next 
              favorite meal in a supportive community.
            </p>
            
            {/* Location Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {["Seattle", "Portland", "San Francisco", "Los Angeles"].map((city) => (
                <div key={city} className="flex items-center gap-2 bg-secondary rounded-full px-4 py-2">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span className="body-text-small font-medium">{city}</span>
                </div>
              ))}
            </div>

            <Button 
              className="cta-button text-lg px-8 py-4"
              onClick={() => navigate("/explore")}
            >
              🌱 Show Me the Plant Picks
            </Button>
            
            {/* Team Selection Block */}
            <Card className="mt-6 max-w-2xl mx-auto">
              <CardContent className="p-6">
                <h2 className="text-3xl font-bold mb-4 text-center">🎮 Pick Your Plant Persona</h2>
                <p className="body-text text-center mb-8">
                  Are you a flavor explorer or a creamy dreamer? Choose your side!
                </p>
                
                <div className="flex flex-col sm:flex-row gap-8 mb-6 justify-center items-center">
                  <div className="flex flex-col items-center">
                    <Button
                      onClick={() => setSelectedTeam('spicy')}
                      variant={selectedTeam === 'spicy' ? 'default' : 'outline'}
                      className="text-6xl p-8 h-auto w-24 mb-3"
                    >
                      🌶️
                    </Button>
                    <span className="text-lg font-bold">Spicy Seekers</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Button
                      onClick={() => setSelectedTeam('bowl')}
                      variant={selectedTeam === 'bowl' ? 'default' : 'outline'}
                      className="text-6xl p-8 h-auto w-24 mb-3"
                    >
                      🥗
                    </Button>
                    <span className="text-lg font-bold">Bowl Boss</span>
                  </div>
                </div>
                
                {selectedTeam && (
                  <div className="text-center bg-secondary/30 rounded-lg p-4">
                    <p className="body-text">
                      Great pick! Check out your top recommended dishes in{" "}
                      <span className="font-medium">Seattle</span>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

        </div>
      </section>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default Hero;