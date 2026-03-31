import { motion } from "framer-motion";

interface TrustScoreRingProps {
  score: number;
  size?: number;
}

const TrustScoreRing = ({ score, size = 48 }: TrustScoreRingProps) => {
  const radius = (size - 6) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (score >= 75) return "hsl(var(--crisis-green))";
    if (score >= 40) return "hsl(var(--crisis-amber))";
    return "hsl(var(--crisis-red))";
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth={3}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-semibold" style={{ color: getColor() }}>
          {score}
        </span>
      </div>
    </div>
  );
};

export default TrustScoreRing;
