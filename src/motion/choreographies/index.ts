import type { Choreo } from "../choreography";
import { hero } from "./hero";
import { anyHour } from "./anyHour";
import { territories } from "./territories";
import { fromOurHouse } from "./fromOurHouse";
import { houses } from "./houses";
import { manifesto } from "./manifesto";
import { footer } from "./footer";

/** Seções sem coreografia própria usam só os decoradores (name: "section"). */
export const choreographies = {
  section: undefined,
  hero,
  anyHour,
  territories,
  fromOurHouse,
  houses,
  manifesto,
  footer,
} satisfies Record<string, Choreo | undefined>;

export type ChoreoName = keyof typeof choreographies;
