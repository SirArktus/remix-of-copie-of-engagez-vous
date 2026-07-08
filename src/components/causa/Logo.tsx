import { Sparkles } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

export const Logo = ({ size = "md" }: LogoProps) => {
  const dim = size === "lg" ? "h-10 w-10" : size === "sm" ? "h-7 w-7" : "h-9 w-9";
  const text = size === "lg" ? "text-3xl" : size === "sm" ? "text-lg" : "text-xl";
  return (
    <div className="flex items-center gap-2.5">
      <div className={`${dim} rounded-xl bg-gradient-sunset shadow-glow grid place-items-center text-primary-foreground`}>
        <Sparkles className="h-1/2 w-1/2" strokeWidth={2.5} />
      </div>
      <span className={`${text} font-display font-bold tracking-tight`}>
        Causa<span className="text-gradient-sunset">.</span>
      </span>
    </div>
  );
};
