/**
 * Business-type search for the "What type of business do you have?" step.
 * The visitor types in their own words and we resolve it to a category.
 */
import { CATEGORIES } from "./categories.js";

export const ALIASES = {
  clinic: ["clinic", "doctor", "physician", "medical clinic", "gp", "family doctor", "opd", "mbbs"],
  hospital: ["hospital", "nursing home", "multispeciality", "emergency", "icu", "maternity hospital"],
  dental: ["dental", "dentist", "teeth", "tooth", "orthodontist", "braces", "implants", "smile"],
  salon: ["salon", "hair salon", "unisex salon", "hairdresser", "haircut", "barber", "styling"],
  gym: ["gym", "fitness center", "workout", "weights", "bodybuilding", "crossfit", "health club"],
  fitness: ["fitness", "personal trainer", "aerobics", "zumba", "bootcamp", "training studio"],
  cafe: ["cafe", "coffee", "coffee shop", "espresso", "tea shop", "cafeteria", "coffee house"],
  restaurant: ["restaurant", "dhaba", "dining", "eatery", "family restaurant", "fine dining"],
  hotel: ["hotel", "resort", "homestay", "lodge", "guest house", "rooms", "stay", "accommodation"],
  bakery: ["bakery", "cake", "cake shop", "pastry", "bread", "bakers", "birthday cake", "confectionery"],
  coaching: ["coaching", "coaching class", "tuition class", "institute", "jee", "neet", "academy"],
  consultancy: ["consultancy", "consultant", "business consultant", "advisory", "management consulting"],
  "real-estate": ["real estate", "property", "broker", "realtor", "flats", "plots", "builder sales"],
  photography: ["photography", "photographer", "photo studio", "wedding photography", "shoot", "candid"],
  travel: ["travel agency", "travel agent", "ticketing", "visa", "holiday packages", "flight booking"],
  automobile: ["automobile", "garage", "car repair", "car service", "mechanic", "auto repair", "workshop"],
  spa: ["spa", "massage", "wellness spa", "ayurvedic massage", "therapy spa", "relaxation"],
  yoga: ["yoga", "yoga studio", "meditation", "pranayama", "asana", "yoga classes"],
  beauty: ["beauty parlour", "beauty parlor", "beautician", "facial", "threading", "waxing", "beauty salon"],
  freelancer: ["freelancer", "portfolio", "freelance", "personal website", "developer", "designer freelance"],
  interior: ["interior", "interior designer", "interior design", "home decor", "decorator", "interiors"],
  jewellery: ["jewellery", "jewelry", "jeweller", "gold", "silver", "diamond shop", "ornaments", "sonar"],
  ca: ["ca", "chartered accountant", "tax", "tax consultant", "gst", "accountant", "income tax", "audit", "itr"],
  architect: ["architect", "architecture", "building design", "naksha", "plan drawing", "architectural"],
  "ac-repair": ["ac repair", "ac", "air conditioner", "ac service", "hvac", "cooling", "air conditioning"],
  cleaning: ["cleaning", "deep cleaning", "house cleaning", "housekeeping", "office cleaning", "sofa cleaning"],
  laundry: ["laundry", "dry cleaning", "dry cleaner", "washing clothes", "ironing", "press", "dhobi"],
  event: ["event planner", "event management", "wedding planner", "event organiser", "party planner"],
  caterer: ["caterer", "catering", "catering service", "food catering", "banquet catering", "bhojan"],
  nutritionist: ["nutritionist", "dietitian", "dietician", "diet plan", "weight loss diet", "nutrition"],
  makeup: ["makeup artist", "makeup", "bridal makeup", "mua", "party makeup", "hd makeup"],
  "car-detailing": ["car detailing", "car wash", "car cleaning", "ceramic coating", "car polish", "car spa"],
  "bike-service": ["bike service", "bike repair", "two wheeler", "motorcycle repair", "scooter repair", "bike mechanic"],
  "mobile-repair": ["mobile repair", "phone repair", "mobile shop", "cell phone repair", "screen replacement", "smartphone repair"],
  "laptop-repair": ["laptop repair", "computer repair", "pc repair", "desktop repair", "computer service"],
  "appliance-repair": ["appliance repair", "fridge repair", "washing machine repair", "refrigerator", "microwave repair"],
  "ro-service": ["ro service", "ro", "water purifier", "aquaguard", "water filter", "purifier service"],
  "pest-control": ["pest control", "pest", "termite", "cockroach", "mosquito", "rodent", "fumigation"],
  "packers-movers": ["packers and movers", "packers", "movers", "shifting", "relocation", "house shifting"],
  waterproofing: ["waterproofing", "leakage", "seepage", "damp", "terrace leak", "water leakage"],
  "home-renovation": ["renovation", "home renovation", "remodeling", "house repair", "makeover"],
  "modular-kitchen": ["modular kitchen", "kitchen design", "kitchen cabinets", "kitchen interior", "kitchen trolley"],
  "furniture-shop": ["furniture", "furniture shop", "sofa", "bed", "wardrobe", "carpenter", "custom furniture", "dining table"],
  "tiles-sanitary": ["tiles", "sanitary", "sanitaryware", "bathroom fittings", "marble", "tiles shop"],
  "hardware-shop": ["hardware", "hardware shop", "tools", "nuts bolts", "building material", "cement shop"],
  "paint-dealer": ["paint", "painter", "painting service", "paint dealer", "wall painting", "asian paints"],
  "solar-installation": ["solar", "solar panel", "solar installation", "rooftop solar", "net metering", "solar energy"],
  gardening: ["gardening", "landscaping", "garden", "lawn", "nursery plants", "mali", "horticulture"],
  "water-supplier": ["water supplier", "drinking water", "water can", "mineral water", "water jar", "bisleri"],
  "wedding-decoration": ["wedding decoration", "wedding decor", "flower decoration", "stage decoration", "shaadi decor"],
  "mandap-decoration": ["mandap", "mandap decoration", "event decoration", "haldi decor", "pandal", "shamiana decor"],
  "dj-sound": ["dj", "sound system", "dj service", "music system", "sound and light", "orchestra"],
  "tent-house": ["tent house", "tent", "shamiana", "chairs tables", "pandal", "mandap tent", "decorators tent"],
  florist: ["florist", "flowers", "flower shop", "bouquet", "phool", "floral", "flower delivery"],
  "sweet-shop": ["sweet shop", "sweets", "mithai", "misthan", "halwai", "laddu", "kaju katli", "namkeen"],
  "tiffin-service": ["tiffin", "tiffin service", "dabba", "meal service", "lunch service", "home food delivery", "mess"],
  "cloud-kitchen": ["cloud kitchen", "delivery kitchen", "online food", "swiggy zomato", "ghost kitchen"],
  "food-truck": ["food truck", "street food", "food van", "food stall", "mobile kitchen"],
  "pet-grooming": ["pet grooming", "dog grooming", "pet salon", "dog bath", "pet spa", "cat grooming"],
  "pet-boarding": ["pet boarding", "dog boarding", "pet hostel", "dog day care", "pet sitting", "kennel"],
  "pet-training": ["pet training", "dog training", "obedience training", "dog trainer", "puppy training"],
  physiotherapy: ["physiotherapy", "physiotherapist", "physio", "rehab", "back pain", "sports injury"],
  "eye-care": ["eye care", "optical", "optician", "spectacles", "glasses", "eye test", "chashma", "contact lens"],
  pharmacy: ["pharmacy", "medical store", "chemist", "medicines", "druggist", "medical shop", "dawai"],
  "home-tutor": ["home tutor", "tutor", "tuition", "private teacher", "home tuition", "personal tutor"],
  "music-dance": ["music academy", "dance academy", "dance class", "music class", "singing", "guitar", "tabla", "kathak"],
  "driving-school": ["driving school", "driving class", "learn driving", "driving training", "licence training"],
  "computer-training": ["computer training", "computer class", "tally", "ms office", "programming class", "typing"],
  "language-institute": ["language institute", "spoken english", "english class", "german", "french", "ielts", "language class"],
  "study-abroad": ["study abroad", "overseas education", "foreign education", "student visa", "universities abroad"],
  "education-consultant": ["education consultant", "admission consultant", "career counselling", "college admission"],
  "digital-marketing": ["digital marketing", "seo", "google ads", "online marketing", "performance marketing", "marketing agency"],
  printing: ["printing", "xerox", "print shop", "photocopy", "binding", "stationery print", "digital printing"],
  signboard: ["signboard", "sign board", "flex printing", "glow sign", "banner printing", "hoarding", "acp board"],
  "graphic-design": ["graphic design", "logo design", "branding", "graphic designer", "design studio", "packaging design"],
  "video-production": ["video production", "videography", "film production", "video editing", "ad film", "reels shoot"],
  "social-media": ["social media", "social media agency", "instagram marketing", "content agency", "smm"],
  "security-service": ["security", "security agency", "security guard", "bouncer", "watchman", "guard service"],
  "manpower-recruitment": ["manpower", "recruitment", "hr agency", "staffing", "placement agency", "hiring agency", "job consultancy"],
  "construction-contractor": ["construction", "contractor", "builder", "construction company", "turnkey construction"],
  "civil-contractor": ["civil contractor", "civil work", "rcc", "slab", "plaster", "masonry", "mistri"],
  courier: ["courier", "delivery service", "parcel", "logistics", "shipping", "cargo", "transport parcel"],
  "tour-operator": ["tour operator", "tour package", "group tour", "yatra", "sightseeing", "tours"],
  "diagnostic-lab": ["diagnostic lab", "pathology", "blood test", "lab", "medical lab", "x-ray", "ultrasound", "health checkup"],
  "ayurveda": ["ayurveda", "ayurvedic", "homeopathy", "panchakarma", "herbal", "natural treatment", "shirodhara"],
  "dermatology": ["dermatology", "skin", "skin clinic", "acne", "pigmentation", "skin doctor", "cosmetic dermatology"],
  "hair-transplant": ["hair transplant", "trichology", "hair loss", "fue", "dhi", "prp", "baldness", "hair fall"],
  "elder-care": ["old age home", "elder care", "senior care", "assisted living", "nursing home", "home nursing"],
  "massage-center": ["massage", "massage center", "spa massage", "deep tissue", "aromatherapy", "sports massage"],
  "barber-shop": ["barber", "barber shop", "men salon", "mens grooming", "beard trim", "shave", "mens haircut"],
  "mehendi-artist": ["mehendi", "mehndi", "henna", "bridal mehendi", "arabic mehendi", "henna artist"],
  "tattoo-studio": ["tattoo", "tattoo studio", "tattoo artist", "piercing", "tattoo removal", "body art"],
  "nail-art": ["nail art", "nail studio", "manicure", "pedicure", "nail extension", "gel nails"],
  "boutique-tailor": ["boutique", "tailor", "tailoring", "stitching", "blouse", "alteration", "custom stitching"],
  "saree-showroom": ["saree", "saree shop", "silk saree", "clothing", "ethnic wear", "lehenga", "salwar"],
  "ice-cream-parlour": ["ice cream", "ice cream parlour", "sundae", "falooda", "gelato", "scoops"],
  "juice-bar": ["juice", "juice bar", "juice center", "tea stall", "chai", "milkshake", "cold coffee"],
  "dhaba": ["dhaba", "punjabi", "family restaurant", "highway food", "butter chicken", "tandoori"],
  "catering-equipment-rental": ["catering equipment", "equipment rental", "chafing dish", "event equipment"],
  "grocery-store": ["grocery", "kirana", "kirana store", "general store", "daily needs", "ration shop"],
  "dairy-supplier": ["dairy", "milk supplier", "milk delivery", "curd", "paneer", "ghee", "milkman"],
  "meat-fish-shop": ["meat shop", "fish shop", "chicken", "mutton", "seafood", "butcher"],
  "gift-shop": ["gift", "gift shop", "gifts", "hampers", "corporate gifting", "return gifts"],
  "toy-store": ["toys", "toy shop", "toy store", "kids toys", "games", "board games"],
  "book-store": ["books", "book store", "bookshop", "stationery", "notebooks", "school books"],
  "mobile-accessories": ["mobile accessories", "phone cover", "screen guard", "charger", "earphone", "phone case"],
  "electronics-showroom": ["electronics", "electronics shop", "tv", "fridge", "washing machine", "ac", "appliance"],
  "footwear-store": ["footwear", "shoe shop", "shoes", "sneakers", "sandals", "slippers", "sports shoes"],
  "plumber": ["plumber", "plumbing", "leak repair", "tap repair", "pipe fitting", "bathroom fitting"],
  "electrician": ["electrician", "electrical repair", "wiring", "switch board", "fan installation", "light fitting"],
  "carpenter": ["carpenter", "wood work", "furniture maker", "woodwork", "door repair", "modular kitchen"],
  "cctv-installer": ["cctv", "cctv installation", "security camera", "surveillance", "video door phone", "dvr"],
  "water-tank-cleaning": ["water tank cleaning", "tank cleaning", "overhead tank", "sump cleaning"],
  "borewell": ["borewell", "borewell drilling", "water well", "borewell service", "submersible pump"],
  "housekeeping-agency": ["housekeeping", "maid agency", "maid service", "cook", "caretaker", "domestic help"],
  "property-dealer": ["property dealer", "property broker", "real estate broker", "property consultant"],
  "rental-pg": ["pg", "paying guest", "hostel", "rental room", "co-living", "room rent"],
  "coworking-space": ["co-working", "coworking", "shared office", "desk space", "hot desk", "office space"],
  "farm-resort": ["farm resort", "lawn", "wedding lawn", "farmhouse", "farm house", "weekend getaway"],
  "banquet-hall": ["banquet", "banquet hall", "marriage hall", "function hall", "wedding venue", "party hall"],
  "vastu-astrology": ["vastu", "vastu consultant", "astrology", "kundali", "horoscope", "muhurat"],
  "pandit-pooja": ["pandit", "pandit ji", "pooja", "havan", "griha pravesh", "satyanarayan katha"],
  "car-accessories": ["car accessories", "car audio", "car modification", "car wrap", "car lighting"],
  "used-car-dealer": ["used car", "second hand car", "pre owned", "old car", "car dealer"],
  "bike-showroom": ["bike showroom", "bike dealer", "new bike", "motorcycle showroom", "two wheeler"],
  "taxi-service": ["taxi", "cab", "cab service", "taxi service", "airport cab", "auto"],
  "transport-company": ["transport", "logistics", "truck transport", "goods transport", "tempo"],
  "preschool": ["preschool", "play school", "nursery school", "kindergarten", "montessori", "playschool"],
  "school": ["school", "junior college", "high school", "primary school", "secondary school"],
  "competitive-exam": ["competitive exam", "upsc", "neet", "jee", "banking", "ssc", "mpsc", "entrance exam"],
  "spoken-english": ["spoken english", "english speaking", "personality development", "ielts", "public speaking"],
  "art-craft-classes": ["art class", "craft class", "drawing class", "painting class", "art and craft"],
  "skill-training": ["skill training", "vocational training", "technical course", "job training", "iti"],
  "online-course": ["online course", "course creator", "e-learning", "lms", "teach online"],
  "library-study-room": ["library", "study room", "reading room", "study hall", "study center"],
  "lawyer": ["lawyer", "advocate", "legal", "attorney", "legal advice", "court case"],
  "notary-services": ["notary", "notary services", "affidavit", "attestation", "document notary"],
  "insurance-agent": ["insurance", "insurance agent", "life insurance", "health insurance", "policy"],
  "loan-agent": ["loan", "finance", "loan agent", "home loan", "personal loan", "business loan"],
  "gst-accounting": ["gst", "accounting", "bookkeeping", "itr", "tax consultant", "accountant"],
  "stock-broker": ["stock broker", "share market", "trading", "mutual fund", "demat", "investment"],
  "web-design-agency": ["web design", "web development", "website design", "web agency", "app development"],
  "photo-studio": ["photo studio", "photographer", "passport photo", "album", "photo shoot"],
  "wedding-photographer": ["wedding photographer", "wedding photography", "candid photography", "cinematic"],
  "drone-photography": ["drone", "drone photography", "aerial photography", "drone shoot", "aerial"],
  "event-anchor": ["anchor", "emcee", "event host", "master of ceremony", "event anchor"],
  "artist-painter": ["artist", "painter", "portrait artist", "mural artist", "canvas painting"],
  "translator": ["translator", "translation", "interpreter", "language translation"],
  "content-writer": ["content writer", "copywriter", "blog writer", "seo writer", "content writing"],
  "astrologer": ["astrologer", "jyotish", "palmistry", "tarot", "numerology", "fortune teller"],
  "agriculture-dealer": ["agriculture", "fertilizer", "seed shop", "pesticide", "agri shop", "kisan"],
  "tractor-dealer": ["tractor", "farm equipment", "tractor dealer", "agriculture machinery"],
  "nursery-plant-shop": ["nursery", "plant shop", "plant nursery", "garden center", "indoor plants"],
  "fabrication-welding": ["fabrication", "welding", "welding workshop", "gate fabrication", "metal work"],
  "plywood-dealer": ["plywood", "timber", "wood dealer", "laminate", "plywood shop"],
  "cement-supplier": ["cement", "building material", "sand supplier", "bricks", "construction material", "steel"],
  "scrap-dealer": ["scrap", "scrap dealer", "kabadi", "recycling", "e-waste", "raddi"],
  "industrial-equipment": ["industrial equipment", "machinery", "industrial tools", "bearing", "power tools"],
  "electricals-wholesaler": ["electricals", "electrical wholesaler", "wire dealer", "electrical shop", "switchgear"],

  /* online / e-commerce stores */
  "clothing-store": ["clothing store", "clothes shop", "garment store", "fashion store", "apparel", "online clothing"],
  boutique: ["boutique", "fashion boutique", "designer boutique", "pret", "occasion wear boutique"],
  "saree-ethnic": ["saree", "saree shop", "ethnic wear", "lehenga", "salwar suit", "silk saree", "ethnic store", "saree and ethnic"],
  "jewellery-store": ["jewellery store", "jewelry store", "gold shop", "diamond jewellery", "imitation jewellery", "online jewellery"],
  "cosmetics-store": ["cosmetics", "cosmetics store", "beauty store", "makeup store", "skincare shop", "online cosmetics", "cosmetics and beauty"],
  "bakery-cake": ["cake shop", "custom cake", "birthday cake", "online cake", "pastry shop", "cake delivery", "bakery and cake"],
  "mobile-electronics": ["mobile store", "electronics store", "mobile shop", "phone store", "gadgets", "mobile and electronics"],
  "furniture-store": ["furniture store", "online furniture", "home furniture", "sofa store"],
  "optical-store": ["optical store", "optical shop", "eyewear", "spectacles shop", "glasses store"],

  other: ["other", "something else", "general business", "shop", "store"],
};

export const POPULAR = [
  "restaurant", "cafe", "salon", "gym", "clinic", "furniture-shop",
  "real-estate", "photography", "bakery", "automobile", "interior", "event",
];

const norm = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

function scoreCategory(category, query) {
  const q = norm(query);
  if (!q) return 0;
  const label = norm(category.label);
  const aliases = (ALIASES[category.id] || []).map(norm);
  const haystack = [label, norm(category.id.replace(/-/g, " ")), ...aliases];
  let best = 0;
  for (const term of haystack) {
    if (!term) continue;
    if (term === q) best = Math.max(best, 100);
    else if (term.startsWith(q)) best = Math.max(best, 85);
    else if (term.split(" ").some((w) => w === q)) best = Math.max(best, 80);
    else if (term.includes(q)) best = Math.max(best, 65);
    else if (q.includes(term) && term.length > 3) best = Math.max(best, 55);
  }
  if (!best) {
    const words = q.split(" ").filter((w) => w.length > 2);
    if (words.length && words.every((w) => haystack.some((t) => t.includes(w)))) best = 45;
  }
  if (best && label.startsWith(q)) best += 3;
  return best;
}

export function searchCategories(query, limit = 8) {
  const q = norm(query);
  if (!q) return [];
  return CATEGORIES
    .filter((c) => c.id !== "other")
    .map((category) => ({ category, score: scoreCategory(category, q) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.category.label.localeCompare(b.category.label))
    .slice(0, limit);
}

export function bestCategory(query) {
  return searchCategories(query, 1)[0]?.category || null;
}
