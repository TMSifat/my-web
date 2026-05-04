import Hero from "@/components/Hero";
import Menu from "@/components/Menu";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Menu />
    </div>
  );
}
