import React from "react";
import { ContinentData, UserProgress } from "../types";
import { CONTINENTS_DB } from "../data";
import { Compass, Trophy, Star, Sparkles, MapPin, CheckCircle, Gamepad2, Layers, Search } from "lucide-react";

interface ExplorerMapProps {
  progress: UserProgress;
  onSelectContinent: (continentId: string) => void;
  onOpenTrophyRoom: () => void;
  onOpenChallenger: () => void;
  onOpenLab: () => void;
}

export const ExplorerMap: React.FC<ExplorerMapProps> = ({
  progress,
  onSelectContinent,
  onOpenTrophyRoom,
  onOpenChallenger,
  onOpenLab
}) => {
  // Helpers to calculate progress
  const getContinentProgress = (continent: ContinentData) => {
    const animalIds = continent.animals.map(a => a.id);
    const foundCount = animalIds.filter(id => progress.foundAnimals.includes(id)).length;
    const quizCount = animalIds.filter(id => progress.completedQuizzes.includes(id)).length;
    return { foundCount, quizCount, total: animalIds.length };
  };

  // Stats summaries
  const totalFound = progress.foundAnimals.length;
  const totalQuizzes = progress.completedQuizzes.length;
  const totalAnimals = 14; 

  return (
    <div className="w-full flex flex-col gap-6 text-mud-800">
      {/* Map Header with Scientific Bio-Station Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 via-slate-850 to-mud-950 text-white p-6 md:p-8 shadow-md border-3 border-tan-400">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-4 opacity-10 rotate-12 select-none pointer-events-none">
          <Compass className="w-56 h-56 text-tan-300" />
        </div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="inline-flex items-center gap-1.5 self-start px-3 py-1 bg-sage-500 text-white font-bold text-[10px] uppercase tracking-wider rounded-lg shadow border border-white/10">
              <Layers className="w-3 h-3 text-sage-100" /> ECOLOGIST SIMULATION CENTER
            </span>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight drop-shadow font-display">
              Biosphere Adaptations & Habitats 🧬🧭
            </h1>
            <p className="text-sand-100 max-w-xl text-xs md:text-sm font-medium leading-relaxed">
              Explore seven key geographic regions to catalog endemic organisms, investigate evolutionary adaptations (structural, behavioral, and physiological), and run laboratory stress tests to verify ecosystem resilience.
            </p>
          </div>

          {/* Quick Dashboard Stat Bubbles */}
          <div className="grid grid-cols-3 gap-2 w-full lg:w-auto">
            <button
              onClick={onOpenTrophyRoom}
              id="trophy-room-btn"
              className="flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 active:scale-95 transition-all p-3 rounded-2xl border border-white/10 text-center cursor-pointer group shadow"
            >
              <Trophy className="w-6 h-6 text-tan-400 fill-tan-400/20 group-hover:scale-105 transition-transform" />
              <span className="text-[10px] font-bold mt-1 text-sand-100">Observations</span>
              <span className="text-sm font-black mt-0.5 text-white">
                {totalFound} Spotted
              </span>
            </button>

            <button
              onClick={onOpenChallenger}
              id="challenger-hub-btn"
              className="flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 active:scale-95 transition-all p-3 rounded-2xl border border-white/10 text-center cursor-pointer group shadow"
            >
              <Star className="w-6 h-6 text-amber-400 fill-amber-400/20 group-hover:scale-105 transition-transform" />
              <span className="text-[10px] font-bold mt-1 text-sand-100">Quiz Station</span>
              <span className="text-sm font-black mt-0.5 text-white">
                {totalQuizzes} Certs
              </span>
            </button>

            <button
              onClick={onOpenLab}
              id="adaptation-lab-launch-btn"
              className="flex flex-col items-center justify-center bg-tan-500 hover:bg-tan-600 active:scale-95 transition-all p-3 rounded-2xl border border-tan-400 text-center text-white cursor-pointer group shadow"
            >
              <Gamepad2 className="w-6 h-6 text-white group-hover:scale-105 transition-transform animate-pulse" />
              <span className="text-[10px] font-bold mt-1 text-sand-50">Adaptation Lab</span>
              <span className="text-sm font-black mt-0.5 text-white">
                Play Games!
              </span>
            </button>
          </div>
        </div>

        {/* Global Progress Tube */}
        <div className="mt-6 pt-5 border-t border-white/10 w-full">
          <div className="flex items-center justify-between text-[11px] font-bold text-white mb-2 font-sans uppercase tracking-wide">
            <span className="flex items-center gap-1.5"><Search className="w-4 h-4 text-tan-400" /> Geographic Biosphere Accreditation Check:</span>
            <span>{Math.round((totalQuizzes / totalAnimals) * 100)}% Researched</span>
          </div>
          <div className="w-full bg-slate-900/60 rounded-full h-3 overflow-hidden p-0.5 border border-white/5">
            <div
              className="bg-gradient-to-r from-tan-400 via-tan-500 to-wood-500 h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${(totalQuizzes / totalAnimals) * 105}%` }}
            />
          </div>
        </div>
      </div>

      {/* Playful Interactive Continents Grid */}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-mud-800 flex items-center gap-2 px-1 font-sans">
          <MapPin className="w-6 h-6 text-wood-500 animate-bounce" /> Select Your Travel Destination:
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONTINENTS_DB.map((continent) => {
            const { foundCount, quizCount, total } = getContinentProgress(continent);
            const isCompleted = quizCount === total;

            return (
              <div
                key={continent.id}
                id={`continent-card-${continent.id}`}
                onClick={() => onSelectContinent(continent.id)}
                className="relative overflow-hidden rounded-[32px] p-6 border-2 border-tan-400/20 bg-white hover:border-tan-400/50 transition-all duration-300 cursor-pointer flex flex-col justify-between group h-64 shadow-sm hover:shadow-md hover:-translate-y-1 text-mud-800"
              >
                {/* Visual decoration overlay */}
                <div className="absolute right-0 bottom-0 pointer-events-none text-9xl leading-none opacity-10 group-hover:opacity-20 translate-x-1/10 translate-y-1/10 transition-transform duration-500 group-hover:scale-125 select-none font-bold">
                  {continent.emoji}
                </div>

                {/* Top Section */}
                <div className="relative z-10 flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-3xl filter drop-shadow">{continent.emoji}</span>
                    <h3 className="text-xl font-bold tracking-tight text-mud-800 group-hover:text-wood-500 transition-colors">
                      {continent.name}
                    </h3>
                  </div>

                  {isCompleted ? (
                    <span className="flex items-center gap-1 px-3 py-1 bg-sage-500 text-white font-bold text-xs rounded-full shadow border border-sage-400 animate-pulse">
                      <CheckCircle className="w-3.5 h-3.5" /> Gold Medal
                    </span>
                  ) : foundCount > 0 ? (
                    <span className="flex items-center gap-1 px-3 py-1 bg-tan-500 text-white font-bold text-xs rounded-full shadow">
                      Exploring
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 px-3 py-1 bg-sage-50 text-mud-800 font-bold text-xs rounded-full shadow border border-sage-200">
                      Unvisited
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm font-medium text-mud-700 max-w-[90%] line-clamp-2 my-2 relative z-10">
                  {continent.habitatDescription}
                </p>

                {/* Bottom Stats Tray */}
                <div className="relative z-10 pt-3 border-t border-sand-200 flex flex-col gap-2.5">
                  <div className="flex justify-between text-xs font-bold text-mud-800">
                    <span className="flex items-center gap-1">🔍 Spotted: {foundCount}/{total} Animals</span>
                    <span className="flex items-center gap-1">🏆 Badges: {quizCount}/{total}</span>
                  </div>

                  {/* progress bars */}
                  <div className="flex items-center gap-1.5">
                    <div className="flex-1 bg-sand-100 rounded-full h-2.5 p-0.5 border border-sand-200">
                      <div
                        className="bg-tan-500 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${(quizCount / total) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-black w-7 text-right text-mud-800">
                      {Math.round((quizCount / total) * 100)}%
                    </span>
                  </div>
                </div>

                {/* Playful hover prompt line */}
                <div className="absolute top-2 right-2 flex gap-1 h-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="w-1.5 h-1.5 bg-tan-500 rounded-full animate-bounce delay-75"></span>
                  <span className="w-1.5 h-1.5 bg-tan-500 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Decorative World Expedition Fun Facts / Tips */}
      <div className="bg-sage-50 border-2 border-dashed border-sage-200 p-5 rounded-3xl flex flex-col md:flex-row items-center gap-4 mt-2">
        <span className="text-3xl">🧭</span>
        <div className="text-center md:text-left">
          <h4 className="font-bold text-sage-600 text-sm">Ranger's Safety & Learning Tip:</h4>
          <p className="text-xs text-mud-700 font-semibold mt-1 leading-relaxed">
            Each continent has animals peeking behind bushes, jumping out of waters, or resting under tree branches. Click everything you see! Tap once to spot the animal, read their incredible secrets, and take their quick quiz to lock in your badge!
          </p>
        </div>
      </div>
    </div>
  );
};
