import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Upload, MapPin, Lightbulb, Flame, Droplets, Wind, Zap, AlertTriangle, Users, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import TrustScoreRing from "@/components/TrustScoreRing";

const incidentTypes = [
  { label: "Fire", icon: Flame, value: "fire" },
  { label: "Flood", icon: Droplets, value: "flood" },
  { label: "Storm", icon: Wind, value: "storm" },
  { label: "Earthquake", icon: Zap, value: "earthquake" },
  { label: "Accident", icon: AlertTriangle, value: "accident" },
  { label: "Crowd Emergency", icon: Users, value: "crowd" },
];

const ReportIncident = () => {
  const [step, setStep] = useState(0);
  const [selectedType, setSelectedType] = useState("");
  const [description, setDescription] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleSubmit = () => {
    setStep(3);
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
    }, 3000);
  };

  const steps = ["Type", "Details", "Location", "AI Review"];

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Report Incident</h1>
        <p className="text-sm text-muted-foreground mt-1">Help your community by sharing what you see</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
              i <= step ? "warm-gradient text-primary-foreground" : "bg-secondary text-muted-foreground"
            }`}>
              {i < step ? <CheckCircle2 size={14} /> : i + 1}
            </div>
            <span className={`text-xs hidden sm:block ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
            {i < steps.length - 1 && <div className={`h-[2px] flex-1 rounded ${i < step ? "bg-primary/40" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="type" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <div className="glass-card rounded-lg p-4">
              <p className="text-sm font-medium text-foreground mb-3">What type of incident?</p>
              <div className="grid grid-cols-2 gap-2">
                {incidentTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setSelectedType(type.value)}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                      selectedType === type.value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-secondary/30 text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    <type.icon size={18} />
                    <span className="text-sm font-medium">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <Button onClick={() => setStep(1)} disabled={!selectedType} className="w-full warm-gradient text-primary-foreground border-0 gap-2 rounded-lg">
              Continue <ChevronRight size={16} />
            </Button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <div className="glass-card rounded-lg p-4 space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Describe what's happening</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide details about the incident..."
                  className="mt-2 bg-secondary/50 border-border/50 min-h-[100px] rounded-lg"
                />
              </div>

              <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
                <Lightbulb size={14} className="text-primary mt-0.5 flex-shrink-0" />
                <p className="text-xs text-muted-foreground">Add clear details for better AI verification. Mention visible landmarks, time, and number of people affected.</p>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Upload Image</label>
                <div className="mt-2 border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/30 transition-colors cursor-pointer">
                  <Upload size={24} className="mx-auto text-muted-foreground mb-2" />
                  <p className="text-xs text-muted-foreground">Tap to upload a photo</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setStep(0)} className="gap-2 rounded-lg">
                <ChevronLeft size={16} /> Back
              </Button>
              <Button onClick={() => setStep(2)} className="flex-1 warm-gradient text-primary-foreground border-0 gap-2 rounded-lg">
                Continue <ChevronRight size={16} />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="location" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <div className="glass-card rounded-lg p-4">
              <p className="text-sm font-medium text-foreground mb-3">Select Location</p>
              <div className="rounded-lg bg-secondary/50 h-48 flex items-center justify-center border border-border/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
                <div className="text-center z-10">
                  <MapPin size={32} className="mx-auto text-primary mb-2" />
                  <p className="text-xs text-muted-foreground">Tap to pick location on map</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 p-2.5 rounded-lg bg-secondary/50 border border-border/50">
                <MapPin size={14} className="text-primary flex-shrink-0" />
                <span className="text-xs text-foreground">Sector 12, Downtown Area</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setStep(1)} className="gap-2 rounded-lg">
                <ChevronLeft size={16} /> Back
              </Button>
              <Button onClick={handleSubmit} className="flex-1 warm-gradient text-primary-foreground border-0 gap-2 rounded-lg">
                Submit Report <CheckCircle2 size={16} />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="analysis" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <div className="glass-card rounded-lg p-6 text-center">
              {analyzing ? (
                <div className="space-y-4">
                  <div className="relative w-20 h-20 mx-auto">
                    <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" />
                    <div className="absolute inset-2 rounded-full border-2 border-primary/40 animate-pulse" />
                    <div className="absolute inset-4 rounded-full warm-gradient animate-pulse" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Analyzing your report…</p>
                    <p className="text-xs text-muted-foreground mt-1">Our AI is verifying accuracy and checking nearby reports</p>
                  </div>
                  <div className="space-y-1.5">
                    {["Scanning report details...", "Cross-referencing nearby incidents...", "Calculating trust score..."].map((text, i) => (
                      <motion.div
                        key={text}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.8 }}
                        className="text-[11px] text-muted-foreground"
                      >
                        {text}
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : analyzed ? (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <TrustScoreRing score={82} size={80} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Report Verified ✓</p>
                    <p className="text-xs text-muted-foreground mt-1">Your report has been submitted and verified by AI</p>
                  </div>
                  <div className="space-y-2 text-left">
                    {[
                      { label: "Trust Score", value: "82/100", color: "text-crisis-green" },
                      { label: "Priority", value: "High", color: "text-crisis-red" },
                      { label: "Similar Reports", value: "3 nearby", color: "text-primary" },
                      { label: "Source Credibility", value: "Reliable", color: "text-crisis-green" },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between text-xs p-2 rounded bg-secondary/30">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className={`font-medium ${item.color}`}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <Button onClick={() => { setStep(0); setAnalyzed(false); setSelectedType(""); setDescription(""); }} className="w-full warm-gradient text-primary-foreground border-0 rounded-lg">
                    Report Another Incident
                  </Button>
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReportIncident;
