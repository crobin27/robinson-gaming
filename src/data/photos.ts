export type PhotoCategory =
  | "landscape"
  | "portrait"
  | "city"
  | "wildlife"
  | "other";

export interface Photo {
  id: string;
  publicId: string;
  width: number;
  height: number;
  title?: string;
  location?: string;
  takenAt?: string;
  camera?: string;
  lens?: string;
  category: PhotoCategory;
  featured?: boolean;
}

export const photos: Photo[] = [
  {
    id: "photo-001",
    publicId: "20250317_072406_gshafw",
    width: 5264,
    height: 3944,
    takenAt: "2025-03-17",
    category: "landscape",
    featured: true,
  },
  {
    id: "photo-002",
    publicId: "20250815_185200_rapfbv",
    width: 5712,
    height: 4284,
    takenAt: "2025-08-15",
    category: "landscape",
  },
  {
    id: "photo-003",
    publicId: "20250815_194845_acocq4",
    width: 5712,
    height: 4284,
    takenAt: "2025-08-15",
    category: "landscape",
    featured: true,
  },
  {
    id: "photo-004",
    publicId: "20250815_220051_yjcq5d",
    width: 4000,
    height: 3000,
    takenAt: "2025-08-15",
    category: "landscape",
  },
  {
    id: "photo-005",
    publicId: "20250815_223749_q5gn0n",
    width: 4000,
    height: 3000,
    takenAt: "2025-08-15",
    category: "landscape",
    featured: true,
  },
  {
    id: "photo-006",
    publicId: "20250816_135407_z0bf7r",
    width: 5712,
    height: 4284,
    takenAt: "2025-08-16",
    category: "landscape",
  },
  {
    id: "photo-007",
    publicId: "20250901_195808_jm0jor",
    width: 4080,
    height: 3060,
    takenAt: "2025-09-01",
    category: "landscape",
    featured: true,
  },
];

export const categoryLabels: Record<PhotoCategory, string> = {
  landscape: "Landscapes",
  portrait: "Portraits",
  city: "Cities",
  wildlife: "Wildlife",
  other: "Other",
};

export function getActiveCategories(list: Photo[]): PhotoCategory[] {
  const seen = new Set<PhotoCategory>();
  for (const p of list) seen.add(p.category);
  const order: PhotoCategory[] = [
    "landscape",
    "portrait",
    "city",
    "wildlife",
    "other",
  ];
  return order.filter((c) => seen.has(c));
}
