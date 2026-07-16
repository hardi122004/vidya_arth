import { useState } from "react";
import {
  Archive,
  FileText,
  FolderGit2,
  Globe,
  HardDrive,
  Image as ImageIcon,
  Link2,
  Music,
  PlayCircle,
  Presentation,
  Upload,
  Video,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Submission, SubmissionType } from "@/lib/aiEvaluator";
import { cn } from "@/lib/utils";

interface SubmissionOption {
  type: SubmissionType;
  label: string;
  icon: LucideIcon;
  kind: "file" | "url";
  placeholder?: string;
}

const SUBMISSION_OPTIONS: SubmissionOption[] = [
  { type: "pdf", label: "PDF", icon: FileText, kind: "file" },
  { type: "word", label: "Word Document", icon: FileText, kind: "file" },
  { type: "ppt", label: "PPT", icon: Presentation, kind: "file" },
  { type: "image", label: "Images", icon: ImageIcon, kind: "file" },
  { type: "video", label: "Video", icon: Video, kind: "file" },
  { type: "audio", label: "Audio", icon: Music, kind: "file" },
  { type: "zip", label: "ZIP File", icon: Archive, kind: "file" },
  { type: "github", label: "GitHub Repository", icon: FolderGit2, kind: "url", placeholder: "github.com/you/project" },
  { type: "drive", label: "Google Drive Link", icon: HardDrive, kind: "url", placeholder: "drive.google.com/..." },
  { type: "website", label: "Website URL", icon: Globe, kind: "url", placeholder: "https://yourproject.com" },
  { type: "youtube", label: "YouTube Link", icon: PlayCircle, kind: "url", placeholder: "youtube.com/watch?v=..." },
  { type: "figma", label: "Figma Link", icon: Link2, kind: "url", placeholder: "figma.com/file/..." },
  { type: "url", label: "Any Valid External URL", icon: Link2, kind: "url", placeholder: "https://..." },
];

interface SubmissionFormProps {
  onSubmit: (submission: Submission) => void;
  isSubmitting?: boolean;
}

export function SubmissionForm({ onSubmit, isSubmitting }: SubmissionFormProps) {
  const [selected, setSelected] = useState<SubmissionOption>(SUBMISSION_OPTIONS[7]);
  const [fileName, setFileName] = useState("");
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selected.kind === "file" && !fileName.trim()) {
      setError("Please attach a file.");
      return;
    }
    if (selected.kind === "url" && !url.trim()) {
      setError("Please provide a link.");
      return;
    }
    if (!notes.trim()) {
      setError("Add a short description of what you built and how it addresses the challenge.");
      return;
    }

    setError("");
    onSubmit({
      type: selected.type,
      fileName: selected.kind === "file" ? fileName : undefined,
      url: selected.kind === "url" ? url : undefined,
      notes: notes.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <Label>Submission Type</Label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {SUBMISSION_OPTIONS.map((option) => {
            const Icon = option.icon;
            const isActive = selected.type === option.type;
            return (
              <button
                key={option.type}
                type="button"
                onClick={() => {
                  setSelected(option);
                  setError("");
                }}
                className={cn(
                  "flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-xs font-semibold transition",
                  isActive
                    ? "border-primary/40 bg-primary/5 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/30 hover:bg-accent",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {selected.kind === "file" ? (
        <div>
          <Label htmlFor="submission-file">Upload File</Label>
          <label
            htmlFor="submission-file"
            className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-border py-8 text-center transition hover:border-primary/40 hover:bg-accent"
          >
            <Upload className="h-6 w-6 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              {fileName || `Click to attach your ${selected.label.toLowerCase()}`}
            </span>
            <input
              id="submission-file"
              type="file"
              className="hidden"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
            />
          </label>
        </div>
      ) : (
        <div>
          <Label htmlFor="submission-url">{selected.label}</Label>
          <Input
            id="submission-url"
            icon={<selected.icon className="h-4 w-4" />}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={selected.placeholder}
          />
        </div>
      )}

      <div>
        <Label htmlFor="submission-notes">Describe Your Solution</Label>
        <textarea
          id="submission-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={5}
          placeholder="Walk through what you built, the decisions you made, and how it addresses the challenge..."
          className="w-full resize-none rounded-2xl border border-input bg-surface/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/50"
        />
      </div>

      {error && (
        <p role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      )}

      <Button type="submit" size="lg" isLoading={isSubmitting} className="w-full sm:w-auto">
        Submit for Evaluation
      </Button>
    </form>
  );
}
