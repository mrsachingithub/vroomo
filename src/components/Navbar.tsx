import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone, User, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import vroomoLogo from "@/assets/vroomo-logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, userRole, isAuthenticated, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-sm" 
        : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src={vroomoLogo} 
              alt="VROOMO" 
              className="h-12 w-auto transition-all duration-300 group-hover:scale-105" 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-5 py-2 font-display text-base uppercase tracking-wider transition-colors duration-300 rounded-lg ${
                  isActive(link.path)
                    ? "text-primary"
                    : scrolled 
                      ? "text-foreground hover:text-primary hover:bg-secondary" 
                      : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                )}
              </Link>
            ))}
          </div>

          {/* Right Side - Auth Buttons or User Menu */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <>
                {userRole === "customer" && (
                  <>
                    <Link to="/customer-dashboard">
                      <Button variant={scrolled ? "ghost" : "heroOutline"} size="default">
                        <LayoutDashboard size={18} />
                        Dashboard
                      </Button>
                    </Link>
                    <Link to="/request-mechanic">
                      <Button variant={scrolled ? "default" : "hero"} size="default">
                        Request Mechanic
                      </Button>
                    </Link>
                  </>
                )}
                {userRole === "mechanic" && (
                  <Link to="/mechanic-dashboard">
                    <Button variant={scrolled ? "default" : "hero"} size="default">
                      <LayoutDashboard size={18} />
                      Dashboard
                    </Button>
                  </Link>
                )}
                {userRole === "admin" && (
                  <Link to="/admin-dashboard">
                    <Button variant={scrolled ? "default" : "hero"} size="default">
                      <LayoutDashboard size={18} />
                      Admin Panel
                    </Button>
                  </Link>
                )}
                
                <div className={`flex items-center gap-3 px-4 py-2 rounded-xl ${
                  scrolled ? "bg-secondary" : "bg-primary-foreground/10"
                }`}>
                  <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
                    <User size={18} className="text-primary-foreground" />
                  </div>
                  <div className="text-sm">
                    <p className={`font-semibold ${scrolled ? "text-foreground" : "text-primary-foreground"}`}>
                      {displayName}
                    </p>
                    <p className={`text-xs capitalize ${scrolled ? "text-muted-foreground" : "text-primary-foreground/60"}`}>
                      {userRole}
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleLogout} 
                  title="Logout"
                  className={!scrolled ? "text-primary-foreground hover:bg-primary-foreground/10" : ""}
                >
                  <LogOut size={20} />
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button 
                    variant="ghost" 
                    className={`font-display uppercase tracking-wider ${
                      !scrolled ? "text-primary-foreground hover:bg-primary-foreground/10" : ""
                    }`}
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant={scrolled ? "default" : "hero"} size="lg">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled 
                ? "text-foreground hover:bg-secondary" 
                : "text-primary-foreground hover:bg-primary-foreground/10"
            }`}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border animate-slide-up">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`font-display text-lg uppercase tracking-wider py-3 px-4 rounded-xl transition-colors ${
                  isActive(link.path) 
                    ? "text-primary bg-primary/5" 
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="flex flex-col gap-3 pt-4 mt-2 border-t border-border">
              {isAuthenticated && user ? (
                <>
                  <div className="flex items-center gap-3 bg-secondary px-4 py-3 rounded-xl">
                    <div className="w-11 h-11 bg-primary rounded-full flex items-center justify-center">
                      <User size={22} className="text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{displayName}</p>
                      <p className="text-muted-foreground text-sm capitalize">{userRole}</p>
                    </div>
                  </div>
                  
                  {userRole === "customer" && (
                    <>
                      <Link to="/customer-dashboard" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full justify-start">
                          <LayoutDashboard size={18} />
                          My Dashboard
                        </Button>
                      </Link>
                      <Link to="/request-mechanic" onClick={() => setIsOpen(false)}>
                        <Button variant="default" className="w-full">
                          Request Mechanic
                        </Button>
                      </Link>
                    </>
                  )}
                  {userRole === "mechanic" && (
                    <Link to="/mechanic-dashboard" onClick={() => setIsOpen(false)}>
                      <Button variant="default" className="w-full">
                        <LayoutDashboard size={18} />
                        Dashboard
                      </Button>
                    </Link>
                  )}
                  {userRole === "admin" && (
                    <Link to="/admin-dashboard" onClick={() => setIsOpen(false)}>
                      <Button variant="default" className="w-full">
                        <LayoutDashboard size={18} />
                        Admin Panel
                      </Button>
                    </Link>
                  )}
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    onClick={() => { handleLogout(); setIsOpen(false); }}
                  >
                    <LogOut size={18} />
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
                    <Button variant="default" className="w-full font-display uppercase">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
            
            <a
              href="tel:7488768874"
              className="flex items-center gap-3 text-primary font-semibold pt-4 mt-2 border-t border-border"
            >
              <div className="p-2 rounded-lg bg-primary/10">
                <Phone size={20} />
              </div>
              7488768874
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;