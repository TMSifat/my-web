import { PrismaHero } from '@/components/PrismaHero';
import { PrismaAbout } from '@/components/PrismaAbout';
import { PrismaFeatures } from '@/components/PrismaFeatures';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <PrismaHero />
      <PrismaAbout />
      <PrismaFeatures />
    </main>
  );
}
