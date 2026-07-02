import PublicLayout from "../components/layout/PublicLayout";

import Hero from "../components/sections/Hero";
import Services from "../components/sections/Services";
import Process from "../components/sections/Process";
import ContactCTA from "../components/sections/ContactCTA";

export default function HomePage() {
  return (
    <PublicLayout>
      <Hero />
      <Services />
      <Process />
      <ContactCTA />
    </PublicLayout>
  );
}