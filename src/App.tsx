import { useState, useEffect } from "react";
import { UserProgress, ContinentId, Animal, ContinentData } from "./types";
import { CONTINENTS_DB } from "./data";
import { ExplorerMap } from "./components/ExplorerMap";
import { ScavengerHunt } from "./components/ScavengerHunt";
import { AnimalModal } from "./components/AnimalModal";
import { TrophyRoom } from "./components/TrophyRoom";
import { ChallengerHub } from "./components/ChallengerHub";
import { AdaptationLab } from "./components/AdaptationLab";
import { ShieldAlert, RotateCcw, Award, Globe, Heart, Star } from "lucide-react";

export default function App() {
  // Safe progress loading with offline local storage persistence
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem("ecoexplorer_progress_v3");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (_) {}
    }
    return {
      foundAnimals: [],
      completedQuizzes: [],
      consecutiveDays: 1,
      unlockedContinentBadges: [],
      generalQuizScore: 0,
      generalQuizzesTaken: 0,
    };
  });

  const [activeScreen, setActiveScreen] = useState<"map" | "hunt" | "badges" | "challenger" | "lab">("map");
  const [selectedContinentId, setSelectedContinentId] = useState<ContinentId | null>(null);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Sync state to local storage synchronously when progress updates
  useEffect(() => {
    localStorage.setItem("ecoexplorer_progress_v3", JSON.stringify(progress));
  }, [progress]);

  // Handle animal spotted in the scavenger hunt
  const handleAnimalSpotted = (animalId: string) => {
    setProgress((prev) => {
      if (prev.foundAnimals.includes(animalId)) return prev;
      return {
        ...prev,
        foundAnimals: [...prev.foundAnimals, animalId]
      };
    });
  };

  // Handle perfect quiz completion on a specific animal (earns individual badge)
  const handleQuizCompleted = (animalId: string) => {
    setProgress((prev) => {
      if (prev.completedQuizzes.includes(animalId)) return prev;
      const updatedQuizzes = [...prev.completedQuizzes, animalId];
      
      // Check if this continent is now 100% completed
      const activeContinent = CONTINENTS_DB.find(c => 
        c.animals.some(a => a.id === animalId)
      );

      let updatedContinentBadges = [...prev.unlockedContinentBadges];
      if (activeContinent) {
        const cAnimals = activeContinent.animals.map(a => a.id);
        const allCQuizzesDone = cAnimals.every(id => id === animalId || updatedQuizzes.includes(id));
        
        if (allCQuizzesDone && !updatedContinentBadges.includes(activeContinent.id)) {
          updatedContinentBadges.push(activeContinent.id);
        }
      }

      return {
        ...prev,
        completedQuizzes: updatedQuizzes,
        unlockedContinentBadges: updatedContinentBadges
      };
    });
  };

  // Safe helper to reset ALL progress
  const handleResetAllProgress = () => {
    const freshProgress: UserProgress = {
      foundAnimals: [],
      completedQuizzes: [],
      consecutiveDays: 1,
      unlockedContinentBadges: [],
      generalQuizScore: 0,
      generalQuizzesTaken: 0
    };
    setProgress(freshProgress);
    localStorage.removeItem("ecoexplorer_progress_v3");
    localStorage.removeItem("ecoexplorer_streak");
    setActiveScreen("map");
    setSelectedContinentId(null);
    setSelectedAnimal(null);
    setShowResetConfirm(false);
  };

  // Extract selected continent data reference
  const activeContinent = CONTINENTS_DB.find(c => c.id === selectedContinentId);

  return (
    <main className="min-h-screen bg-sand-100 flex flex-col font-sans selection:bg-sage-100 antialiased p-0 m-0 text-mud-800">
      
      {/* Top Main Navigation Header */}
      <header className="w-full h-20 bg-sage-450 border-b-4 border-sage-500/10 px-6 sticky top-0 z-40 shadow-md flex items-center justify-between text-white">
        <div 
          onClick={() => {
            setActiveScreen("map");
            setSelectedContinentId(null);
          }} 
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <div className="w-12 h-12 bg-tan-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm hover:scale-105 transition-all">
            <span className="text-2xl">🦁</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight text-white leading-none flex items-center gap-1 font-sans">
              Wild Explorer: World Safari
            </h1>
            <span className="text-[10px] font-black text-sage-100 uppercase tracking-widest mt-1">
              Field Ecologist Academy 🧬
            </span>
          </div>
        </div>

        {/* Global Explorer Badges Progress Header Bubble */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-sage-500 px-4 py-2 rounded-full border border-sage-400 text-white shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-sage-100">Explorer Badges</span>
            <span className="bg-white text-sage-450 px-2.5 py-0.5 rounded-full text-xs font-black">
              {progress.completedQuizzes.length}/14
            </span>
          </div>

          <button
            onClick={() => setShowResetConfirm(true)}
            id="reset-progress-header-btn"
            title="Reset Ranger Progress"
            className="px-3.5 py-1.5 bg-wood-500 hover:bg-wood-600 text-white font-bold text-xs rounded-full border border-wood-600/30 cursor-pointer active:scale-90 transition-transform flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Reset Map</span>
          </button>
        </div>
      </header>

      {/* Main Container Wrapper */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 md:py-8 flex flex-col gap-6">
        
        {/* Router Screens */}
        {activeScreen === "map" && (
          <ExplorerMap
            progress={progress}
            onSelectContinent={(id) => {
              setSelectedContinentId(id as ContinentId);
              setActiveScreen("hunt");
            }}
            onOpenTrophyRoom={() => setActiveScreen("badges")}
            onOpenChallenger={() => setActiveScreen("challenger")}
            onOpenLab={() => setActiveScreen("lab")}
          />
        )}

        {activeScreen === "lab" && (
          <AdaptationLab
            onBack={() => setActiveScreen("map")}
          />
        )}

        {activeScreen === "hunt" && activeContinent && (
          <ScavengerHunt
            continent={activeContinent}
            progress={progress}
            onBack={() => {
              setActiveScreen("map");
              setSelectedContinentId(null);
            }}
            onSelectAnimal={(animal) => setSelectedAnimal(animal)}
            onAnimalSpotted={handleAnimalSpotted}
          />
        )}

        {activeScreen === "badges" && (
          <TrophyRoom
            progress={progress}
            onBack={() => setActiveScreen("map")}
          />
        )}

        {activeScreen === "challenger" && (
          <ChallengerHub
            onBack={() => setActiveScreen("map")}
          />
        )}
      </div>

      {/* RANGER MODAL (ANIMAL SPECIFIC WORK) */}
      {selectedAnimal && (
        <AnimalModal
          animal={selectedAnimal}
          progress={progress}
          onClose={() => setSelectedAnimal(null)}
          onQuizCompleted={handleQuizCompleted}
        />
      )}

      {/* CUSTOM RESET MAP CONFIRMATION OVERLAY */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-mud-800/60 backdrop-blur-sm p-4 flex items-center justify-center animate-in fade-in duration-200 text-mud-800 select-none">
          <div className="bg-sand-50 rounded-[32px] p-6 w-full max-w-sm border-3 border-tan-400 shadow-2xl text-center flex flex-col items-center gap-5 relative animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-wood-100 rounded-full flex items-center justify-center text-4xl animate-bounce">
              🧭
            </div>

            <div className="flex flex-col gap-1.5">
              <h4 className="text-xl font-black text-mud-800 font-sans">
                Restart Safari?
              </h4>
              <p className="text-xs text-mud-700 font-bold leading-relaxed">
                Are you sure you want to delete all found animals and badges and restart your world Safari? This cannot be undone!
              </p>
            </div>

            <div className="flex flex-col gap-2.5 w-full">
              <button
                onClick={handleResetAllProgress}
                id="confirm-reset-yes-btn"
                className="w-full py-3 bg-wood-500 hover:bg-wood-600 text-white font-extrabold text-sm rounded-2xl border-2 border-wood-600/35 shadow-sm active:scale-95 transition-all cursor-pointer text-center"
              >
                Yes, Start Fresh! 🗺️
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                id="confirm-reset-no-btn"
                className="w-full py-3 bg-sand-105 hover:bg-sand-200 text-mud-850 font-black text-sm rounded-2xl border border-sand-300 shadow-sm active:scale-95 transition-all cursor-pointer text-center"
              >
                No, Keep Exploring! 🔍
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Branding Statement */}
      <footer className="w-full bg-mud-800 text-tan-500 py-6 text-center text-xs font-bold mt-auto font-sans">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="tracking-wide">© 2026 WILD EXPLORER • TAILORED FOR ELEMENTARY KIDS TO STUDY HABITATS</p>
          <div className="flex items-center gap-4 text-[11px] font-semibold text-tan-400/80">
            <span>PARENTS DASHBOARD</span>
            <span>|</span>
            <span>KID SAFE MODE ✓</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
