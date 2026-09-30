import { Hero } from "@/components/sections/Hero";
import { AnyHour } from "@/components/sections/AnyHour";
import { Territories } from "@/components/sections/Territories";
import { MenuCollection } from "@/components/sections/MenuCollection";
import { FromOurHouse } from "@/components/sections/FromOurHouse";
import { Houses } from "@/components/sections/Houses";
import { Happens } from "@/components/sections/Happens";
import { Manifesto } from "@/components/sections/Manifesto";
import { Careers } from "@/components/sections/Careers";
import { UNITS } from "@/content/site";
import { JsonLd, organizationSchema, unitSchema } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <JsonLd data={[organizationSchema(), ...UNITS.map(unitSchema)]} />
      <Hero />
      <AnyHour />
      <Territories />
      <MenuCollection />
      <FromOurHouse />
      <Houses />
      <Happens />
      <Manifesto />
      <Careers />
    </>
  );
}
