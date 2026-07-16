import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Award, FileText, GraduationCap, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MultiSelectSearch } from "@/components/profile/MultiSelectSearch";
import { LANGUAGE_OPTIONS } from "@/data/taxonomy";
import { DOMAINS } from "@/data/skillsData";
import type { MentorCertificate, MentorRegistration } from "@/lib/mentorAuth";

const EXPERIENCE_RANGES = ["0–2 years", "2–4 years", "4–6 years", "6–10 years", "10+ years"];

interface MentorRegistrationFormProps {
  initialFullName: string;
  onSubmit: (registration: MentorRegistration) => void;
}

export function MentorRegistrationForm({ initialFullName, onSubmit }: MentorRegistrationFormProps) {
  const [fullName, setFullName] = useState(initialFullName);
  const [experienceRange, setExperienceRange] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [domains, setDomains] = useState<string[]>([]);
  const [certificates, setCertificates] = useState<MentorCertificate[]>([]);
  const [achievements, setAchievements] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const additions: MentorCertificate[] = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      name: file.name.replace(/\.[^/.]+$/, ""),
      fileName: file.name,
    }));
    setCertificates((prev) => [...prev, ...additions]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return setError("Please enter your full name.");
    if (!experienceRange) return setError("Please select your years of experience.");
    if (languages.length === 0) return setError("Select at least one language.");
    if (domains.length === 0) return setError("Select at least one domain to teach.");

    setError("");
    onSubmit({
      fullName: fullName.trim(),
      experienceRange,
      languages,
      domains,
      certificates,
      achievements: achievements.trim(),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mentor Registration</CardTitle>
        <CardDescription>Tell us about your background so we can generate your competency test.</CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="mentor-name">Full Name</Label>
            <Input id="mentor-name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Alex Johnson" />
          </div>
          <div>
            <Label htmlFor="mentor-experience">Years of Experience</Label>
            <Select
              id="mentor-experience"
              placeholder="Select experience range"
              value={experienceRange}
              onChange={(e) => setExperienceRange(e.target.value)}
            >
              {EXPERIENCE_RANGES.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div>
          <Label>Languages</Label>
          <MultiSelectSearch
            options={LANGUAGE_OPTIONS}
            selected={languages}
            onChange={setLanguages}
            placeholder="Search languages you can mentor in..."
            suggested={LANGUAGE_OPTIONS.slice(0, 6)}
            suggestedLabel="Common languages"
          />
        </div>

        <div>
          <Label>Domain(s) to Teach</Label>
          <MultiSelectSearch
            options={DOMAINS}
            selected={domains}
            onChange={setDomains}
            placeholder="Search domains — Artificial Intelligence, Marketing, Design..."
            suggested={DOMAINS.slice(0, 6)}
            suggestedLabel="Popular domains"
            allowCustom={false}
          />
          <p className="mt-1.5 text-xs text-muted-foreground">
            You'll take a short competency test for each domain you select.
          </p>
        </div>

        <div>
          <Label>Certificates (Optional)</Label>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf,image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              handleFiles(e.target.files);
              e.target.value = "";
            }}
          />
          {certificates.length === 0 ? (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-border py-6 text-center transition hover:border-primary/40 hover:bg-accent"
            >
              <Upload className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Upload certificates (PDF or image)</span>
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              {certificates.map((cert) => (
                <div key={cert.id} className="glass flex items-center gap-3 rounded-xl p-3">
                  <FileText className="h-4 w-4 shrink-0 text-primary" />
                  <span className="min-w-0 flex-1 truncate text-sm text-foreground">{cert.fileName}</span>
                  <button
                    type="button"
                    onClick={() => setCertificates((prev) => prev.filter((c) => c.id !== cert.id))}
                    className="rounded-lg p-1 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-semibold text-primary hover:underline"
              >
                + Add another certificate
              </button>
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="mentor-achievements">Achievements (Optional)</Label>
          <textarea
            id="mentor-achievements"
            value={achievements}
            onChange={(e) => setAchievements(e.target.value)}
            rows={3}
            placeholder="Awards, publications, notable projects, speaking engagements..."
            className="w-full resize-none rounded-2xl border border-input bg-surface/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/50"
          />
        </div>

        {error && (
          <p role="alert" className="text-xs font-medium text-destructive">
            {error}
          </p>
        )}

        <motion.div whileTap={{ scale: 0.98 }}>
          <Button type="submit" size="lg" className="group w-full sm:w-auto">
            Get Authorized
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>

        <div className="flex items-center gap-4 border-t border-border/60 pt-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <GraduationCap className="h-3.5 w-3.5" />
            AI-generated competency test per domain
          </span>
          <span className="flex items-center gap-1.5">
            <Award className="h-3.5 w-3.5" />
            Score 65%+ to get authorized
          </span>
        </div>
      </form>
    </Card>
  );
}
