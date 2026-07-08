import { ArrowLeft, ArrowRight, Heart, MapPin, RotateCcw, Share2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCausaStore } from "@/store/useCausaStore";
import { Logo } from "./Logo";
import { toast } from "@/hooks/use-toast";
import { associations } from "@/data/associations";

const gradientClass = (g: "warm" | "magenta" | "sunset") =>
  g === "warm" ? "bg-gradient-warm" : g === "magenta" ? "bg-gradient-magenta" : "bg-gradient-sunset";

export const Results = () => {
  const { matches, liked, openAsso, setPhase, reset } = useCausaStore();
  // On part de `liked` (source de vérité) pour gérer aussi les coups de coeur
  // donnés depuis le catalogue libre, sans quiz préalable.
  const likedMatches = liked
    .map((id) => {
      const fromMatches = matches.find((m) => m.asso.id === id);
      if (fromMatches) return fromMatches;
      const asso = associations.find((a) => a.id === id);
      return asso ? { asso, score: null as number | null, reasons: [] as string[] } : null;
    })
    .filter((m): m is { asso: typeof associations[number]; score: number | null; reasons: string[] } => m !== null);

  const handleShare = async () => {
    const title = "Mes matchs Causa";
    const lines = likedMatches.map((m) => `• ${m.asso.name} (${m.asso.causeLabel}) — ${m.asso.tagline}`);
    const text = `J'ai trouvé ${likedMatches.length} asso${likedMatches.length > 1 ? "s" : ""} qui me ressemble${likedMatches.length > 1 ? "nt" : ""} sur Causa :\n\n${lines.join("\n")}\n\nFais ton match ici 👉 ${window.location.origin}`;

    if (navigator.share) {
      try {
        await navigator.share({ title, text });
        return;
      } catch {
        // user cancelled — fallback below
      }
    }
    // Fallback : WhatsApp Web
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    toast({ title: "Partage prêt", description: "WhatsApp s'ouvre dans un nouvel onglet." });
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-50" aria-hidden />
      <div className="absolute inset-0 bg-background/70" aria-hidden />

      <header className="relative z-10 container flex items-center justify-between py-6">
        <Logo size="sm" />
        <Button variant="ghost" size="sm" onClick={() => setPhase("swipe")}>
          <ArrowLeft className="h-4 w-4" />
          Retour au swipe
        </Button>
      </header>

      <main className="relative z-10 container max-w-5xl pb-20">
        <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-up">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-card/80 backdrop-blur border border-border/60 px-3 py-1 text-xs font-medium text-muted-foreground mb-4">
            <Heart className="h-3.5 w-3.5 text-primary fill-primary" />
            {likedMatches.length} match{likedMatches.length > 1 ? "s" : ""}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Tes <span className="text-gradient-sunset">causes</span> du moment
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Clique sur une fiche pour voir leur culture, leurs missions ouvertes et comment les rejoindre.
          </p>
        </div>

        {likedMatches.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Aucun match enregistré.</p>
            <Button variant="hero" size="lg" className="mt-6" onClick={reset}>
              <RotateCcw className="h-4 w-4" />
              Refaire le quiz
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {likedMatches.map((m, i) => (
              <button
                key={m.asso.id}
                onClick={() => openAsso(m.asso)}
                className="group text-left rounded-2xl bg-card border border-border/60 overflow-hidden shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className={`relative h-36 ${gradientClass(m.asso.gradient)}`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  {m.score !== null && (
                    <div className="absolute top-3 right-3 rounded-full bg-card/95 backdrop-blur px-2.5 py-1 text-xs font-bold shadow-soft">
                      <span className="text-gradient-sunset">{m.score}%</span>
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 text-5xl drop-shadow-lg">{m.asso.emoji}</div>
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {m.asso.causeLabel}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-bold leading-tight">{m.asso.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{m.asso.tagline}</p>
                  <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground font-medium">
                    <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{m.asso.city}</span>
                    <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" />{m.asso.size}</span>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                    Découvrir
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="mt-14 flex flex-col sm:flex-row gap-3 justify-center">
          {likedMatches.length > 0 && (
            <Button variant="hero" size="lg" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
              Partager mes matchs
            </Button>
          )}
          <Button variant="soft" size="lg" onClick={reset}>
            <RotateCcw className="h-4 w-4" />
            Refaire le quiz
          </Button>
        </div>
      </main>
    </div>
  );
};
