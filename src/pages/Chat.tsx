import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Shield, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const initialMessages = [
  { id: 1, sender: "Admin", role: "Admin" as const, text: "Evacuation team has been dispatched to Sector 12. Please confirm ground status.", time: "2:34 PM" },
  { id: 2, sender: "You", role: "Volunteer" as const, text: "Copy that. Area is partially evacuated. Need additional water supplies.", time: "2:36 PM" },
  { id: 3, sender: "Admin", role: "Admin" as const, text: "Supplies are en route. ETA 15 minutes. Keep civilians at designated safe point.", time: "2:38 PM" },
];

const Chat = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, {
      id: prev.length + 1,
      sender: "You",
      role: "Volunteer" as const,
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }]);
    setInput("");
  };

  const roleStyle = { Admin: "bg-crisis-red/15 text-crisis-red", Volunteer: "bg-primary/15 text-primary" };

  return (
    <div className="max-w-2xl mx-auto flex flex-col" style={{ height: "calc(100vh - 120px)" }}>
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Crisis Chat</h1>
        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
          <Shield size={11} className="text-crisis-green" /> Verified incident · Secure channel
        </p>
      </div>

      <div className="flex-1 glass-card rounded-lg p-4 overflow-y-auto space-y-3 mb-4">
        {messages.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex flex-col ${msg.sender === "You" ? "items-end" : "items-start"}`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-medium text-foreground">{msg.sender}</span>
              <Badge variant="outline" className={`text-[9px] px-1.5 py-0 rounded-full ${roleStyle[msg.role]}`}>
                {msg.role}
              </Badge>
            </div>
            <div className={`max-w-[80%] p-3 rounded-lg text-xs leading-relaxed ${
              msg.sender === "You"
                ? "bg-primary/10 text-foreground rounded-tr-sm"
                : "bg-secondary/50 text-foreground rounded-tl-sm"
            }`}>
              {msg.text}
            </div>
            <span className="text-[10px] text-muted-foreground mt-1">{msg.time}</span>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type a message..."
          className="flex-1 px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/30 transition-colors"
        />
        <button
          onClick={send}
          className="p-3 rounded-lg warm-gradient text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
