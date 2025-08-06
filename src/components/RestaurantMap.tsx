import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface Restaurant {
  place_id: string;
  name: string;
  rating: number;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

interface RestaurantMapProps {
  restaurants: Restaurant[];
  center: { lat: number; lng: number };
  onPinClick: (restaurant: Restaurant) => void;
  selectedRestaurant: Restaurant | null;
}

const RestaurantMap = ({ restaurants, center, onPinClick, selectedRestaurant }: RestaurantMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return;

    // Create map
    leafletMapRef.current = L.map(mapRef.current, {
      center: [center.lat, center.lng],
      zoom: 12,
      zoomControl: true,
    });

    // Add tile layer (OpenStreetMap)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(leafletMapRef.current);

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  // Update map center when center prop changes
  useEffect(() => {
    if (leafletMapRef.current) {
      leafletMapRef.current.setView([center.lat, center.lng], 12);
    }
  }, [center]);

  // Update markers when restaurants change
  useEffect(() => {
    if (!leafletMapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      leafletMapRef.current?.removeLayer(marker);
    });
    markersRef.current = [];

    // Create custom icons
    const createCustomIcon = (isSelected: boolean) => {
      const color = isSelected ? "#22c55e" : "#10b981";
      const size = isSelected ? 35 : 25;
      
      return L.divIcon({
        html: `
          <div style="
            background-color: ${color};
            border: 3px solid white;
            border-radius: 50%;
            width: ${size}px;
            height: ${size}px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: white;
            font-size: ${size * 0.4}px;
          ">
            🌱
          </div>
        `,
        className: "custom-div-icon",
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });
    };

    // Add markers for restaurants
    restaurants.forEach(restaurant => {
      const isSelected = selectedRestaurant?.place_id === restaurant.place_id;
      const marker = L.marker(
        [restaurant.geometry.location.lat, restaurant.geometry.location.lng],
        { 
          icon: createCustomIcon(isSelected),
          zIndexOffset: isSelected ? 1000 : 0
        }
      );

      // Add popup
      marker.bindPopup(`
        <div style="min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; font-weight: 600;">${restaurant.name}</h3>
          <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 8px;">
            <span style="color: #f59e0b;">⭐</span>
            <span>${restaurant.rating}</span>
          </div>
          <button 
            onclick="window.selectRestaurant('${restaurant.place_id}')"
            style="
              background: #22c55e;
              color: white;
              border: none;
              padding: 6px 12px;
              border-radius: 6px;
              cursor: pointer;
              font-size: 14px;
            "
          >
            View Details
          </button>
        </div>
      `);

      // Add click event
      marker.on('click', () => {
        onPinClick(restaurant);
      });

      marker.addTo(leafletMapRef.current!);
      markersRef.current.push(marker);
    });

    // Set up global function for popup buttons
    (window as any).selectRestaurant = (placeId: string) => {
      const restaurant = restaurants.find(r => r.place_id === placeId);
      if (restaurant) {
        onPinClick(restaurant);
      }
    };

  }, [restaurants, onPinClick, selectedRestaurant]);

  // Zoom to selected restaurant
  useEffect(() => {
    if (selectedRestaurant && leafletMapRef.current) {
      leafletMapRef.current.setView(
        [selectedRestaurant.geometry.location.lat, selectedRestaurant.geometry.location.lng],
        15,
        { animate: true }
      );
    }
  }, [selectedRestaurant]);

  return (
    <div className="h-full w-full relative">
      <div ref={mapRef} className="h-full w-full rounded-lg overflow-hidden border border-border" />
      
      {/* Map overlay info */}
      <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm z-[1000]">
        <p className="text-sm font-medium text-foreground">
          {restaurants.length} restaurants found
        </p>
        <p className="text-xs text-muted-foreground">
          Click pins for details
        </p>
      </div>

      {/* External Maps Button */}
      <div className="absolute top-4 right-4 z-[1000]">
        <button
          onClick={() => {
            const query = "vegan+restaurants";
            const url = `https://www.google.com/maps/search/${query}/@${center.lat},${center.lng},12z`;
            window.open(url, '_blank');
          }}
          className="bg-background/90 backdrop-blur-sm hover:bg-background border border-border px-3 py-2 rounded-lg shadow-sm text-sm font-medium transition-colors"
        >
          Open in Google Maps
        </button>
      </div>
    </div>
  );
};

export default RestaurantMap;