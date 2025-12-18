import { Link } from "react-router-dom";
import { MapPin, Clock, Shield, ChevronRight, Wrench, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Hero = () => {
  const { isAuthenticated, userRole } = useAuth();

  const getCtaLink = () => {
    if (!isAuthenticated) return "/signup";
    if (userRole === "mechanic") return "/mechanic-dashboard";
    return "/request-mechanic";
  };

  const getCtaText = () => {
    if (!isAuthenticated) return "Get Started";
    if (userRole === "mechanic") return "Go to Dashboard";
    return "Request Mechanic";
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-accent via-[hsl(220_15%_12%)] to-accent">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04]" 
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} 
      />

      {/* Floating Decorative Elements */}
      <div className="absolute top-1/4 right-[15%] w-4 h-4 rounded-full bg-primary/60 animate-float" />
      <div className="absolute bottom-1/3 left-[10%] w-3 h-3 rounded-full bg-primary/40 animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/3 left-[20%] w-2 h-2 rounded-full bg-primary/30 animate-float" style={{ animationDelay: "1s" }} />

      <div className="container mx-auto px-4 pt-28 pb-20 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary-foreground/90 text-sm font-medium mb-8 animate-fade-in backdrop-blur-sm">
            <Zap size={16} className="text-primary" />
            <span>24/7 Emergency Roadside Assistance</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-primary-foreground mb-8 leading-[1.1] animate-slide-up">
            Your Vehicle's{" "}
            <span className="relative inline-block">
              <span className="text-gradient-primary">Lifeline</span>
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" fill="none">
                <path d="M2 10C50 4 150 4 198 10" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round" className="opacity-60" />
              </svg>
            </span>
            <span className="block mt-3">on Every Road</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/60 max-w-2xl mx-auto mb-12 leading-relaxed animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Professional on-road and off-road mechanic services for cars, buses, and trucks. 
            Get instant help wherever you are, whenever you need it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Link to={getCtaLink()}>
              <Button variant="premium" size="xl" className="w-full sm:w-auto group">
                <Users size={22} />
                {getCtaText()}
                <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="heroOutline" size="xl" className="w-full sm:w-auto">
                <Wrench size={22} />
                Our Services
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-8 mt-14 justify-center animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <TrustBadge icon={Shield} text="Verified Mechanics" color="text-emerald-400" />
            <TrustBadge icon={Clock} text="15 Min Response" color="text-primary" />
            <TrustBadge icon={MapPin} text="50+ Cities" color="text-sky-400" />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-24 pt-16 border-t border-primary-foreground/10 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <StatCard number="500+" label="Verified Mechanics" />
          <StatCard number="50+" label="Cities Covered" />
          <StatCard number="10K+" label="Happy Customers" />
          <StatCard number="15min" label="Avg Response" />
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-24">
          <path d="M0 120L60 105C120 90 240 60 360 52.5C480 45 600 60 720 67.5C840 75 960 75 1080 67.5C1200 60 1320 45 1380 37.5L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
};

const TrustBadge = ({ icon: Icon, text, color }: { icon: any; text: string; color: string }) => (
  <div className="flex items-center gap-2.5 text-primary-foreground/60 text-sm">
    <div className={`p-1.5 rounded-lg bg-primary-foreground/5 ${color}`}>
      <Icon size={16} />
    </div>
    <span className="font-medium">{text}</span>
  </div>
);

const StatCard = ({ number, label }: { number: string; label: string }) => (
  <div className="text-center group">
    <div className="text-4xl md:text-5xl font-display font-bold text-primary mb-2 group-hover:scale-105 transition-transform">
      {number}
    </div>
    <div className="text-primary-foreground/50 text-sm font-medium">{label}</div>
  </div>
);

export default Hero;