import { motion } from "framer-motion";
import { Award, Star, Trophy, Target, Zap, Heart } from "lucide-react";
import RewardBadges from "@/components/RewardBadges";

const history = [
  { action: "Reported verified incident", points: 25, time: "Today" },
  { action: "Completed supply delivery", points: 50, time: "Today" },
  { action: "Assisted evacuation", points: 75, time: "Yesterday" },
  { action: "Verified 5 reports", points: 30, time: "2 days ago" },
  { action: "First responder bonus", points: 100, time: "3 days ago" },
];

const Rewards = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Rewards & Recognition</h1>
        <p className="text-sm text-muted-foreground mt-1">Your contributions make communities safer</p>
      </div>

      {/* Points overview */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-lg p-6 text-center"
      >
        <div className="text-4xl font-bold text-primary">520</div>
        <div className="text-sm text-muted-foreground mt-1">Total Points Earned</div>
        <div className="flex justify-center gap-6 mt-4 text-xs">
          <div><span className="text-lg font-semibold text-foreground">12</span><br /><span className="text-muted-foreground">Tasks Done</span></div>
          <div><span className="text-lg font-semibold text-foreground">8</span><br /><span className="text-muted-foreground">Reports</span></div>
          <div><span className="text-lg font-semibold text-foreground">4.8</span><br /><span className="text-muted-foreground">Rating</span></div>
        </div>
      </motion.div>

      <RewardBadges userPoints={520} />

      {/* History */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground">Recent Activity</h2>
        {history.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="glass-card rounded-lg p-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-lg bg-crisis-green/10">
                <Zap size={14} className="text-crisis-green" />
              </div>
              <div>
                <p className="text-xs font-medium text-foreground">{item.action}</p>
                <p className="text-[10px] text-muted-foreground">{item.time}</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-crisis-green">+{item.points}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Rewards;
