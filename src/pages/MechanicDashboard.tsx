import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, MapPin, Clock, CheckCircle, XCircle, Wrench, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface MechanicRequest {
  id: string;
  vehicle_type: string;
  issue_type: string;
  issue_description: string | null;
  location: string;
  status: string;
  created_at: string;
  customer_id: string;
  assigned_mechanic_id: string | null;
  customer_name?: string;
  customer_phone?: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
  request_id: string | null;
}

const MechanicDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, userRole, isAuthenticated, isLoading } = useAuth();
  const [requests, setRequests] = useState<MechanicRequest[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState<"pending" | "accepted" | "completed">("pending");

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || userRole !== "mechanic")) {
      navigate("/");
      return;
    }

    if (user) {
      fetchRequests();
      fetchNotifications();
      
      // Subscribe to realtime notifications
      const channel = supabase
        .channel("mechanic-notifications")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "notifications",
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            const newNotification = payload.new as Notification;
            setNotifications((prev) => [newNotification, ...prev]);
            toast({
              title: newNotification.title,
              description: newNotification.message,
            });
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user, userRole, isAuthenticated, isLoading, navigate]);

  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from("mechanic_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching requests:", error);
      return;
    }

    // Fetch customer profiles for each request
    const requestsWithCustomers = await Promise.all(
      (data || []).map(async (request) => {
        const { data: profile } = await supabase
          .from("profiles")
          .select("name, phone")
          .eq("user_id", request.customer_id)
          .maybeSingle();

        return {
          ...request,
          customer_name: profile?.name || "Customer",
          customer_phone: profile?.phone || "N/A",
        };
      })
    );

    setRequests(requestsWithCustomers);
  };

  const fetchNotifications = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(20);

    if (!error && data) {
      setNotifications(data);
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", notificationId);

    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, is_read: true } : n))
    );
  };

  const acceptRequest = async (requestId: string) => {
    if (!user) return;

    const { error } = await supabase
      .from("mechanic_requests")
      .update({
        status: "accepted",
        assigned_mechanic_id: user.id,
        updated_at: new Date().toISOString(),
      })
      .eq("id", requestId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to accept request",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Request Accepted",
      description: "The customer will be notified of your acceptance.",
    });

    fetchRequests();
  };

  const completeRequest = async (requestId: string) => {
    const { error } = await supabase
      .from("mechanic_requests")
      .update({
        status: "completed",
        updated_at: new Date().toISOString(),
      })
      .eq("id", requestId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to complete request",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Request Completed",
      description: "Great job! The service has been marked as complete.",
    });

    fetchRequests();
  };

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const filteredRequests = requests.filter((r) => {
    if (activeTab === "pending") return r.status === "pending";
    if (activeTab === "accepted") return r.status === "accepted" && r.assigned_mechanic_id === user?.id;
    if (activeTab === "completed") return r.status === "completed" && r.assigned_mechanic_id === user?.id;
    return false;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                Mechanic Dashboard
              </h1>
              <p className="text-muted-foreground">
                View and respond to customer service requests
              </p>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <Button
                variant="outline"
                size="icon"
                className="relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-semibold text-foreground">Notifications</h3>
                  </div>
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">
                      No notifications yet
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-border cursor-pointer hover:bg-secondary/50 ${
                          !notification.is_read ? "bg-primary/5" : ""
                        }`}
                        onClick={() => markNotificationAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-2 h-2 rounded-full mt-2 ${
                              notification.is_read ? "bg-muted" : "bg-primary"
                            }`}
                          />
                          <div>
                            <p className="font-medium text-foreground text-sm">
                              {notification.title}
                            </p>
                            <p className="text-muted-foreground text-xs mt-1">
                              {notification.message}
                            </p>
                            <p className="text-muted-foreground text-xs mt-2">
                              {new Date(notification.created_at).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {(["pending", "accepted", "completed"] as const).map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "hero" : "outline"}
                onClick={() => setActiveTab(tab)}
                className="capitalize"
              >
                {tab}
                {tab === "pending" && (
                  <span className="ml-2 bg-background/20 px-2 py-0.5 rounded text-xs">
                    {requests.filter((r) => r.status === "pending").length}
                  </span>
                )}
              </Button>
            ))}
          </div>

          {/* Requests List */}
          <div className="grid gap-4">
            {filteredRequests.length === 0 ? (
              <div className="text-center py-16 bg-card rounded-xl border border-border">
                <Wrench size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No {activeTab} requests
                </h3>
                <p className="text-muted-foreground">
                  {activeTab === "pending"
                    ? "New customer requests will appear here"
                    : `Your ${activeTab} requests will appear here`}
                </p>
              </div>
            ) : (
              filteredRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-card border border-border rounded-xl p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            request.status === "pending"
                              ? "bg-yellow-500/20 text-yellow-600"
                              : request.status === "accepted"
                              ? "bg-blue-500/20 text-blue-600"
                              : "bg-green-500/20 text-green-600"
                          }`}
                        >
                          {request.status.toUpperCase()}
                        </span>
                        <span className="text-muted-foreground text-sm capitalize">
                          {request.vehicle_type}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-foreground mb-2 capitalize">
                        {request.issue_type.replace("-", " ")} Issue
                      </h3>

                      {request.issue_description && (
                        <p className="text-muted-foreground text-sm mb-3">
                          {request.issue_description}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <User size={16} />
                          <span>{request.customer_name}</span>
                        </div>
                        {request.status !== "pending" && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Phone size={16} />
                            <span>{request.customer_phone}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin size={16} />
                          <span className="truncate max-w-[200px]">
                            {request.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock size={16} />
                          <span>
                            {new Date(request.created_at).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {request.status === "pending" && (
                        <Button
                          variant="hero"
                          onClick={() => acceptRequest(request.id)}
                        >
                          <CheckCircle size={18} className="mr-2" />
                          Accept
                        </Button>
                      )}
                      {request.status === "accepted" &&
                        request.assigned_mechanic_id === user?.id && (
                          <Button
                            variant="hero"
                            onClick={() => completeRequest(request.id)}
                          >
                            <CheckCircle size={18} className="mr-2" />
                            Mark Complete
                          </Button>
                        )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MechanicDashboard;
