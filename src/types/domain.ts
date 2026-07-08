// Domain types — pensés pour brancher Lovable Cloud (Supabase) ensuite.
// Chaque entité aurait sa table éponyme côté backend.

export type Cause =
  | "ecologie"
  | "social"
  | "education"
  | "culture"
  | "sport"
  | "sante"
  | "droits"
  | "animaux"
  | "international"
  | "tech-citoyenne";

export type Value =
  | "inclusion"
  | "ecologie"
  | "transmission"
  | "justice"
  | "creativite"
  | "convivialite"
  | "rigueur"
  | "autonomie"
  | "collectif"
  | "innovation";

export type WorkStyle =
  | "terrain"
  | "remote"
  | "evenementiel"
  | "bureau"
  | "creatif"
  | "administratif";

export type TimeCommitment = "ponctuel" | "mensuel" | "hebdo" | "intense";

export type SkillNeed =
  | "communication"
  | "tech"
  | "design"
  | "evenement"
  | "terrain"
  | "mentorat"
  | "logistique"
  | "juridique"
  | "collecte"
  | "ecoute";

export interface OpenMission {
  title: string;
  type: "Bénévolat" | "Mécénat de compétences" | "Service civique" | "Stage";
  commitment: TimeCommitment;
  remote: boolean;
}

export interface TeamMember {
  name: string;
  role: string;
  initials: string;
}

export interface Association {
  id: string;
  name: string;
  tagline: string;
  description: string;
  cause: Cause;
  causeLabel: string;
  city: string;
  size: "Petite" | "Moyenne" | "Grande";
  founded: number;
  values: Value[];
  workStyles: WorkStyle[];
  skillsNeeded: SkillNeed[];
  commitment: TimeCommitment;
  openTo: string[];     // "Stages", "Mécénat", "Partenariats"...
  culture: string;      // façon de travailler — paragraphe
  whyJoin: string;      // pourquoi nous rejoindre
  openMissions: OpenMission[];
  team: TeamMember[];
  emoji: string;        // illustration légère
  gradient: "warm" | "magenta" | "sunset"; // variantes visuelles
  highlights: string[]; // 3-4 chiffres clés
}

export interface QuizAnswers {
  causes: Cause[];
  values: Value[];
  workStyle: WorkStyle;
  commitment: TimeCommitment;
  skill: SkillNeed;
}

export interface Match {
  asso: Association;
  score: number;       // 0-100
  reasons: string[];   // raisons lisibles du match
}
