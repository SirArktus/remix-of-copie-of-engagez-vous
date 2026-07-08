import { ArrowLeft, MapPin, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCausaStore } from "@/store/useCausaStore";
import { associations } from "@/data/associations";
import { Logo } from "./Logo";

const gradientClass = (g: "warm" | "magenta" | "sunset") =>
  g === "warm" ? "bg-gradient-warm" : g === "magenta" ? "bg-gradient-magenta" : "bg-gradient-sunset";

export const Browse = () => {
  const { openAsso, setPhase } = useCausaStore();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-50" aria-hidden />
      <div className="absolute inset-0 bg-background/70" aria-hidden />

      <header className="relative z-10 container flex items-center justify-between py-6">
        <Logo size="sm" />
        <Button variant="ghost" size="sm" onClick={() => setPhase("landing")}>
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
      </header>

      <main className="relative z-10 container max-w-6xl pb-20">
        <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-up">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-card/80 backdrop-blur border border-border/60 px-3 py-1 text-xs font-medium text-muted-foreground mb-4">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            {associations.length} associations à découvrir
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Toutes les <span className="text-gradient-sunset">associations</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Parcours librement le catalogue complet. Aucun filtre, aucun algorithme — juste les assos, à toi de fouiner.
          </p>
          <div className="mt-6">
            <Button variant="soft" size="lg" onClick={() => setPhase("quiz")}>
              <Sparkles className="h-4 w-4" />
              Faire le quiz quand même
            </Button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {associations.map((a, i) => (
            <button
              key={a.id}
              onClick={() => openAsso(a)}
              className="group text-left rounded-2xl bg-card border border-border/60 overflow-hidden shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className={`relative h-32 ${gradientClass(a.gradient)}`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                <div className="absolute bottom-3 left-3 text-5xl drop-shadow-lg">{a.emoji}</div>
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {a.causeLabel}
                </p>
                <h3 className="mt-1 font-display text-lg font-bold leading-tight">{a.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{a.tagline}</p>
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground font-medium">
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{a.city}</span>
                  <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" />{a.size}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};
