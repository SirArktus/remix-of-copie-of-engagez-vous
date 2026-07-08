import { useCausaStore } from "@/store/useCausaStore";
import { Landing } from "@/components/causa/Landing";
import { Quiz } from "@/components/causa/Quiz";
import { SwipeDeck } from "@/components/causa/SwipeDeck";
import { Results } from "@/components/causa/Results";
import { Browse } from "@/components/causa/Browse";
import { AssoDetailSheet } from "@/components/causa/AssoDetailSheet";

const Index = () => {
  const phase = useCausaStore((s) => s.phase);

  return (
    <>
      {phase === "landing" && <Landing />}
      {phase === "quiz" && <Quiz />}
      {phase === "swipe" && <SwipeDeck />}
      {phase === "results" && <Results />}
      {phase === "browse" && <Browse />}
      <AssoDetailSheet />
    </>
  );
};

export default Index;
