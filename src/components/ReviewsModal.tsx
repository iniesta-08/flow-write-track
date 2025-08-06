import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Star, User } from "lucide-react";

interface Restaurant {
  place_id: string;
  name: string;
  rating: number;
  reviews?: Array<{
    author_name: string;
    rating: number;
    text: string;
    time?: number;
  }>;
  user_ratings_total: number;
}

interface ReviewsModalProps {
  restaurant: Restaurant;
  isOpen: boolean;
  onClose: () => void;
}

const ReviewsModal = ({ restaurant, isOpen, onClose }: ReviewsModalProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span>{restaurant.name}</span>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              {restaurant.rating} ({restaurant.user_ratings_total} reviews)
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overall Rating Summary */}
          <div className="bg-secondary/50 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Overall Rating</h3>
            <div className="flex items-center gap-2">
              <div className="flex">{renderStars(Math.round(restaurant.rating))}</div>
              <span className="text-lg font-bold">{restaurant.rating}</span>
              <span className="text-muted-foreground">
                based on {restaurant.user_ratings_total} reviews
              </span>
            </div>
          </div>

          {/* Individual Reviews */}
          <div className="space-y-4">
            <h3 className="font-semibold">Recent Reviews</h3>
            {restaurant.reviews && restaurant.reviews.length > 0 ? (
              restaurant.reviews.map((review, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{review.author_name}</p>
                        {review.time && (
                          <p className="text-sm text-muted-foreground">
                            {formatDate(review.time)}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex">{renderStars(review.rating)}</div>
                  </div>
                  <p className="text-foreground leading-relaxed">{review.text}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No reviews available for this restaurant.</p>
                <p className="text-sm mt-1">Be the first to leave a review!</p>
              </div>
            )}
          </div>

          {/* Community Summary */}
          <div className="bg-primary/5 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Community Summary</h3>
            <p className="text-sm text-muted-foreground">
              This restaurant is loved by the plant-based community for its {restaurant.rating >= 4.5 ? 'exceptional' : 'quality'} 
              {' '}vegan and vegetarian options. Join our community to share your experience!
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewsModal;