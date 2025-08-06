import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ReviewRequest {
  placeId: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { placeId }: ReviewRequest = await req.json();
    
    // For now, return mock Google-style reviews
    // In production, you would integrate with Google Places API
    const mockReviews = [
      {
        author_name: "Google User",
        rating: 5,
        text: "Excellent food and service! The vegan options are amazing and the atmosphere is cozy. Highly recommend the seasonal menu items.",
        time: Date.now(),
        profile_photo_url: "",
        relative_time_description: "2 days ago"
      },
      {
        author_name: "Sarah Johnson",
        rating: 4,
        text: "Great place for plant-based dining. The staff is knowledgeable about ingredients and very accommodating. Slightly pricey but worth it.",
        time: Date.now() - 172800000,
        profile_photo_url: "",
        relative_time_description: "1 week ago"
      },
      {
        author_name: "Michael Chen",
        rating: 5,
        text: "Been coming here for years and it never disappoints. The seasonal menu keeps things interesting and the quality is consistently high.",
        time: Date.now() - 604800000,
        profile_photo_url: "",
        relative_time_description: "2 weeks ago"
      },
      {
        author_name: "Emma Williams",
        rating: 4,
        text: "Love the creative vegan dishes here! The desserts are particularly impressive. Sometimes gets busy so make a reservation.",
        time: Date.now() - 1209600000,
        profile_photo_url: "",
        relative_time_description: "3 weeks ago"
      },
      {
        author_name: "David Rodriguez",
        rating: 5,
        text: "As a non-vegan, I was skeptical but this place completely changed my mind. Every dish was delicious and I didn't miss meat at all!",
        time: Date.now() - 1814400000,
        profile_photo_url: "",
        relative_time_description: "1 month ago"
      }
    ];

    // Return random subset of reviews (2-4 reviews)
    const numReviews = Math.floor(Math.random() * 3) + 2;
    const selectedReviews = mockReviews
      .sort(() => Math.random() - 0.5)
      .slice(0, numReviews);

    return new Response(
      JSON.stringify({ reviews: selectedReviews }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error: any) {
    console.error("Error in fetch-google-reviews function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);