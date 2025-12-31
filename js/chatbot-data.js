// Gustav's Chatbot FAQ Data
// Addresses key pain points: staff overload, after-hours inquiries, seating questions

const chatbotFAQ = [
    {
        keywords: ['view', 'views', 'mountain', 'mountains', 'scenery', 'outside', 'patio', 'beer garden', 'outdoor', 'seating outside'],
        answer: "Our beer garden offers stunning panoramic views of the Cascade Mountains! 🏔️ It's one of the best spots in Leavenworth to enjoy alpine scenery. Seating is first-come, first-served. Pro tip: Arrive early during peak tourist season (especially weekends) for the best spots. Golden hour is absolutely magical!"
    },
    {
        keywords: ['fireplace', 'fire', 'cozy', 'warm', 'inside', 'hearth', 'indoor seating', 'winter'],
        answer: "Yes! We have a beautiful majestic stone fireplace inside our tavern—it's a favorite spot, especially during winter! 🔥 Tables near the fireplace fill up very quickly. We recommend arriving early or visiting during off-peak hours (weekday afternoons) for the best chance. First-come, first-served seating."
    },
    {
        keywords: ['menu', 'food', 'pretzel', 'pretzels', 'brat', 'bratwurst', 'sausage', 'eat', 'german', 'bavarian', 'schnitzel', 'what to eat', 'recommendations'],
        answer: "We specialize in authentic Bavarian pub grub! 🍴 Our signature items include:\n\n• Giant soft pretzels with stone-ground mustard\n• Hand-crafted bratwurst\n• Bavarian schnitzel\n• Traditional German sides\n\nCheck our full menu on the Menu page or call +1 (509) 548-4509 for today's specials and availability!"
    },
    {
        keywords: ['beer', 'tap', 'drink', 'drinks', 'craft', 'brew', 'brews', 'lager', 'ale', 'beer list', 'what\'s on tap', 'beverages'],
        answer: "We feature a rotating selection of local Leavenworth craft beers and imported German lagers! 🍺 Our tap list changes seasonally to bring you the freshest selections. For today's current offerings and specific beer availability, please call us at +1 (509) 548-4509. Our staff will be happy to walk you through what's on tap!"
    },
    {
        keywords: ['hours', 'open', 'time', 'close', 'closing', 'when', 'schedule', 'what time'],
        answer: "Our hours are ⏰:\n📅 Friday & Saturday: 11:00 AM - 9:00 PM\n📅 Sunday - Thursday: 11:00 AM - 8:00 PM\nBUTTON[View Hours|index.html#location]"
    },
    {
        keywords: ['group', 'large', 'reservation', 'reservations', 'table', 'book', 'booking', 'party', 'event', 'seating', 'large party'],
        answer: "For large groups or special events, please call us directly at +1 (509) 548-4509—our team will help arrange seating! 👥 We readily accommodate large groups, families and intimate parties. We're happy to accommodate groups!"
    },
    {
        keywords: ['takeout', 'takeaway', 'order online', 'to go', 'pickup', 'carry out', 'delivery'],
        answer: "Yes, we offer takeout! 📦\n\n📞 Call for pickup: +1 (509) 548-4509\n\nEnjoy our authentic Bavarian favorites from the comfort of your own lodge or vacation rental!"
    },
    {
        keywords: ['location', 'address', 'where', 'directions', 'find', 'how to get', 'parking'],
        answer: "We're located at 617 US-2, Leavenworth, WA 98826—right in the heart of the charming Bavarian village! 📍 BUTTON[View Location|index.html#location]"
    },
    {
        keywords: ['contact', 'email', 'phone', 'call', 'reach', 'get in touch'],
        answer: "We'd love to hear from you! 📞\n\nPhone: +1 (509) 548-4509\nEmail: office@gustavsleavenworth.com\n\nFeel free to reach out with any questions. We're here to make your Gustav's experience perfect!"
    },
    {
        keywords: ['wait', 'busy', 'crowded', 'peak', 'best time', 'when to visit', 'less crowded'],
        answer: "We're a popular spot, especially during tourist season and weekends! ⭐ For shorter waits:\n\n✅ Visit on weekday afternoons\n✅ Arrive right when we open (11 AM)\n✅ Use our 'Find a Table' feature online to check current wait times\n\nOur high traffic reflects our commitment to quality—thanks for your patience!"
    },
    {
        keywords: ['wifi', 'internet', 'charging', 'restroom', 'bathroom', 'accessible', 'wheelchair'],
        answer: "For specific questions about amenities like WiFi, charging stations, restrooms, or accessibility, please call us at +1 (509) 548-4509. Our staff will be happy to provide detailed information!"
    },
    {
        keywords: ['price', 'cost', 'expensive', 'cheap', 'affordable', 'payment', 'credit card'],
        answer: "We offer authentic Bavarian cuisine at fair prices! 💰 For specific pricing, please check our Menu page or call +1 (509) 548-4509. We accept all major credit cards and payment methods."
    },
    {
        keywords: ['catering', 'private event', 'wedding', 'birthday', 'celebration'],
        answer: "Interested in hosting a special event? 🎉 Please call our team directly at +1 (509) 548-4509 or email office@gustavsleavenworth.com to discuss catering, private events, and celebration options. We'd love to be part of your special day!"
    },
    {
        keywords: ['review', 'reviews', 'rating', 'ratings', 'feedback'],
        answer: "Thank you for considering leaving a review! ⭐ We have 1,974+ reviews and value every guest's feedback. You can leave a review on Google, Facebook, or Yelp. Your experience matters to us!"
    },
    {
        keywords: ['gift card', 'gift cards', 'giftcard', 'present', 'gift'],
        answer: "Great idea! 🎁 We offer gift cards that make perfect presents for any occasion. Visit our Gift Cards page to request one, or call us at +1 (509) 548-4509.\n\nGive the gift of authentic Bavarian cuisine and mountain views!"
    },
    {
        keywords: ['job', 'jobs', 'hiring', 'career', 'employment', 'work', 'apply'],
        answer: "We're hiring! 👨‍🍳👩‍🍳 We're looking for experienced servers and kitchen workers. If you're passionate about hospitality and great food, we'd love to hear from you!\n\nVisit our Jobs page to apply or call +1 (509) 548-4509 for more information.\n\nJoin the Gustav's family!"
    },
    {
        keywords: ['special', 'specials', 'deal', 'deals', 'promotion', 'discount', 'happy hour'],
        answer: "We offer rotating specials! 🎉 Call +1 (509) 548-4509 to ask about today's specials and happy hour offerings!"
    },
    {
        keywords: ['drink', 'drinks menu', 'cocktail', 'wine', 'icicle ale', 'icicle', 'brewery'],
        answer: "We feature Gustav's own Icicle Ales! 🍺 Plus a full selection of craft beers, wines, and cocktails. Check out our Drinks page for the full menu!\n\nOur Icicle Ales are brewed specially for Gustav's and are a local favorite!"
    }
];

// Helper function to get bot response
function getBotResponse(userInput) {
    const input = userInput.toLowerCase().trim();

    // Check if input is empty
    if (!input) {
        return "Please type a question and I'll do my best to help! You can ask about our views, fireplace, menu, hours, or reservations. 😊";
    }

    // Find matching FAQ
    for (const faq of chatbotFAQ) {
        for (const keyword of faq.keywords) {
            if (input.includes(keyword.toLowerCase())) {
                return faq.answer;
            }
        }
    }

    // Default response if no match found
    return `That's a great question! I'm here to help you experience the best of Gustav's. While I don't have a specific answer for that right now, I can tell you about our mountain views, authentic Bavarian menu, or our cozy indoor fireplace! 🏔️🍺

For immediate assistance with specific requests, feel free to:
📞 **Call us:** +1 (509) 548-4509
📧 **Email us:** office@gustavsleavenworth.com

Is there anything else I can help you find, like our hours or group party options?`;
}
