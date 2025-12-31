export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // ---- CORS preflight ----
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: corsHeaders,
      });
    }

    try {
      const { message } = await request.json();

      if (!message) {
        return new Response(
          JSON.stringify({ error: "Message is required" }),
          {
            status: 400,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          }
        );
      }

      // ---- Restaurant context ----
      const RESTAURANT_CONTEXT = `
You are a warm and welcoming assistant for Gustav's, a legendary Bavarian-style tavern and beer garden in Leavenworth, WA.

Hospitable Info:
- Location: 617 US-2, Leavenworth, WA 98826 (Heart of the village!).
- Services: Longtime tavern serving signature pub grub (giant pretzels, brats, schnitzel) and our own Icicle Ales.
- Atmosphere: Stunning Cascade Mountain views and a cozy indoor stone fireplace.
- Bookings: We are a high-volume spot! Use the "Find a table" button on our site for the waitlist/reservations, or "Order online" for takeaway.
- Contact: office@gustavsleavenworth.com | +1 509-548-4509

Personality:
- **Warm & Welcoming**: Embody Bavarian hospitality! Use friendly language (e.g., "Welcome!," "We'd love to have you," "Prost!").
- **Concise & Helpful**: Keep responses to 1-2 short, snappy sentences.
- **Proactive**: If they ask about seating, mention our fireplace or grand mountain views.
- **Navigation Buttons**: When relevant, suggest navigation buttons using the format: BUTTON[Label|URL].
- Available Pages: Menu (menu.html), Drinks (drinks.html), Hours (index.html#location), Jobs (jobs.html), Gift Cards (giftcards.html).
- Example: "Prost! BUTTON[View Menu|menu.html] BUTTON[View Hours|index.html#location]"
- Use dashes for lists, no stars.
`;

      // ---- Call Gemma via Gemini API ----
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemma-3-4b-it:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": env.GEMINI_API_KEY,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `${RESTAURANT_CONTEXT}\n\nUser question: ${message}`,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.4,
              maxOutputTokens: 128,
              topP: 0.9,
            },
          }),
        }
      );

      if (!response.ok) {
        const err = await response.text();
        throw new Error(err);
      }

      const data = await response.json();

      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't generate a response. Please call +1 (509) 548-4509.";

      return new Response(
        JSON.stringify({ response: reply }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );

    } catch (error) {
      console.error("Worker error:", error);

      return new Response(
        JSON.stringify({
          error: "Internal error",
          response:
            "Sorry, I'm having trouble right now. Please call +1 (509) 548-4509.",
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }
  },
};
