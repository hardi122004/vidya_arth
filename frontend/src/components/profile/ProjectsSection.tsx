import { motion } from "framer-motion";
import { FolderGit2, FolderKanban, ImagePlus, Link2, Plus, Trash2 } from "lucide-react";
import { SectionCard } from "@/components/profile/SectionCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { ProjectEntry } from "@/types/profile";

interface ProjectsSectionProps {
  projects: ProjectEntry[];
  onChange: (next: ProjectEntry[]) => void;
}

function emptyProject(): ProjectEntry {
  return { id: crypto.randomUUID(), title: "", description: "", skillsUsed: "", githubUrl: "", demoUrl: "" };
}

export function ProjectsSection({ projects, onChange }: ProjectsSectionProps) {
  const addProject = () => onChange([...projects, emptyProject()]);
  const removeProject = (id: string) => onChange(projects.filter((p) => p.id !== id));
  const updateProject = (id: string, patch: Partial<ProjectEntry>) =>
    onChange(projects.map((p) => (p.id === id ? { ...p, ...patch } : p)));

  return (
    <SectionCard
      icon={FolderKanban}
      title="Projects"
      description="Showcase what you've built — big or small."
      badge="Optional"
      action={
        <button
          type="button"
          onClick={addProject}
          className="flex items-center gap-1.5 rounded-xl border border-primary/25 px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary/5"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Project
        </button>
      }
    >
      {projects.length === 0 ? (
        <p className="text-sm text-muted-foreground">No projects added yet. Click "Add Project" to get started.</p>
      ) : (
        <div className="space-y-5">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-4 sm:p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Project {idx + 1}
                </p>
                <button
                  type="button"
                  onClick={() => removeProject(project.id)}
                  aria-label="Remove project"
                  className="rounded-lg p-1.5 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor={`proj-title-${project.id}`}>Project Title</Label>
                  <Input
                    id={`proj-title-${project.id}`}
                    value={project.title}
                    onChange={(e) => updateProject(project.id, { title: e.target.value })}
                    placeholder="AI Study Buddy"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor={`proj-desc-${project.id}`}>Description</Label>
                  <textarea
                    id={`proj-desc-${project.id}`}
                    value={project.description}
                    onChange={(e) => updateProject(project.id, { description: e.target.value })}
                    rows={2}
                    placeholder="What does it do, and what did you learn building it?"
                    className="w-full resize-none rounded-2xl border border-input bg-surface/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/50"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor={`proj-skills-${project.id}`}>Skills Used</Label>
                  <Input
                    id={`proj-skills-${project.id}`}
                    value={project.skillsUsed}
                    onChange={(e) => updateProject(project.id, { skillsUsed: e.target.value })}
                    placeholder="Python, React, TensorFlow"
                  />
                </div>
                <div>
                  <Label htmlFor={`proj-github-${project.id}`}>GitHub Link (Optional)</Label>
                  <Input
                    id={`proj-github-${project.id}`}
                    icon={<FolderGit2 className="h-4 w-4" />}
                    value={project.githubUrl}
                    onChange={(e) => updateProject(project.id, { githubUrl: e.target.value })}
                    placeholder="github.com/you/project"
                  />
                </div>
                <div>
                  <Label htmlFor={`proj-demo-${project.id}`}>Live Demo (Optional)</Label>
                  <Input
                    id={`proj-demo-${project.id}`}
                    icon={<Link2 className="h-4 w-4" />}
                    value={project.demoUrl}
                    onChange={(e) => updateProject(project.id, { demoUrl: e.target.value })}
                    placeholder="project.vercel.app"
                  />
                </div>
              </div>

              <label className="mt-4 flex w-fit cursor-pointer items-center gap-1.5 rounded-xl border border-dashed border-border px-3 py-2 text-xs font-medium text-muted-foreground transition hover:border-primary/40 hover:text-primary">
                <ImagePlus className="h-3.5 w-3.5" />
                Upload images (optional)
                <input type="file" accept="image/*" multiple className="hidden" />
              </label>
            </motion.div>
          ))}
        </div>
      )}

      {projects.length > 0 && (
        <Button type="button" variant="secondary" size="sm" onClick={addProject} className="mt-4">
          <Plus className="h-3.5 w-3.5" />
          Add another project
        </Button>
      )}
    </SectionCard>
  );
}
