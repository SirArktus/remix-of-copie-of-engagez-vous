import { motion, useMotionValue, useTransform, type PanInfo } from "framer-motion";
import { Heart, Info, MapPin, Users, X } from "lucide-react";
import type { Match } from "@/types/domain";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SwipeCardProps {
  match: Match;
  onLike: () => void;
  onPass: () => void;
  onOpen: () => void;
  active: boolean;
  zIndex: number;
  offset: number; // 0 for top, +1 +2 behind
}

const gradientClass = (g: "warm" | "magenta" | "sunset") =>
  g === "warm" ? "bg-gradient-warm" : g === "magenta" ? "bg-gradient-magenta" : "bg-gradient-sunset";

export const SwipeCard = ({ match, onLike, onPass, onOpen, active, zIndex, offset }: SwipeCardProps) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-18, 0, 18]);
  const likeOpacity = useTransform(x, [40, 140], [0, 1]);
  const passOpacity = useTransform(x, [-140, -40], [1, 0]);

  const handleEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > 120) onLike();
    else if (info.offset.x < -120) onPass();
  };

  const { asso, score, reasons } = match;

  return (
    <motion.div
      className={cn(
        "absolute inset-0 rounded-3xl shadow-card overflow-hidden bg-card",
        active ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
      )}
      style={{
        x: active ? x : 0,
        rotate: active ? rotate : 0,
        zIndex,
        scale: 1 - offset * 0.04,
        y: offset * 12,
      }}
      drag={active ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleEnd}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Visual top */}
      <div className={cn("relative h-48 sm:h-56", gradientClass(asso.gradient))}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
          <span className="rounded-full bg-card/95 backdrop-blur px-3 py-1 text-xs font-semibold text-foreground shadow-soft">
            {asso.causeLabel}
          </span>
          <div className="rounded-full bg-card/95 backdrop-blur px-3 py-1 text-xs font-bold shadow-soft">
            <span className="text-gradient-sunset">{score}%</span> match
          </div>
        </div>
        <div className="absolute bottom-4 left-4 text-6xl drop-shadow-lg">{asso.emoji}</div>

        {/* Swipe overlays */}
        {active && (
          <>
            <motion.div
              style={{ opacity: likeOpacity }}
              className="absolute top-6 left-6 rounded-xl border-4 border-primary bg-card/90 backdrop-blur px-4 py-1.5 font-display font-extrabold text-primary tracking-wider rotate-[-12deg]"
            >
              MATCH ❤️
            </motion.div>
            <motion.div
              style={{ opacity: passOpacity }}
              className="absolute top-6 right-6 rounded-xl border-4 border-destructive bg-card/90 backdrop-blur px-4 py-1.5 font-display font-extrabold text-destructive tracking-wider rotate-[12deg]"
            >
              PASS
            </motion.div>
          </>
        )}
      </div>

      {/* Body */}
      <div className="p-5 sm:p-6 flex flex-col h-[calc(100%-12rem)] sm:h-[calc(100%-14rem)]">
        <div>
          <h3 className="font-display text-2xl font-bold leading-tight">{asso.name}</h3>
          <p className="mt-1 text-muted-foreground text-sm">{asso.tagline}</p>
        </div>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground font-medium">
          <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{asso.city}</span>
          <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" />{asso.size} équipe</span>
          <span>Depuis {asso.founded}</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {asso.values.slice(0, 4).map((v) => (
            <span key={v} className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium capitalize">
              {v}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4 space-y-1.5">
          {reasons.slice(0, 2).map((r, i) => (
            <div key={i} className="flex items-start gap-2 text-xs">
              <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-gradient-sunset shrink-0" />
              <span className="text-muted-foreground leading-snug">{r}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        {active && (
          <div className="mt-5 flex items-center justify-center gap-3">
            <Button variant="pass" size="icon-lg" onClick={onPass} aria-label="Passer">
              <X className="h-7 w-7" />
            </Button>
            <Button variant="soft" size="lg" onClick={onOpen}>
              <Info className="h-4 w-4" />
              En savoir +
            </Button>
            <Button variant="like" size="icon-lg" onClick={onLike} aria-label="Match">
              <Heart className="h-7 w-7 fill-current" />
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};
