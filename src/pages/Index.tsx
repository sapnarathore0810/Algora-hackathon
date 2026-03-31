import { motion } from "framer-motion";
import { AlertTriangle, Plus, Users, Map } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import IncidentCard, { Incident } from "@/components/IncidentCard";
import FlowIndicator from "@/components/FlowIndicator";
import RewardBadges from "@/components/RewardBadges";

const incidents: Incident[] = [
  { id: "1", type: "Building Fire", icon: "fire", location: "Sector 12, Downtown", trustScore: 87, priority: "high", status: "Verified", time: "3 min ago", duplicates: 4 },
  { id: "2", type: "Flash Flood Warning", icon: "flood", location: "River Road, East District", trustScore: 62, priority: "medium", status: "Suspicious", time: "12 min ago", duplicates: 2 },
  { id: "3", type: "Power Grid Failure", icon: "earthquake", location: "Industrial Zone B", trustScore: 91, priority: "high", status: "Verified", time: "18 min ago" },
  { id: "4", type: "Traffic Accident", icon: "accident", location: "Highway 7, Exit 3", trustScore: 45, priority: "low", status: "Suspicious", time: "25 min ago" },
  { id: "5", type: "Severe Storm Alert", icon: "storm", location: "Northern Suburbs", trustScore: 23, priority: "low", status: "Fake", time: "40 min ago" },
  { id: "6", type: "Crowd Emergency", icon: "crowd", location: "Central Park Arena", trustScore: 78, priority: "medium", status: "Verified", time: "1 hr ago", duplicates: 7 },
];

const Index = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-foreground tracking-tight"
        >
          Crisis Dashboard
        </motion.h1>
        <p className="text-sm text-muted-foreground mt-1">Real-time incident monitoring · Stay informed, stay safe</p>
      </div>

      {/* Quick actions */}
      <div className="flex gap-3 flex-wrap">
        <Link to="/report">
          <Button className="warm-gradient text-primary-foreground border-0 gap-2 rounded-lg shadow-lg shadow-warm/20 hover:shadow-warm/30 transition-shadow">
            <Plus size={16} /> Report Incident
          </Button>
        </Link>
        <Link to="/volunteer">
          <Button variant="secondary" className="gap-2 rounded-lg">
            <Users size={16} /> Volunteer
          </Button>
        </Link>
        <Link to="/map">
          <Button variant="secondary" className="gap-2 rounded-lg">
            <Map size={16} /> View Map
          </Button>
        </Link>
      </div>

      {/* Flow indicator */}
      <div className="glass-card rounded-lg p-4">
        <p className="text-xs text-muted-foreground mb-3 font-medium">How your report gets resolved</p>
        <FlowIndicator activeStep={2} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Active Alerts", value: "24", color: "text-crisis-red" },
          { label: "Verified", value: "18", color: "text-crisis-green" },
          { label: "Volunteers Online", value: "142", color: "text-primary" },
          { label: "Resolved Today", value: "31", color: "text-crisis-amber" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="glass-card rounded-lg p-4"
          >
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Incident feed */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <AlertTriangle size={14} className="text-crisis-amber" />
              Live Incidents
            </h2>
            <span className="text-[10px] text-muted-foreground">Updating in real-time</span>
          </div>
          <div className="space-y-2">
            {incidents.map((incident, i) => (
              <IncidentCard key={incident.id} incident={incident} index={i} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <RewardBadges userPoints={520} />

          <div className="glass-card rounded-lg p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">💡 Safety Tip</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              During a crisis, stay calm and follow verified instructions. Your detailed reports help responders arrive faster.
            </p>
          </div>

          <div className="glass-card rounded-lg p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">Community Impact</h3>
            <div className="space-y-2">
              {[
                { label: "Reports submitted", value: "1,247" },
                { label: "Lives assisted", value: "3,891" },
                { label: "Avg response time", value: "4.2 min" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
