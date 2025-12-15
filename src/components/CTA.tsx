import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="py-20 hero-gradient relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-6">
            Stranded on the Road?
            <span className="block text-primary">Help is Just a Click Away</span>
          </h2>

          <p className="text-primary-foreground/70 text-lg mb-10 max-w-xl mx-auto">
            Don't let vehicle problems ruin your journey. Get professional help from verified mechanics near you within minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button variant="hero" size="xl" className="w-full sm:w-auto">
                Request Mechanic Now
                <ArrowRight size={20} />
              </Button>
            </Link>
            <a href="tel:7488768874">
              <Button variant="heroOutline" size="xl" className="w-full sm:w-auto">
                <Phone size={20} />
                Emergency Call
              </Button>
            </a>
          </div>

          <p className="text-primary-foreground/50 text-sm mt-8">
            Available 24/7 • Verified Mechanics • Real-time Tracking
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
