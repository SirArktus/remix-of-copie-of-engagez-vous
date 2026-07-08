import { ArrowRight, Compass, Heart, HeartHandshake, Layers, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { useCausaStore } from "@/store/useCausaStore";

export const Landing = () => {
  const setPhase = useCausaStore((s) => s.setPhase);
  const liked = useCausaStore((s) => s.liked);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Mesh background */}
      <div className="absolute inset-0 bg-gradient-mesh" aria-hidden />
      <div className="absolute inset-0 bg-background/40" aria-hidden />

      {/* Floating shapes */}
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-gradient-warm opacity-30 blur-3xl animate-float-slow" aria-hidden />
      <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-gradient-magenta opacity-25 blur-3xl animate-float" aria-hidden />

      <div className="relative z-10">
        {/* Nav */}
        <header className="container flex items-center justify-between py-6">
          <Logo />
          <div className="flex items-center gap-3">
            {liked.length > 0 && (
              <Button variant="soft" size="sm" onClick={() => setPhase("results")}>
                <Heart className="h-4 w-4 fill-primary text-primary" />
                Mes matchs ({liked.length})
              </Button>
            )}
            <span className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted-foreground font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              MVP en démo
            </span>
          </div>
        </header>

        {/* Hero */}
        <main className="container pb-24 pt-10 md:pt-20">
          <div className="max-w-4xl mx-auto text-center animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 backdrop-blur px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-soft mb-6">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Pensé comme Tinder, sérieux comme Welcome to the Jungle
            </span>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05]">
              Trouve l'asso{" "}
              <span className="text-gradient-sunset">qui te ressemble</span>{" "}
              vraiment.
            </h1>

            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Réponds à 5 questions sur tes valeurs, ta dispo et ce que tu veux apporter.
              On te propose les associations qui matchent — tu swipes, tu choisis, tu t'engages.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="hero" size="xl" onClick={() => setPhase("quiz")}>
                Démarrer le quiz
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="soft" size="xl" onClick={() => setPhase("browse")}>
                <Compass className="h-5 w-5" />
                Voir toutes les assos
              </Button>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">⏱️ 90 secondes — sans inscription</p>

            {/* Rassurance pour ceux qui hésitent */}
            <div className="mt-8 mx-auto max-w-xl rounded-2xl bg-card/70 backdrop-blur border border-border/60 px-5 py-4 text-sm text-muted-foreground shadow-soft">
              <span className="font-semibold text-foreground">Peur de passer à côté d'une asso ?</span>{" "}
              Tu peux aussi explorer le catalogue complet librement, sans quiz ni filtre.{" "}
              <button
                onClick={() => setPhase("browse")}
                className="font-semibold text-primary hover:underline underline-offset-4"
              >
                Parcourir toutes les assos →
              </button>
            </div>
          </div>

          {/* Steps */}
          <div className="mt-24 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Zap,
                title: "1. Quiz éclair",
                text: "5 questions ludiques sur tes valeurs, ta façon de t'engager, ton temps dispo.",
                grad: "bg-gradient-warm",
              },
              {
                icon: Layers,
                title: "2. Swipe les assos",
                text: "Cartes façon Tinder, scorées par compatibilité. Tu gardes celles qui te parlent.",
                grad: "bg-gradient-magenta",
              },
              {
                icon: HeartHandshake,
                title: "3. Découvre la culture",
                text: "Fiche détaillée façon Welcome to the Jungle : équipe, missions ouvertes, manière de bosser.",
                grad: "bg-gradient-sunset",
              },
            ].map((step, i) => (
              <article
                key={step.title}
                className="group rounded-2xl bg-card/80 backdrop-blur border border-border/60 p-7 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <div className={`${step.grad} h-12 w-12 rounded-xl grid place-items-center text-primary-foreground shadow-glow group-hover:scale-110 transition-transform`}>
                  <step.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{step.text}</p>
              </article>
            ))}
          </div>

          {/* Stats / social proof */}
          <div className="mt-24 max-w-4xl mx-auto rounded-3xl bg-card/70 backdrop-blur border border-border/60 p-8 md:p-12 shadow-card">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { n: "10", l: "Assos pilotes" },
                { n: "5", l: "Questions" },
                { n: "90s", l: "Pour matcher" },
                { n: "0€", l: "Toujours gratuit" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-4xl md:text-5xl font-bold text-gradient-sunset">{s.n}</div>
                  <div className="mt-1 text-sm text-muted-foreground font-medium">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </main>

        <footer className="container py-10 text-center text-sm text-muted-foreground">
          Causa — Le matcher d'engagement associatif. Démo non contractuelle.
        </footer>
      </div>
    </div>
  );
};
