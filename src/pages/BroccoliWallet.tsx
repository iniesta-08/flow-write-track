import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const BroccoliWallet = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <Card className="max-w-3xl mx-auto">
          <CardContent className="p-8">
            <h1 className="heading-primary text-center mb-6">🥦 Turn Cravings into Credits</h1>
            
            <p className="body-text text-center mb-8">
              Earn points while you eat green!<br />
              Here's how you grow your 🥦 balance:
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <span className="flex items-center gap-3">
                  ✅ Login
                </span>
                <span className="font-bold text-lg">+4 🥦</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <span className="flex items-center gap-3">
                  ✅ Reserve Table
                </span>
                <span className="font-bold text-lg">+6 🥦 per booking</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <span className="flex items-center gap-3">
                  ✅ Post on IG with #PlantYourSpot🥦
                </span>
                <span className="font-bold text-lg">+8 🥦</span>
              </div>
            </div>
            
            <div className="text-center mb-6">
              <p className="body-text mb-4">
                💸 Redeem 20 🥦 = $1 credit toward table bookings
              </p>
            </div>
            
            <div className="text-center">
              <Button className="cta-button px-8 py-3">
                Check My Broccoli Wallet
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BroccoliWallet;