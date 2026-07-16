import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Camera, Link2, Mic, Radio, Sparkles, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { MeetingPlatform } from "@/lib/mentorSessions";

export interface DeliveryDetails {
  type: "live";
  platform: MeetingPlatform;
  url: string;
}

interface SessionDeliveryStepProps {
  onSubmit: (details: DeliveryDetails) => void;
}

const PLATFORMS: MeetingPlatform[] = ["Google Meet", "Zoom", "Microsoft Teams", "Other"];

export function SessionDeliveryStep({ onSubmit }: SessionDeliveryStepProps) {
  const [mode, setMode] = useState<"live" | "avatar">("live");
  const [platform, setPlatform] = useState<MeetingPlatform>("Google Meet");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setError("Please paste your meeting link.");
      return;
    }
    setError("");
    onSubmit({ type: "live", platform, url: url.trim() });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setMode("live")}
          className={cn(
            "flex flex-col items-start gap-2 rounded-2xl border-2 p-5 text-left transition",
            mode === "live"
              ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
              : "border-border hover:border-primary/40 hover:bg-accent",
          )}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl gradient-brand text-white">
            <Radio className="h-5.5 w-5.5" />
          </div>
          <h3 className="text-sm font-bold text-foreground">Live Session</h3>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Host it yourself and share a meeting link.
          </p>
        </button>

        <button
          type="button"
          onClick={() => setMode("avatar")}
          className={cn(
            "flex flex-col items-start gap-2 rounded-2xl border-2 p-5 text-left transition",
            mode === "avatar"
              ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
              : "border-border hover:border-primary/40 hover:bg-accent",
          )}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Bot className="h-5.5 w-5.5" />
          </div>
          <h3 className="text-sm font-bold text-foreground">AI Avatar</h3>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Not camera-ready? Let an AI avatar deliver it for you.
          </p>
        </button>
      </div>

      {mode === "live" ? (
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="glass flex flex-col gap-4 rounded-2xl p-5"
        >
          <div>
            <Label htmlFor="meeting-platform">Platform</Label>
            <Select
              id="meeting-platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value as MeetingPlatform)}
            >
              {PLATFORMS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="meeting-url">Meeting Link</Label>
            <Input
              id="meeting-url"
              icon={<Link2 className="h-4 w-4" />}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://meet.google.com/..."
            />
          </div>

          {error && (
            <p role="alert" className="text-xs font-medium text-destructive">
              {error}
            </p>
          )}

          <Button type="submit" className="group w-fit">
            Continue to Publish
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.form>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass flex flex-col items-center gap-4 rounded-2xl p-8 text-center"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl gradient-brand text-white">
            <Bot className="h-7 w-7" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">AI Avatar — Coming Soon</h3>
            <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
              Upload a voice recording (and an optional face recording), and we'll generate an AI avatar to
              deliver your lecture. This feature is a placeholder for the prototype.
            </p>
          </div>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <span className="flex items-center gap-1.5 rounded-full border border-dashed border-border px-3 py-2 text-xs font-medium text-muted-foreground opacity-70">
              <Mic className="h-3.5 w-3.5" />
              Upload voice recording
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-dashed border-border px-3 py-2 text-xs font-medium text-muted-foreground opacity-70">
              <Camera className="h-3.5 w-3.5" />
              Upload face recording (optional)
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-dashed border-border px-3 py-2 text-xs font-medium text-muted-foreground opacity-70">
              <Video className="h-3.5 w-3.5" />
              Generate AI avatar
            </span>
          </div>
          <span className="mt-2 flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-bold text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            Coming Soon
          </span>
        </motion.div>
      )}
    </div>
  );
}
