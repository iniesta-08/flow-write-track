import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, AlertCircle } from "lucide-react";

interface LocationPermissionModalProps {
  isOpen: boolean;
  onRequestLocation: () => void;
  onSkip: () => void;
}

export const LocationPermissionModal = ({ isOpen, onRequestLocation, onSkip }: LocationPermissionModalProps) => {
  const [isRequesting, setIsRequesting] = useState(false);

  const handleRequestLocation = () => {
    setIsRequesting(true);
    onRequestLocation();
    // Reset after a delay to allow for permission prompt
    setTimeout(() => setIsRequesting(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Enable Location Access
          </DialogTitle>
          <DialogDescription className="space-y-3">
            <p>
              We'd like to use your location to find the best plant-based restaurants near you.
            </p>
            <div className="flex items-start gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>
                Your location data is only used to show nearby restaurants and is never stored or shared.
              </span>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={onSkip}
            className="w-full sm:w-auto"
          >
            Skip for now
          </Button>
          <Button
            onClick={handleRequestLocation}
            disabled={isRequesting}
            className="w-full sm:w-auto"
          >
            {isRequesting ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                Requesting...
              </>
            ) : (
              <>
                <MapPin className="w-4 h-4 mr-2" />
                Enable Location
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};