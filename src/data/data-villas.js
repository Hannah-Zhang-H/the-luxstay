import { supabaseUrl } from "../services/supabase";

const imageUrl = `${supabaseUrl}/storage/v1/object/public/villa-images/`;

export const villas = [
  {
    name: "001",
    maxCapacity: 2,
    normalPrice: 250,
    discount: 0,
    image: imageUrl + "villa-001.jpg",
    description:
      "Discover the ultimate luxury getaway for couples in the cozy wooden villa 001. Nestled in a picturesque forest, this stunning villa offers a secluded and intimate retreat. Inside, enjoy modern high-quality wood interiors, a comfortable seating area, a fireplace and a fully-equipped kitchen. The plush king-size bed, dressed in fine linens guarantees a peaceful nights sleep. Relax in the spa-like shower and unwind on the private deck with hot tub.",
  },
  {
    name: "002",
    maxCapacity: 2,
    normalPrice: 350,
    discount: 25,
    image: imageUrl + "villa-002.jpg",
    description:
      "Escape to the serenity of nature and indulge in luxury in our cozy villa 002. Perfect for couples, this villa offers a secluded and intimate retreat in the heart of a picturesque forest. Inside, you will find warm and inviting interiors crafted from high-quality wood, a comfortable living area, a fireplace and a fully-equipped kitchen. The luxurious bedroom features a plush king-size bed and spa-like shower. Relax on the private deck with hot tub and take in the beauty of nature.",
  },
  {
    name: "003",
    maxCapacity: 4,
    normalPrice: 300,
    discount: 0,
    image: imageUrl + "villa-003.jpg",
    description:
      "Experience luxury family living in our medium-sized wooden villa 003. Perfect for families of up to 4 people, this villa offers a comfortable and inviting space with all modern amenities. Inside, you will find warm and inviting interiors crafted from high-quality wood, a comfortable living area, a fireplace, and a fully-equipped kitchen. The bedrooms feature plush beds and spa-like bathrooms. The villa has a private deck with a hot tub and outdoor seating area, perfect for taking in the natural surroundings.",
  },
  {
    name: "004",
    maxCapacity: 4,
    normalPrice: 500,
    discount: 50,
    image: imageUrl + "villa-004.jpg",
    description:
      "Indulge in the ultimate luxury family vacation in this medium-sized villa 004. Designed for families of up to 4, this villa offers a sumptuous retreat for the discerning traveler. Inside, the villa boasts of opulent interiors crafted from the finest quality wood, a comfortable living area, a fireplace, and a fully-equipped gourmet kitchen. The bedrooms are adorned with plush beds and spa-inspired en-suite bathrooms. Step outside to your private deck and soak in the natural surroundings while relaxing in your own hot tub.",
  },
  {
    name: "005",
    maxCapacity: 6,
    normalPrice: 350,
    discount: 0,
    image: imageUrl + "villa-005.jpg",
    description:
      "Enjoy a comfortable and cozy getaway with your group or family in our spacious villa 005. Designed to accommodate up to 6 people, this villa offers a secluded retreat in the heart of nature. Inside, the villa features warm and inviting interiors crafted from quality wood, a living area with fireplace, and a fully-equipped kitchen. The bedrooms are comfortable and equipped with en-suite bathrooms. Step outside to your private deck and take in the natural surroundings while relaxing in your own hot tub.",
  },
  {
    name: "006",
    maxCapacity: 6,
    normalPrice: 800,
    discount: 100,
    image: imageUrl + "villa-006.jpg",
    description:
      "Experience the epitome of luxury with your group or family in our spacious wooden villa 006. Designed to comfortably accommodate up to 6 people, this villa offers a lavish retreat in the heart of nature. Inside, the villa features opulent interiors crafted from premium wood, a grand living area with fireplace, and a fully-equipped gourmet kitchen. The bedrooms are adorned with plush beds and spa-like en-suite bathrooms. Step outside to your private deck and soak in the natural surroundings while relaxing in your own hot tub.",
  },
  {
    name: "007",
    maxCapacity: 8,
    normalPrice: 600,
    discount: 100,
    image: imageUrl + "villa-007.jpg",
    description:
      "Accommodate your large group or multiple families in the spacious and grand wooden villa 007. Designed to comfortably fit up to 8 people, this villa offers a secluded retreat in the heart of beautiful forests and mountains. Inside, the villa features warm and inviting interiors crafted from quality wood, multiple living areas with fireplace, and a fully-equipped kitchen. The bedrooms are comfortable and equipped with en-suite bathrooms. The villa has a private deck with a hot tub and outdoor seating area, perfect for taking in the natural surroundings.",
  },
  {
    name: "008",
    maxCapacity: 10,
    normalPrice: 1400,
    discount: 0,
    image: imageUrl + "villa-008.jpg",
    description:
      "Experience the epitome of luxury and grandeur with your large group or multiple families in our grand villa 008. This villa offers a lavish retreat that caters to all your needs and desires. The villa features an opulent design and boasts of high-end finishes, intricate details and the finest quality wood throughout. Inside, the villa features multiple grand living areas with fireplaces, a formal dining area, and a gourmet kitchen that is a chef's dream. The bedrooms are designed for ultimate comfort and luxury, with plush beds and en-suite spa-inspired bathrooms. Step outside and immerse yourself in the beauty of nature from your private deck, featuring a luxurious hot tub and ample seating areas for ultimate relaxation and enjoyment.",
  },
];
