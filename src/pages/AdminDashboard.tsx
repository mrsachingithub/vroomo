import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users, Wrench, CheckCircle, Clock, AlertCircle, ShieldCheck, ShieldX } from "lucide-react";
import { toast } from "sonner";

interface MechanicProfile {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string | null;
  specialization: string | null;
  experience_years: number | null;
  created_at: string;
  is_verified: boolean | null;
  verified_at: string | null;
}

interface MechanicRequest {
  id: string;
  customer_id: string;
  vehicle_type: string;
  issue_type: string;
  issue_description: string | null;
  location: string;
  status: string;
  created_at: string;
  assigned_mechanic_id: string | null;
}

interface CustomerProfile {
  user_id: string;
  name: string;
  email: string;
  phone: string | null;
}

const AdminDashboard = () => {
  const { user, userRole, isLoading } = useAuth();
  const navigate = useNavigate();
  const [mechanics, setMechanics] = useState<MechanicProfile[]>([]);
  const [requests, setRequests] = useState<MechanicRequest[]>([]);
  const [customerProfiles, setCustomerProfiles] = useState<Record<string, CustomerProfile>>({});
  const [mechanicProfiles, setMechanicProfiles] = useState<Record<string, MechanicProfile>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && (!user || userRole !== "admin")) {
      navigate("/login");
    }
  }, [user, userRole, isLoading, navigate]);

  useEffect(() => {
    if (user && userRole === "admin") {
      fetchData();

      const requestsChannel = supabase
        .channel("admin-requests")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "mechanic_requests" },
          () => fetchData()
        )
        .subscribe();

      return () => {
        supabase.removeChannel(requestsChannel);
      };
    }
  }, [user, userRole]);

  const fetchData = async () => {
    // Fetch all mechanics
    const { data: mechanicRoles } = await supabase
      .from("user_roles")
      .select("user_id")
      .eq("role", "mechanic");

    if (mechanicRoles && mechanicRoles.length > 0) {
      const mechanicIds = mechanicRoles.map((r) => r.user_id);
      const { data: mechanicData } = await supabase
        .from("profiles")
        .select("*")
        .in("user_id", mechanicIds);

      if (mechanicData) {
        setMechanics(mechanicData);
        const profileMap: Record<string, MechanicProfile> = {};
        mechanicData.forEach((m) => {
          profileMap[m.user_id] = m;
        });
        setMechanicProfiles(profileMap);
      }
    }

    // Fetch all requests
    const { data: requestData } = await supabase
      .from("mechanic_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (requestData) {
      setRequests(requestData);

      // Fetch customer profiles
      const customerIds = [...new Set(requestData.map((r) => r.customer_id))];
      if (customerIds.length > 0) {
        const { data: customerData } = await supabase
          .from("profiles")
          .select("user_id, name, email, phone")
          .in("user_id", customerIds);

        if (customerData) {
          const custMap: Record<string, CustomerProfile> = {};
          customerData.forEach((c) => {
            custMap[c.user_id] = c;
          });
          setCustomerProfiles(custMap);
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

  const verifyMechanic = async (mechanicUserId: string, verified: boolean) => {
    const { error } = await supabase
      .from("profiles")
      .update({
        is_verified: verified,
        verified_at: verified ? new Date().toISOString() : null,
        verified_by: verified ? user?.id : null,
      })
      .eq("user_id", mechanicUserId);

    if (error) {
      toast.error("Failed to update verification status");
      return;
    }

    toast.success(verified ? "Mechanic verified successfully" : "Verification revoked");
    fetchData();
  };

  const stats = {
    totalMechanics: mechanics.length,
    pendingVerification: mechanics.filter((m) => !m.is_verified).length,
    totalRequests: requests.length,
    pendingRequests: requests.filter((r) => r.status === "pending").length,
    completedRequests: requests.filter((r) => r.status === "completed").length,
  };

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
        <h1 className="text-3xl font-bold text-foreground mb-8">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card className="bg-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Mechanics</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalMechanics}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Verification</p>
                  <p className="text-2xl font-bold text-orange-500">{stats.pendingVerification}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Requests</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalRequests}</p>
                </div>
                <Wrench className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Requests</p>
                  <p className="text-2xl font-bold text-yellow-500">{stats.pendingRequests}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-green-500">{stats.completedRequests}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Mechanics and Requests */}
        <Tabs defaultValue="mechanics" className="space-y-4">
          <TabsList className="bg-muted">
            <TabsTrigger value="mechanics">Registered Mechanics</TabsTrigger>
            <TabsTrigger value="requests">All Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="mechanics">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Registered Mechanics</CardTitle>
              </CardHeader>
              <CardContent>
                {mechanics.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No mechanics registered yet.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Specialization</TableHead>
                        <TableHead>Experience</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mechanics.map((mechanic) => (
                        <TableRow key={mechanic.id}>
                          <TableCell className="font-medium">{mechanic.name}</TableCell>
                          <TableCell>{mechanic.email}</TableCell>
                          <TableCell>{mechanic.phone || "N/A"}</TableCell>
                          <TableCell>{mechanic.specialization || "General"}</TableCell>
                          <TableCell>
                            {mechanic.experience_years
                              ? `${mechanic.experience_years} years`
                              : "N/A"}
                          </TableCell>
                          <TableCell>
                            {mechanic.is_verified ? (
                              <Badge className="bg-green-500 text-white">
                                <ShieldCheck className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            ) : (
                              <Badge className="bg-yellow-500 text-white">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                Pending
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {mechanic.is_verified ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => verifyMechanic(mechanic.user_id, false)}
                                className="text-destructive hover:text-destructive"
                              >
                                <ShieldX className="h-4 w-4 mr-1" />
                                Revoke
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => verifyMechanic(mechanic.user_id, true)}
                                className="text-green-600 hover:text-green-700"
                              >
                                <ShieldCheck className="h-4 w-4 mr-1" />
                                Verify
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">All Service Requests</CardTitle>
              </CardHeader>
              <CardContent>
                {requests.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No requests yet.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Vehicle</TableHead>
                        <TableHead>Issue</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Mechanic</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {requests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">
                            {customerProfiles[request.customer_id]?.name || "Unknown"}
                          </TableCell>
                          <TableCell>{request.vehicle_type}</TableCell>
                          <TableCell>{request.issue_type}</TableCell>
                          <TableCell className="max-w-[200px] truncate">
                            {request.location}
                          </TableCell>
                          <TableCell>{getStatusBadge(request.status)}</TableCell>
                          <TableCell>
                            {request.assigned_mechanic_id
                              ? mechanicProfiles[request.assigned_mechanic_id]?.name || "Assigned"
                              : "Unassigned"}
                          </TableCell>
                          <TableCell>{formatDate(request.created_at)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
