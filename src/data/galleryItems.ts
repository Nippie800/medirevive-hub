export type GalleryItem = {
  id: number;
  slug: string;

  title: string;
  category: string;

  image: string;
  alt: string;

  shortDescription: string;
  description: string;

  features: string[];

  cta: string;

  featured: boolean;
};

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    slug: "electrical-plinth",

    title: "Electrical Plinth",
    category: "Examination Beds & Plinths",

    image: "/gallery/electrical-plinth.jpg",
    alt: "Electrical treatment plinth restored by MediRevive",

    shortDescription:
      "Medical-grade reupholstery for electrically adjustable treatment plinths.",

    description:
      "Electrical treatment plinths professionally restored using premium medical-grade upholstery, high-density foam replacement and durable hygienic materials. Ideal for physiotherapy, rehabilitation and healthcare facilities looking to extend equipment life while avoiding costly replacements.",

    features: [
      "Medical-grade upholstery",
      "High-density foam replacement",
      "Electrical plinth restoration",
      "Custom colour options",
      "Structural repairs",
    ],

    cta: "Request a Quote",

    featured: true,
  },

  {
    id: 2,
    slug: "chiropractic-bed",

    title: "Chiropractic Bed",
    category: "Examination Beds & Plinths",

    image: "/gallery/chiropractic-bed.jpg",
    alt: "Restored chiropractic treatment bed",

    shortDescription:
      "Professional restoration of chiropractic treatment beds.",

    description:
      "Our chiropractic bed restoration service includes complete upholstery replacement, structural repairs and custom colour finishes while maintaining patient comfort and professional presentation.",

    features: [
      "Medical-grade vinyl",
      "Foam replacement",
      "Frame repairs",
      "Premium stitching",
      "Custom colours",
    ],

    cta: "Request a Quote",

    featured: false,
  },

  {
    id: 3,
    slug: "bobath-plinth",

    title: "Bobath Plinth",
    category: "Examination Beds & Plinths",

    image: "/gallery/bobath-plinth.jpg",
    alt: "Bobath plinth restoration",

    shortDescription:
      "Heavy-duty rehabilitation plinth restoration.",

    description:
      "Designed for rehabilitation centres and physiotherapy clinics, our Bobath plinth restorations combine durable upholstery with precision craftsmanship for long-lasting performance.",

    features: [
      "Heavy-duty upholstery",
      "Medical-grade vinyl",
      "Foam replacement",
      "Structural repairs",
      "Custom finishes",
    ],

    cta: "Request a Quote",

    featured: false,
  },

  {
    id: 4,
    slug: "portable-plinth",

    title: "Portable Plinth",
    category: "Examination Beds & Plinths",

    image: "/gallery/portable-plinth.jpg",
    alt: "Portable treatment plinth",

    shortDescription:
      "Portable examination bed restoration.",

    description:
      "Restore worn portable treatment plinths with hygienic upholstery, improved comfort and durable materials suitable for everyday clinical use.",

    features: [
      "Portable equipment restoration",
      "Premium upholstery",
      "Custom colours",
      "Foam replacement",
      "Frame inspection",
    ],

    cta: "Request a Quote",

    featured: false,
  },

  {
    id: 5,
    slug: "standard-plinth",

    title: "Standard Plinth",
    category: "Examination Beds & Plinths",

    image: "/gallery/standard-plinth.jpg",
    alt: "Standard examination plinth",

    shortDescription:
      "Professional refurbishment for everyday examination beds.",

    description:
      "Restore standard treatment plinths with fresh upholstery, improved hygiene and structural repairs that extend equipment life.",

    features: [
      "Medical upholstery",
      "Foam replacement",
      "Frame repairs",
      "Colour matching",
      "Premium finish",
    ],

    cta: "Request a Quote",

    featured: false,
  },

  {
    id: 6,
    slug: "traction-bed",

    title: "Traction Bed",
    category: "Examination Beds & Plinths",

    image: "/gallery/traction-bed.jpg",
    alt: "Traction therapy bed",

    shortDescription:
      "Restoration for specialised traction equipment.",

    description:
      "Traction therapy beds restored using durable healthcare-grade upholstery and reinforced structures suitable for intensive clinical environments.",

    features: [
      "Structural reinforcement",
      "Foam replacement",
      "Medical vinyl",
      "Custom upholstery",
      "Long-term durability",
    ],

    cta: "Request a Quote",

    featured: false,
  },

  {
    id: 7,
    slug: "saddle-chair",

    title: "Saddle Chair",
    category: "Medical Seating",

    image: "/gallery/saddle-chair.jpg",
    alt: "Medical saddle chair",

    shortDescription:
      "Ergonomic medical seating restoration.",

    description:
      "Restore ergonomic saddle chairs used by healthcare professionals with premium upholstery and foam replacement for maximum comfort.",

    features: [
      "Seat restoration",
      "Medical-grade vinyl",
      "Foam replacement",
      "Custom colours",
      "Professional finish",
    ],

    cta: "Request a Quote",

    featured: false,
  },

  {
    id: 8,
    slug: "medical-stool",

    title: "Medical Stool",
    category: "Medical Seating",

    image: "/gallery/stool.jpg",
    alt: "Clinical medical stool",

    shortDescription:
      "Clinical stool refurbishment.",

    description:
      "Healthcare stools restored with durable upholstery and hygienic finishes suitable for everyday professional use.",

    features: [
      "Premium vinyl",
      "Foam replacement",
      "Frame inspection",
      "Medical finish",
      "Colour options",
    ],

    cta: "Request a Quote",

    featured: false,
  },

  {
    id: 9,
    slug: "office-chair",

    title: "Office Chair",
    category: "Office & Reception Furniture",

    image: "/gallery/office-chair.jpg",
    alt: "Reception office chair",

    shortDescription:
      "Commercial office seating restoration.",

    description:
      "Reception seating and office chairs restored to improve appearance, comfort and longevity while maintaining a professional workspace.",

    features: [
      "Commercial upholstery",
      "Foam replacement",
      "Frame repairs",
      "Colour matching",
      "Premium finish",
    ],

    cta: "Request a Quote",

    featured: false,
  },

  {
    id: 10,
    slug: "privacy-curtain",

    title: "Privacy Curtain",
    category: "Privacy Curtains & Screens",

    image: "/gallery/privacy-curtain.jpg",
    alt: "Healthcare privacy curtain",

    shortDescription:
      "Healthcare privacy curtain solutions.",

    description:
      "Manufactured and installed using quality healthcare fabrics available in multiple colours and custom sizes.",

    features: [
      "Healthcare fabrics",
      "Custom sizing",
      "Clinic installation",
      "Colour options",
      "Professional finish",
    ],

    cta: "Request a Quote",

    featured: false,
  },

  {
    id: 11,
    slug: "custom-covers",

    title: "Custom Covers",
    category: "Custom Projects",

    image: "/gallery/custom-covers.jpg",
    alt: "Custom PVC medical covers",

    shortDescription:
      "Protective covers manufactured to specification.",

    description:
      "Custom PVC covers, pillowcases and specialised healthcare accessories manufactured to meet your equipment requirements.",

    features: [
      "PVC covers",
      "Pillowcases",
      "Medical-grade materials",
      "Custom sizing",
      "Made to order",
    ],

    cta: "Request a Quote",

    featured: false,
  },

  {
    id: 12,
    slug: "reception-furniture",

    title: "Reception Furniture",
    category: "Office & Reception Furniture",

    image: "/gallery/reception-furniture.jpg",
    alt: "Reception furniture restoration",

    shortDescription:
      "Reception seating restoration.",

    description:
      "Reception and waiting-room furniture restored using durable commercial upholstery to create a welcoming first impression.",

    features: [
      "Reception seating",
      "Commercial upholstery",
      "Foam replacement",
      "Custom finishes",
      "Professional appearance",
    ],

    cta: "Request a Quote",

    featured: false,
  },
];