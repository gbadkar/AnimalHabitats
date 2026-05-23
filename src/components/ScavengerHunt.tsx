import React, { useState } from "react";
import { ContinentData, Animal, UserProgress } from "../types";
import { ArrowLeft, Sparkles, HelpCircle, CheckCircle, Info, Heart } from "lucide-react";
import confetti from "canvas-confetti";

interface ScavengerHuntProps {
  continent: ContinentData;
  progress: UserProgress;
  onBack: () => void;
  onSelectAnimal: (animal: Animal) => void;
  onAnimalSpotted: (animalId: string) => void;
}

export const ScavengerHunt: React.FC<ScavengerHuntProps> = ({
  continent,
  progress,
  onBack,
  onSelectAnimal,
  onAnimalSpotted
}) => {
  const [activeBubble, setActiveBubble] = useState<{ id: string; text: string; name: string } | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Spot an animal
  const handleSpotAnimal = (animal: Animal) => {
    const alreadyFound = progress.foundAnimals.includes(animal.id);
    if (!alreadyFound) {
      // Confetti burst!
      confetti({
        particleCount: 80,
        spread: 75,
        origin: { y: 0.6 },
        colors: ["#FFD700", "#FF4500", "#00FF7F", "#1E90FF", "#FF69B4"]
      });
      // Register spotted
      onAnimalSpotted(animal.id);
    }
    // Launch interactive modal
    onSelectAnimal(animal);
  };

  // Click on extra decor
  const handleExtraClick = (extra: { id: string; name: string; emoji: string; funFact: string }) => {
    setActiveBubble({
      id: extra.id,
      name: `${extra.emoji} ${extra.name}`,
      text: extra.funFact
    });
  };

  const foundCount = continent.animals.filter(a => progress.foundAnimals.includes(a.id)).length;
  const isContinentCompleted = continent.animals.every(a => progress.completedQuizzes.includes(a.id));

  return (
    <div className="w-full flex flex-col gap-6 select-none text-mud-800">
      {/* Top Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white border-2 border-tan-400/20 p-4 rounded-[32px] shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            id="back-to-map-btn"
            className="flex items-center gap-2 px-4 py-2 bg-sand-100 hover:bg-sand-200 text-mud-800 font-bold rounded-2xl border-2 border-tan-400/30 transition-all active:scale-95 cursor-pointer text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Map
          </button>
          <div className="flex flex-col">
            <h2 className="text-xl md:text-2xl font-black text-mud-800 flex items-center gap-2 leading-none font-sans">
              <span>{continent.emoji}</span> {continent.name} Safari
            </h2>
            <span className="text-xs font-semibold text-mud-700 mt-1.5">
              Find the {continent.animals.length} animals hidden below!
            </span>
          </div>
        </div>

        {/* Progress Tracker Widget */}
        <div className="flex items-center justify-between sm:justify-end gap-3 px-4 py-2 bg-sage-50 rounded-2xl border border-sage-200">
          <div className="flex flex-col text-left sm:text-right">
            <span className="text-[10px] font-black uppercase text-sage-600 tracking-wider">Scavenger Status</span>
            <span className="text-sm font-bold text-mud-800">
              {foundCount}/{continent.animals.length} Spotted
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {continent.animals.map(animal => {
              const isSpotted = progress.foundAnimals.includes(animal.id);
              const isQuizDone = progress.completedQuizzes.includes(animal.id);
              return (
                <div
                  key={animal.id}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm transition-all ${
                    isQuizDone
                      ? "bg-sage-500 border-sage-600 text-white"
                      : isSpotted
                      ? "bg-tan-500 border-tan-600 text-white animate-pulse"
                      : "bg-sand-200 border-sand-300 text-mud-700/55"
                  }`}
                  title={`${animal.name}: ${isQuizDone ? "Completed!" : isSpotted ? "Spotted (No Quiz)" : "Hidden"}`}
                >
                  {isQuizDone ? "🏆" : isSpotted ? "👀" : "❓"}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Scavenger Interactive Canvas Area */}
      <div
        id="scavenger-canvas-container"
        className={`relative w-full aspect-video min-h-[350px] md:min-h-[500px] overflow-hidden rounded-[40px] border-[12px] border-white shadow-xl ${continent.landscapeBg}`}
      >
        {/* Sky / Cloud decorations for environment parallax-like animation */}
        <div className="absolute top-10 left-[15%] w-16 h-8 bg-white/40 rounded-full blur-sm pointer-events-none animate-pulse duration-5000" />
        <div className="absolute top-24 right-[20%] w-24 h-10 bg-white/30 rounded-full blur-md pointer-events-none animate-pulse duration-3000" />
        <div className="absolute top-16 left-[50%] w-20 h-8 bg-white/20 rounded-full blur-sm pointer-events-none animate-pulse duration-4000" />

        {/* Ranger Hint Prompt */}
        <button
          onClick={() => setShowHint(!showHint)}
          id="ranger-clue-btn"
          className={`absolute top-4 left-4 z-40 px-4 py-2 rounded-2xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer border-2 ${
            showHint
              ? "bg-tan-500 border-tan-600 text-white"
              : "bg-mud-800 border-mud-700 text-white hover:bg-mud-700"
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          {showHint ? "Hide Clues" : "Ask Ranger for Clues!"}
        </button>

        {/* Habitat Decor Extras (Forest, Plants, Decor) */}
        {continent.extras.map((extra) => (
          <button
            key={extra.id}
            onClick={() => handleExtraClick(extra)}
            id={`extra-${extra.id}`}
            style={{ left: `${extra.x}%`, top: `${extra.y}%` }}
            className="absolute z-10 p-2.5 rounded-full hover:bg-white/30 hover:scale-125 focus:scale-125 transition-all duration-300 cursor-pointer text-4xl select-none"
          >
            <div className="animate-bounce" style={{ animationDuration: "3s" }}>
              {extra.emoji}
            </div>
          </button>
        ))}

        {/* 2 Primary Hidden / Spotted Animals */}
        {continent.animals.map((animal) => {
          const isSpotted = progress.foundAnimals.includes(animal.id);
          const isQuizFinished = progress.completedQuizzes.includes(animal.id);

          return (
            <div
              key={animal.id}
              style={{ left: `${animal.coordinate.x}%`, top: `${animal.coordinate.y}%` }}
              className="absolute z-20 group -translate-x-1/2 -translate-y-1/2 transition-transform duration-300"
            >
              {/* Pulse rings if Clues/Hint mode is active to guide kids! */}
              {showHint && !isSpotted && (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-tan-500/40 border-2 border-tan-500 animate-ping z-0 pointer-events-none" />
              )}

              <button
                onClick={() => handleSpotAnimal(animal)}
                id={`animal-hunt-btn-${animal.id}`}
                className={`relative z-10 flex flex-col items-center cursor-pointer p-4 rounded-3xl transition-all duration-300 outline-none select-none ${
                  isQuizFinished
                    ? "bg-sage-500/20 shadow-lg border-2 border-sage-400 " + animal.styleConfig.scale
                    : isSpotted
                    ? "bg-tan-500/20 shadow-md border-2 border-tan-400 " + animal.styleConfig.scale
                    : "opacity-85 hover:opacity-100 bg-black/0 hover:bg-white/10 " + animal.styleConfig.scale
                }`}
              >
                {/* Animal Display Image (Bubbly Emoji) */}
                <span className={`text-6xl md:text-7xl filter drop-shadow select-none block transition-transform ${animal.styleConfig.rotation}`}>
                  {animal.emoji}
                </span>

                {/* Badge Label Overlay if Spotted */}
                {isSpotted && (
                  <span className="absolute -top-3 px-2 py-0.5 bg-tan-500 text-white font-black text-[10px] uppercase tracking-wide rounded-full shadow border border-tan-400/30 animate-bounce flex items-center gap-0.5">
                    {isQuizFinished ? "🏆 Quiz done" : "⭐ Found!"}
                  </span>
                )}
              </button>
            </div>
          );
        })}

        {/* Pop-up dialogue Bubble for Extras */}
        {activeBubble && (
          <div className="absolute inset-x-4 bottom-4 z-40 bg-white/95 backdrop-blur-sm p-4 rounded-3xl border border-tan-400/20 shadow-lg flex items-start gap-4 text-mud-800 animate-in fade-in slide-in-from-bottom duration-300">
            <div className="text-3xl">💡</div>
            <div className="flex-1">
              <h5 className="font-bold text-wood-500 text-sm mb-0.5">{activeBubble.name}</h5>
              <p className="text-xs text-mud-700 font-medium leading-relaxed">{activeBubble.text}</p>
            </div>
            <button
              onClick={() => setActiveBubble(null)}
              className="text-xs font-bold text-white px-3 py-1 bg-wood-500 hover:bg-wood-600 rounded-xl cursor-pointer"
            >
              Close
            </button>
          </div>
        )}

        {/* Unlocked continent master celebration banner if all badges obtained */}
        {isContinentCompleted && (
          <div className="absolute inset-0 bg-mud-800/40 backdrop-blur-[1px] pointer-events-none flex items-center justify-center animate-in fade-in duration-700">
            <div className="p-6 rounded-3xl bg-white border-4 border-tan-400 shadow-2xl text-center max-w-sm pointer-events-auto animate-bounce m-4">
              <span className="text-5xl">🎖️</span>
              <h4 className="text-xl font-black text-mud-800 mt-2">Continent Completed!</h4>
              <p className="text-xs text-mud-700 font-bold mt-1">
                You harvested every single species and badge of {continent.name}! You are an elite Habitat Guardian!
              </p>
              <button
                onClick={onBack}
                className="mt-4 px-4 py-2 bg-sage-500 hover:bg-sage-650 text-white font-extrabold text-xs rounded-xl shadow cursor-pointer"
              >
                Return to Map <ArrowLeft className="inline w-3 h-3 ml-1" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Safari Ranger Clue Box helper below (shows clue when hints enabled) */}
      {showHint && (
        <div className="p-5 bg-sage-50 border-2 border-sage-200 rounded-3xl flex flex-col gap-3 animate-in slide-in-from-top text-mud-800">
          <span className="text-sm font-black flex items-center gap-1.5 text-sage-600">
            <Info className="w-4 h-4" /> Ranger's Tracker Clues:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-semibold">
            {continent.animals.map(a => {
              const isFound = progress.foundAnimals.includes(a.id);
              return (
                <div key={a.id} className="p-3 border border-tan-400/20 rounded-2xl bg-white flex items-center gap-3 shadow-sm">
                  <span className="text-2xl">{a.emoji}</span>
                  <div>
                    <h6 className="font-bold text-mud-800">{a.name}</h6>
                    <p className="text-[11px] text-mud-700/80 mt-1">
                      {isFound 
                        ? "✅ You already discovered me!" 
                        : `Clue: Spot me around the coordinate (${a.coordinate.x}%, ${a.coordinate.y}%)!`
                      }
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
