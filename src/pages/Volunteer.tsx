import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Star, CheckCircle2, ArrowRight, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const skills = ["First Aid", "Search & Rescue", "Medical", "Logistics", "Communication", "Transport", "Counseling", "Tech Support"];

const tasks = [
  { id: 1, title: "Deliver supplies to Sector 12", status: "Assigned", distance: "2.3 km", match: 94, priority: "high" as const },
  { id: 2, title: "Assist evacuation at River Road", status: "In Progress", distance: "4.1 km", match: 87, priority: "medium" as const },
  { id: 3, title: "Medical checkup at shelter", status: "Completed", distance: "1.5 km", match: 91, priority: "low" as const },
];

const Volunteer = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["First Aid", "Transport"]);
  const [registered, setRegistered] = useState(true);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const statusColor = { Assigned: "text-primary", "In Progress": "text-crisis-amber", Completed: "text-crisis-green" };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Volunteer Hub</h1>
        <p className="text-sm text-muted-foreground mt-1">Make a difference in your community</p>
      </div>

      {/* Notification */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-lg p-4 border-primary/20 flex items-start gap-3"
      >
        <div className="p-2 rounded-lg bg-primary/10">
          <Bell size={16} className="text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">You're the best match for an emergency nearby!</p>
          <p className="text-xs text-muted-foreground mt-0.5">Supply delivery needed 2.3 km from your location</p>
        </div>
      </motion.div>

      {/* Skills */}
      <div className="glass-card rounded-lg p-4">
        <h2 className="text-sm font-semibold text-foreground mb-3">Your Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <button
              key={skill}
              onClick={() => toggleSkill(skill)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedSkills.includes(skill)
                  ? "bg-primary/15 text-primary border border-primary/30"
                  : "bg-secondary/50 text-muted-foreground border border-border hover:border-primary/20"
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground">Your Tasks</h2>
        {tasks.map((task, i) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card-hover rounded-lg p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-foreground">{task.title}</h3>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin size={11} /> {task.distance}</span>
                  <span className="flex items-center gap-1"><Star size={11} className="text-crisis-amber" /> {task.match}% match</span>
                  <span className={`font-medium ${statusColor[task.status as keyof typeof statusColor]}`}>
                    {task.status === "Completed" && <CheckCircle2 size={11} className="inline mr-0.5" />}
                    {task.status}
                  </span>
                </div>
              </div>
              {task.status === "Assigned" && (
                <Button size="sm" className="warm-gradient text-primary-foreground border-0 rounded-lg gap-1 text-xs">
                  Accept <ArrowRight size={12} />
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Volunteer;
