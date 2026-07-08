import { ArrowRight, Heart, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCausaStore } from "@/store/useCausaStore";
import { SwipeCard } from "./SwipeCard";
import { Logo } from "./Logo";

export const SwipeDeck = () => {
  const { matches, swipeIndex, like, pass, openAsso, setPhase, liked, reset } =
    useCausaStore();

  const remaining = matches.slice(swipeIndex);
  const current = remaining[0];

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-gradient-mesh opacity-50" aria-hidden />
      <div className="absolute inset-0 bg-background/70" aria-hidden />

      <header className="relative z-10 container flex items-center justify-between py-5">
        <Logo size="sm" />
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
            <Heart className="h-4 w-4 text-primary fill-primary" />
            {liked.length} match{liked.length > 1 ? "s" : ""}
          </span>
          <Button variant="soft" size="sm" onClick={() => setPhase("results")} disabled={liked.length === 0}>
            Voir mes matchs
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="relative z-10 flex-1 container max-w-md flex flex-col justify-center pb-10">
        {current ? (
          <>
            <div className="text-center mb-5">
              <p className="text-sm text-muted-foreground">
                {swipeIndex + 1} sur {matches.length}
              </p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                Swipe ➡️ pour matcher · ⬅️ pour passer
              </p>
            </div>

            <div className="relative w-full aspect-[3/4] max-h-[640px]">
              {remaining
                .slice(0, 3)
                .map((m, i) => (
                  <SwipeCard
                    key={m.asso.id}
                    match={m}
                    active={i === 0}
                    zIndex={3 - i}
                    offset={i}
                    onLike={() => like(m.asso.id)}
                    onPass={() => pass(m.asso.id)}
                    onOpen={() => openAsso(m.asso)}
                  />
                ))
                .reverse()}
            </div>
          </>
        ) : (
          <div className="text-center animate-scale-in">
            <div className="text-7xl mb-6">🎉</div>
            <h2 className="font-display text-3xl font-bold">Tu as tout vu !</h2>
            <p className="mt-3 text-muted-foreground max-w-sm mx-auto">
              {liked.length > 0
                ? `Tu as matché avec ${liked.length} asso${liked.length > 1 ? "s" : ""}. Découvre leurs fiches détaillées.`
                : "Aucun match pour cette fois — refais le quiz pour explorer d'autres directions."}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              {liked.length > 0 && (
                <Button variant="hero" size="lg" onClick={() => setPhase("results")}>
                  Voir mes matchs
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
              <Button variant="soft" size="lg" onClick={reset}>
                <RotateCcw className="h-4 w-4" />
                Recommencer le quiz
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
