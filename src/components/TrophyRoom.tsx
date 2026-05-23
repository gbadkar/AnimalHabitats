import React, { useState } from "react";
import { UserProgress } from "../types";
import { CONTINENTS_DB } from "../data";
import { Trophy, Star, ArrowLeft, Lock, Award, CheckCircle, Sparkles } from "lucide-react";

interface TrophyRoomProps {
  progress: UserProgress;
  onBack: () => void;
}

export const TrophyRoom: React.FC<TrophyRoomProps> = ({ progress, onBack }) => {
  const [selectedBadge, setSelectedBadge] = useState<{ name: string; emoji: string; desc: string; type: string } | null>(null);

  // Helper calculations
  const totalAnimals = 14;
  const completedAnimalsCount = progress.completedQuizzes.length;
  const completedContinentsCount = CONTINENTS_DB.filter(c =>
    c.animals.every(a => progress.completedQuizzes.includes(a.id))
  ).length;

  return (
    <div className="w-full flex flex-col gap-6 text-mud-800 select-none animate-in fade-in duration-300">
      {/* Top Header Navigation */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          id="badge-room-back-btn"
          className="flex items-center gap-2 px-4 py-2 bg-sand-100 hover:bg-sand-200 text-mud-800 font-bold rounded-2xl border-2 border-tan-400/30 transition-all active:scale-95 cursor-pointer text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Map
        </button>
        <h2 className="text-2xl font-black text-mud-800 flex items-center gap-2 font-sans">
          🏆 Badges & Trophies Cabinet
        </h2>
      </div>

      {/* Stats Summary Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-sage-450 text-white p-6 rounded-[32px] border-3 border-tan-400/50 shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-4xl">👀</span>
          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-wider text-sage-100 font-sans">Species Observed</h4>
            <p className="text-2xl font-black">{progress.foundAnimals.length} / {totalAnimals}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-x border-white/10 pt-3 sm:pt-0 sm:px-4">
          <span className="text-4xl">🎖️</span>
          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-wider text-sage-100 font-sans">Ecological Certifications</h4>
            <p className="text-2xl font-black">{completedAnimalsCount} / {totalAnimals}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
          <span className="text-4xl">👑</span>
          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-wider text-sage-100 font-sans">Ecologist Tier</h4>
            <p className="text-xl font-black text-tan-100">
              {completedContinentsCount === 7 
                ? "Global Biosphere Lead 🏆" 
                : completedAnimalsCount >= 8 
                ? "Senior Biologist 🕵️‍♂️" 
                : progress.foundAnimals.length >= 4 
                ? "Field Investigator 🧭" 
                : "Trainee Ecologist 🐾"
              }
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: Continent Master Badges */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-black text-mud-800 flex items-center gap-2 font-sans">
          <span>👑</span> Continent Safari Master Trophies
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CONTINENTS_DB.map((continent) => {
            const animalIds = continent.animals.map(a => a.id);
            const isContinentFinished = animalIds.every(id => progress.completedQuizzes.includes(id));
            const badgeName = `${continent.name} Safari Master`;
            const badgeEmoji = "🎖️";
            const badgeDesc = `Awarded to elite rangers who have successfully spotted every animal and solved all quizzes in the continent of ${continent.name}!`;

            return (
              <div
                key={continent.id}
                id={`master-badge-${continent.id}`}
                onClick={() => {
                  if (isContinentFinished) {
                    setSelectedBadge({ name: badgeName, emoji: badgeEmoji, desc: badgeDesc, type: "continent" });
                  }
                }}
                className={`p-5 rounded-3xl border-2 flex flex-col items-center text-center transition-all ${
                  isContinentFinished
                    ? "bg-sage-50 border-sage-200 hover:border-sage-300 hover:scale-[1.03] cursor-pointer shadow-sm hover:shadow-md"
                    : "bg-sand-100 border-sand-200 opacity-60 cursor-not-allowed"
                }`}
              >
                <div className="relative mb-3">
                  <span className={`text-5xl block ${isContinentFinished ? "animate-pulse" : ""}`}>
                    {isContinentFinished ? "🎖️" : "🔒"}
                  </span>
                  {isContinentFinished && (
                    <span className="absolute -bottom-1 -right-1 text-base bg-tan-500 border border-white p-0.5 rounded-full select-none">
                      {continent.emoji}
                    </span>
                  )}
                </div>

                <h4 className="font-extrabold text-sm text-mud-800 leading-tight font-sans">
                  {continent.name}
                </h4>
                <p className="text-[10px] font-black text-mud-700 uppercase mt-1">
                  {isContinentFinished ? "🏆 SAFARI MASTER" : "🔒 LOCKED"}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 2: Individual Animal Ranger Badges */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-black text-mud-800 flex items-center gap-2 font-sans">
          <span>🔬</span> Field Observations & Certifications
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CONTINENTS_DB.flatMap(c => c.animals).map((animal) => {
            const isSpotted = progress.foundAnimals.includes(animal.id);
            const isQuizPassed = progress.completedQuizzes.includes(animal.id);
            const badgeName = `${animal.name} Badge`;
            const badgeEmoji = animal.emoji;
            const badgeDesc = isQuizPassed
              ? `CERTIFIED ECOLOGIST SEAL: You have scouted the ${animal.name} in its native ${animal.habitatName} and demonstrated absolute mastery over its structural, behavioral, and physiological adaptations!`
              : `FIELD OBSERVATION LOGGED: You successfully located and registered this specimen of ${animal.name} (${animal.species}) within its microclimate! Complete its Habitat Quiz to earn full Ecologist Certification.`;

            const isUnlocked = isSpotted || isQuizPassed;

            return (
              <div
                key={animal.id}
                id={`animal-badge-${animal.id}`}
                onClick={() => {
                  if (isUnlocked) {
                    setSelectedBadge({ 
                      name: isQuizPassed ? `🏆 ${animal.name} (Certified)` : `👀 ${animal.name} (Observed)`, 
                      emoji: badgeEmoji, 
                      desc: badgeDesc, 
                      type: isQuizPassed ? "certified" : "observed" 
                    });
                  }
                }}
                className={`p-5 rounded-3xl border-2 flex flex-col items-center text-center transition-all ${
                  isQuizPassed
                    ? "bg-gradient-to-br from-white to-amber-50/20 border-tan-400 hover:scale-[1.03] cursor-pointer shadow-sm hover:shadow-md"
                    : isSpotted
                    ? "bg-white border-sand-300 hover:scale-[1.03] cursor-pointer shadow-sm hover:border-sage-300"
                    : "bg-sand-100/70 border-sand-200/60 opacity-45 cursor-not-allowed select-none"
                }`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 select-none relative ${
                  isQuizPassed 
                    ? "bg-amber-50 border-2 border-tan-300"
                    : isSpotted
                    ? "bg-sand-50 border border-sand-250"
                    : "bg-sand-200"
                }`}>
                  <span className="text-3xl filter drop-shadow">
                    {isUnlocked ? animal.emoji : "🔒"}
                  </span>
                  {isQuizPassed ? (
                    <span className="absolute -bottom-1 -right-1 text-xs bg-tan-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow font-black border border-white">
                      ★
                    </span>
                  ) : isSpotted ? (
                    <span className="absolute -bottom-1 -right-1 text-xs bg-sage-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow font-black border border-white">
                      ✓
                    </span>
                  ) : null}
                </div>

                <h4 className="font-bold text-xs text-mud-800 leading-tight font-sans">
                  {animal.name}
                </h4>
                <p className={`text-[9px] font-black mt-1 tracking-wide uppercase ${
                  isQuizPassed ? "text-tan-650" : isSpotted ? "text-sage-600" : "text-mud-700/40"
                }`}>
                  {isQuizPassed ? "🎖️ CERTIFIED" : isSpotted ? "👀 OBSERVED" : "🔒 LOCKED"}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Badge Inspector Dialog */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 bg-mud-800/60 backdrop-blur-sm p-4 flex items-center justify-center animate-in fade-in duration-200 text-mud-800">
          <div className="bg-sand-50 rounded-[32px] p-6 w-full max-w-sm border-3 border-tan-400 shadow-2xl text-center flex flex-col items-center gap-4 relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedBadge(null)}
              className="absolute top-4 right-4 text-xs font-black text-mud-800 hover:text-wood-500 bg-sand-200 py-1.5 px-2.5 rounded-xl cursor-pointer"
            >
              Close
            </button>

            <span className="text-6xl filter drop-shadow animate-bounce mt-4">
              {selectedBadge.emoji}
            </span>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-black text-wood-500 uppercase tracking-widest flex items-center gap-1 justify-center font-sans">
                <Sparkles className="w-3.5 h-3.5 text-tan-500" /> Ranger Certification
              </span>
              <h4 className="text-xl font-black text-mud-800 font-sans">
                {selectedBadge.name}
              </h4>
            </div>

            <p className="text-xs text-mud-700 font-medium leading-relaxed bg-white p-3.5 rounded-3xl border border-sand-200 shadow-sm">
              {selectedBadge.desc}
            </p>

            <div className="text-[10px] font-bold text-mud-600 mt-2">
              Explorer Account Checked • Level Approved ✓
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
