import { Link } from "react-router-dom";
import { MapPin, Clock, Shield, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Animated Gradient Overlay */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent" />

      <div className="container mx-auto px-4 pt-20 pb-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-foreground px-4 py-2 rounded-full mb-6 animate-fade-in">
              <Clock size={16} />
              <span className="text-sm font-medium">24/7 Emergency Service</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-primary-foreground mb-6 animate-slide-up">
              Roadside Help,{" "}
              <span className="text-primary">Anytime</span>{" "}
              <span className="block">Anywhere</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/70 max-w-xl mx-auto lg:mx-0 mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Professional mechanics for cars, buses, and trucks. Get instant help with engine, tyre, battery issues and more. Track your mechanic in real-time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Link to="/signup">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  Request Mechanic
                  <ChevronRight size={20} />
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="heroOutline" size="xl" className="w-full sm:w-auto">
                  Our Services
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-primary-foreground/10 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <div>
                <div className="text-3xl md:text-4xl font-display font-bold text-primary">500+</div>
                <div className="text-primary-foreground/60 text-sm mt-1">Mechanics</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-display font-bold text-primary">50+</div>
                <div className="text-primary-foreground/60 text-sm mt-1">Cities</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-display font-bold text-primary">24/7</div>
                <div className="text-primary-foreground/60 text-sm mt-1">Available</div>
              </div>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="hidden lg:grid grid-cols-2 gap-4 animate-slide-in-right">
            <div className="space-y-4">
              <FeatureCard
                icon={<MapPin className="text-primary" size={28} />}
                title="Live Tracking"
                description="Track your mechanic in real-time as they approach"
                delay="0.2s"
              />
              <FeatureCard
                icon={<Shield className="text-primary" size={28} />}
                title="Verified Mechanics"
                description="All mechanics are verified by our admin team"
                delay="0.4s"
              />
            </div>
            <div className="space-y-4 mt-8">
              <FeatureCard
                icon={<Clock className="text-primary" size={28} />}
                title="Quick Response"
                description="Average response time under 30 minutes"
                delay="0.3s"
              />
              <FeatureCard
                icon={
                  <svg className="text-primary" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5" />
                  </svg>
                }
                title="Replacement Car"
                description="Get a temporary vehicle if needed"
                delay="0.5s"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 105C120 90 240 60 360 52.5C480 45 600 60 720 67.5C840 75 960 75 1080 67.5C1200 60 1320 45 1380 37.5L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
}) => (
  <div
    className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-xl p-6 hover:bg-primary-foreground/10 transition-all duration-300 animate-slide-up"
    style={{ animationDelay: delay }}
  >
    <div className="mb-4">{icon}</div>
    <h3 className="font-display text-lg font-semibold text-primary-foreground mb-2">{title}</h3>
    <p className="text-primary-foreground/60 text-sm">{description}</p>
  </div>
);

export default Hero;
