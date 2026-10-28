/**
 * Business category catalog.
 * Each category maps to a template *family* — the underlying components stay
 * shared, while the family controls layout, typography, palette and sections.
 */

export const CATEGORIES = [
  { id: "clinic", label: "Clinic", icon: "Stethoscope", template: "clinic", blurb: "Appointments, treatments & doctors" },
  { id: "hospital", label: "Hospital", icon: "Hospital", template: "clinic", blurb: "Departments, emergency & OPD info" },
  { id: "dental", label: "Dental Clinic", icon: "Smile", template: "clinic", blurb: "Smiles, implants & orthodontics" },
  { id: "salon", label: "Salon", icon: "Scissors", template: "salon", blurb: "Stylists, services & bookings" },
  { id: "gym", label: "Gym", icon: "Dumbbell", template: "gym", blurb: "Memberships, trainers & classes" },
  { id: "fitness", label: "Fitness Center", icon: "Flame", template: "gym", blurb: "Programs, CrossFit & coaching" },
  { id: "cafe", label: "Cafe", icon: "Coffee", template: "cafe", blurb: "Menu, brews & cozy corners" },
  { id: "restaurant", label: "Restaurant", icon: "UtensilsCrossed", template: "restaurant", blurb: "Menus, chefs & reservations" },
  { id: "hotel", label: "Hotel", icon: "BedDouble", template: "business", blurb: "Rooms, amenities & bookings" },
  { id: "bakery", label: "Bakery", icon: "Croissant", template: "cafe", blurb: "Fresh bakes & custom cakes" },
  { id: "coaching", label: "Coaching Institute", icon: "GraduationCap", template: "business", blurb: "Courses, faculty & results" },
  { id: "consultancy", label: "Consultancy", icon: "Briefcase", template: "business", blurb: "Services, cases & expertise" },
  { id: "real-estate", label: "Real Estate", icon: "Building2", template: "business", blurb: "Listings, agents & site visits" },
  { id: "photography", label: "Photography", icon: "Camera", template: "business", blurb: "Portfolios, shoots & packages" },
  { id: "travel", label: "Travel Agency", icon: "Plane", template: "business", blurb: "Packages, tours & itineraries" },
  { id: "automobile", label: "Automobile / Garage", icon: "Car", template: "business", blurb: "Repairs, services & estimates" },
  { id: "spa", label: "Spa", icon: "Flower2", template: "salon", blurb: "Therapies, rituals & calm" },
  { id: "yoga", label: "Yoga Studio", icon: "HeartPulse", template: "gym", blurb: "Classes, teachers & retreats" },
  { id: "beauty", label: "Beauty Parlour", icon: "Sparkles", template: "salon", blurb: "Makeovers, bridal & care" },
  { id: "freelancer", label: "Freelancer / Portfolio", icon: "Laptop", template: "business", blurb: "Work, skills & contact" },
  { id: "interior", label: "Interior Designer", icon: "Sofa", template: "business", blurb: "Projects, styles & consultations" },
  { id: "jewellery", label: "Jewellery Shop", icon: "Gem", template: "business", blurb: "Collections, craftsmanship & bespoke" },
  { id: "ca", label: "CA / Tax Consultant", icon: "Calculator", template: "business", blurb: "Tax, audit & compliance services" },
  { id: "architect", label: "Architect", icon: "PencilRuler", template: "business", blurb: "Projects, drawings & planning" },
  { id: "ac-repair", label: "AC Repair Service", icon: "Fan", template: "business", blurb: "Installs, repairs & AMC plans" },
  { id: "cleaning", label: "Cleaning Service", icon: "SprayCan", template: "business", blurb: "Deep cleaning, homes & offices" },
  { id: "laundry", label: "Laundry", icon: "WashingMachine", template: "business", blurb: "Wash, dry-clean & express service" },
  { id: "event", label: "Event Planner", icon: "PartyPopper", template: "business", blurb: "Weddings, corporate & decor" },
  { id: "caterer", label: "Caterer", icon: "ChefHat", template: "business", blurb: "Menus, live counters & packages" },
  { id: "nutritionist", label: "Nutritionist / Dietitian", icon: "Salad", template: "business", blurb: "Diet plans & wellness coaching" },
  { id: "makeup", label: "Makeup Artist", icon: "Paintbrush", template: "business", blurb: "Bridal, party & editorial looks" },

  /* ------------------------- automotive & transport ------------------------ */
  { id: "car-detailing", label: "Car Detailing & Car Wash", icon: "Car", template: "business", blurb: "Wash, polish & ceramic coating" },
  { id: "bike-service", label: "Bike Service & Repair", icon: "Bike", template: "business", blurb: "Servicing, repairs & spares" },
  { id: "car-rental", label: "Car Rental Service", icon: "KeyRound", template: "business", blurb: "Self-drive & chauffeur rentals" },
  { id: "bike-rental", label: "Bike Rental Service", icon: "Bike", template: "business", blurb: "Hourly, daily & monthly rentals" },

  /* ------------------------------ repairs -------------------------------- */
  { id: "mobile-repair", label: "Mobile Repair Shop", icon: "Smartphone", template: "business", blurb: "Screen, battery & board level" },
  { id: "laptop-repair", label: "Computer / Laptop Repair", icon: "Laptop", template: "business", blurb: "Hardware, software & upgrades" },
  { id: "appliance-repair", label: "Home Appliance Repair", icon: "Refrigerator", template: "business", blurb: "Fridge, AC, washing machine" },
  { id: "ro-service", label: "RO Water Purifier Service", icon: "Droplets", template: "business", blurb: "Filter changes & AMC plans" },

  /* -------------------------- home & property ---------------------------- */
  { id: "pest-control", label: "Pest Control Service", icon: "Bug", template: "business", blurb: "Termites, cockroaches & mosquitoes" },
  { id: "packers-movers", label: "Packers & Movers", icon: "Truck", template: "business", blurb: "Home & office shifting" },
  { id: "waterproofing", label: "Waterproofing Service", icon: "ShieldCheck", template: "business", blurb: "Terrace, bathroom & basement" },
  { id: "home-renovation", label: "Home Renovation Service", icon: "Hammer", template: "business", blurb: "Repairs, upgrades & makeovers" },
  { id: "modular-kitchen", label: "Modular Kitchen Studio", icon: "UtensilsCrossed", template: "business", blurb: "Design, build & installation" },
  { id: "furniture-shop", label: "Furniture Shop / Custom Furniture", icon: "Armchair", template: "business", blurb: "Sofas, beds & bespoke pieces" },
  { id: "tiles-sanitary", label: "Tiles & Sanitary Shop", icon: "Bath", template: "business", blurb: "Tiles, fittings & bathware" },
  { id: "hardware-shop", label: "Hardware Shop", icon: "Wrench", template: "business", blurb: "Tools, fittings & materials" },
  { id: "paint-dealer", label: "Paint Dealer / Painting Service", icon: "Paintbrush", template: "business", blurb: "Paints, textures & painting" },
  { id: "solar-installation", label: "Solar Installation Service", icon: "Sun", template: "business", blurb: "Rooftop panels & net metering" },
  { id: "gardening", label: "Gardening / Landscaping Service", icon: "Sprout", template: "business", blurb: "Design, lawns & maintenance" },
  { id: "water-supplier", label: "Packaged Drinking Water Supplier", icon: "GlassWater", template: "business", blurb: "Cans, jars & doorstep delivery" },

  /* ------------------------------ events --------------------------------- */
  { id: "wedding-decoration", label: "Wedding Decoration", icon: "Flower", template: "business", blurb: "Themes, florals & stage decor" },
  { id: "mandap-decoration", label: "Mandap / Event Decoration", icon: "Tent", template: "business", blurb: "Mandaps, haldi & sangeet setups" },
  { id: "dj-sound", label: "DJ & Sound System", icon: "Music", template: "business", blurb: "Weddings, events & concerts" },
  { id: "tent-house", label: "Tent House", icon: "Tent", template: "business", blurb: "Shamianas, tables & chairs" },

  /* ------------------------------- food ---------------------------------- */
  { id: "florist", label: "Florist", icon: "Flower", template: "business", blurb: "Bouquets, events & subscriptions" },
  { id: "sweet-shop", label: "Sweet Shop", icon: "Candy", template: "business", blurb: "Fresh mithai & festival boxes" },
  { id: "tiffin-service", label: "Tiffin Service", icon: "Sandwich", template: "business", blurb: "Home-cooked meals, delivered" },
  { id: "cloud-kitchen", label: "Cloud Kitchen", icon: "ChefHat", template: "business", blurb: "Delivery-only food business" },
  { id: "food-truck", label: "Food Truck", icon: "Truck", template: "business", blurb: "Street food & event catering" },

  /* ------------------------------- pets ---------------------------------- */
  { id: "pet-grooming", label: "Pet Grooming", icon: "Scissors", template: "business", blurb: "Bathing, trims & spa care" },
  { id: "pet-boarding", label: "Pet Boarding", icon: "Dog", template: "business", blurb: "Day care & overnight stays" },
  { id: "pet-training", label: "Pet Training", icon: "PawPrint", template: "business", blurb: "Obedience & behaviour training" },

  /* ------------------------------ health --------------------------------- */
  { id: "physiotherapy", label: "Physiotherapy Center", icon: "Activity", template: "business", blurb: "Pain relief & rehab programs" },
  { id: "eye-care", label: "Eye Care / Optical Shop", icon: "Eye", template: "business", blurb: "Eye tests, frames & lenses" },
  { id: "pharmacy", label: "Pharmacy / Medical Store", icon: "Pill", template: "business", blurb: "Medicines & home delivery" },

  /* ---------------------------- education -------------------------------- */
  { id: "home-tutor", label: "Home Tutor", icon: "BookOpen", template: "business", blurb: "One-on-one teaching at home" },
  { id: "music-dance", label: "Music / Dance Academy", icon: "Music", template: "business", blurb: "Classes, grades & performances" },
  { id: "driving-school", label: "Driving School", icon: "Car", template: "business", blurb: "Two & four wheeler training" },
  { id: "computer-training", label: "Computer Training Institute", icon: "Monitor", template: "business", blurb: "Basics, Tally & programming" },
  { id: "language-institute", label: "Language Institute", icon: "Languages", template: "business", blurb: "Spoken English & foreign languages" },
  { id: "study-abroad", label: "Study Abroad Consultant", icon: "Plane", template: "business", blurb: "Visas, universities & admissions" },
  { id: "education-consultant", label: "Education Consultant", icon: "GraduationCap", template: "business", blurb: "Admissions & career guidance" },

  /* ---------------------------- creative & media -------------------------- */
  { id: "digital-marketing", label: "Digital Marketing Agency", icon: "Megaphone", template: "business", blurb: "SEO, ads & social growth" },
  { id: "printing", label: "Printing & Xerox Shop", icon: "Printer", template: "business", blurb: "Printing, binding & stationery" },
  { id: "signboard", label: "Signboard / Flex Printing", icon: "PanelTop", template: "business", blurb: "Boards, flex & glow signs" },
  { id: "graphic-design", label: "Graphic Design Studio", icon: "PenTool", template: "business", blurb: "Logos, branding & collateral" },
  { id: "video-production", label: "Video Production Studio", icon: "Clapperboard", template: "business", blurb: "Films, ads & reels" },
  { id: "social-media", label: "Social Media Agency", icon: "AtSign", template: "business", blurb: "Content, reels & management" },

  /* --------------------------- industry & trades -------------------------- */
  { id: "security-service", label: "Security Service Agency", icon: "ShieldCheck", template: "business", blurb: "Guards, bouncers & events" },
  { id: "manpower-recruitment", label: "Manpower / Recruitment Agency", icon: "Users", template: "business", blurb: "Hiring, staffing & payroll" },
  { id: "construction-contractor", label: "Construction Contractor", icon: "HardHat", template: "business", blurb: "Turnkey builds & civil work" },
  { id: "civil-contractor", label: "Civil Contractor", icon: "Ruler", template: "business", blurb: "Slabs, plaster & finishing" },
  { id: "courier", label: "Courier & Delivery Service", icon: "Package", template: "business", blurb: "Local, national & express" },
  { id: "tour-operator", label: "Tour Operator", icon: "Map", template: "business", blurb: "Group tours & fixed departures" },

  /* ----------------------- health & medical (new) ----------------------- */
  { id: "diagnostic-lab", label: "Diagnostic Lab / Pathology", icon: "ScanLine", template: "business", blurb: "Blood tests, scans & reports" },
  { id: "ayurveda", label: "Ayurveda / Homeopathy Clinic", icon: "Leaf", template: "business", blurb: "Natural & holistic healing" },
  { id: "dermatology", label: "Dermatology / Skin Clinic", icon: "Sparkles", template: "business", blurb: "Skin, hair & nail treatments" },
  { id: "hair-transplant", label: "Hair Transplant / Trichology", icon: "UserCheck", template: "business", blurb: "Hair restoration & scalp care" },
  { id: "elder-care", label: "Old Age Home / Elder Care", icon: "HeartPulse", template: "business", blurb: "Assisted living & senior care" },
  { id: "massage-center", label: "Massage Center", icon: "Hand", template: "salon", blurb: "Therapeutic & relaxing massage" },

  /* ---------------------- beauty & personal (new) ---------------------- */
  { id: "barber-shop", label: "Barber Shop / Men's Grooming", icon: "Scissors", template: "salon", blurb: "Cuts, beards & grooming" },
  { id: "mehendi-artist", label: "Mehendi Artist", icon: "Palette", template: "business", blurb: "Bridal & festive mehendi art" },
  { id: "tattoo-studio", label: "Tattoo Studio", icon: "PenTool", template: "business", blurb: "Custom tattoos & piercings" },
  { id: "nail-art", label: "Nail Art Studio", icon: "Gem", template: "salon", blurb: "Manicures, extensions & art" },
  { id: "boutique-tailor", label: "Boutique / Tailor", icon: "Shirt", template: "business", blurb: "Custom stitching & alterations" },
  { id: "saree-showroom", label: "Saree / Clothing Showroom", icon: "Crown", template: "business", blurb: "Sarees, suits & ethnic wear" },

  /* --------------------------- food (new) --------------------------- */
  { id: "ice-cream-parlour", label: "Ice Cream Parlour", icon: "Sparkles", template: "cafe", blurb: "Scoops, sundaes & faloodas" },
  { id: "juice-bar", label: "Juice Bar / Tea Stall", icon: "Coffee", template: "cafe", blurb: "Fresh juices & cutting chai" },
  { id: "dhaba", label: "Dhaba / Family Restaurant", icon: "UtensilsCrossed", template: "restaurant", blurb: "Punjabi dhaba-style dining" },
  { id: "catering-equipment-rental", label: "Catering Equipment Rental", icon: "Package", template: "business", blurb: "Chafing dishes, tables & tents" },

  /* -------------------- online / e-commerce stores -------------------- */
  { id: "clothing-store", label: "Clothing Store", icon: "Shirt", template: "store", blurb: "Collections, sizes & online orders" },
  { id: "boutique", label: "Boutique", icon: "Sparkles", template: "store", blurb: "Curated fashion, pret & occasion wear" },
  { id: "saree-ethnic", label: "Saree & Ethnic Wear", icon: "Crown", template: "store", blurb: "Sarees, lehengas & ethnic collections" },
  { id: "jewellery-store", label: "Jewellery Store", icon: "Gem", template: "store", blurb: "Gold, silver, diamond & imitation jewellery" },
  { id: "cosmetics-store", label: "Cosmetics & Beauty Store", icon: "Brush", template: "store", blurb: "Skincare, makeup & online orders" },
  { id: "footwear-store", label: "Footwear Store", icon: "Footprints", template: "store", blurb: "Shoes, sandals & sneakers" },
  { id: "bakery-cake", label: "Bakery & Cake Shop", icon: "Cake", template: "store", blurb: "Fresh bakes, custom cakes & online orders" },
  { id: "mobile-electronics", label: "Mobile & Electronics Store", icon: "Smartphone", template: "store", blurb: "Phones, gadgets & accessories" },
  { id: "furniture-store", label: "Furniture Store", icon: "Sofa", template: "store", blurb: "Sofas, beds & home furniture" },
  { id: "optical-store", label: "Optical Store", icon: "Glasses", template: "store", blurb: "Eyewear, frames & lenses" },
  { id: "gift-shop", label: "Gift Shop", icon: "Gift", template: "store", blurb: "Gifts, hampers & wrapping" },

  /* -------------------------- retail (new) -------------------------- */
  { id: "grocery-store", label: "Grocery / Kirana Store", icon: "ShoppingCart", template: "business", blurb: "Daily essentials & home delivery" },
  { id: "dairy-supplier", label: "Dairy / Milk Supplier", icon: "Coffee", template: "business", blurb: "Fresh milk, curd & paneer" },
  { id: "meat-fish-shop", label: "Meat / Fish Shop", icon: "UtensilsCrossed", template: "business", blurb: "Fresh chicken, mutton & seafood" },
  { id: "toy-store", label: "Toy Store", icon: "Gamepad2", template: "business", blurb: "Toys, games & kids' gifts" },
  { id: "book-store", label: "Book Store / Stationery", icon: "BookOpen", template: "business", blurb: "Books, notebooks & supplies" },
  { id: "mobile-accessories", label: "Mobile Accessories Shop", icon: "Smartphone", template: "business", blurb: "Covers, chargers & repairs" },
  { id: "electronics-showroom", label: "Electronics Showroom", icon: "Monitor", template: "business", blurb: "TVs, appliances & gadgets" },

  /* ----------------------- home services (new) ----------------------- */
  { id: "plumber", label: "Plumber", icon: "Wrench", template: "business", blurb: "Leaks, fittings & installations" },
  { id: "electrician", label: "Electrician", icon: "Zap", template: "business", blurb: "Wiring, repairs & fittings" },
  { id: "carpenter", label: "Carpenter", icon: "Hammer", template: "business", blurb: "Furniture repair & custom woodwork" },
  { id: "cctv-installer", label: "CCTV / Security Systems", icon: "Camera", template: "business", blurb: "Cameras, DVRs & AMC" },
  { id: "water-tank-cleaning", label: "Water Tank Cleaning", icon: "Droplets", template: "business", blurb: "Overhead & underground tanks" },
  { id: "borewell", label: "Borewell / Water Services", icon: "Droplets", template: "business", blurb: "Borewell drilling & water supply" },
  { id: "housekeeping-agency", label: "Housekeeping / Maid Agency", icon: "Users", template: "business", blurb: "Maids, cooks & caretakers" },

  /* ------------------------ real estate (new) ------------------------ */
  { id: "property-dealer", label: "Property Dealer / Broker", icon: "Building2", template: "business", blurb: "Buy, sell & rent properties" },
  { id: "rental-pg", label: "Rental / PG / Hostel", icon: "BedDouble", template: "business", blurb: "Rooms, PG & co-living spaces" },
  { id: "coworking-space", label: "Co-working Space", icon: "Users", template: "business", blurb: "Desks, cabins & meeting rooms" },
  { id: "farm-resort", label: "Lawn / Farm Resort", icon: "Sun", template: "business", blurb: "Events, stays & open lawns" },
  { id: "banquet-hall", label: "Marriage / Banquet Hall", icon: "Landmark", template: "business", blurb: "Weddings & functions venue" },

  /* ----------------------- spiritual (new) ----------------------- */
  { id: "vastu-astrology", label: "Vastu / Astrology Consultant", icon: "Star", template: "business", blurb: "Vastu, kundali & remedies" },
  { id: "pandit-pooja", label: "Pandit / Pooja Services", icon: "Flame", template: "business", blurb: "Pooja, havan & ceremonies" },

  /* ----------------------- automotive (new) ----------------------- */
  { id: "car-accessories", label: "Car Accessories & Modification", icon: "Car", template: "business", blurb: "Audio, interiors & mods" },
  { id: "used-car-dealer", label: "Used Car Dealer", icon: "Car", template: "business", blurb: "Certified pre-owned cars" },
  { id: "bike-showroom", label: "Bike Showroom", icon: "Bike", template: "business", blurb: "New bikes & test rides" },
  { id: "taxi-service", label: "Taxi / Cab Service", icon: "Car", template: "business", blurb: "Local & outstation cabs" },
  { id: "transport-company", label: "Truck / Transport Company", icon: "Truck", template: "business", blurb: "Goods transport & logistics" },

  /* ------------------------ education (new) ------------------------ */
  { id: "preschool", label: "Preschool / Play School", icon: "Baby", template: "business", blurb: "Nursery, LKG & UKG" },
  { id: "school", label: "School / Junior College", icon: "GraduationCap", template: "business", blurb: "Primary, secondary & higher" },
  { id: "competitive-exam", label: "Competitive Exam Coaching", icon: "Target", template: "business", blurb: "UPSC, NEET, JEE & banking" },
  { id: "spoken-english", label: "Spoken English / PD", icon: "Languages", template: "business", blurb: "English fluency & interview prep" },
  { id: "art-craft-classes", label: "Art & Craft Classes", icon: "Palette", template: "business", blurb: "Drawing, painting & crafts" },
  { id: "skill-training", label: "Skill / Vocational Training", icon: "Settings", template: "business", blurb: "Technical & job-ready skills" },
  { id: "online-course", label: "Online Course Creator", icon: "Laptop", template: "business", blurb: "Courses, tutorials & e-learning" },
  { id: "library-study-room", label: "Library / Study Room", icon: "BookOpen", template: "business", blurb: "Quiet study space & books" },

  /* --------------------- legal & finance (new) --------------------- */
  { id: "lawyer", label: "Lawyer / Advocate", icon: "Scale", template: "business", blurb: "Civil, criminal & family law" },
  { id: "notary-services", label: "Notary / Legal Documentation", icon: "FileText", template: "business", blurb: "Notary, affidavits & agreements" },
  { id: "insurance-agent", label: "Insurance Agent", icon: "ShieldCheck", template: "business", blurb: "Life, health & vehicle insurance" },
  { id: "loan-agent", label: "Loan / Finance Agent", icon: "Wallet", template: "business", blurb: "Home, personal & business loans" },
  { id: "gst-accounting", label: "GST / Accounting Services", icon: "Calculator", template: "business", blurb: "GST filing & bookkeeping" },
  { id: "stock-broker", label: "Stock Broker / Trading Advisor", icon: "TrendingUp", template: "business", blurb: "Equity, mutual funds & advisory" },

  /* ---------------------- creative & media (new) ---------------------- */
  { id: "web-design-agency", label: "Web Design Agency", icon: "Laptop", template: "business", blurb: "Websites, apps & e-commerce" },
  { id: "photo-studio", label: "Photo Studio / Album Maker", icon: "Camera", template: "business", blurb: "Portraits, passports & albums" },
  { id: "wedding-photographer", label: "Wedding Photographer", icon: "Camera", template: "business", blurb: "Candid, traditional & cinematic" },
  { id: "drone-photography", label: "Drone Photography", icon: "Video", template: "business", blurb: "Aerial shots & cinematography" },
  { id: "event-anchor", label: "Event Anchor / Emcee", icon: "Mic", template: "business", blurb: "Weddings, corporate & shows" },
  { id: "artist-painter", label: "Artist / Painter", icon: "Brush", template: "business", blurb: "Portraits, canvas & murals" },
  { id: "translator", label: "Translator / Interpreter", icon: "Languages", template: "business", blurb: "Document & live interpretation" },
  { id: "content-writer", label: "Content Writer / Blogger", icon: "FileText", template: "business", blurb: "Blogs, websites & copywriting" },
  { id: "astrologer", label: "Astrologer", icon: "Star", template: "business", blurb: "Kundali, numerology & tarot" },

  /* ----------------------- agriculture (new) ----------------------- */
  { id: "agriculture-dealer", label: "Agriculture / Fertilizer Shop", icon: "Sprout", template: "business", blurb: "Seeds, fertilizers & pesticides" },
  { id: "tractor-dealer", label: "Tractor / Farm Equipment", icon: "Settings", template: "business", blurb: "Tractors, implements & service" },
  { id: "nursery-plant-shop", label: "Nursery / Plant Shop", icon: "Flower2", template: "business", blurb: "Plants, pots & gardening supplies" },

  /* ------------------------ industrial (new) ------------------------ */
  { id: "fabrication-welding", label: "Fabrication / Welding Workshop", icon: "Wrench", template: "business", blurb: "Gates, grills & structural work" },
  { id: "plywood-dealer", label: "Plywood / Timber Dealer", icon: "Layers", template: "business", blurb: "Plywood, laminates & hardware" },
  { id: "cement-supplier", label: "Cement / Building Materials", icon: "Building2", template: "business", blurb: "Cement, sand, bricks & steel" },
  { id: "scrap-dealer", label: "Scrap Dealer", icon: "Trash2", template: "business", blurb: "Metal, paper & e-waste recycling" },
  { id: "industrial-equipment", label: "Industrial Equipment Supplier", icon: "Settings", template: "business", blurb: "Machinery, tools & spares" },
  { id: "electricals-wholesaler", label: "Electricals Wholesaler", icon: "Zap", template: "business", blurb: "Wires, switchgear & fittings" },

  { id: "other", label: "Other Business", icon: "Store", template: "business", blurb: "Any local business, beautifully online" },
];

export const getCategory = (id) => CATEGORIES.find((c) => c.id === id) || CATEGORIES.find((c) => c.id === "other");

export const categoryLabel = (id) => getCategory(id).label;
