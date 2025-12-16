import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone, User, LogOut, Bell, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import vroomoLogo from "@/assets/vroomo-logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, userRole, isAuthenticated, signOut } = useAuth();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const displayName = profile?.name || user?.email?.split("@")[0] || "User";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo Left */}
          <Link to="/" className="flex items-center gap-2">
            <img src={vroomoLogo} alt="VROOMO" className="h-14 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-display text-lg uppercase tracking-wider transition-colors duration-300 ${
                  isActive(link.path)
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side - Auth Buttons or User Menu */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated && user ? (
              <>
                {/* Role-specific button */}
                {userRole === "customer" && (
                  <Link to="/request-mechanic">
                    <Button variant="hero" size="lg">
                      Request Mechanic
                    </Button>
                  </Link>
                )}
                {userRole === "mechanic" && (
                  <Link to="/mechanic-dashboard">
                    <Button variant="hero" size="lg">
                      <LayoutDashboard size={18} className="mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                )}
                
                <div className="flex items-center gap-3 bg-secondary px-4 py-2 rounded-lg">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <User size={18} className="text-primary-foreground" />
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold text-foreground">{displayName}</p>
                    <p className="text-muted-foreground text-xs capitalize">{userRole}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
                  <LogOut size={20} />
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="font-display uppercase tracking-wider">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="hero" size="lg">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border animate-slide-up">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`font-display text-lg uppercase tracking-wider py-2 ${
                  isActive(link.path) ? "text-primary" : "text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-border">
              {isAuthenticated && user ? (
                <>
                  <div className="flex items-center gap-3 bg-secondary px-4 py-3 rounded-lg">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <User size={20} className="text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{displayName}</p>
                      <p className="text-muted-foreground text-sm capitalize">{userRole}</p>
                    </div>
                  </div>
                  
                  {/* Role-specific button */}
                  {userRole === "customer" && (
                    <Link to="/request-mechanic" onClick={() => setIsOpen(false)}>
                      <Button variant="hero" className="w-full">
                        Request Mechanic
                      </Button>
                    </Link>
                  )}
                  {userRole === "mechanic" && (
                    <Link to="/mechanic-dashboard" onClick={() => setIsOpen(false)}>
                      <Button variant="hero" className="w-full">
                        <LayoutDashboard size={18} className="mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                  )}
                  
                  <Button variant="outline" className="w-full" onClick={() => { handleLogout(); setIsOpen(false); }}>
                    <LogOut size={18} className="mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full font-display uppercase">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)}>
                    <Button variant="hero" className="w-full">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
            <a
              href="tel:7488768874"
              className="flex items-center gap-2 text-primary font-semibold pt-2"
            >
              <Phone size={20} />
              7488768874
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
