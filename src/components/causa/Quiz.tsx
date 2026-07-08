import { useMemo } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { quizSteps } from "@/data/quiz";
import { useCausaStore } from "@/store/useCausaStore";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

export const Quiz = () => {
  const {
    step,
    setStep,
    answers,
    setCauses,
    setValues,
    setWorkStyle,
    setCommitment,
    setSkill,
    computeMatches,
    setPhase,
  } = useCausaStore();

  const current = quizSteps[step];
  const total = quizSteps.length;
  const progress = ((step + 1) / total) * 100;

  const selected = useMemo<string[]>(() => {
    const a = answers as Record<string, unknown>;
    const v = a[current.id];
    if (Array.isArray(v)) return v as string[];
    if (typeof v === "string") return [v];
    return [];
  }, [answers, current.id]);

  const canNext = selected.length > 0;

  const toggle = (val: string) => {
    if (current.multi) {
      const arr = selected.includes(val) ? selected.filter((x) => x !== val) : [...selected, val];
      const max = current.max ?? 3;
      const final = arr.slice(0, max);
      if (current.id === "causes") setCauses(final as never);
      else if (current.id === "values") setValues(final as never);
    } else {
      if (current.id === "workStyle") setWorkStyle(val as never);
      else if (current.id === "commitment") setCommitment(val as never);
      else if (current.id === "skill") setSkill(val as never);
    }
  };

  const next = () => {
    if (!canNext) return;
    if (step < total - 1) setStep(step + 1);
    else computeMatches();
  };

  const back = () => {
    if (step === 0) setPhase("landing");
    else setStep(step - 1);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-60" aria-hidden />
      <div className="absolute inset-0 bg-background/70" aria-hidden />

      <div className="relative z-10 container max-w-3xl py-6 md:py-10 flex flex-col min-h-screen">
        <header className="flex items-center justify-between mb-8">
          <button onClick={() => setPhase("landing")} className="contents">
            <Logo size="sm" />
          </button>
          <div className="text-sm text-muted-foreground font-medium">
            {step + 1} <span className="text-muted-foreground/60">/ {total}</span>
          </div>
        </header>

        {/* Progress */}
        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden mb-10">
          <div
            className="h-full bg-gradient-sunset transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1"
            >
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                {current.question}
              </h2>
              <p className="mt-3 text-muted-foreground">{current.hint}</p>

              <div
                className={cn(
                  "mt-8 grid gap-3",
                  current.id === "workStyle" || current.id === "commitment"
                    ? "grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
                )}
              >
                {current.options.map((opt) => {
                  const isSelected = selected.includes(opt.value);
                  return (
                    <button
                      key={opt.value}
                      onClick={() => toggle(opt.value)}
                      className={cn(
                        "group relative text-left rounded-2xl border-2 p-4 transition-all duration-200",
                        "hover:-translate-y-0.5 hover:shadow-card",
                        isSelected
                          ? "border-primary bg-gradient-sunset-soft shadow-glow"
                          : "border-border/60 bg-card/80 backdrop-blur hover:border-primary/40"
                      )}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-gradient-sunset grid place-items-center text-primary-foreground shadow-glow">
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        </div>
                      )}
                      <div className="text-3xl">{opt.emoji}</div>
                      <div className="mt-2 font-display font-semibold">{opt.label}</div>
                      {"description" in opt && opt.description && (
                        <div className="mt-1 text-xs text-muted-foreground leading-snug">
                          {opt.description}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between gap-3 mt-10 pb-6">
          <Button variant="ghost" size="lg" onClick={back}>
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
          <Button variant="hero" size="lg" onClick={next} disabled={!canNext}>
            {step === total - 1 ? "Voir mes matchs" : "Suivant"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
