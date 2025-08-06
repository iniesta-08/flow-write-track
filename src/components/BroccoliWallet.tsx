import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Trophy } from "lucide-react";

const BroccoliWallet = () => {
  const [points, setPoints] = useState(120);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          className="fixed top-4 right-4 z-50 bg-background/80 backdrop-blur-sm border border-border hover:bg-background/90"
        >
          🥦 {points}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-6">
        <div className="space-y-4">
          <h3 className="heading-tertiary text-center">🥦 My Broccoli Wallet</h3>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">{points} 🥦</div>
            <p className="body-text-small text-muted-foreground">Your current balance</p>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3">Recent Activity</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Login bonus</span>
                <span className="text-green-600">+4 🥦</span>
              </div>
              <div className="flex justify-between">
                <span>Table reservation</span>
                <span className="text-green-600">+6 🥦</span>
              </div>
              <div className="flex justify-between">
                <span>Instagram post</span>
                <span className="text-green-600">+8 🥦</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2">Redeem Points</h4>
            <p className="body-text-small mb-3">20 🥦 = $1 credit toward bookings</p>
            <Button className="w-full" variant="outline">
              Redeem Points
            </Button>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2">Leaderboard</h4>
            <p className="body-text-small mb-3">See top broccoli point earners</p>
            <Button className="w-full" variant="outline" onClick={() => window.location.href = '/leaderboard'}>
              <Trophy className="w-4 h-4 mr-2" />
              View Leaderboard
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default BroccoliWallet;