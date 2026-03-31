import { motion } from "framer-motion";
import { MapPin, AlertTriangle, Flame, Droplets, Wind, Zap, Users } from "lucide-react";
import TrustScoreRing from "./TrustScoreRing";
import { Badge } from "@/components/ui/badge";

export interface Incident {
  id: string;
  type: string;
  icon: string;
  location: string;
  trustScore: number;
  priority: "high" | "medium" | "low";
  status: "Verified" | "Suspicious" | "Fake";
  time: string;
  duplicates?: number;
}

const iconMap: Record<string, React.ElementType> = {
  fire: Flame,
  flood: Droplets,
  storm: Wind,
  earthquake: Zap,
  accident: AlertTriangle,
  crowd: Users,
};

const IncidentCard = ({ incident, index = 0 }: { incident: Incident; index?: number }) => {
  const Icon = iconMap[incident.icon] || AlertTriangle;

  const priorityStyles = {
    high: "priority-high",
    medium: "priority-medium",
    low: "priority-low",
  };

  const statusStyles = {
    Verified: "status-verified",
    Suspicious: "status-suspicious",
    Fake: "status-fake",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="glass-card-hover rounded-lg p-4 cursor-pointer"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <div className={`p-2.5 rounded-lg bg-secondary ${priorityStyles[incident.priority]}`}>
            <Icon size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-sm text-foreground truncate">{incident.type}</h3>
              {incident.duplicates && incident.duplicates > 1 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
                  +{incident.duplicates}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-2">
              <MapPin size={12} />
              <span className="truncate">{incident.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={`text-[10px] px-2 py-0.5 rounded-full ${statusStyles[incident.status]}`}>
                {incident.status}
              </Badge>
              <span className="text-[10px] text-muted-foreground">{incident.time}</span>
            </div>
          </div>
        </div>
        <TrustScoreRing score={incident.trustScore} size={44} />
      </div>
    </motion.div>
  );
};

export default IncidentCard;
