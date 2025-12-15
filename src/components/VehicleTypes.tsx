import { Car, Bus, Truck } from "lucide-react";

const vehicles = [
  {
    icon: Car,
    name: "Cars",
    description: "Sedans, SUVs, Hatchbacks & more",
    features: ["Engine repair", "Tyre change", "Battery replacement", "AC service"],
  },
  {
    icon: Bus,
    name: "Buses",
    description: "All types of passenger buses",
    features: ["Heavy engine work", "Brake systems", "Electrical repairs", "Emergency towing"],
  },
  {
    icon: Truck,
    name: "Trucks",
    description: "Commercial & transport vehicles",
    features: ["Diesel engine repair", "Transmission work", "Hydraulics", "On-site repairs"],
  },
];

const VehicleTypes = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            We Service <span className="text-primary">All Vehicles</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From personal cars to commercial trucks, our mechanics are trained to handle all vehicle types.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {vehicles.map((vehicle, index) => (
            <div
              key={vehicle.name}
              className="group relative bg-card rounded-2xl p-8 border border-border hover:border-primary/50 hover:shadow-vroomo transition-all duration-500"
            >
              {/* Icon */}
              <div className="w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <vehicle.icon className="w-10 h-10 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>

              {/* Content */}
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                {vehicle.name}
              </h3>
              <p className="text-muted-foreground mb-6">{vehicle.description}</p>

              {/* Features */}
              <ul className="space-y-2">
                {vehicle.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Decorative Number */}
              <div className="absolute top-4 right-4 text-6xl font-display font-bold text-primary/5 group-hover:text-primary/10 transition-colors">
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
