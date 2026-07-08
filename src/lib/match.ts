import type { Association, Match, QuizAnswers } from "@/types/domain";

const VALUE_LABEL: Record<string, string> = {
  inclusion: "Inclusion",
  ecologie: "Écologie",
  transmission: "Transmission",
  justice: "Justice",
  creativite: "Créativité",
  convivialite: "Convivialité",
  rigueur: "Rigueur",
  autonomie: "Autonomie",
  collectif: "Collectif",
  innovation: "Innovation",
};

const WORK_LABEL: Record<string, string> = {
  terrain: "terrain",
  remote: "remote",
  evenementiel: "événementiel",
  bureau: "équipe locale",
  creatif: "créatif",
  administratif: "structurant",
};

const COMMIT_LABEL: Record<string, string> = {
  ponctuel: "ponctuel",
  mensuel: "mensuel",
  hebdo: "hebdomadaire",
  intense: "intense",
};

export function scoreAssociation(asso: Association, answers: QuizAnswers): Match {
  let score = 0;
  const reasons: string[] = [];

  // Cause: 35 pts si match
  if (answers.causes.includes(asso.cause)) {
    score += 35;
    reasons.push(`Cause "${asso.causeLabel}" alignée`);
  } else {
    score += 6; // base de découverte
  }

  // Valeurs: jusqu'à 30 pts (10 par valeur partagée)
  const sharedValues = asso.values.filter((v) => answers.values.includes(v));
  if (sharedValues.length > 0) {
    score += Math.min(30, sharedValues.length * 12);
    reasons.push(
      `${sharedValues.length} valeur${sharedValues.length > 1 ? "s" : ""} en commun : ${sharedValues
        .map((v) => VALUE_LABEL[v])
        .join(", ")}`
    );
  }

  // Style de travail: 15 pts
  if (asso.workStyles.includes(answers.workStyle)) {
    score += 15;
    reasons.push(`Façon de travailler ${WORK_LABEL[answers.workStyle]} compatible`);
  }

  // Compétence demandée: 12 pts
  if (asso.skillsNeeded.includes(answers.skill)) {
    score += 12;
    reasons.push(`Ils cherchent justement ce que tu proposes`);
  }

  // Engagement temporel: 8 pts si exact, 4 pts si proche
  const order = ["ponctuel", "mensuel", "hebdo", "intense"];
  const diff = Math.abs(order.indexOf(answers.commitment) - order.indexOf(asso.commitment));
  if (diff === 0) {
    score += 8;
    reasons.push(`Engagement ${COMMIT_LABEL[answers.commitment]} qui colle`);
  } else if (diff === 1) {
    score += 4;
  }

  // Cap à 99 pour rester crédible
  score = Math.min(99, Math.max(20, Math.round(score)));

  if (reasons.length === 0) {
    reasons.push("Une découverte qui pourrait t'inspirer");
  }

  return { asso, score, reasons };
}

export function rankAssociations(
  assos: Association[],
  answers: QuizAnswers
): Match[] {
  return assos
    .map((a) => scoreAssociation(a, answers))
    .sort((a, b) => b.score - a.score);
}
