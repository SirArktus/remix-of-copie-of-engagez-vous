import { Calendar, Clock, Heart, MapPin, Share2, Sparkles, Users, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCausaStore } from "@/store/useCausaStore";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";

const gradientClass = (g: "warm" | "magenta" | "sunset") =>
  g === "warm" ? "bg-gradient-warm" : g === "magenta" ? "bg-gradient-magenta" : "bg-gradient-sunset";

const COMMIT_LABEL: Record<string, string> = {
  ponctuel: "Ponctuel",
  mensuel: "Mensuel",
  hebdo: "Hebdomadaire",
  intense: "Intense",
};

export const AssoDetailSheet = () => {
  const { selectedAsso, openAsso, like, liked } = useCausaStore();
  const isLiked = selectedAsso ? liked.includes(selectedAsso.id) : false;

  useEffect(() => {
    if (selectedAsso) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [selectedAsso]);

  const handleShare = async () => {
    if (!selectedAsso) return;
    const title = `${selectedAsso.name} sur Causa`;
    const text = `Découvre ${selectedAsso.name} (${selectedAsso.causeLabel}) sur Causa : ${selectedAsso.tagline}\n\n👉 ${window.location.origin}`;
    if (navigator.share) {
      try {
        await navigator.share({ title, text });
        return;
      } catch {
        // user cancelled
      }
    }
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    toast({ title: "Partage prêt", description: "WhatsApp s'ouvre dans un nouvel onglet." });
  };

  return (
    <AnimatePresence>
      {selectedAsso && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm"
            onClick={() => openAsso(null)}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl bg-background overflow-y-auto"
          >
            {/* Hero */}
            <div className={`relative h-56 ${gradientClass(selectedAsso.gradient)}`}>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
              <button
                onClick={() => openAsso(null)}
                className="absolute top-5 right-5 h-10 w-10 rounded-full bg-card/95 backdrop-blur grid place-items-center shadow-soft hover:scale-105 transition-transform"
                aria-label="Fermer"
              >
                <X className="h-5 w-5" />
              </button>
              <span className="absolute top-5 left-5 rounded-full bg-card/95 backdrop-blur px-3 py-1.5 text-xs font-semibold shadow-soft">
                {selectedAsso.causeLabel}
              </span>
              <div className="absolute bottom-4 left-6 text-7xl drop-shadow-2xl">{selectedAsso.emoji}</div>
            </div>

            <div className="p-6 sm:p-8 space-y-8">
              <header>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
                  {selectedAsso.name}
                </h2>
                <p className="mt-2 text-lg text-muted-foreground">{selectedAsso.tagline}</p>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground font-medium">
                  <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" />{selectedAsso.city}</span>
                  <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4" />Équipe {selectedAsso.size.toLowerCase()}</span>
                  <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" />Depuis {selectedAsso.founded}</span>
                  <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" />{COMMIT_LABEL[selectedAsso.commitment]}</span>
                </div>
              </header>

              {/* Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {selectedAsso.highlights.map((h) => (
                  <div key={h} className="rounded-xl bg-gradient-sunset-soft border border-border/40 p-3 text-center">
                    <div className="font-display font-bold text-sm leading-tight">{h}</div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <section>
                <h3 className="font-display text-xl font-bold mb-3">La mission</h3>
                <p className="text-muted-foreground leading-relaxed">{selectedAsso.description}</p>
              </section>

              {/* Culture */}
              <section className="rounded-2xl bg-muted/40 border border-border/40 p-6">
                <h3 className="font-display text-xl font-bold mb-3 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  La culture
                </h3>
                <p className="text-muted-foreground leading-relaxed">{selectedAsso.culture}</p>
              </section>

              {/* Pourquoi nous rejoindre */}
              <section>
                <h3 className="font-display text-xl font-bold mb-3">Pourquoi les rejoindre</h3>
                <p className="text-muted-foreground leading-relaxed italic border-l-2 border-primary pl-4">
                  « {selectedAsso.whyJoin} »
                </p>
              </section>

              {/* Valeurs */}
              <section>
                <h3 className="font-display text-xl font-bold mb-3">Leurs valeurs</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedAsso.values.map((v) => (
                    <span
                      key={v}
                      className="rounded-full bg-gradient-sunset-soft border border-border/40 px-3 py-1.5 text-sm font-medium capitalize"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </section>

              {/* Missions ouvertes */}
              <section>
                <h3 className="font-display text-xl font-bold mb-4">Missions ouvertes</h3>
                <div className="space-y-3">
                  {selectedAsso.openMissions.map((m) => (
                    <div
                      key={m.title}
                      className="rounded-xl border border-border/60 bg-card p-4 flex items-start justify-between gap-4 hover:border-primary/40 transition-colors"
                    >
                      <div>
                        <p className="font-semibold">{m.title}</p>
                        <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground font-medium">
                          <span>{m.type}</span>
                          <span>·</span>
                          <span>{COMMIT_LABEL[m.commitment]}</span>
                          {m.remote && (<><span>·</span><span>Remote possible</span></>)}
                        </div>
                      </div>
                      <Button variant="soft" size="sm">Postuler</Button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Équipe */}
              <section>
                <h3 className="font-display text-xl font-bold mb-4">L'équipe</h3>
                <div className="flex flex-wrap gap-4">
                  {selectedAsso.team.map((t) => (
                    <div key={t.name} className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-gradient-sunset grid place-items-center text-primary-foreground font-display font-bold shadow-glow">
                        {t.initials}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Ouvert à */}
              <section>
                <h3 className="font-display text-xl font-bold mb-3">Ouvert à</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedAsso.openTo.map((o) => (
                    <span key={o} className="rounded-lg bg-card border border-border px-3 py-1.5 text-sm">
                      {o}
                    </span>
                  ))}
                </div>
              </section>

              {/* CTA sticky bas */}
              <div className="sticky bottom-0 -mx-6 sm:-mx-8 px-6 sm:px-8 py-4 bg-background/95 backdrop-blur border-t border-border flex flex-wrap gap-3">
                <Button variant="soft" size="lg" className="flex-1 min-w-[120px]" onClick={() => openAsso(null)}>
                  Fermer
                </Button>
                <Button variant="soft" size="lg" className="flex-1 min-w-[120px]" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                  Partager
                </Button>
                <Button
                  variant="hero"
                  size="lg"
                  className="flex-1 min-w-[140px]"
                  onClick={() => {
                    if (!isLiked) like(selectedAsso.id);
                    openAsso(null);
                  }}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                  {isLiked ? "Déjà matché" : "Matcher"}
                </Button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
