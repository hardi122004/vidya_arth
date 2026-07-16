import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Brain, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getQuestionsForDomain } from "@/data/mentorCompetencyQuestions";
import { cn } from "@/lib/utils";

export interface CompetencyTestOutcome {
  score: number;
  strongTopics: string[];
  weakTopics: string[];
}

interface CompetencyTestProps {
  domain: string;
  domainIndex: number;
  totalDomains: number;
  onComplete: (outcome: CompetencyTestOutcome) => void;
}

export function CompetencyTest({ domain, domainIndex, totalDomains, onComplete }: CompetencyTestProps) {
  const questions = getQuestionsForDomain(domain);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const selectedAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;

  const handleSelect = (optionIndex: number) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionIndex }));
  };

  const handleNext = () => {
    if (isLast) {
      const correctCount = questions.filter((q) => answers[q.id] === q.correctIndex).length;
      const score = Math.round((correctCount / questions.length) * 100);
      const strongTopics = questions.filter((q) => answers[q.id] === q.correctIndex).map((q) => q.topic);
      const weakTopics = questions.filter((q) => answers[q.id] !== q.correctIndex).map((q) => q.topic);
      onComplete({ score, strongTopics, weakTopics });
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  if (!currentQuestion) {
    return (
      <div className="glass-card p-8 text-center text-sm text-muted-foreground">
        No competency questions are available for this domain yet.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
        <span className="flex items-center gap-1.5 text-primary">
          <Brain className="h-3.5 w-3.5" />
          Domain {domainIndex + 1} of {totalDomains}: {domain}
        </span>
        <span>
          Question {currentIndex + 1} of {questions.length}
        </span>
      </div>
      <Progress value={((currentIndex + 1) / questions.length) * 100} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.3 }}
          className="glass-card p-6"
        >
          <h3 className="text-base font-bold leading-relaxed text-foreground">{currentQuestion.prompt}</h3>

          <div className="mt-5 flex flex-col gap-2.5">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleSelect(idx)}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border-2 p-4 text-left text-sm font-medium transition",
                    isSelected
                      ? "border-primary bg-primary/5 text-foreground"
                      : "border-border text-foreground hover:border-primary/30 hover:bg-accent",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-bold",
                      isSelected ? "border-primary bg-primary text-white" : "border-muted-foreground/40 text-transparent",
                    )}
                  >
                    {isSelected && <CheckCircle2 className="h-3.5 w-3.5" />}
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <Button
        size="lg"
        className="group w-full sm:w-auto sm:self-end"
        disabled={selectedAnswer === undefined}
        onClick={handleNext}
      >
        {isLast ? "Submit for Evaluation" : "Next Question"}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </div>
  );
}
