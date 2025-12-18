import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Wrench, Car, Phone, User, Star } from "lucide-react";
import RatingForm from "@/components/RatingForm";
import MechanicTrackingMap from "@/components/MechanicTrackingMap";

interface MechanicRequest {
  id: string;
  vehicle_type: string;
  issue_type: string;
  issue_description: string | null;
  location: string;
  status: string;
  created_at: string;
  updated_at: string;
  assigned_mechanic_id: string | null;
  latitude: number | null;
  longitude: number | null;
}

interface MechanicProfile {
  name: string;
  phone: string | null;
  specialization: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

interface Review {
  id: string;
  request_id: string;
  rating: number;
}

const CustomerDashboard = () => {
  const { user, userRole, isLoading } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<MechanicRequest[]>([]);
  const [mechanicProfiles, setMechanicProfiles] = useState<Record<string, MechanicProfile>>({});
  const [reviews, setReviews] = useState<Record<string, Review>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && (!user || userRole !== "customer")) {
      navigate("/login");
    }
  }, [user, userRole, isLoading, navigate]);

  useEffect(() => {
    if (user && userRole === "customer") {
      fetchRequests();
      fetchReviews();
      
      const channel = supabase
        .channel("customer-requests")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "mechanic_requests",
            filter: `customer_id=eq.${user.id}`,
          },
          () => {
            fetchRequests();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user, userRole]);

  const fetchReviews = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("reviews" as any)
      .select("id, request_id, rating")
      .eq("customer_id", user.id) as any;
    
    if (data) {
      const reviewMap: Record<string, Review> = {};
      (data as Review[]).forEach((r) => {
        reviewMap[r.request_id] = r;
      });
      setReviews(reviewMap);
    }
  };

  const fetchRequests = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("mechanic_requests")
      .select("*")
      .eq("customer_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setRequests(data);
      
      // Fetch mechanic profiles for assigned requests
      const mechanicIds = data
        .filter((r) => r.assigned_mechanic_id)
        .map((r) => r.assigned_mechanic_id as string);
      
      if (mechanicIds.length > 0) {
        const { data: profiles } = await supabase
          .from("profiles")
          .select("user_id, name, phone, specialization")
          .in("user_id", mechanicIds);
        
        if (profiles) {
          const profileMap: Record<string, MechanicProfile> = {};
          profiles.forEach((p) => {
            profileMap[p.user_id] = {
              name: p.name,
              phone: p.phone,
              specialization: p.specialization,
            };
          });
          setMechanicProfiles(profileMap);
        }
      }
    }
    setLoading(false);
  };

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      pending: "bg-yellow-500",
      accepted: "bg-blue-500",
      in_progress: "bg-orange-500",
      completed: "bg-green-500",
      cancelled: "bg-gray-500",
    };

    return (
      <Badge className={`${statusColors[status] || "bg-gray-500"} text-white`}>
        {status.replace("_", " ").toUpperCase()}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const currentRequest = requests.find(
    (r) => r.status === "pending" || r.status === "accepted" || r.status === "in_progress"
  );

  const pastRequests = requests.filter(
    (r) => r.status === "completed" || r.status === "cancelled"
  );

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-20">
        <h1 className="text-3xl font-bold text-foreground mb-8">My Dashboard</h1>

        {/* Current Request Section */}
        {currentRequest && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Current Request</h2>
            <Card className="border-primary/50 bg-card">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-primary" />
                    {currentRequest.issue_type}
                  </CardTitle>
                  {getStatusBadge(currentRequest.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Car className="h-4 w-4" />
                    <span>{currentRequest.vehicle_type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{currentRequest.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Requested: {formatDate(currentRequest.created_at)}</span>
                  </div>
                </div>

                {currentRequest.issue_description && (
                  <p className="text-muted-foreground">
                    <strong>Details:</strong> {currentRequest.issue_description}
                  </p>
                )}

                {currentRequest.assigned_mechanic_id && mechanicProfiles[currentRequest.assigned_mechanic_id] && (
                  <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Assigned Mechanic</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-foreground">
                        <User className="h-4 w-4" />
                        <span>{mechanicProfiles[currentRequest.assigned_mechanic_id].name}</span>
                      </div>
                      {mechanicProfiles[currentRequest.assigned_mechanic_id].phone && (
                        <div className="flex items-center gap-2 text-foreground">
                          <Phone className="h-4 w-4" />
                          <a
                            href={`tel:${mechanicProfiles[currentRequest.assigned_mechanic_id].phone}`}
                            className="text-primary hover:underline"
                          >
                            {mechanicProfiles[currentRequest.assigned_mechanic_id].phone}
                          </a>
                        </div>
                      )}
                      {mechanicProfiles[currentRequest.assigned_mechanic_id].specialization && (
                        <p className="text-muted-foreground text-sm">
                          Specialization: {mechanicProfiles[currentRequest.assigned_mechanic_id].specialization}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Real-time Map Tracking */}
                {currentRequest.assigned_mechanic_id && currentRequest.latitude && currentRequest.longitude && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-foreground mb-2">Track Mechanic</h3>
                    <MechanicTrackingMap
                      customerLat={currentRequest.latitude}
                      customerLng={currentRequest.longitude}
                      mechanicLat={mechanicProfiles[currentRequest.assigned_mechanic_id]?.latitude}
                      mechanicLng={mechanicProfiles[currentRequest.assigned_mechanic_id]?.longitude}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
        )}

        {/* No Current Request */}
        {!currentRequest && (
          <Card className="mb-8 bg-card">
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground mb-4">You don't have any active requests.</p>
              <Button onClick={() => navigate("/request-mechanic")} className="bg-primary hover:bg-primary/90">
                Request a Mechanic
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Request History */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Request History</h2>
          {pastRequests.length === 0 ? (
            <Card className="bg-card">
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">No past requests yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {pastRequests.map((request) => (
                <Card key={request.id} className="bg-card">
                  <CardContent className="py-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Wrench className="h-4 w-4 text-primary" />
                          <span className="font-medium text-foreground">{request.issue_type}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Car className="h-3 w-3" />
                            {request.vehicle_type}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {request.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDate(request.created_at)}
                          </span>
                        </div>
                      </div>
                      {getStatusBadge(request.status)}
                    </div>
                    
                    {/* Rating Section for Completed Requests */}
                    {request.status === "completed" && request.assigned_mechanic_id && (
                      <div className="mt-4 pt-4 border-t border-border">
                        {reviews[request.id] ? (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Your rating:</span>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-5 w-5 ${
                                    star <= reviews[request.id].rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-muted-foreground"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        ) : (
                          <RatingForm
                            requestId={request.id}
                            mechanicId={request.assigned_mechanic_id}
                            customerId={user!.id}
                            onSubmitted={fetchReviews}
                          />
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CustomerDashboard;
