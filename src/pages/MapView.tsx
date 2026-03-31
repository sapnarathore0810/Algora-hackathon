import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, AlertTriangle, Shield } from "lucide-react";
import TrustScoreRing from "@/components/TrustScoreRing";
import { Badge } from "@/components/ui/badge";

const markers = [
  { id: 1, x: 25, y: 30, priority: "high" as const, type: "Building Fire", location: "Sector 12", trustScore: 87, duplicates: 4, status: "Verified" as const },
  { id: 2, x: 55, y: 45, priority: "medium" as const, type: "Flash Flood", location: "River Road", trustScore: 62, duplicates: 2, status: "Suspicious" as const },
  { id: 3, x: 70, y: 25, priority: "high" as const, type: "Power Failure", location: "Zone B", trustScore: 91, duplicates: 1, status: "Verified" as const },
  { id: 4, x: 40, y: 65, priority: "low" as const, type: "Traffic Accident", location: "Highway 7", trustScore: 45, duplicates: 1, status: "Suspicious" as const },
  { id: 5, x: 80, y: 60, priority: "low" as const, type: "Resolved Storm", location: "North", trustScore: 88, duplicates: 0, status: "Verified" as const },
  { id: 6, x: 15, y: 70, priority: "medium" as const, type: "Crowd Emergency", location: "Central Park", trustScore: 78, duplicates: 7, status: "Verified" as const },
];

const colorMap = { high: "bg-crisis-red", medium: "bg-crisis-amber", low: "bg-crisis-green" };
const pulseMap = { high: "bg-crisis-red/30", medium: "bg-crisis-amber/30", low: "bg-crisis-green/30" };

const MapView = () => {
  const [selected, setSelected] = useState<typeof markers[0] | null>(null);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Map View</h1>
        <p className="text-sm text-muted-foreground mt-1">Real-time crisis map with incident markers</p>
      </div>

      {/* Legend */}
      <div className="flex gap-4 text-xs">
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-crisis-red" /> High Priority</div>
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-crisis-amber" /> Medium</div>
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-crisis-green" /> Resolved</div>
      </div>

      {/* Map area */}
      <div className="relative glass-card rounded-lg overflow-hidden" style={{ height: "70vh" }}>
        {/* Grid pattern background */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }} />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/3" />

        {/* Markers */}
        {markers.map((m) => (
          <motion.button
            key={m.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: m.id * 0.1, type: "spring" }}
            className="absolute z-10 group"
            style={{ left: `${m.x}%`, top: `${m.y}%` }}
            onClick={() => setSelected(m)}
          >
            <span className={`absolute -inset-3 rounded-full ${pulseMap[m.priority]} animate-ping`} />
            <span className={`relative block w-4 h-4 rounded-full ${colorMap[m.priority]} border-2 border-background shadow-lg`} />
            {m.duplicates > 1 && (
              <span className="absolute -top-2 -right-2 text-[9px] w-4 h-4 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                {m.duplicates}
              </span>
            )}
          </motion.button>
        ))}

        {/* Selected card */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-4 left-4 right-4 glass-card rounded-lg p-4 z-20"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-secondary ${selected.priority === "high" ? "priority-high" : selected.priority === "medium" ? "priority-medium" : "priority-low"}`}>
                    <AlertTriangle size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{selected.type}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <MapPin size={11} /> {selected.location}
                    </p>
                    <Badge variant="outline" className={`mt-2 text-[10px] px-2 py-0.5 rounded-full ${
                      selected.status === "Verified" ? "status-verified" : "status-suspicious"
                    }`}>
                      {selected.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrustScoreRing score={selected.trustScore} size={40} />
                  <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground">
                    <X size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MapView;
