import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageSquare, Send, Sparkles, User, Video } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
}

function craftReply(skillName: string, question: string): string {
  const q = question.toLowerCase();

  if (q.includes("project") || q.includes("build") || q.includes("practice")) {
    return `Great instinct — hands-on projects are the fastest way to learn ${skillName}. Start with a small, scoped project you can finish in a weekend, then gradually take on something more ambitious once the fundamentals feel comfortable.`;
  }
  if (q.includes("plan") || q.includes("roadmap") || q.includes("start") || q.includes("begin")) {
    return `Here's a simple way to approach ${skillName}: spend your first week on core fundamentals, the next few weeks building small practice projects, then focus on one real project that ties everything together. I can help you break that down further whenever you're ready.`;
  }
  if (q.includes("job") || q.includes("career") || q.includes("hire")) {
    return `${skillName} opens up several career paths. A strong portfolio of real projects usually matters more early on than certificates — want a few ideas for portfolio pieces?`;
  }
  if (q.includes("how long") || q.includes("time")) {
    return `Most learners get comfortable with the fundamentals of ${skillName} in a few weeks of consistent practice, though real proficiency comes from ongoing project work over time.`;
  }
  return `That's a good question about ${skillName}. In the full version, I'll dig into your specific profile and give you a detailed, personalized answer — for now, think of me as a preview of what your AI tutor experience will feel like.`;
}

export function AIDomainExpert({ skillName }: { skillName: string }) {
  const [tab, setTab] = useState<"chat" | "video">("chat");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "intro",
      role: "assistant",
      text: `Hi! I'm your AI Domain Expert for ${skillName}. Ask me anything — concepts, project ideas, or how to plan your learning path.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", text: craftReply(skillName, trimmed) },
      ]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-1 rounded-full border border-border/60 bg-surface/60 p-1 w-fit">
        <button
          type="button"
          onClick={() => setTab("chat")}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
            tab === "chat" ? "gradient-brand text-white" : "text-muted-foreground hover:text-foreground",
          )}
        >
          <MessageSquare className="h-3.5 w-3.5" />
          AI Chat Assistant
        </button>
        <button
          type="button"
          onClick={() => setTab("video")}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
            tab === "video" ? "gradient-brand text-white" : "text-muted-foreground hover:text-foreground",
          )}
        >
          <Video className="h-3.5 w-3.5" />
          AI Video Tutor
        </button>
      </div>

      {tab === "chat" ? (
        <div className="glass rounded-2xl p-4">
          <div className="mb-3 flex max-h-80 flex-col gap-3 overflow-y-auto pr-1">
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("flex items-start gap-2.5", m.role === "user" && "flex-row-reverse")}
                >
                  <div
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                      m.role === "assistant" ? "gradient-brand text-white" : "bg-muted text-muted-foreground",
                    )}
                  >
                    {m.role === "assistant" ? <Bot className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
                  </div>
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                      m.role === "assistant"
                        ? "rounded-tl-sm bg-surface text-foreground"
                        : "rounded-tr-sm gradient-brand text-white",
                    )}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full gradient-brand text-white">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-surface px-4 py-3">
                    <div className="flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask about ${skillName}...`}
              className="h-11 flex-1 rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/50"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="gradient-brand flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white transition disabled:opacity-40"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          <p className="mt-2.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Sparkles className="h-3 w-3" />
            Prototype preview — simulated responses. Full AI tutor experience launching soon.
          </p>
        </div>
      ) : (
        <div className="glass flex flex-col items-center gap-3 rounded-2xl p-10 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl gradient-brand text-white">
            <Video className="h-7 w-7" />
          </div>
          <h3 className="text-sm font-bold text-foreground">AI Video Tutor</h3>
          <p className="max-w-sm text-sm text-muted-foreground">
            A face-to-face AI video tutor for {skillName} is coming soon. This is a placeholder for the prototype.
          </p>
        </div>
      )}
    </div>
  );
}
