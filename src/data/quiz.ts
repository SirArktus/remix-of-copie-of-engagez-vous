import type { Cause, SkillNeed, TimeCommitment, Value, WorkStyle } from "@/types/domain";

export interface QuizOption<T> {
  value: T;
  label: string;
  emoji: string;
  description?: string;
}

export interface QuizStep {
  id: "causes" | "values" | "workStyle" | "commitment" | "skill";
  question: string;
  hint: string;
  multi: boolean;
  max?: number;
  options:
    | QuizOption<Cause>[]
    | QuizOption<Value>[]
    | QuizOption<WorkStyle>[]
    | QuizOption<TimeCommitment>[]
    | QuizOption<SkillNeed>[];
}

export const quizSteps: QuizStep[] = [
  {
    id: "causes",
    question: "Quelles causes te font vibrer ?",
    hint: "Choisis-en jusqu'à 3.",
    multi: true,
    max: 3,
    options: [
      { value: "ecologie", label: "Écologie", emoji: "🌱" },
      { value: "social", label: "Solidarité sociale", emoji: "🤲" },
      { value: "education", label: "Éducation", emoji: "🎓" },
      { value: "culture", label: "Culture", emoji: "🎭" },
      { value: "sport", label: "Sport", emoji: "👟" },
      { value: "sante", label: "Santé", emoji: "⛑️" },
      { value: "droits", label: "Droits humains", emoji: "🤝" },
      { value: "animaux", label: "Animaux", emoji: "🐾" },
      { value: "international", label: "International", emoji: "🌍" },
      { value: "tech-citoyenne", label: "Tech citoyenne", emoji: "💻" },
    ] as QuizOption<Cause>[],
  },
  {
    id: "values",
    question: "Quelles valeurs comptent le plus pour toi ?",
    hint: "Pick 2 ou 3.",
    multi: true,
    max: 3,
    options: [
      { value: "inclusion", label: "Inclusion", emoji: "🌈" },
      { value: "ecologie", label: "Sobriété", emoji: "🌿" },
      { value: "transmission", label: "Transmission", emoji: "🪴" },
      { value: "justice", label: "Justice", emoji: "⚖️" },
      { value: "creativite", label: "Créativité", emoji: "🎨" },
      { value: "convivialite", label: "Convivialité", emoji: "🥂" },
      { value: "rigueur", label: "Rigueur", emoji: "🎯" },
      { value: "autonomie", label: "Autonomie", emoji: "🪁" },
      { value: "collectif", label: "Collectif", emoji: "🫶" },
      { value: "innovation", label: "Innovation", emoji: "💡" },
    ] as QuizOption<Value>[],
  },
  {
    id: "workStyle",
    question: "Comment tu aimes travailler ?",
    hint: "Une seule réponse.",
    multi: false,
    options: [
      { value: "terrain", label: "Sur le terrain", emoji: "🥾", description: "Action concrète, dehors." },
      { value: "remote", label: "À distance", emoji: "💻", description: "Depuis chez toi, async." },
      { value: "evenementiel", label: "Événementiel", emoji: "🎪", description: "Pics d'intensité, équipe." },
      { value: "bureau", label: "En équipe locale", emoji: "🏛️", description: "Au siège, ambiance bureau." },
      { value: "creatif", label: "Créatif·ve", emoji: "🎨", description: "Idéation, contenus, design." },
      { value: "administratif", label: "Structurant", emoji: "🗂️", description: "Coordination, gestion, suivi." },
    ] as QuizOption<WorkStyle>[],
  },
  {
    id: "commitment",
    question: "Combien de temps tu peux donner ?",
    hint: "Sois honnête, c'est OK même si peu.",
    multi: false,
    options: [
      { value: "ponctuel", label: "Ponctuel", emoji: "✨", description: "Quelques heures, sur des moments choisis." },
      { value: "mensuel", label: "Mensuel", emoji: "🗓️", description: "Une à deux fois par mois." },
      { value: "hebdo", label: "Hebdomadaire", emoji: "🔁", description: "Régulier, 1-3h par semaine." },
      { value: "intense", label: "Intense", emoji: "🔥", description: "Service civique, stage, plein temps." },
    ] as QuizOption<TimeCommitment>[],
  },
  {
    id: "skill",
    question: "Tu mettrais quoi au service de l'asso ?",
    hint: "Pas besoin d'expert·e — l'envie suffit.",
    multi: false,
    options: [
      { value: "ecoute", label: "Mon écoute", emoji: "👂" },
      { value: "communication", label: "Comm' / réseaux", emoji: "📣" },
      { value: "tech", label: "Tech / dev", emoji: "💻" },
      { value: "design", label: "Design", emoji: "🎨" },
      { value: "evenement", label: "Organisation d'événements", emoji: "🎟️" },
      { value: "terrain", label: "Énergie de terrain", emoji: "🦾" },
      { value: "mentorat", label: "Transmission / mentorat", emoji: "🧑‍🏫" },
      { value: "logistique", label: "Logistique", emoji: "📦" },
      { value: "juridique", label: "Juridique", emoji: "⚖️" },
      { value: "collecte", label: "Collecte / fundraising", emoji: "💛" },
    ] as QuizOption<SkillNeed>[],
  },
];
