import { UserPlus, MapPin, Users, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Sign Up",
    description: "Create your account as a customer or mechanic. Quick registration with essential details only.",
  },
  {
    icon: MapPin,
    step: "02",
    title: "Share Location",
    description: "Enable GPS to share your live location. We'll find mechanics nearest to you.",
  },
  {
    icon: Users,
    step: "03",
    title: "Get Matched",
    description: "Nearby verified mechanics receive your request. Accept the best match and view their details.",
  },
  {
    icon: CheckCircle,
    step: "04",
    title: "Track & Complete",
    description: "Track your mechanic in real-time. Service completed on-site or get a replacement vehicle.",
  },
];

const HowItWorks = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <span className="badge-premium mb-4 inline-block">
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
            How <span className="text-gradient-primary">It Works</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Getting roadside assistance has never been easier. Four simple steps to get you back on the road.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div key={step.step} className="relative group">
                <div className="text-center">
                  {/* Step Circle */}
                  <div className="relative inline-flex items-center justify-center mb-8">
                    <div className="absolute w-28 h-28 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500" />
                    <div className="relative w-24 h-24 rounded-full bg-card border-2 border-border group-hover:border-primary/50 flex items-center justify-center transition-all duration-300 group-hover:shadow-lg">
                      <step.icon className="w-10 h-10 text-primary" />
                    </div>
                    {/* Step Number Badge */}
                    <span className="absolute -top-1 -right-1 w-9 h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-display font-bold text-sm shadow-lg">
                      {step.step}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;