import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, ArrowUpRight } from "lucide-react";
import vroomoLogo from "@/assets/vroomo-logo.png";

const Footer = () => {
  return (
    <footer className="bg-accent text-accent-foreground relative overflow-hidden">
      {/* Top Border Gradient */}
      <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Logo & About */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img src={vroomoLogo} alt="VROOMO" className="h-16 w-auto brightness-0 invert" />
            </Link>
            <p className="text-accent-foreground/60 text-sm leading-relaxed mb-6">
              Your trusted partner for on-road and off-road mechanic services. Available 24/7 across multiple cities in India.
            </p>
            <div className="flex items-center gap-3">
              <a 
                href="https://instagram.com/mr.sach_in_" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-accent-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg uppercase tracking-wider mb-6 text-accent-foreground">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {[
                { name: "Home", path: "/" },
                { name: "Our Services", path: "/services" },
                { name: "Contact Us", path: "/contact" },
                { name: "Register", path: "/signup" },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="group flex items-center gap-2 text-accent-foreground/60 hover:text-primary transition-colors"
                  >
                    {link.name}
                    <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg uppercase tracking-wider mb-6 text-accent-foreground">
              Services
            </h4>
            <ul className="space-y-4">
              {[
                "Engine Repair",
                "Tyre Services",
                "Battery Replacement",
                "Towing Service",
                "Replacement Vehicles",
              ].map((service) => (
                <li key={service} className="text-accent-foreground/60 text-sm">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg uppercase tracking-wider mb-6 text-accent-foreground">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-primary" />
                </div>
                <span className="text-accent-foreground/60 text-sm pt-2">
                  Giridih, Jharkhand, India
                </span>
              </li>
              <li>
                <a href="tel:7488768874" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                    <Phone size={18} className="text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <span className="text-accent-foreground/60 group-hover:text-primary transition-colors">
                    7488768874
                  </span>
                </a>
              </li>
              <li>
                <a href="mailto:rsachin7632@gmail.com" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                    <Mail size={18} className="text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <span className="text-accent-foreground/60 text-sm group-hover:text-primary transition-colors">
                    rsachin7632@gmail.com
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-accent-foreground/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-accent-foreground/40 text-sm">
            © {new Date().getFullYear()} VROOMO. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link to="/privacy" className="text-accent-foreground/40 text-sm hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-accent-foreground/40 text-sm hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;