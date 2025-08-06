import Leaderboard from "@/components/Leaderboard";

const LeaderboardPage = () => {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="heading-primary mb-4">🥦 Broccoli Points Leaderboard</h1>
          <p className="body-text text-muted-foreground max-w-2xl mx-auto">
            Discover the top plant-based food enthusiasts in the world! 
            Earn broccoli points by making reservations, leaving reviews, and sharing your plant-based journey.
          </p>
        </div>
        
        <Leaderboard />
      </div>
    </div>
  );
};

export default LeaderboardPage; 