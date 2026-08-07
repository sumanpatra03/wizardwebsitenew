import { Boxes, ChefHat, ScanBarcode, ShoppingCart } from "lucide-react";

import type { Product } from "@/types/content";

/** The four Smart products, with copy taken from wizardcomm.net/products. */
export const PRODUCTS: readonly Product[] = [
  {
    slug: "smart-commerce-suite",
    image: "/products/smart-commerce-suite.webp",
    name: "Smart Commerce Management Suite",
    tagline: "All-in-one commerce operations",
    description:
      "Transform your business with our Smart Commerce Management Suite — a powerful, all-in-one platform designed to simplify and accelerate modern commerce operations.",
    icon: ShoppingCart,
    features: [
      "Order management",
      "Product management",
      "Inventory management",
      "Delivery management via mobile app",
    ],
  },
  {
    slug: "smart-asset-management",
    image: "/products/smart-asset-management.webp",
    name: "Smart Asset Management Software",
    tagline: "Track every asset, end to end",
    description:
      "Take complete control of your organization's assets with our Smart Asset Management Software — a robust and intelligent solution designed to streamline asset tracking, maintenance, and lifecycle management.",
    icon: Boxes,
    features: [
      "Asset allocation",
      "Asset disposition",
      "Maintenance scheduling",
      "Financial synchronization",
    ],
    externalUrl: "https://www.gobiens.com",
  },
  {
    slug: "smart-restaurant-management",
    image: "/products/smart-restaurant-management.webp",
    name: "Smart Restaurant Management Software",
    tagline: "Run the whole back of house",
    description:
      "Optimize your restaurant operations with our Smart Restaurant Management Software — an all-in-one solution built to simplify daily management and improve operational efficiency.",
    icon: ChefHat,
    features: [
      "Inventory, purchasing and requisitions",
      "HRMS, attendance and rosters",
      "Staff operations",
      "Housekeeping",
    ],
  },
  {
    slug: "smart-restaurant-pos",
    image: "/products/smart-restaurant-pos.webp",
    name: "Smart Restaurant POS System",
    tagline: "Fast, reliable front of house",
    description:
      "Simplify your restaurant operations with our Smart Restaurant POS System — a fast, reliable, and intelligent solution for modern food businesses.",
    icon: ScanBarcode,
    features: [
      "Table management and KOT processing",
      "Billing and payment handling",
      "QR ordering",
      "Sales reports",
    ],
  },
] as const;
