import Navbar from '@/components/Navbar';
import { PrismaHero } from '@/components/PrismaHero';
import Menu from '@/components/Menu';
import Offers from '@/components/Offers';
import { PrismaAbout } from '@/components/PrismaAbout';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <PrismaHero />
      <PrismaAbout />
      <Menu />
      <Offers />
      <Contact />
    </main>
  );
}
