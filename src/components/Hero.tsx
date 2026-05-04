import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-gray-900 h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=2000&auto=format&fit=crop")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="absolute inset-0 bg-black/60 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 w-full max-w-5xl mx-auto">
        <span className="inline-block py-1 px-3 rounded-full bg-secondary text-primary font-bold text-sm mb-4 tracking-wide uppercase shadow-lg">
          100% Flame Grilled
        </span>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 drop-shadow-md">
          Taste the <span className="text-secondary">Crunch</span>
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-10 drop-shadow-sm font-medium">
          Sink your teeth into our legendary burgers, crispy chicken, and mouth-watering sides. Crafted with passion, served with speed.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link 
            href="#menu"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full text-white bg-primary hover:bg-red-600 transition-all shadow-lg shadow-red-500/30 transform hover:-translate-y-1"
          >
            Order Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link 
            href="#offers"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all shadow-lg transform hover:-translate-y-1"
          >
            View Offers
          </Link>
        </div>
      </div>
    </div>
  );
}
