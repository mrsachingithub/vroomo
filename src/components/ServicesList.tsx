import { Wrench, Circle, Battery, Fuel, Settings, AlertTriangle } from "lucide-react";

const services = [
  {
    icon: Wrench,
    name: "Engine Repair",
    description: "Complete engine diagnostics and repair for all vehicle types. From minor fixes to major overhauls.",
    color: "bg-red-500/10 text-red-500",
  },
  {
    icon: Circle,
    name: "Tyre Services",
    description: "Flat tyre repair, replacement, balancing and alignment. We carry common tyre sizes.",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    icon: Battery,
    name: "Battery Replacement",
    description: "Jump start, battery testing, and replacement. Quick service to get you back on the road.",
    color: "bg-yellow-500/10 text-yellow-500",
  },
  {
    icon: Fuel,
    name: "Fuel Delivery",
    description: "Run out of fuel? We'll bring it to you. Emergency fuel delivery service available 24/7.",
    color: "bg-green-500/10 text-green-500",
  },
  {
    icon: Settings,
    name: "General Repairs",
    description: "Brake issues, electrical problems, cooling system repairs and other general mechanical work.",
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    icon: AlertTriangle,
    name: "Towing Service",
    description: "Vehicle can't be fixed on-site? We'll arrange professional towing to the nearest workshop.",
    color: "bg-orange-500/10 text-orange-500",
  },
];

const ServicesList = () => {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive roadside assistance and repair services to handle any situation.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.name}
              className="group bg-card rounded-xl p-6 border border-border hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 rounded-lg ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <service.icon size={28} />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                {service.name}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesList;
