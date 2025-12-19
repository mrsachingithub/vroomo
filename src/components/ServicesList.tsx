import { Wrench, Circle, Battery, Fuel, Settings, AlertTriangle, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Wrench,
    name: "Engine Repair",
    description: "Complete engine diagnostics and repair for all vehicle types. From minor fixes to major overhauls.",
    color: "bg-red-500",
    lightBg: "bg-red-500/10",
  },
  {
    icon: Circle,
    name: "Tyre Services",
    description: "Flat tyre repair, replacement, balancing and alignment. We carry common tyre sizes.",
    color: "bg-blue-500",
    lightBg: "bg-blue-500/10",
  },
  {
    icon: Battery,
    name: "Battery Replacement",
    description: "Jump start, battery testing, and replacement. Quick service to get you back on the road.",
    color: "bg-amber-500",
    lightBg: "bg-amber-500/10",
  },
  {
    icon: Fuel,
    name: "Fuel Delivery",
    description: "Run out of fuel? We'll bring it to you. Emergency fuel delivery service available 24/7.",
    color: "bg-emerald-500",
    lightBg: "bg-emerald-500/10",
  },
  {
    icon: Settings,
    name: "General Repairs",
    description: "Brake issues, electrical problems, cooling system repairs and other general mechanical work.",
    color: "bg-purple-500",
    lightBg: "bg-purple-500/10",
  },
  {
    icon: AlertTriangle,
    name: "Towing Service",
    description: "Vehicle can't be fixed on-site? We'll arrange professional towing to the nearest workshop.",
    color: "bg-orange-500",
    lightBg: "bg-orange-500/10",
  },
];

const ServicesList = () => {
  return (
    <section className="section-padding bg-secondary/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
        backgroundSize: "32px 32px",
      }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <span className="badge-premium mb-4 inline-block">
            What We Offer
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
            Our <span className="text-gradient-primary">Services</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Comprehensive roadside assistance and repair services to handle any situation, anytime, anywhere.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.name}
              className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-xl ${service.lightBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon size={26} className={service.color.replace('bg-', 'text-')} />
                </div>
                <ArrowUpRight size={20} className="text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </div>
              
              <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {service.name}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/services" 
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300"
          >
            View All Services
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesList;