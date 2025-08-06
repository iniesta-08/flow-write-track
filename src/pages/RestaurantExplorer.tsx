import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Star, Clock, Phone, ExternalLink, Filter, Navigation, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useGeolocation } from "@/hooks/useGeolocation";
import { LocationPermissionModal } from "@/components/LocationPermissionModal";
import RestaurantCard from "@/components/RestaurantCard";
import RestaurantMap from "@/components/RestaurantMap";
import ReviewsModal from "@/components/ReviewsModal";
import ReservationModal from "@/components/ReservationModal";
import { RestaurantService, type Restaurant } from "@/utils/RestaurantService";


const RestaurantExplorer = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [showReviews, setShowReviews] = useState(false);
  const [showReservation, setShowReservation] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(true);
  const [zipCode, setZipCode] = useState("98101"); // Default Seattle zip
  const [filters, setFilters] = useState({
    priceLevel: "all",
    rating: "all",
    openNow: false
  });
  const [mapCenter, setMapCenter] = useState({ lat: 47.6062, lng: -122.3321 }); // Seattle default
  const { toast } = useToast();
  const { latitude, longitude, error: geoError, loading: geoLoading, requestLocation, isSupported } = useGeolocation();

  const fetchRestaurants = useCallback(async (location = mapCenter, searchZip = zipCode) => {
    setLoading(true);
    try {
      console.log('Fetching restaurants for zip code:', searchZip);
      const fetchedRestaurants = await RestaurantService.searchVeganRestaurants(searchZip);
      
      // Update coordinates based on location if available
      const updatedRestaurants = fetchedRestaurants.map(restaurant => ({
        ...restaurant,
        geometry: {
          location: {
            lat: location.lat + (Math.random() - 0.5) * 0.02,
            lng: location.lng + (Math.random() - 0.5) * 0.02
          }
        }
      }));
      
      setRestaurants(updatedRestaurants);
      
      toast({
        title: "Restaurants loaded",
        description: `Found ${updatedRestaurants.length} plant-based restaurants in ${searchZip}.`,
      });
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      toast({
        title: "Error",
        description: "Failed to load restaurants. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [mapCenter, zipCode, toast]);

  const handleZipCodeSearch = () => {
    fetchRestaurants(mapCenter, zipCode);
  };

  // Handle geolocation updates
  useEffect(() => {
    if (latitude && longitude) {
      const userLocation = { lat: latitude, lng: longitude };
      setMapCenter(userLocation);
      fetchRestaurants(userLocation);
      
      toast({
        title: "Location found!",
        description: "Finding restaurants near you...",
      });
    }
  }, [latitude, longitude, fetchRestaurants, toast]);

  // Handle geolocation errors
  useEffect(() => {
    if (geoError) {
      toast({
        title: "Location unavailable",
        description: geoError,
        variant: "destructive",
      });
      // Load default restaurants for Seattle
      fetchRestaurants();
    }
  }, [geoError, fetchRestaurants, toast]);

  // Load restaurants on initial mount (with default location)
  useEffect(() => {
    if (!latitude && !longitude && !geoLoading) {
      fetchRestaurants();
    }
  }, [latitude, longitude, geoLoading, fetchRestaurants]);

  const handleLocationRequest = () => {
    setShowLocationModal(false);
    requestLocation();
  };

  const handleSkipLocation = () => {
    setShowLocationModal(false);
    fetchRestaurants(); // Load with default Seattle location
    toast({
      title: "Using default location",
      description: "Showing restaurants in Seattle area.",
    });
  };

  const handleExploreNearMe = () => {
    if (isSupported) {
      requestLocation();
    } else {
      toast({
        title: "Location not supported",
        description: "Your browser doesn't support location services.",
        variant: "destructive",
      });
    }
  };

  const handleFilterChange = (filterType: string, value: string | boolean) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleMapPinClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleBookTable = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowReservation(true);
  };

  const handleSeeReviews = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowReviews(true);
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    if (filters.priceLevel !== "all" && restaurant.price_level !== parseInt(filters.priceLevel)) {
      return false;
    }
    if (filters.rating !== "all" && restaurant.rating < parseFloat(filters.rating)) {
      return false;
    }
    if (filters.openNow && !restaurant.opening_hours?.open_now) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background border-b border-border px-6 py-4">
        <div className="container mx-auto">
          <h1 className="heading-secondary mb-4">Explore Plant-Based Restaurants</h1>
          
          {/* Search Bar */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1 max-w-md">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter zip code (e.g., 98101)"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleZipCodeSearch} className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Search
                </Button>
              </div>
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <Select value={filters.priceLevel} onValueChange={(value) => handleFilterChange('priceLevel', value)}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="1">$</SelectItem>
                <SelectItem value="2">$$</SelectItem>
                <SelectItem value="3">$$$</SelectItem>
                <SelectItem value="4">$$$$</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.rating} onValueChange={(value) => handleFilterChange('rating', value)}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="4.0">4.0+</SelectItem>
                <SelectItem value="4.5">4.5+</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant={filters.openNow ? "default" : "outline"}
              onClick={() => handleFilterChange('openNow', !filters.openNow)}
              className="flex items-center gap-2"
            >
              <Clock className="w-4 h-4" />
              Open Now
            </Button>

            <Button
              variant="outline"
              onClick={handleExploreNearMe}
              disabled={geoLoading}
              className="flex items-center gap-2"
            >
              {geoLoading ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                  Finding location...
                </>
              ) : (
                <>
                  <Navigation className="w-4 h-4" />
                  Explore Near Me
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={() => fetchRestaurants(mapCenter, zipCode)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Update Results
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-120px)]">
        {/* Restaurant List */}
        <div className="w-1/2 overflow-y-auto p-6 space-y-4 bg-background/95 backdrop-blur-sm">
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-4">
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-3 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <>
              <div className="text-sm text-muted-foreground mb-4">
                Found {filteredRestaurants.length} restaurants
              </div>
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.place_id}
                  restaurant={restaurant}
                  onBookTable={() => handleBookTable(restaurant)}
                  onSeeReviews={() => handleSeeReviews(restaurant)}
                  isSelected={selectedRestaurant?.place_id === restaurant.place_id}
                />
              ))}
            </>
          )}
        </div>

        {/* Map */}
        <div className="w-1/2 h-full">
          <RestaurantMap
            restaurants={filteredRestaurants}
            center={mapCenter}
            onPinClick={handleMapPinClick}
            selectedRestaurant={selectedRestaurant}
          />
        </div>
      </div>

      {/* Location Permission Modal */}
      <LocationPermissionModal
        isOpen={showLocationModal}
        onRequestLocation={handleLocationRequest}
        onSkip={handleSkipLocation}
      />

      {/* Restaurant Modals */}
      {selectedRestaurant && (
        <>
          <ReviewsModal
            restaurant={selectedRestaurant}
            isOpen={showReviews}
            onClose={() => setShowReviews(false)}
          />
          <ReservationModal
            restaurant={selectedRestaurant}
            isOpen={showReservation}
            onClose={() => setShowReservation(false)}
          />
        </>
      )}
    </div>
  );
};

export default RestaurantExplorer;