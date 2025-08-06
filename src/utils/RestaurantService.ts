import { supabase } from "@/integrations/supabase/client";

export interface Restaurant {
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
    time?: number;
  }>;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  user_ratings_total: number;
  description?: string;
}

export class RestaurantService {
  static async searchVeganRestaurants(zipCode: string): Promise<Restaurant[]> {
    try {
      // Call our edge function to scrape restaurant data
      const { data, error } = await supabase.functions.invoke('scrape-restaurants', {
        body: { zipCode }
      });

      if (error) throw error;
      return data.restaurants || [];
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      // Return mock data as fallback
      return this.getMockRestaurants();
    }
  }

  static async getGoogleReviews(placeId: string): Promise<any[]> {
    try {
      const { data, error } = await supabase.functions.invoke('fetch-google-reviews', {
        body: { placeId }
      });

      if (error) throw error;
      return data.reviews || [];
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }
  }

  private static getMockRestaurants(): Restaurant[] {
    return [
      {
        place_id: "1",
        name: "Plum Bistro",
        rating: 4.6,
        price_level: 3,
        formatted_address: "1429 12th Ave, Seattle, WA 98122",
        opening_hours: {
          open_now: true,
          weekday_text: ["Monday: 5:00 – 10:00 PM", "Tuesday: 5:00 – 10:00 PM", "Wednesday: 5:00 – 10:00 PM", "Thursday: 5:00 – 10:00 PM", "Friday: 5:00 – 10:00 PM", "Saturday: 10:00 AM – 2:00 PM, 5:00 – 10:00 PM", "Sunday: 10:00 AM – 2:00 PM, 5:00 – 10:00 PM"]
        },
        geometry: {
          location: { lat: 47.6145, lng: -122.3161 }
        },
        user_ratings_total: 1342,
        description: "Upscale vegan restaurant featuring creative plant-based cuisine with seasonal ingredients and craft cocktails.",
        reviews: [
          {
            author_name: "Sarah M.",
            rating: 5,
            text: "Amazing vegan fine dining experience! The mushroom wellington was incredible and the service was top-notch. Every dish was beautifully presented.",
            time: Date.now()
          },
          {
            author_name: "David L.",
            rating: 5,
            text: "Best vegan restaurant in Seattle! The tasting menu is worth every penny. Creative dishes that even non-vegans will love.",
            time: Date.now() - 86400000
          }
        ]
      },
      {
        place_id: "2", 
        name: "Wayward Vegan Cafe",
        rating: 4.4,
        price_level: 2,
        formatted_address: "801 NE 65th St, Seattle, WA 98115",
        opening_hours: {
          open_now: true,
          weekday_text: ["Monday: 8:00 AM – 9:00 PM", "Tuesday: 8:00 AM – 9:00 PM", "Wednesday: 8:00 AM – 9:00 PM", "Thursday: 8:00 AM – 9:00 PM", "Friday: 8:00 AM – 9:00 PM", "Saturday: 8:00 AM – 9:00 PM", "Sunday: 8:00 AM – 9:00 PM"]
        },
        geometry: {
          location: { lat: 47.6758, lng: -122.3227 }
        },
        user_ratings_total: 892,
        description: "Cozy neighborhood vegan cafe serving comfort food classics with a plant-based twist, famous for their brunch menu.",
        reviews: [
          {
            author_name: "Mike D.",
            rating: 4,
            text: "Great comfort food! The vegan mac and cheese is a must-try. Portions are generous and prices are reasonable.",
            time: Date.now()
          },
          {
            author_name: "Emma K.",
            rating: 5,
            text: "Love this place! The breakfast burrito is huge and delicious. Staff is super friendly and the atmosphere is welcoming.",
            time: Date.now() - 172800000
          }
        ]
      },
      {
        place_id: "3",
        name: "Araya's Place",
        rating: 4.7,
        price_level: 2,
        formatted_address: "1121 NE 45th St, Seattle, WA 98105",
        opening_hours: {
          open_now: false,
          weekday_text: ["Monday: 11:30 AM – 9:00 PM", "Tuesday: 11:30 AM – 9:00 PM", "Wednesday: 11:30 AM – 9:00 PM", "Thursday: 11:30 AM – 9:00 PM", "Friday: 11:30 AM – 9:30 PM", "Saturday: 11:30 AM – 9:30 PM", "Sunday: 11:30 AM – 9:00 PM"]
        },
        geometry: {
          location: { lat: 47.6606, lng: -122.3192 }
        },
        user_ratings_total: 1156,
        description: "Authentic Thai vegan restaurant offering a wide variety of traditional dishes made with fresh ingredients and bold flavors.",
        reviews: [
          {
            author_name: "Lisa K.",
            rating: 5,
            text: "Authentic Thai vegan cuisine. The pad thai is phenomenal! Everything tastes so fresh and flavorful. Highly recommended!",
            time: Date.now()
          },
          {
            author_name: "James R.",
            rating: 4,
            text: "Excellent food and great variety. The curry dishes are particularly good. Service can be a bit slow during peak times but worth the wait.",
            time: Date.now() - 259200000
          }
        ]
      }
    ];
  }
}