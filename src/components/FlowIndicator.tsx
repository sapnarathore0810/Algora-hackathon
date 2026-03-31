import { motion } from "framer-motion";
import { FileText, Shield, GitMerge, ArrowUpCircle, UserCheck, CheckCircle2 } from "lucide-react";

const steps = [
  { label: "Report", icon: FileText },
  { label: "Verify", icon: Shield },
  { label: "Merge", icon: GitMerge },
  { label: "Prioritize", icon: ArrowUpCircle },
  { label: "Assign", icon: UserCheck },
  { label: "Resolve", icon: CheckCircle2 },
];

const FlowIndicator = ({ activeStep = 1 }: { activeStep?: number }) => {
  return (
    <div className="flex items-center justify-between w-full gap-1">
      {steps.map((step, i) => {
        const isActive = i <= activeStep;
        const Icon = step.icon;
        return (
          <div key={step.label} className="flex items-center gap-1 flex-1">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`flex flex-col items-center gap-1 flex-shrink-0 ${isActive ? "text-primary" : "text-muted-foreground/50"}`}
            >
              <div className={`p-1.5 rounded-lg transition-colors duration-300 ${isActive ? "bg-primary/15" : "bg-secondary/50"}`}>
                <Icon size={14} />
              </div>
              <span className="text-[10px] font-medium">{step.label}</span>
            </motion.div>
            {i < steps.length - 1 && (
              <div className={`h-[2px] flex-1 rounded-full transition-colors duration-500 ${i < activeStep ? "bg-primary/40" : "bg-border/50"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FlowIndicator;
