import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import vroomoLogo from "@/assets/vroomo-logo.png";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"customer" | "mechanic">("customer");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Login Successful!",
      description: `Welcome back! You're logged in as a ${userType}.`,
    });

    setIsLoading(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-block mb-8">
            <img src={vroomoLogo} alt="VROOMO" className="h-16 w-auto" />
          </Link>

          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            Welcome Back
          </h1>
          <p className="text-muted-foreground mb-8">
            Login to access your {userType} dashboard
          </p>

          {/* User Type Toggle */}
          <div className="flex bg-secondary rounded-lg p-1 mb-8">
            <button
              type="button"
              onClick={() => setUserType("customer")}
              className={`flex-1 py-3 rounded-md font-display font-semibold text-sm uppercase tracking-wider transition-all ${
                userType === "customer"
                  ? "bg-primary text-primary-foreground shadow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => setUserType("mechanic")}
              className={`flex-1 py-3 rounded-md font-display font-semibold text-sm uppercase tracking-wider transition-all ${
                userType === "mechanic"
                  ? "bg-primary text-primary-foreground shadow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Mechanic
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="h-12"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="h-12 pr-12"
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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
                <span className="text-sm text-muted-foreground">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="hero"
              size="xl"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
              <LogIn size={20} />
            </Button>
          </form>

          <p className="text-center text-muted-foreground mt-8">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <div className="hidden lg:flex flex-1 hero-gradient items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative z-10 text-center max-w-md">
          <img src={vroomoLogo} alt="VROOMO" className="h-32 w-auto mx-auto mb-8 brightness-0 invert" />
          <h2 className="text-3xl font-display font-bold text-primary-foreground mb-4">
            Roadside Assistance Made <span className="text-primary">Simple</span>
          </h2>
          <p className="text-primary-foreground/70">
            Get instant help from verified mechanics near you. Track them in real-time and get back on the road faster.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
