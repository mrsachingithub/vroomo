import { Link } from "react-router-dom";
import { ArrowRight, Phone, Shield, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent via-[hsl(220_15%_12%)] to-accent" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "1s" }} />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: "48px 48px",
      }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground/90 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Available 24/7
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6 leading-tight">
            Stranded on the Road?
            <span className="block text-gradient-primary mt-2">Help is Just a Click Away</span>
          </h2>

          <p className="text-primary-foreground/60 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Don't let vehicle problems ruin your journey. Get professional help from verified mechanics near you within minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/signup">
              <Button variant="premium" size="xl" className="w-full sm:w-auto group">
                Request Mechanic Now
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="tel:7488768874">
              <Button variant="heroOutline" size="xl" className="w-full sm:w-auto">
                <Phone size={22} />
                Emergency Call
              </Button>
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-8 justify-center">
            <div className="flex items-center gap-2 text-primary-foreground/50">
              <Shield size={18} className="text-emerald-400" />
              <span className="text-sm">Verified Mechanics</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/50">
              <Clock size={18} className="text-primary" />
              <span className="text-sm">Real-time Tracking</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/50">
              <MapPin size={18} className="text-sky-400" />
              <span className="text-sm">50+ Cities</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;