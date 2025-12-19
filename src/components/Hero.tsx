import { Link } from "react-router-dom";
import { MapPin, Clock, Shield, ChevronRight, Wrench, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import heroImage from "@/assets/hero-mechanic.jpg";

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
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Professional mechanic service" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-accent/95 via-accent/80 to-accent/60" />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} 
      />

      <div className="container mx-auto px-4 pt-28 pb-20 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground/90 text-sm font-medium mb-8 animate-fade-in backdrop-blur-sm">
            <Zap size={16} className="text-primary" />
            <span>24/7 Emergency Roadside Assistance</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground mb-8 leading-[1.1] animate-slide-up">
            Your Vehicle's{" "}
            <span className="relative inline-block">
              <span className="text-gradient-primary">Lifeline</span>
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" fill="none">
                <path d="M2 10C50 4 150 4 198 10" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round" className="opacity-60" />
              </svg>
            </span>
            <span className="block mt-3">on Every Road</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/70 max-w-xl mb-12 leading-relaxed animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Professional on-road and off-road mechanic services for cars, buses, and trucks. 
            Get instant help wherever you are, whenever you need it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
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
          <div className="flex flex-wrap gap-8 mt-14 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <TrustBadge icon={Shield} text="Verified Mechanics" color="text-emerald-400" />
            <TrustBadge icon={Clock} text="15 Min Response" color="text-primary" />
            <TrustBadge icon={MapPin} text="50+ Cities" color="text-sky-400" />
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16">
          <path d="M0 120L60 105C120 90 240 60 360 52.5C480 45 600 60 720 67.5C840 75 960 75 1080 67.5C1200 60 1320 45 1380 37.5L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
};

const TrustBadge = ({ icon: Icon, text, color }: { icon: any; text: string; color: string }) => (
  <div className="flex items-center gap-2.5 text-primary-foreground/70 text-sm">
    <div className={`p-1.5 rounded-lg bg-primary-foreground/10 ${color}`}>
      <Icon size={16} />
    </div>
    <span className="font-medium">{text}</span>
  </div>
);

export default Hero;
