import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, DollarSign } from "lucide-react";

interface Restaurant {
  place_id: string;
  name: string;
  rating: number;
  price_level?: number;
  formatted_address: string;
  opening_hours?: {
    open_now: boolean;
    weekday_text: string[];
  };
  photos?: Array<{
    photo_reference: string;
  }>;
  reviews?: Array<{
    author_name: string;
    rating: number;
    text: string;
  }>;
  user_ratings_total: number;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
  onBookTable: () => void;
  onSeeReviews: () => void;
  isSelected?: boolean;
}

const RestaurantCard = ({ restaurant, onBookTable, onSeeReviews, isSelected }: RestaurantCardProps) => {
  const getPriceDisplay = (level?: number) => {
    if (!level) return "";
    return "$".repeat(level);
  };

  const isTopRecommended = restaurant.rating > 4.7 && restaurant.user_ratings_total > 100;

  const getPhotoUrl = (photoReference?: string) => {
    if (!photoReference) return "/placeholder.svg";
    // Check if it's already a full URL (from Unsplash)
    if (photoReference.startsWith('http')) {
      return photoReference;
    }
    return `/api/google-photo?photo_reference=${photoReference}&maxwidth=400`;
  };

  const getTopReview = () => {
    if (!restaurant.reviews || restaurant.reviews.length === 0) return "";
    const review = restaurant.reviews[0];
    const preview = review.text.slice(0, 120);
    return preview.length < review.text.length ? preview + "..." : preview;
  };

  return (
    <Card className={`transition-all duration-200 hover:shadow-md ${isSelected ? 'ring-2 ring-primary' : ''}`}>
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Restaurant Image */}
          <div className="flex-shrink-0">
            <img
              src={getPhotoUrl(restaurant.photos?.[0]?.photo_reference)}
              alt={restaurant.name}
              className="w-24 h-24 rounded-lg object-cover"
            />
          </div>

          {/* Restaurant Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-lg leading-tight">{restaurant.name}</h3>
                {isTopRecommended && (
                  <Badge variant="secondary" className="mt-1 text-xs">
                    Top Recommended
                  </Badge>
                )}
              </div>
            </div>

            {/* Rating and Price */}
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{restaurant.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({restaurant.user_ratings_total})
                </span>
              </div>
              {restaurant.price_level && (
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {getPriceDisplay(restaurant.price_level)}
                  </span>
                </div>
              )}
            </div>

            {/* Address */}
            <div className="flex items-center gap-1 mb-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground truncate">
                {restaurant.formatted_address}
              </span>
            </div>

            {/* Hours */}
            {restaurant.opening_hours && (
              <div className="flex items-center gap-1 mb-3">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className={`text-sm font-medium ${
                  restaurant.opening_hours.open_now ? 'text-green-600' : 'text-red-600'
                }`}>
                  {restaurant.opening_hours.open_now ? 'Open' : 'Closed'}
                </span>
              </div>
            )}

            {/* Review Snippet */}
            {getTopReview() && (
              <div className="mb-3">
                <p className="text-sm text-muted-foreground italic">
                  "{getTopReview()}"
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  - {restaurant.reviews?.[0]?.author_name}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                onClick={onBookTable}
                size="sm"
                className="flex-1"
              >
                Book Table
              </Button>
              <Button
                onClick={onSeeReviews}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                See Reviews
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;