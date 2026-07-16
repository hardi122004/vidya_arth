import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SKILLS } from "@/data/skillsData";
import { LANGUAGE_OPTIONS } from "@/data/taxonomy";

export interface SessionDetails {
  title: string;
  domain: string;
  skill: string;
  description: string;
  language: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  date: string;
  time: string;
  duration: string;
  maxParticipants: number;
}

interface CreateSessionFormProps {
  authorizedDomains: string[];
  onSubmit: (details: SessionDetails) => void;
}

const DIFFICULTIES: SessionDetails["difficulty"][] = ["Beginner", "Intermediate", "Advanced"];
const DURATIONS = ["30 minutes", "45 minutes", "60 minutes", "90 minutes", "2 hours"];

export function CreateSessionForm({ authorizedDomains, onSubmit }: CreateSessionFormProps) {
  const [title, setTitle] = useState("");
  const [domain, setDomain] = useState(authorizedDomains[0] ?? "");
  const [skill, setSkill] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [difficulty, setDifficulty] = useState<SessionDetails["difficulty"] | "">("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("50");
  const [error, setError] = useState("");

  const skillOptions = useMemo(() => SKILLS.filter((s) => s.domain === domain), [domain]);
  const today = new Date().toISOString().split("T")[0];

  const handleDomainChange = (value: string) => {
    setDomain(value);
    setSkill("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return setError("Please enter a session title.");
    if (!domain) return setError("Please select a domain.");
    if (!skill) return setError("Please select a skill.");
    if (!description.trim()) return setError("Please add a session description.");
    if (!language) return setError("Please select a language.");
    if (!difficulty) return setError("Please select a difficulty level.");
    if (!date) return setError("Please select a date.");
    if (!time) return setError("Please select a time.");
    if (!duration) return setError("Please select a duration.");
    const max = Number(maxParticipants);
    if (!max || max < 1) return setError("Enter a valid maximum number of participants.");

    setError("");
    onSubmit({
      title: title.trim(),
      domain,
      skill,
      description: description.trim(),
      language,
      difficulty,
      date,
      time,
      duration,
      maxParticipants: max,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Session</CardTitle>
        <CardDescription>Set up a new mentorship session for learners to discover.</CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <Label htmlFor="session-title">Session Title</Label>
          <Input
            id="session-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Building AI Products"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="session-domain">Domain</Label>
            <Select id="session-domain" value={domain} onChange={(e) => handleDomainChange(e.target.value)}>
              {authorizedDomains.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="session-skill">Skill</Label>
            <Select
              id="session-skill"
              placeholder="Select skill"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              disabled={skillOptions.length === 0}
            >
              {skillOptions.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="session-description">Session Description</Label>
          <textarea
            id="session-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="What will learners take away from this session?"
            className="w-full resize-none rounded-2xl border border-input bg-surface/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/50"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="session-language">Language</Label>
            <Select id="session-language" placeholder="Select language" value={language} onChange={(e) => setLanguage(e.target.value)}>
              {LANGUAGE_OPTIONS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="session-difficulty">Difficulty Level</Label>
            <Select
              id="session-difficulty"
              placeholder="Select difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as SessionDetails["difficulty"])}
            >
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="session-date">Date</Label>
            <Input id="session-date" type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="session-time">Time</Label>
            <Input id="session-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="session-duration">Duration</Label>
            <Select id="session-duration" placeholder="Select duration" value={duration} onChange={(e) => setDuration(e.target.value)}>
              {DURATIONS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="session-max">Maximum Participants</Label>
            <Input
              id="session-max"
              type="number"
              min={1}
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(e.target.value)}
            />
          </div>
        </div>

        {error && (
          <p role="alert" className="text-xs font-medium text-destructive">
            {error}
          </p>
        )}

        <Button type="submit" size="lg" className="group w-full sm:w-auto sm:self-end">
          Continue to Delivery
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </form>
    </Card>
  );
}
