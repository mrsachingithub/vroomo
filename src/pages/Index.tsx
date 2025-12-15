import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VehicleTypes from "@/components/VehicleTypes";
import ServicesList from "@/components/ServicesList";
import HowItWorks from "@/components/HowItWorks";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <VehicleTypes />
      <ServicesList />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
