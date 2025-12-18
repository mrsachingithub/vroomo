import { Car, Bus, Truck, CheckCircle2 } from "lucide-react";

const vehicles = [
  {
    icon: Car,
    name: "Cars",
    description: "Sedans, SUVs, Hatchbacks & more",
    features: ["Engine repair", "Tyre change", "Battery replacement", "AC service"],
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconBg: "bg-blue-500",
  },
  {
    icon: Bus,
    name: "Buses",
    description: "All types of passenger buses",
    features: ["Heavy engine work", "Brake systems", "Electrical repairs", "Emergency towing"],
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconBg: "bg-emerald-500",
  },
  {
    icon: Truck,
    name: "Trucks",
    description: "Commercial & transport vehicles",
    features: ["Diesel engine repair", "Transmission work", "Hydraulics", "On-site repairs"],
    gradient: "from-orange-500/20 to-amber-500/20",
    iconBg: "bg-orange-500",
  },
];

const VehicleTypes = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="badge-premium mb-4 inline-block">
            All Vehicle Types
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
            We Service <span className="text-gradient-primary">All Vehicles</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            From personal cars to commercial trucks, our mechanics are trained and certified to handle all vehicle types with precision.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {vehicles.map((vehicle, index) => (
            <div
              key={vehicle.name}
              className="group relative bg-card rounded-3xl p-8 border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${vehicle.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl ${vehicle.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <vehicle.icon className="w-8 h-8 text-primary-foreground" />
                </div>

                {/* Title & Description */}
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  {vehicle.name}
                </h3>
                <p className="text-muted-foreground mb-6">{vehicle.description}</p>

                {/* Features */}
                <ul className="space-y-3">
                  {vehicle.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Decorative Number */}
              <div className="absolute top-6 right-6 text-7xl font-display font-bold text-primary/5 group-hover:text-primary/10 transition-colors">
                0{index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VehicleTypes;