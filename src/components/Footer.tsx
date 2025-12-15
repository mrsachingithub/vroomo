import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram } from "lucide-react";
import vroomoLogo from "@/assets/vroomo-logo.png";

const Footer = () => {
  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & About */}
          <div className="space-y-4">
            <img src={vroomoLogo} alt="VROOMO" className="h-20 w-auto brightness-0 invert" />
            <p className="text-accent-foreground/70 text-sm leading-relaxed">
              Your trusted partner for on-road and off-road mechanic services. Available 24/7 across multiple cities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xl uppercase tracking-wider mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-accent-foreground/70 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-accent-foreground/70 hover:text-primary transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-accent-foreground/70 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-accent-foreground/70 hover:text-primary transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-xl uppercase tracking-wider mb-6">Services</h4>
            <ul className="space-y-3">
              <li className="text-accent-foreground/70">Engine Repair</li>
              <li className="text-accent-foreground/70">Tyre Services</li>
              <li className="text-accent-foreground/70">Battery Replacement</li>
              <li className="text-accent-foreground/70">Towing Service</li>
              <li className="text-accent-foreground/70">Replacement Vehicles</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-xl uppercase tracking-wider mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-accent-foreground/70 text-sm">
                  Giridih, Jharkhand, India
                </span>
              </li>
              <li>
                <a href="tel:7488768874" className="flex items-center gap-3 text-accent-foreground/70 hover:text-primary transition-colors">
                  <Phone size={20} className="text-primary" />
                  <span>7488768874</span>
                </a>
              </li>
              <li>
                <a href="mailto:rsachin7632@gmail.com" className="flex items-center gap-3 text-accent-foreground/70 hover:text-primary transition-colors">
                  <Mail size={20} className="text-primary" />
                  <span className="text-sm">rsachin7632@gmail.com</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://instagram.com/mr.sach_in_" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-accent-foreground/70 hover:text-primary transition-colors"
                >
                  <Instagram size={20} className="text-primary" />
                  <span>@mr.sach_in_</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-accent-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-accent-foreground/50 text-sm">
            © {new Date().getFullYear()} VROOMO. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-accent-foreground/50 text-sm hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-accent-foreground/50 text-sm hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
