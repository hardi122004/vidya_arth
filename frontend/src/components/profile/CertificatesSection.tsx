import { useRef } from "react";
import { motion } from "framer-motion";
import { Award, FileText, Trash2, Upload } from "lucide-react";
import { SectionCard } from "@/components/profile/SectionCard";
import type { CertificateEntry } from "@/types/profile";

interface CertificatesSectionProps {
  certificates: CertificateEntry[];
  onChange: (next: CertificateEntry[]) => void;
}

export function CertificatesSection({ certificates, onChange }: CertificatesSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const additions: CertificateEntry[] = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      name: file.name.replace(/\.[^/.]+$/, ""),
      fileName: file.name,
    }));
    onChange([...certificates, ...additions]);
  };

  const removeCertificate = (id: string) => {
    onChange(certificates.filter((c) => c.id !== id));
  };

  return (
    <SectionCard
      icon={Award}
      title="Certificates"
      description="Upload certifications that show what you've completed."
      badge="Optional"
      action={
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 rounded-xl border border-primary/25 px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary/5"
        >
          <Upload className="h-3.5 w-3.5" />
          Upload
        </button>
      }
    >
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
          className="flex w-full flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-border py-8 text-center transition hover:border-primary/40 hover:bg-accent"
        >
          <Upload className="h-6 w-6 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">
            Drop files here or click to upload (PDF or image)
          </span>
        </button>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass flex items-center gap-3 rounded-2xl p-3.5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{cert.name}</p>
                <p className="truncate text-xs text-muted-foreground">{cert.fileName}</p>
              </div>
              <button
                type="button"
                onClick={() => removeCertificate(cert.id)}
                aria-label={`Remove ${cert.name}`}
                className="shrink-0 rounded-lg p-1.5 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
