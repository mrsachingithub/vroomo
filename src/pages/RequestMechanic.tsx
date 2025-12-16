import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Car, Bus, Truck, Wrench, Battery, CircleDot, Settings, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const RequestMechanic = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, userRole, isAuthenticated, isLoading } = useAuth();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [formData, setFormData] = useState({
    vehicleType: "",
    issueType: "",
    description: "",
    location: "",
    vehicleNumber: "",
  });

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        navigate("/login");
        return;
      }
      // Only customers can request mechanics
      if (userRole === "mechanic") {
        toast({
          title: "Access Denied",
          description: "Mechanics cannot request other mechanics.",
          variant: "destructive",
        });
        navigate("/mechanic-dashboard");
        return;
      }
    }
  }, [isAuthenticated, userRole, isLoading, navigate, toast]);

  const vehicleTypes = [
    { id: "car", label: "Car", icon: Car },
    { id: "bus", label: "Bus", icon: Bus },
    { id: "truck", label: "Truck", icon: Truck },
  ];

  const issueTypes = [
    { id: "engine", label: "Engine Problem", icon: Settings, color: "text-orange-500" },
    { id: "tyre", label: "Tyre Issue", icon: CircleDot, color: "text-blue-500" },
    { id: "battery", label: "Battery Dead", icon: Battery, color: "text-yellow-500" },
    { id: "breakdown", label: "Breakdown", icon: AlertTriangle, color: "text-red-500" },
    { id: "other", label: "Other Issue", icon: Wrench, color: "text-gray-500" },
  ];

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lng: longitude });
          setFormData({ ...formData, location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}` });
          toast({
            title: "Location Detected",
            description: "Your current location has been captured.",
          });
        },
        (error) => {
          toast({
            title: "Location Error",
            description: "Unable to get your location. Please enter manually.",
            variant: "destructive",
          });
        }
      );
    }
  };

  const handleSubmit = async () => {
    if (!formData.vehicleType || !formData.issueType || !formData.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to submit a request.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.from("mechanic_requests").insert({
      customer_id: user.id,
      vehicle_type: formData.vehicleType,
      issue_type: formData.issueType,
      issue_description: formData.description || null,
      location: formData.location,
      latitude: coordinates?.lat || null,
      longitude: coordinates?.lng || null,
      status: "pending",
    });

    if (error) {
      console.error("Error submitting request:", error);
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setRequestSubmitted(true);

    toast({
      title: "Request Submitted!",
      description: "Nearby mechanics are being notified. You'll receive updates shortly.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (requestSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center">
              <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <h1 className="text-3xl font-display font-bold text-foreground mb-4">
                Request Submitted Successfully!
              </h1>
              <p className="text-muted-foreground mb-8">
                Your mechanic request has been sent to nearby verified mechanics. 
                You'll receive a notification once a mechanic accepts your request.
              </p>
              <div className="bg-secondary/50 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-foreground mb-4">Request Details</h3>
                <div className="space-y-2 text-left">
                  <p className="text-sm"><span className="text-muted-foreground">Vehicle:</span> <span className="capitalize">{formData.vehicleType}</span></p>
                  <p className="text-sm"><span className="text-muted-foreground">Issue:</span> <span className="capitalize">{formData.issueType.replace("-", " ")}</span></p>
                  <p className="text-sm"><span className="text-muted-foreground">Location:</span> {formData.location}</p>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <Button variant="hero" onClick={() => navigate("/")}>
                  Back to Home
                </Button>
                <Button variant="outline" onClick={() => { setRequestSubmitted(false); setStep(1); setFormData({ vehicleType: "", issueType: "", description: "", location: "", vehicleNumber: "" }); }}>
                  New Request
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Request a Mechanic
              </h1>
              <p className="text-muted-foreground">
                Fill in the details below and we'll connect you with a nearby mechanic
              </p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-4 mb-10">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    step >= s ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                  }`}>
                    {s}
                  </div>
                  {s < 3 && (
                    <div className={`w-16 h-1 ${step > s ? "bg-primary" : "bg-secondary"}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Vehicle Type */}
            {step === 1 && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-display font-semibold text-foreground mb-6">
                  Select Your Vehicle Type
                </h2>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {vehicleTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setFormData({ ...formData, vehicleType: type.id })}
                      className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all ${
                        formData.vehicleType === type.id
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50 bg-card"
                      }`}
                    >
                      <type.icon size={40} />
                      <span className="font-display font-semibold">{type.label}</span>
                    </button>
                  ))}
                </div>
                <Button 
                  variant="hero" 
                  size="xl" 
                  className="w-full"
                  disabled={!formData.vehicleType}
                  onClick={() => setStep(2)}
                >
                  Continue
                </Button>
              </div>
            )}

            {/* Step 2: Issue Type */}
            {step === 2 && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-display font-semibold text-foreground mb-6">
                  What's the Issue?
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {issueTypes.map((issue) => (
                    <button
                      key={issue.id}
                      onClick={() => setFormData({ ...formData, issueType: issue.id })}
                      className={`flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all ${
                        formData.issueType === issue.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50 bg-card"
                      }`}
                    >
                      <issue.icon size={32} className={issue.color} />
                      <span className="font-medium text-sm text-center">{issue.label}</span>
                    </button>
                  ))}
                </div>
                <div className="mb-8">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Additional Details (Optional)
                  </label>
                  <Input
                    placeholder="Describe the issue in detail..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="h-12"
                  />
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" size="xl" className="flex-1" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button 
                    variant="hero" 
                    size="xl" 
                    className="flex-1"
                    disabled={!formData.issueType}
                    onClick={() => setStep(3)}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Location */}
            {step === 3 && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-display font-semibold text-foreground mb-6">
                  Your Location
                </h2>
                <div className="space-y-4 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Vehicle Number
                    </label>
                    <Input
                      placeholder="e.g., JH-01-AB-1234"
                      value={formData.vehicleNumber}
                      onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Location / GPS Coordinates
                    </label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter location or use GPS"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="h-12 flex-1"
                      />
                      <Button variant="outline" size="lg" onClick={handleGetLocation}>
                        <MapPin size={20} />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Click the location icon to auto-detect your current position
                    </p>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-secondary/50 rounded-xl p-6 mb-8">
                  <h3 className="font-semibold text-foreground mb-4">Request Summary</h3>
                  <div className="space-y-2">
                    <p className="text-sm"><span className="text-muted-foreground">Vehicle Type:</span> <span className="capitalize">{formData.vehicleType}</span></p>
                    <p className="text-sm"><span className="text-muted-foreground">Issue:</span> <span className="capitalize">{formData.issueType.replace("-", " ")}</span></p>
                    {formData.description && (
                      <p className="text-sm"><span className="text-muted-foreground">Details:</span> {formData.description}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" size="xl" className="flex-1" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button 
                    variant="hero" 
                    size="xl" 
                    className="flex-1"
                    disabled={!formData.location || isSubmitting}
                    onClick={handleSubmit}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin mr-2" size={20} />
                        Submitting...
                      </>
                    ) : (
                      "Submit Request"
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RequestMechanic;
