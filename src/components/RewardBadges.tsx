import { motion } from "framer-motion";
import { Award, Star, Trophy } from "lucide-react";

const badges = [
  { label: "Bronze Responder", icon: Award, emoji: "🥉", points: 150, color: "text-[hsl(25,60%,50%)]", bg: "bg-[hsl(25,60%,50%,0.1)]" },
  { label: "Silver Saver", icon: Star, emoji: "🥈", points: 450, color: "text-[hsl(220,10%,65%)]", bg: "bg-[hsl(220,10%,65%,0.1)]" },
  { label: "Gold Hero", icon: Trophy, emoji: "🥇", points: 1200, color: "text-crisis-amber", bg: "bg-crisis-amber/10" },
];

const RewardBadges = ({ userPoints = 520 }: { userPoints?: number }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Your Achievements</h3>
        <span className="text-xs text-primary font-medium">{userPoints} pts</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {badges.map((badge, i) => {
          const earned = userPoints >= badge.points;
          return (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card rounded-lg p-3 text-center ${!earned ? "opacity-40" : ""}`}
            >
              <div className="text-2xl mb-1">{badge.emoji}</div>
              <div className="text-[10px] font-medium text-foreground">{badge.label}</div>
              <div className="text-[9px] text-muted-foreground mt-0.5">{badge.points} pts</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default RewardBadges;
