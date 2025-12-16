import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, UserPlus, Car, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import vroomoLogo from "@/assets/vroomo-logo.png";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp, isAuthenticated, userRole, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"customer" | "mechanic">("customer");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    vehicleNumber: "",
    vehicleType: "",
    password: "",
    confirmPassword: "",
    specialization: "",
    experience: "",
  });

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      if (userRole === "mechanic") {
        navigate("/mechanic-dashboard");
      } else {
        navigate("/");
      }
    }
  }, [isAuthenticated, userRole, isLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match!",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const metadata = {
      name: formData.name,
      phone: formData.mobile,
      user_type: userType,
      vehicle_number: userType === "customer" ? formData.vehicleNumber : null,
      vehicle_type: userType === "customer" ? formData.vehicleType : null,
      specialization: userType === "mechanic" ? formData.specialization : null,
      experience_years: userType === "mechanic" ? parseInt(formData.experience) || null : null,
    };

    const { error } = await signUp(formData.email, formData.password, metadata);

    if (error) {
      let errorMessage = "Failed to create account";
      if (error.message?.includes("already registered")) {
        errorMessage = "This email is already registered. Please login instead.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Signup Failed",
        description: errorMessage,
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    toast({
      title: "Account Created!",
      description: userType === "mechanic" 
        ? "Your account is pending admin verification." 
        : "Welcome to VROOMO! You can now request mechanics.",
    });

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image/Pattern */}
      <div className="hidden lg:flex flex-1 hero-gradient items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative z-10 text-center max-w-md">
          <img src={vroomoLogo} alt="VROOMO" className="h-32 w-auto mx-auto mb-8 brightness-0 invert" />
          <h2 className="text-3xl font-display font-bold text-primary-foreground mb-4">
            Join the <span className="text-primary">VROOMO</span> Network
          </h2>
          <p className="text-primary-foreground/70 mb-8">
            {userType === "customer" 
              ? "Get instant access to verified mechanics across multiple cities. Never be stranded again."
              : "Join our network of mechanics and help drivers in need. Flexible hours, great earnings."}
          </p>

          <div className="grid grid-cols-2 gap-4 text-left">
            {userType === "customer" ? (
              <>
                <div className="bg-primary-foreground/10 rounded-lg p-4">
                  <div className="text-2xl font-display font-bold text-primary">24/7</div>
                  <div className="text-primary-foreground/70 text-sm">Support Available</div>
                </div>
                <div className="bg-primary-foreground/10 rounded-lg p-4">
                  <div className="text-2xl font-display font-bold text-primary">50+</div>
                  <div className="text-primary-foreground/70 text-sm">Cities Covered</div>
                </div>
              </>
            ) : (
              <>
                <div className="bg-primary-foreground/10 rounded-lg p-4">
                  <div className="text-2xl font-display font-bold text-primary">₹50K+</div>
                  <div className="text-primary-foreground/70 text-sm">Monthly Earnings</div>
                </div>
                <div className="bg-primary-foreground/10 rounded-lg p-4">
                  <div className="text-2xl font-display font-bold text-primary">Flexible</div>
                  <div className="text-primary-foreground/70 text-sm">Working Hours</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          <Link to="/" className="inline-block mb-6">
            <img src={vroomoLogo} alt="VROOMO" className="h-14 w-auto" />
          </Link>

          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            Create Account
          </h1>
          <p className="text-muted-foreground mb-6">
            Sign up as a {userType} to get started
          </p>

          {/* User Type Toggle */}
          <div className="flex bg-secondary rounded-lg p-1 mb-6">
            <button
              type="button"
              onClick={() => setUserType("customer")}
              className={`flex-1 py-3 px-4 rounded-md font-display font-semibold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                userType === "customer"
                  ? "bg-primary text-primary-foreground shadow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Car size={18} />
              Customer
            </button>
            <button
              type="button"
              onClick={() => setUserType("mechanic")}
              className={`flex-1 py-3 px-4 rounded-md font-display font-semibold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                userType === "mechanic"
                  ? "bg-primary text-primary-foreground shadow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Wrench size={18} />
              Mechanic
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Full Name
              </label>
              <Input
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="h-12"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="h-12"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Mobile Number
                </label>
                <Input
                  type="tel"
                  placeholder="Mobile"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  required
                  className="h-12"
                />
              </div>
            </div>

            {userType === "customer" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Vehicle Number
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., JH-05-AB-1234"
                    value={formData.vehicleNumber}
                    onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Vehicle Type
                  </label>
                  <Select 
                    value={formData.vehicleType} 
                    onValueChange={(value) => setFormData({ ...formData, vehicleType: value })}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="car">Car</SelectItem>
                      <SelectItem value="bus">Bus</SelectItem>
                      <SelectItem value="truck">Truck</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {userType === "mechanic" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Specialization
                  </label>
                  <Select 
                    value={formData.specialization} 
                    onValueChange={(value) => setFormData({ ...formData, specialization: value })}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engine">Engine</SelectItem>
                      <SelectItem value="tyre">Tyre</SelectItem>
                      <SelectItem value="battery">Battery</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Experience (Years)
                  </label>
                  <Input
                    type="number"
                    placeholder="Years"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="h-12"
                    min="0"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password (min 6 characters)"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="h-12 pr-12"
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Confirm Password
              </label>
              <Input
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                className="h-12"
              />
            </div>

            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" required className="w-4 h-4 mt-0.5 rounded border-border text-primary focus:ring-primary" />
              <span className="text-sm text-muted-foreground">
                I agree to the{" "}
                <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </span>
            </label>

            {userType === "mechanic" && (
              <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
                <strong className="text-foreground">Note:</strong> Mechanic accounts require admin verification. You'll receive an email once your account is approved.
              </div>
            )}

            <Button
              type="submit"
              variant="hero"
              size="xl"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
              <UserPlus size={20} />
            </Button>
          </form>

          <p className="text-center text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
