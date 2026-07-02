import { ReactNode } from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";

type PublicLayoutProps = {
  children: ReactNode;
};

export default function PublicLayout({
  children,
}: PublicLayoutProps) {
  return (
    <main className="site-shell flex min-h-screen flex-col">
      <Navbar />

      <section className="flex-1">
        {children}
      </section>

      <Footer />
    </main>
  );
}