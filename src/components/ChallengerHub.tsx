import React, { useState, useEffect } from "react";
import { ArrowLeft, Sparkles, Smile, RefreshCw, Star, Trophy, Globe, Flame } from "lucide-react";

interface ChallengerHubProps {
  onBack: () => void;
}

interface TriviaQuestion {
  question: string;
  options: string[];
  answer: string;
  reason: string;
}

export const ChallengerHub: React.FC<ChallengerHubProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sourcedFromAI, setSourcedFromAI] = useState<boolean>(false);

  // Active quiz state
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [chosenAnswer, setChosenAnswer] = useState<string | null>(null);
  const [answered, setAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [finished, setFinished] = useState<boolean>(false);
  
  // Streak state (persisted in session State)
  const [streak, setStreak] = useState<number>(() => {
    return Number(localStorage.getItem("ecoexplorer_streak") || "0");
  });

  const categories = [
    { id: "General", name: "General Safari", emoji: "🧭", desc: "A mix of animals and habits of the globe!" },
    { id: "Rainforest", name: "Rainforest", emoji: "🌴", desc: "Monkeys, colorful birds, and Slow sloths!" },
    { id: "Polar", name: "Polar", emoji: "❄️", desc: "Penguins, freezing icy oceans, and Whales!" },
    { id: "Savanna", name: "Savanna", emoji: "🦁", desc: "Lions, grasslands, and muddy water rivers!" },
    { id: "Ocean", name: "Deep Ocean", emoji: "🐋", desc: "Sunken coral reefs, giant leviathans, and fish!" }
  ];

  const handleStartArena = async (categoryId: string) => {
    setSelectedCategory(categoryId);
    setLoading(true);
    setQuestions([]);
    setCurrentIndex(0);
    setChosenAnswer(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);

    try {
      const response = await fetch("/api/generate-trivia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: categoryId })
      });

      if (!response.ok) throw new Error("Could not fetch trivia questions.");

      const data = await response.json();
      setQuestions(data.questions || []);
      setSourcedFromAI(!!data.sourcedFromAI);
    } catch (err) {
      console.error(err);
      // Fallback
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChooseAnswer = (option: string) => {
    if (answered) return;
    setChosenAnswer(option);
    setAnswered(true);

    const isCorrect = option === questions[currentIndex].answer;
    if (isCorrect) {
      setScore(prev => prev + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      localStorage.setItem("ecoexplorer_streak", newStreak.toString());
    } else {
      // Break streak
      setStreak(0);
      localStorage.setItem("ecoexplorer_streak", "0");
    }
  };

  const handleNextQuestion = () => {
    setChosenAnswer(null);
    setAnswered(false);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setFinished(true);
    }
  };

  const handleResetArena = () => {
    setSelectedCategory(null);
    setQuestions([]);
    setFinished(false);
  };

  return (
    <div className="w-full flex flex-col gap-6 text-mud-800 select-none animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            id="arena-back-btn"
            className="flex items-center gap-2 px-4 py-2 bg-sand-100 hover:bg-sand-200 text-mud-800 font-bold rounded-2xl border-2 border-tan-400/30 transition-all active:scale-95 cursor-pointer text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Map
          </button>
          <h2 className="text-xl md:text-2xl font-black text-mud-800 flex items-center gap-2 font-display">
            🧭 Habitat Arena Challenger
          </h2>
        </div>

        {/* Streak Flame */}
        {streak > 0 && (
          <div className="flex items-center gap-1 bg-[#FFF5EA] text-[#A05C14] px-3.5 py-1.5 rounded-2xl border border-[#E9D0B0] animate-pulse">
            <Flame className="w-5 h-5 text-amber-650 fill-amber-500" />
            <span className="text-xs font-black uppercase tracking-wider">Streak: {streak}!</span>
          </div>
        )}
      </div>

      {!selectedCategory ? (
        // CATEGORY CHOOSER RENDER
        <div className="flex flex-col gap-5">
          <div className="bg-sage-450 text-white p-6 rounded-[32px] border-3 border-tan-400/50 shadow-md flex flex-col md:flex-row items-center gap-6">
            <span className="text-5xl animate-bounce">⚔️</span>
            <div>
              <h3 className="text-xl font-black text-white font-display">The Ultimate Habitat Master Quiz!</h3>
              <p className="text-xs text-sand-50 mt-1 max-w-lg font-semibold leading-relaxed">
                Step up to the podium, ranger! Choose a category below. Our live AI Guide will compile a custom trivia challenge. Beat the quizzes, hold your correct answer streak high, and prove your master expertise!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleStartArena(cat.id)}
                id={`start-arena-btn-${cat.id}`}
                className="p-5 rounded-3xl bg-white border-2 border-[#E9E4DB] hover:border-sage-500 text-left hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between h-48 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-4xl filter drop-shadow group-hover:scale-110 transition-transform">{cat.emoji}</span>
                  <span className="text-[9px] font-black text-sage-600 bg-sage-55/60 px-2 py-0.5 rounded-full border border-sage-200">
                    PLAY
                  </span>
                </div>
                <div>
                  <h4 className="font-extrabold text-mud-800 group-hover:text-wood-600 transition-colors text-base mt-4 font-display">
                    {cat.name} Arena
                  </h4>
                  <p className="text-xs text-mud-700 font-semibold leading-normal mt-1 max-w-[90%] font-body">
                    {cat.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        // ACTIVE QUIZ INTERACTION RENDER
        <div className="max-w-xl mx-auto w-full bg-sand-50 rounded-[32px] border-3 border-tan-400/40 shadow-2xl overflow-hidden p-6 flex flex-col gap-5">
          {loading ? (
            // Spinner Loading
            <div className="text-center py-16 flex flex-col items-center gap-4">
              <div className="relative">
                <Globe className="w-16 h-16 text-sage-500 animate-spin" />
                <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-tan-500 animate-ping" />
              </div>
              <h4 className="font-black text-mud-800 text-lg">AI Ranger is compiling trivia...</h4>
              <p className="text-xs text-mud-700 font-bold">Consulting books and environmental logs!</p>
            </div>
          ) : questions.length === 0 ? (
            // Error fallbacks
            <div className="text-center py-10 flex flex-col items-center gap-4">
              <span className="text-5xl">📡</span>
              <h4 className="font-bold text-mud-800 font-display">Connection Static</h4>
              <p className="text-xs text-mud-700 max-w-sm font-semibold">
                Ranger signal took a quick dive. Let's head back and try again!
              </p>
              <button
                onClick={handleResetArena}
                className="mt-3 px-5 py-2.5 bg-wood-500 hover:bg-wood-600 text-white font-black text-xs rounded-xl shadow cursor-pointer border-0"
              >
                Return to Category List
              </button>
            </div>
          ) : finished ? (
            // Concluded quiz card
            <div className="text-center py-6 flex flex-col items-center gap-4 animate-in zoom-in-95">
              <div className="w-20 h-20 bg-tan-50 border-2 border-tan-400 rounded-full flex items-center justify-center text-4xl animate-bounce">
                🏆
              </div>
              <h4 className="text-xl font-black text-mud-800 truncate font-display">Arena Result: {score}/{questions.length} Correct</h4>
              <p className="text-xs text-mud-700 font-bold max-w-sm mt-1">
                {score === questions.length 
                  ? "Brilliant Master Explorer! Your environmental wisdom shines brighter than direct desert starlight! 🌟" 
                  : "Great adventure! Challenge your memory again or select another habitat pool to hone your skills!"
                }
              </p>

              {sourcedFromAI && (
                <span className="px-3 py-1 bg-[#F0F4E8] text-[#5F745E] border-2 border-[#D0DFC0] text-[10px] font-black uppercase rounded-full tracking-widest leading-none">
                  ⚡ Generative AI Trivia Approved
                </span>
              )}

              <div className="flex gap-3 mt-4 w-full">
                <button
                  onClick={() => handleStartArena(selectedCategory)}
                  className="flex-1 py-3 bg-tan-500 hover:bg-tan-600 text-white font-extrabold text-xs rounded-2xl border-2 border-tan-400/50 cursor-pointer shadow-sm"
                >
                  Play Arena Again!
                </button>
                <button
                  onClick={handleResetArena}
                  className="flex-1 py-3 bg-sand-100 hover:bg-sand-200 text-mud-850 font-black text-xs rounded-2xl border border-sand-250 cursor-pointer shadow-sm"
                >
                  Change Category
                </button>
              </div>
            </div>
          ) : (
            // Active Questions View
            <div className="flex flex-col gap-4 animate-in fade-in">
              <div className="flex justify-between items-center text-xs font-bold text-mud-700">
                <span className="uppercase text-sage-600 font-black font-sans">{selectedCategory} Arena • Q{currentIndex + 1}/3</span>
                <span className="px-2 py-0.5 bg-sand-100 rounded-md border border-sand-200 text-mud-800 font-bold font-mono">
                  {sourcedFromAI ? "AI Online-Mode" : "Offline-Mode"}
                </span>
              </div>

              {/* Quiz question box */}
              <div className="p-5 bg-sand-100 rounded-3xl border border-sand-250">
                <p className="text-base font-black text-mud-850 leading-normal font-sans">
                  {questions[currentIndex].question}
                </p>
              </div>

              {/* Option fields */}
              <div className="flex flex-col gap-3 mt-2">
                {questions[currentIndex].options.map((option) => {
                  const isSelected = chosenAnswer === option;
                  const isGoldCorrect = option === questions[currentIndex].answer;

                  let itemStyle = "bg-white border-sand-200 hover:bg-sand-50 text-mud-800 shadow-sm";
                  if (answered) {
                    if (isGoldCorrect) {
                      itemStyle = "bg-sage-50 border-sage-400 text-sage-600 shadow-sm";
                    } else if (isSelected) {
                      itemStyle = "bg-[#FFF2E5] border-wood-400 text-wood-700";
                    } else {
                      itemStyle = "bg-sand-100 border-sand-200 text-mud-700/40";
                    }
                  }

                  return (
                    <button
                      key={option}
                      onClick={() => handleChooseAnswer(option)}
                      className={`w-full p-4 rounded-2xl border-2 text-left text-sm font-bold transition-all relative ${itemStyle} ${
                        !answered ? "cursor-pointer active:scale-99 hover:-translate-y-0.5" : "cursor-default animate-none"
                      }`}
                    >
                      {option}
                      {answered && isGoldCorrect && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg">✅</span>}
                      {answered && isSelected && !isGoldCorrect && (
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg">❌</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedbacks explanations */}
              {answered && (
                <div className="bg-sage-50 rounded-2xl p-4 border border-sage-200 mt-2 flex flex-col gap-2">
                  <span className="text-xs font-black text-sage-600 uppercase tracking-widest flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-tan-500 text-tan-500 animate-spin" /> Ranger's Explanation:
                  </span>
                  <p className="text-xs font-semibold text-mud-700 leading-relaxed font-body">
                    {questions[currentIndex].reason}
                  </p>
                  <button
                    onClick={handleNextQuestion}
                    className="py-2.5 px-5 bg-tan-500 hover:bg-tan-600 text-white font-black text-xs rounded-xl shadow self-end mt-2 cursor-pointer transition-all active:scale-95"
                  >
                    {currentIndex + 1 === questions.length ? "Inspect Results ➔" : "Advance Question ➔"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
