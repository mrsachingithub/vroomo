import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface MechanicTrackingMapProps {
  customerLat: number;
  customerLng: number;
  mechanicLat?: number | null;
  mechanicLng?: number | null;
}

const MechanicTrackingMap = ({
  customerLat,
  customerLng,
  mechanicLat,
  mechanicLng,
}: MechanicTrackingMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const customerMarker = useRef<mapboxgl.Marker | null>(null);
  const mechanicMarker = useRef<mapboxgl.Marker | null>(null);
  const [mapboxToken, setMapboxToken] = useState(
    localStorage.getItem("mapbox_token") || ""
  );
  const [tokenInput, setTokenInput] = useState("");
  const [mapError, setMapError] = useState(false);

  const initializeMap = (token: string) => {
    if (!mapContainer.current || !token) return;

    try {
      mapboxgl.accessToken = token;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [customerLng, customerLat],
        zoom: 13,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

      // Customer marker (red)
      const customerEl = document.createElement("div");
      customerEl.className = "customer-marker";
      customerEl.innerHTML = `<div style="background: #ef4444; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>`;
      
      customerMarker.current = new mapboxgl.Marker(customerEl)
        .setLngLat([customerLng, customerLat])
        .setPopup(new mapboxgl.Popup().setHTML("<strong>Your Location</strong>"))
        .addTo(map.current);

      // Mechanic marker (blue)
      if (mechanicLat && mechanicLng) {
        const mechanicEl = document.createElement("div");
        mechanicEl.className = "mechanic-marker";
        mechanicEl.innerHTML = `<div style="background: #3b82f6; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>`;
        
        mechanicMarker.current = new mapboxgl.Marker(mechanicEl)
          .setLngLat([mechanicLng, mechanicLat])
          .setPopup(new mapboxgl.Popup().setHTML("<strong>Mechanic Location</strong>"))
          .addTo(map.current);

        // Fit bounds to show both markers
        const bounds = new mapboxgl.LngLatBounds();
        bounds.extend([customerLng, customerLat]);
        bounds.extend([mechanicLng, mechanicLat]);
        map.current.fitBounds(bounds, { padding: 60 });
      }

      setMapError(false);
    } catch (error) {
      console.error("Map initialization error:", error);
      setMapError(true);
    }
  };

  useEffect(() => {
    if (mapboxToken) {
      initializeMap(mapboxToken);
    }

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  // Update mechanic position in real-time
  useEffect(() => {
    if (map.current && mechanicMarker.current && mechanicLat && mechanicLng) {
      mechanicMarker.current.setLngLat([mechanicLng, mechanicLat]);
    } else if (map.current && mechanicLat && mechanicLng && !mechanicMarker.current) {
      const mechanicEl = document.createElement("div");
      mechanicEl.className = "mechanic-marker";
      mechanicEl.innerHTML = `<div style="background: #3b82f6; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>`;
      
      mechanicMarker.current = new mapboxgl.Marker(mechanicEl)
        .setLngLat([mechanicLng, mechanicLat])
        .setPopup(new mapboxgl.Popup().setHTML("<strong>Mechanic Location</strong>"))
        .addTo(map.current);
    }
  }, [mechanicLat, mechanicLng]);

  const handleSaveToken = () => {
    if (tokenInput.trim()) {
      localStorage.setItem("mapbox_token", tokenInput.trim());
      setMapboxToken(tokenInput.trim());
    }
  };

  if (!mapboxToken || mapError) {
    return (
      <div className="p-4 bg-muted/50 rounded-lg border border-border">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="h-5 w-5 text-primary" />
          <h4 className="font-semibold text-foreground">Real-time Tracking</h4>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          Enter your Mapbox public token to enable map tracking. Get one free at{" "}
          <a
            href="https://mapbox.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            mapbox.com
          </a>
        </p>
        <div className="flex gap-2">
          <Input
            placeholder="pk.eyJ1..."
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
          />
          <Button onClick={handleSaveToken} disabled={!tokenInput.trim()}>
            Save
          </Button>
        </div>
        {mapError && (
          <p className="text-sm text-destructive mt-2">
            Invalid token. Please check and try again.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden border border-border">
      <div ref={mapContainer} className="h-64 w-full" />
      <div className="p-2 bg-card flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-muted-foreground">Your location</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-muted-foreground">Mechanic</span>
        </div>
      </div>
    </div>
  );
};

export default MechanicTrackingMap;
