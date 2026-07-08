import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Association, Cause, Match, QuizAnswers, SkillNeed, TimeCommitment, Value, WorkStyle } from "@/types/domain";
import { associations } from "@/data/associations";
import { rankAssociations } from "@/lib/match";

type Phase = "landing" | "quiz" | "swipe" | "results" | "browse";

interface CausaState {
  phase: Phase;
  step: number;
  answers: Partial<QuizAnswers>;
  matches: Match[];
  liked: string[];
  passed: string[];
  swipeIndex: number;
  selectedAsso: Association | null;

  setPhase: (p: Phase) => void;
  setStep: (n: number) => void;
  setCauses: (c: Cause[]) => void;
  setValues: (v: Value[]) => void;
  setWorkStyle: (w: WorkStyle) => void;
  setCommitment: (t: TimeCommitment) => void;
  setSkill: (s: SkillNeed) => void;

  computeMatches: () => void;
  like: (id: string) => void;
  pass: (id: string) => void;
  openAsso: (a: Association | null) => void;
  reset: () => void;
}

export const useCausaStore = create<CausaState>()(
  persist(
    (set, get) => ({
  phase: "landing",
  step: 0,
  answers: {},
  matches: [],
  liked: [],
  passed: [],
  swipeIndex: 0,
  selectedAsso: null,

  setPhase: (phase) => set({ phase }),
  setStep: (step) => set({ step }),
  setCauses: (causes) => set((s) => ({ answers: { ...s.answers, causes } })),
  setValues: (values) => set((s) => ({ answers: { ...s.answers, values } })),
  setWorkStyle: (workStyle) => set((s) => ({ answers: { ...s.answers, workStyle } })),
  setCommitment: (commitment) => set((s) => ({ answers: { ...s.answers, commitment } })),
  setSkill: (skill) => set((s) => ({ answers: { ...s.answers, skill } })),

  computeMatches: () => {
    const a = get().answers as QuizAnswers;
    const matches = rankAssociations(associations, a);
    set({ matches, swipeIndex: 0, liked: [], passed: [], phase: "swipe" });
  },
  like: (id) =>
    set((s) => ({
      liked: s.liked.includes(id) ? s.liked : [...s.liked, id],
      swipeIndex: s.swipeIndex + 1,
    })),
  pass: (id) =>
    set((s) => ({
      passed: s.passed.includes(id) ? s.passed : [...s.passed, id],
      swipeIndex: s.swipeIndex + 1,
    })),
  openAsso: (selectedAsso) => set({ selectedAsso }),
  reset: () =>
    set({
      phase: "landing",
      step: 0,
      answers: {},
      matches: [],
      liked: [],
      passed: [],
      swipeIndex: 0,
      selectedAsso: null,
    }),
    }),
    {
      name: "causa-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        phase: s.phase,
        step: s.step,
        answers: s.answers,
        matches: s.matches,
        liked: s.liked,
        passed: s.passed,
        swipeIndex: s.swipeIndex,
      }),
    }
  )
);
