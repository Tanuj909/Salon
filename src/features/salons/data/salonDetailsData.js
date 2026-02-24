// Rich supplementary data keyed by salon slug
export const salonDetails = {
  "lumineux-studio": {
    phone: "+91 98110 45231",
    email: "hello@lumineuxstudio.in",
    about: "Lumineux Studio has been synonymous with luxury beauty in Hauz Khas for over a decade. Our team of internationally trained artists delivers bespoke treatments in a sanctuary designed for total relaxation and transformation.",
    services: [
      { name: "Signature Cut & Blowout", desc: "A precision cut tailored to your bone structure and lifestyle, finished with a luxury blowout.", price: "₹1,800", duration: "90 min" },
      { name: "Balayage & Highlights", desc: "Artisan hand-painted colour for a seamlessly natural, sun-kissed result.", price: "₹4,500", duration: "3 hrs" },
      { name: "Bridal Package", desc: "Complete trial and day-of styling for the most important occasion of your life.", price: "₹12,000", duration: "4 hrs" },
      { name: "Organic Facial", desc: "A gentle yet effective deep-cleanse using certified organic botanicals for radiant skin.", price: "₹2,200", duration: "60 min" },
      { name: "Scalp Ritual", desc: "Therapeutic scalp massage with nourishing oils to stimulate growth and restore balance.", price: "₹1,200", duration: "45 min" },
      { name: "Express Blowout", desc: "A voluminous, long-lasting blowout using premium heat-protectant products.", price: "₹850", duration: "45 min" },
    ],
    staff: [
      { name: "Ananya Mehta", role: "Creative Director", rating: 5.0, initials: "AM" },
      { name: "Rohan Kapoor", role: "Senior Colourist", rating: 4.9, initials: "RK" },
      { name: "Priya Sharma", role: "Bridal Specialist", rating: 4.9, initials: "PS" },
      { name: "Zara Khan", role: "Skin Expert", rating: 4.8, initials: "ZK" },
    ],
    timings: [
      { day: "Monday", open: "10:00 AM", close: "8:00 PM" },
      { day: "Tuesday", open: "10:00 AM", close: "8:00 PM" },
      { day: "Wednesday", open: "10:00 AM", close: "8:00 PM" },
      { day: "Thursday", open: "10:00 AM", close: "9:00 PM" },
      { day: "Friday", open: "10:00 AM", close: "9:00 PM" },
      { day: "Saturday", open: "10:00 AM", close: "7:00 PM" },
      { day: "Sunday", open: null, close: null },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1595475207225-428b62bda831?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&auto=format&fit=crop&q=80",
      // "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&auto=format&fit=crop&q=80",
    ],
  },
};

// Default/fallback detail data generated from base salon info
export function getDetailOrDefault(slug, salon) {
  if (salonDetails[slug]) return salonDetails[slug];

  // Generate sensible defaults from the base salon object
  return {
    phone: "+91 98765 43210",
    email: `hello@${slug.replace(/-/g, "")}.in`,
    about: `${salon.name} is one of New Delhi's most sought-after premium beauty destinations, nestled in the heart of ${salon.location}. Known for exceptional craft and a warm, welcoming atmosphere, the team specialises in ${salon.category.toLowerCase()}. Every visit is tailored to leave you refreshed, confident, and glowing.`,
    services: [
      { name: "Signature Treatment", desc: `Our flagship ${salon.category.split("·")[0].trim().toLowerCase()} service, crafted for maximum results.`, price: "₹1,499", duration: "75 min" },
      { name: "Luxury Package", desc: "A complete head-to-toe pampering session using premium imported products.", price: "₹3,999", duration: "3 hrs" },
      { name: "Express Session", desc: "Quick, effective treatment for when you're short on time but never on standards.", price: "₹799", duration: "45 min" },
      { name: "Deep Conditioning", desc: "Intensive restorative treatment for damaged or stressed hair and skin.", price: "₹1,299", duration: "60 min" },
      { name: "Consultation & Trial", desc: "Sit with our experts to plan your perfect look before the big day.", price: "₹500", duration: "30 min" },
      { name: "Seasonal Ritual", desc: "A rotating seasonal treatment using the freshest botanicals of the moment.", price: "₹1,999", duration: "90 min" },
    ],
    staff: [
      { name: "Aisha Verma", role: "Lead Stylist", rating: 5.0, initials: "AV" },
      { name: "Rahul Nair", role: "Colour Specialist", rating: 4.9, initials: "RN" },
      { name: "Deepika Joshi", role: "Skin Therapist", rating: 4.8, initials: "DJ" },
      { name: "Karan Malhotra", role: "Master Stylist", rating: 4.7, initials: "KM" },
    ],
    timings: [
      { day: "Monday", open: "10:00 AM", close: "8:00 PM" },
      { day: "Tuesday", open: "10:00 AM", close: "8:00 PM" },
      { day: "Wednesday", open: "10:00 AM", close: "8:00 PM" },
      { day: "Thursday", open: "10:00 AM", close: "9:00 PM" },
      { day: "Friday", open: "10:00 AM", close: "9:00 PM" },
      { day: "Saturday", open: "10:00 AM", close: "7:00 PM" },
      { day: "Sunday", open: null, close: null },
    ],
    gallery: [
      salon.image,
      "https://images.unsplash.com/photo-1595475207225-428b62bda831?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&auto=format&fit=crop&q=80",
    ],
  };
}
