import { findPublicImage } from "@/lib/public-image";

import { CareersCanvas } from "./careers-canvas";

/**
 * Careers.
 *
 * Server Component whose only job is resolving the image path — the file
 * lookup has to happen on the server, and the result is a plain string, which
 * crosses the boundary to the client canvas without trouble.
 */
export function Careers() {
  // Drop a file into `public/careers/` and it appears — see that README.
  const image = findPublicImage("careers", "team");

  return <CareersCanvas image={image} />;
}
