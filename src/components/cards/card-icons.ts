import {
  Building2,
  GraduationCap,
  HeartPulse,
  Landmark,
  Rocket,
  ShoppingBag,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Icon registry for card data.
 *
 * Cards are defined in `src/constants` (server) and rendered by
 * `<CardsSection>` (client), so their fields have to survive serialisation
 * across that boundary. A React component cannot — passing one directly fails
 * the build with "Functions cannot be passed directly to Client Components".
 *
 * The data therefore carries a name, and the lookup happens on the client.
 */
export const CARD_ICONS = {
  building: Building2,
  landmark: Landmark,
  graduation: GraduationCap,
  health: HeartPulse,
  commerce: ShoppingBag,
  rocket: Rocket,
} as const satisfies Record<string, LucideIcon>;

export type CardIconName = keyof typeof CARD_ICONS;
