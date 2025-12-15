import { Link } from "react-router-dom";
import { MapPin, Clock, Shield, ChevronRight, Wrench, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import vroomoLogo from "@/assets/vroomo-logo.png";

const Hero = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-5 py-2.5 rounded-full mb-8 border border-white/10 animate-fade-in">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">24/7 Emergency Service Available</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white mb-6 leading-tight animate-slide-up">
              Your Vehicle's{" "}
              <span className="text-primary relative">
                Lifeline
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 10C50 4 150 4 198 10" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>{" "}
              <span className="block mt-2">on Every Road</span>
            </h1>

            <p className="text-lg md:text-xl text-white/60 max-w-xl mx-auto lg:mx-0 mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              On-road and off-road mechanic services for cars, buses, and trucks. 
              Get instant help wherever you are, whenever you need it.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Link to={isAuthenticated ? "/request-mechanic" : "/signup"}>
                <Button variant="hero" size="xl" className="w-full sm:w-auto group">
                  <Users size={20} />
                  Get Started
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="heroOutline" size="xl" className="w-full sm:w-auto">
                  <Wrench size={20} />
                  Our Services
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 mt-12 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <Shield size={16} className="text-green-500" />
                <span>Verified Mechanics</span>
              </div>
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <Clock size={16} className="text-primary" />
                <span>Fast Response</span>
              </div>
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <MapPin size={16} className="text-blue-400" />
                <span>50+ Cities</span>
              </div>
            </div>
          </div>

          {/* Right Content - Logo in Circle */}
          <div className="flex justify-center lg:justify-end animate-slide-in-right">
            <div className="relative">
              {/* Outer glow */}
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-3xl scale-110" />
              
              {/* Main circle with logo */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 bg-white rounded-full flex items-center justify-center shadow-2xl shadow-black/30">
                <img 
                  src={vroomoLogo} 
                  alt="VROOMO" 
                  className="w-48 md:w-64 h-auto object-contain"
                />
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl px-4 py-3 shadow-xl animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="font-semibold text-slate-800 text-sm">500+ Mechanics</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl px-4 py-3 shadow-xl animate-float" style={{ animationDelay: "0.5s" }}>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-primary" />
                  <span className="font-semibold text-slate-800 text-sm">24/7 Service</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-12 border-t border-white/10 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <StatCard number="500+" label="Verified Mechanics" />
          <StatCard number="50+" label="Cities Covered" />
          <StatCard number="10K+" label="Happy Customers" />
          <StatCard number="15min" label="Avg Response" />
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-20">
          <path d="M0 120L60 105C120 90 240 60 360 52.5C480 45 600 60 720 67.5C840 75 960 75 1080 67.5C1200 60 1320 45 1380 37.5L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
};

const StatCard = ({ number, label }: { number: string; label: string }) => (
  <div className="text-center">
    <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-1">{number}</div>
    <div className="text-white/50 text-sm">{label}</div>
  </div>
);

export default Hero;
