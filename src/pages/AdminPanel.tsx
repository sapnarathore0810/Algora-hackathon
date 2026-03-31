import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Filter, CheckCircle2, XCircle, ArrowUpCircle, Users, AlertTriangle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import TrustScoreRing from "@/components/TrustScoreRing";
import { Badge } from "@/components/ui/badge";

const alerts = [
  { id: 1, type: "Building Fire", location: "Sector 12", trustScore: 87, priority: "high", status: "Verified", time: "3 min ago", source: "Citizen", reasoning: "4 corroborating reports, image verified, location matches hotspot" },
  { id: 2, type: "Flash Flood", location: "River Road", trustScore: 62, priority: "medium", status: "Suspicious", time: "12 min ago", source: "Anonymous", reasoning: "Only 2 reports, weather data partial match, no image" },
  { id: 3, type: "Power Failure", location: "Zone B", trustScore: 91, priority: "high", status: "Verified", time: "18 min ago", source: "Utility Sensor", reasoning: "Automated sensor alert, confirmed by 6 citizen reports" },
  { id: 4, type: "Fake Storm Alert", location: "North", trustScore: 23, priority: "low", status: "Fake", time: "40 min ago", source: "Anonymous", reasoning: "No weather data support, single source, contradicting reports" },
  { id: 5, type: "Crowd Emergency", location: "Central Park", trustScore: 78, priority: "medium", status: "Verified", time: "1 hr ago", source: "Citizen", reasoning: "7 reports with images, police scanner confirmation" },
];

const volunteers = [
  { id: 1, name: "Sarah K.", skills: ["First Aid", "Transport"], status: "Active", tasks: 8 },
  { id: 2, name: "Mike R.", skills: ["Search & Rescue"], status: "Pending", tasks: 0 },
  { id: 3, name: "Lisa M.", skills: ["Medical", "Counseling"], status: "Active", tasks: 12 },
];

const AdminPanel = () => {
  const [filter, setFilter] = useState("all");
  const [tab, setTab] = useState<"alerts" | "volunteers">("alerts");

  const filtered = filter === "all" ? alerts : alerts.filter((a) => a.status.toLowerCase() === filter);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-2">
        <Shield size={20} className="text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Admin Control Center</h1>
          <p className="text-sm text-muted-foreground">Manage incidents, volunteers, and responses</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Alerts", value: "24", icon: AlertTriangle, color: "text-crisis-amber" },
          { label: "Needs Review", value: "7", icon: Shield, color: "text-crisis-red" },
          { label: "Active Volunteers", value: "142", icon: Users, color: "text-primary" },
          { label: "Resolved", value: "31", icon: CheckCircle2, color: "text-crisis-green" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card rounded-lg p-4 flex items-center gap-3">
            <s.icon size={20} className={s.color} />
            <div>
              <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-[11px] text-muted-foreground">{s.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button onClick={() => setTab("alerts")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === "alerts" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}>
          Alerts
        </button>
        <button onClick={() => setTab("volunteers")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === "volunteers" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}>
          Volunteers
        </button>
      </div>

      {tab === "alerts" && (
        <>
          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={14} className="text-muted-foreground" />
            {["all", "verified", "suspicious", "fake"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
                  filter === f ? "bg-primary/15 text-primary border border-primary/30" : "bg-secondary/50 text-muted-foreground border border-border hover:border-primary/20"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Alert cards */}
          <div className="space-y-3">
            {filtered.map((alert, i) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-lg p-4"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <TrustScoreRing score={alert.trustScore} size={48} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-foreground">{alert.type}</h3>
                        <Badge variant="outline" className={`text-[10px] px-2 py-0 rounded-full ${
                          alert.status === "Verified" ? "status-verified" : alert.status === "Suspicious" ? "status-suspicious" : "status-fake"
                        }`}>
                          {alert.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{alert.location} · {alert.time} · Source: {alert.source}</p>
                    </div>
                  </div>

                  {/* AI Reasoning */}
                  <div className="flex-1 p-2.5 rounded-lg bg-secondary/30 border border-border/30">
                    <p className="text-[11px] text-muted-foreground">
                      <span className="font-medium text-foreground">AI Reasoning: </span>
                      {alert.reasoning}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 flex-shrink-0">
                    <Button size="sm" variant="secondary" className="gap-1 text-xs rounded-lg text-crisis-green border-crisis-green/20 hover:bg-crisis-green/10">
                      <CheckCircle2 size={13} /> Approve
                    </Button>
                    <Button size="sm" variant="secondary" className="gap-1 text-xs rounded-lg text-crisis-red border-crisis-red/20 hover:bg-crisis-red/10">
                      <XCircle size={13} /> Fake
                    </Button>
                    <Button size="sm" variant="secondary" className="gap-1 text-xs rounded-lg text-crisis-amber border-crisis-amber/20 hover:bg-crisis-amber/10">
                      <ArrowUpCircle size={13} /> Escalate
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {tab === "volunteers" && (
        <div className="space-y-3">
          {volunteers.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full warm-gradient flex items-center justify-center text-sm font-semibold text-primary-foreground">
                  {v.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{v.name}</p>
                  <div className="flex gap-1 mt-1">
                    {v.skills.map((s) => (
                      <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">{v.tasks} tasks</span>
                {v.status === "Pending" ? (
                  <div className="flex gap-1.5">
                    <Button size="sm" className="text-xs rounded-lg warm-gradient text-primary-foreground border-0">Approve</Button>
                    <Button size="sm" variant="secondary" className="text-xs rounded-lg">Reject</Button>
                  </div>
                ) : (
                  <Badge variant="outline" className="status-verified text-[10px] rounded-full">Active</Badge>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
