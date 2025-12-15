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
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            How <span className="text-primary">It Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Getting roadside assistance has never been easier. Four simple steps to get you back on the road.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
              )}

              <div className="text-center">
                {/* Step Number */}
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-6 relative group">
                  <step.icon className="w-10 h-10 text-primary" />
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-display font-bold text-sm">
                    {step.step}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
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
    </section>
  );
};

export default HowItWorks;
