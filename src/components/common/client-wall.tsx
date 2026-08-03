import Image from "next/image";

import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { CLIENT_LOGOS } from "@/constants/company";
import { cn } from "@/lib/utils";

/**
 * Client logo wall.
 *
 * Rendered monochrome — white on the dark theme, black on light — via
 * `[data-client-logo]` in `globals.css`.
 *
 * That is not a stylistic whim. Eight of the eleven published marks are dark
 * ink on a transparent background (measured average ink luminance below 90),
 * so they are effectively invisible on this site's canvas. Tinting the whole
 * set to a single colour is the only treatment that renders all eleven
 * legibly in both themes without editing anyone's logo, and it is the usual
 * convention for a wall like this.
 */
export function ClientWall({ className }: { className?: string }) {
  return (
    <Stagger
      as="ul"
      stagger={0.05}
      className={cn(
        "grid grid-cols-2 items-center gap-x-6 gap-y-10",
        "sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
        className,
      )}
    >
      {CLIENT_LOGOS.map((client) => (
        <StaggerItem key={client.name} as="li" className="flex justify-center">
          <Image
            src={client.src}
            alt={client.name}
            width={144}
            height={40}
            data-client-logo=""
            className={cn(
              "h-8 w-auto max-w-[144px] object-contain opacity-60",
              "transition-opacity duration-(--duration-fast) hover:opacity-100",
            )}
          />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
