import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import Offers from "@/components/Offers";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Offers />
      <Menu />
    </div>
  );
}
