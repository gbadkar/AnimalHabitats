import React, { useState } from "react";
import { ArrowLeft, Wind, Sun, Sparkles, RefreshCcw, Landmark } from "lucide-react";
import confetti from "canvas-confetti";

interface AdaptationLabProps {
  onBack: () => void;
}

export const AdaptationLab: React.FC<AdaptationLabProps> = ({ onBack }) => {
  const [activeGame, setActiveGame] = useState<"trophic" | "thermal" | "camouflage">("trophic");

  // Game 1: Yummy Snack Sorter for the Jaguar
  const [trophicScore, setTrophicScore] = useState(0);
  const [trophicQueue, setTrophicQueue] = useState<Array<{ id: string; name: string; emoji: string; category: "prey" | "producer" | "toxic"; fact: string }>>([
    { id: "capybara", name: "Capybara", emoji: "🐹", category: "prey", fact: "Capybaras are large, friendly water-rodents. They are a jaguar's favorite crunchy meat meal!" },
    { id: "caiman", name: "Caiman", emoji: "🐊", category: "prey", fact: "Caimans are like baby crocodiles, but strong jaguars can easily catch them in the river!" },
    { id: "kapok_leaf", name: "Jungle Leaves", emoji: "🍃", category: "producer", fact: "Green leaves are great for insects and sloths, but big jaguars can't eat or digest plant leaves!" },
    { id: "poison_frog", name: "Poison Frog", emoji: "🐸", category: "toxic", fact: "This bright frog is packed with dangerous poison! If a jaguar eats it, they will get super sick!" },
    { id: "brazil_nut", name: "Brazil Nuts", emoji: "🌰", category: "producer", fact: "Nuts are way too hard to crack, and jaguars only eat fresh muscle-protein!" },
    { id: "fresh_trout", name: "River Fish", emoji: "🐟", category: "prey", fact: "Jaguars are amazing swimmers and love catching fish in the lazy rivers!" },
    { id: "tapir", name: "Tapir", emoji: "🐗", category: "prey", fact: "Tapirs are chunky pig-like forest creatures. They make a perfect big cat dinner!" },
    { id: "orchid_flower", name: "Jungle Orchid", emoji: "🌸", category: "producer", fact: "Flowers are pretty to look at, but big cats do not eat salad!" }
  ]);
  const [trophicFeedback, setTrophicFeedback] = useState<string | null>("Let's feed the hungry jaguar! Look at the conveyor belt and choose: feed or discard!");
  const [trophicDone, setTrophicDone] = useState(false);

  const handleTrophicSort = (userDecision: "ingest" | "discard") => {
    if (trophicQueue.length === 0) return;
    const currentItem = trophicQueue[0];

    let isCorrect = false;
    let feedback = "";

    if (userDecision === "ingest") {
      if (currentItem.category === "prey") {
        isCorrect = true;
        feedback = `✓ Yummy! ${currentItem.emoji} ${currentItem.name} is a great, healthy meat snack. ${currentItem.fact}`;
      } else if (currentItem.category === "toxic") {
        feedback = `❌ Oh no! Ingesting the toxic ${currentItem.emoji} ${currentItem.name} makes the jaguar super sick from bad frog poisons!`;
      } else {
        feedback = `❌ Oops! The Jaguar is a meat-eater cat (carnivore). It cannot digest plant-based things like ${currentItem.emoji} ${currentItem.name}.`;
      }
    } else {
      // User chose to discard/filter out
      if (currentItem.category === "producer" || currentItem.category === "toxic") {
        isCorrect = true;
        feedback = `✓ Great choice! Put away the ${currentItem.emoji} ${currentItem.name}. ${currentItem.fact}`;
      } else {
        feedback = `❌ Oh, wait! The jaguar is hungry! Discarding the rich prey ${currentItem.emoji} ${currentItem.name} leaves the jaguar's tummy empty!`;
      }
    }

    if (isCorrect) {
      setTrophicScore((prev) => prev + 1);
    }
    setTrophicFeedback(feedback);
    const updated = trophicQueue.slice(1);
    setTrophicQueue(updated);

    if (updated.length === 0) {
      setTrophicDone(true);
      confetti({ particleCount: 50, spread: 60 });
    }
  };

  const resetTrophicGame = () => {
    setTrophicScore(0);
    setTrophicQueue([
      { id: "capybara", name: "Capybara", emoji: "🐹", category: "prey", fact: "Capybaras are large, friendly water-rodents. They are a jaguar's favorite crunchy meat meal!" },
      { id: "caiman", name: "Caiman", emoji: "🐊", category: "prey", fact: "Caimans are like baby crocodiles, but strong jaguars can easily catch them in the river!" },
      { id: "kapok_leaf", name: "Jungle Leaves", emoji: "🍃", category: "producer", fact: "Green leaves are great for insects and sloths, but big jaguars can't eat or digest plant leaves!" },
      { id: "poison_frog", name: "Poison Frog", emoji: "🐸", category: "toxic", fact: "This bright frog is packed with dangerous poison! If a jaguar eats it, they will get super sick!" },
      { id: "brazil_nut", name: "Brazil Nuts", emoji: "🌰", category: "producer", fact: "Nuts are way too hard to crack, and jaguars only eat fresh muscle-protein!" },
      { id: "fresh_trout", name: "River Fish", emoji: "🐟", category: "prey", fact: "Jaguars are amazing swimmers and love catching fish in the lazy rivers!" },
      { id: "tapir", name: "Tapir", emoji: "🐗", category: "prey", fact: "Tapirs are chunky pig-like forest creatures. They make a perfect big cat dinner!" },
      { id: "orchid_flower", name: "Jungle Orchid", emoji: "🌸", category: "producer", fact: "Flowers are pretty to look at, but big cats do not eat salad!" }
    ]);
    setTrophicFeedback("Conveyor belt loaded. Feed the Jaguar!");
    setTrophicDone(false);
  };

  // Game 2: Cozy Penguin Huddle Game (Penguin Huddle Solver)
  const [huddle, setHuddle] = useState<Array<{ id: number; name: string; emoji: string; temp: "cold" | "optimal" | "hyperthermic" }>>([
    { id: 1, name: "Baby Chick A", emoji: "👶", temp: "cold" },
    { id: 2, name: "Baby Chick B", emoji: "👶", temp: "cold" },
    { id: 3, name: "Baby Chick C", emoji: "👶", temp: "cold" },
    { id: 4, name: "Pals Chick D", emoji: "🐧", temp: "hyperthermic" },
    { id: 5, name: "Pals Chick E", emoji: "🐧", temp: "hyperthermic" },
    { id: 6, name: "Pals Chick F", emoji: "🐧", temp: "optimal" },
    { id: 7, name: "Middle Chick G", emoji: "👶", temp: "optimal" },
    { id: 8, name: "Middle Chick H", emoji: "👶", temp: "optimal" },
    { id: 9, name: "Baby Chick I", emoji: "👶", temp: "cold" }
  ]);
  const [thermalCycles, setThermalCycles] = useState(0);
  const [thermalResult, setThermalResult] = useState("");

  const cycleWindConvection = () => {
    setHuddle((prev) => {
      const copy = [...prev];
      // outer chicks index: 0, 1, 2, 8
      copy[0].temp = "cold";
      copy[1].temp = "cold";
      copy[2].temp = "cold";
      copy[8].temp = "cold";

      if (copy[3].temp === "optimal") copy[3].temp = "hyperthermic";
      else if (copy[3].temp === "hyperthermic") copy[3].temp = "hyperthermic";
      
      if (copy[4].temp === "optimal") copy[4].temp = "hyperthermic";
      if (copy[5].temp === "optimal") copy[5].temp = "hyperthermic";

      return copy;
    });

    setThermalCycles((prev) => {
      const next = prev + 1;
      if (next >= 4) {
        const coldCount = huddle.filter(c => c.temp === "cold").length;
        const hyperCount = huddle.filter(c => c.temp === "hyperthermic").length;
        if (coldCount === 0 && hyperCount <= 2) {
          setThermalResult("✓ High success! You kept all the baby chicks warm and cozy above freezing. High-fives! 🐧❄️");
          confetti({ particleCount: 70, spread: 80 });
        } else {
          setThermalResult("❌ Brrr! Some outer chicks stayed chilly, or center ones got too hot. Press Reset and click faster to help them take turns!");
        }
      }
      return next;
    });
  };

  const handleChickSwap = (index1: number, index2: number) => {
    if (thermalCycles >= 4) return;
    setHuddle((prev) => {
      const copy = [...prev];
      const tempObj = copy[index1];
      copy[index1] = copy[index2];
      copy[index2] = tempObj;

      const isCore = (idx: number) => idx === 3 || idx === 4 || idx === 5;
      const isOuter = (idx: number) => idx === 0 || idx === 1 || idx === 2 || idx === 8;

      [index1, index2].forEach((idx) => {
        if (isCore(idx)) {
          if (copy[idx].temp === "cold") {
            copy[idx].temp = "optimal";
          } else if (copy[idx].temp === "optimal") {
            copy[idx].temp = "hyperthermic";
          }
        } else if (isOuter(idx)) {
          if (copy[idx].temp === "hyperthermic") {
            copy[idx].temp = "optimal";
          } else if (copy[idx].temp === "optimal") {
            copy[idx].temp = "cold";
          }
        }
      });

      return copy;
    });
  };

  const resetThermalGame = () => {
    setHuddle([
      { id: 1, name: "Baby Chick A", emoji: "👶", temp: "cold" },
      { id: 2, name: "Baby Chick B", emoji: "👶", temp: "cold" },
      { id: 3, name: "Baby Chick C", emoji: "👶", temp: "cold" },
      { id: 4, name: "Pals Chick D", emoji: "🐧", temp: "hyperthermic" },
      { id: 5, name: "Pals Chick E", emoji: "🐧", temp: "hyperthermic" },
      { id: 6, name: "Pals Chick F", emoji: "🐧", temp: "optimal" },
      { id: 7, name: "Middle Chick G", emoji: "👶", temp: "optimal" },
      { id: 8, name: "Middle Chick H", emoji: "👶", temp: "optimal" },
      { id: 9, name: "Baby Chick I", emoji: "👶", temp: "cold" }
    ]);
    setThermalCycles(0);
    setThermalResult("");
  };

  // Game 3: Super Nature Goggles (Camouflage Finder)
  const [spectrum, setSpectrum] = useState(500);
  const [scannedSpecimen, setScannedSpecimen] = useState<string | null>(null);
  const [discoveredCamouflage, setDiscoveredCamouflage] = useState<string[]>([]);

  const checkSpecimenScanner = (id: string, name: string, requiredNM: [number, number], info: string) => {
    if (spectrum >= requiredNM[0] && spectrum <= requiredNM[1]) {
      if (!discoveredCamouflage.includes(id)) {
        const next = [...discoveredCamouflage, id];
        setDiscoveredCamouflage(next);
        setScannedSpecimen(`🎉 Bingo! Found the animal!\n\nAnimal discovered: ${name}\nGoggle setting: ${spectrum}nm\n\nHow they hide: ${info}`);
        if (next.length === 3) {
          confetti({ particleCount: 60, spread: 70 });
        }
      } else {
        setScannedSpecimen(`You have already scanned the ${name}! Try to find the others!`);
      }
    } else {
      setScannedSpecimen("❌ Screen Static. No hidden animals seen at this goggle frequency. Slide the bar to find another light color!");
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 text-slate-900 select-none animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            id="lab-back-btn"
            className="flex items-center gap-2 px-4 py-2 bg-sand-100 hover:bg-sand-200 text-mud-800 font-bold rounded-2xl border-2 border-tan-400/30 transition-all active:scale-95 cursor-pointer text-sm font-sans"
          >
            <ArrowLeft className="w-4 h-4" /> Map
          </button>
          <h2 className="text-xl md:text-2xl font-black text-mud-800 flex items-center gap-2 font-display">
            🧪 Adaptation Research Lab & Games
          </h2>
        </div>
        <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 bg-[#F0F4E8] text-[#5F745E] border-2 border-[#D0DFC0] text-[10px] font-black uppercase rounded-full tracking-widest leading-none">
          Kid Station v1.2
        </span>
      </div>

      {/* Lab Welcome Board */}
      <div className="bg-slate-900 text-white p-5 rounded-3xl border-3 border-tan-400/30 shadow-md">
        <div className="flex flex-col md:flex-row items-center gap-5">
          <span className="text-5xl animate-pulse">🧬</span>
          <div>
            <h3 className="text-lg font-black font-display text-tan-300">Animal Adaptation Science Playgrounds</h3>
            <p className="text-xs text-sand-100 mt-1 max-w-2xl leading-relaxed">
              Hey young scientist! Welcome to our science games! Can you help our animal friends survive? Play the three fun games below to see how animals eat, stay warm, and hide in their habitats!
            </p>
          </div>
        </div>

        {/* Tab Selection Row */}
        <div className="grid grid-cols-3 gap-2 mt-6 bg-slate-800/80 p-1.5 rounded-2xl border border-white/5">
          <button
            onClick={() => setActiveGame("trophic")}
            className={`py-3 text-[10.5px] sm:text-xs font-black rounded-xl transition-all ${
              activeGame === "trophic"
                ? "bg-tan-500 text-white shadow-sm"
                : "text-sand-100 hover:bg-white/5 hover:text-white"
            }`}
          >
            🍖 Game 1: Jaguar Diner
          </button>
          <button
            onClick={() => setActiveGame("thermal")}
            className={`py-3 text-[10.5px] sm:text-xs font-black rounded-xl transition-all ${
              activeGame === "thermal"
                ? "bg-tan-500 text-white shadow-sm"
                : "text-sand-100 hover:bg-white/5 hover:text-white"
            }`}
          >
            ❄️ Game 2: Warm Huddle
          </button>
          <button
            onClick={() => setActiveGame("camouflage")}
            className={`py-3 text-[10.5px] sm:text-xs font-black rounded-xl transition-all ${
              activeGame === "camouflage"
                ? "bg-tan-500 text-white shadow-sm"
                : "text-sand-100 hover:bg-white/5 hover:text-white"
            }`}
          >
            👓 Game 3: Nature Goggles
          </button>
        </div>
      </div>

      {/* SIMULATOR WINDOW PANEL */}
      <div className="w-full bg-sand-50 rounded-[32px] border-2 border-[#E9E4DB] p-6 shadow-sm min-h-[400px] flex flex-col gap-6">
        
        {/* GAME 1: JAGUAR DIET SORTER */}
        {activeGame === "trophic" && (
          <div className="flex flex-col gap-5 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-sand-200 pb-4">
              <div>
                <h4 className="font-extrabold text-base text-mud-800 font-display">Jaguar Dinner: Feeding the Big Cat!</h4>
                <p className="text-xs text-mud-700 font-semibold mt-1">
                  Help the jaguar eat! Feed him yummy meats, but throw away tough green leaves and dangerous poisonous frogs!
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-sage-100 text-[#5F745E] border border-[#D0DFC0] px-3 py-1.5 rounded-xl font-bold text-xs font-mono">
                  Points Score: {trophicScore}/8
                </span>
                <button
                  onClick={resetTrophicGame}
                  className="p-2 border border-sand-250 bg-white hover:bg-sand-100 rounded-xl transition-all cursor-pointer"
                  title="Reload conveyor"
                >
                  <RefreshCcw className="w-4 h-4 text-mud-800" />
                </button>
              </div>
            </div>

            {!trophicDone ? (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-stretch">
                {/* Active conveyor item visualization */}
                <div className="md:col-span-2 p-6 rounded-3xl bg-white border-2 border-[#E9E4DB] flex flex-col items-center justify-center text-center gap-4 shadow-sm">
                  <span className="text-[10px] uppercase font-black tracking-widest text-[#9c8970]">COMES ALONG INDEED:</span>
                  {trophicQueue.length > 0 ? (
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-7xl filter drop-shadow animate-bounce">{trophicQueue[0].emoji}</span>
                      <h5 className="font-black text-xl text-mud-800 font-display">{trophicQueue[0].name}</h5>
                      <span className="text-[10px] bg-sand-150 px-2.5 py-1.5 rounded-md font-mono text-mud-700">
                        Is this a yummy snack for a big cat?
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-mud-700 font-bold">All sorted!</span>
                  )}
                </div>

                {/* Sorter interface */}
                <div className="md:col-span-3 flex flex-col justify-between gap-4">
                  <div className="bg-white p-5 rounded-3xl border border-sand-200 shadow-xs flex-1 flex flex-col gap-3 justify-center">
                    <span className="text-xs font-black text-mud-800 uppercase flex items-center gap-1.5"><Sun className="w-4 h-4 text-amber-500" /> Ranger Guide:</span>
                    <p className="text-xs font-semibold text-mud-750 font-sans leading-relaxed bg-sand-50/70 p-4 rounded-2xl border border-sand-100 max-h-[140px] overflow-y-auto">
                      {trophicFeedback}
                    </p>
                  </div>

                  {trophicQueue.length > 0 && (
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => handleTrophicSort("ingest")}
                        id="sort-ingest-btn"
                        className="py-4 bg-[#607D53] hover:bg-[#526B47] text-white font-black rounded-2xl shadow-sm hover:shadow active:scale-95 transition-all text-xs border-0 cursor-pointer text-center"
                      >
                        🍔 FEED THE JAGUAR!
                      </button>
                      <button
                        onClick={() => handleTrophicSort("discard")}
                        id="sort-discard-btn"
                        className="py-4 bg-wood-500 hover:bg-wood-600 text-white font-black rounded-2xl shadow-sm hover:shadow active:scale-95 transition-all text-xs border-0 cursor-pointer text-center"
                      >
                        🗑️ DISCARD / SKIP IT!
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-10 flex flex-col items-center gap-4 animate-in zoom-in-95">
                <span className="text-5xl">🏆</span>
                <h4 className="text-xl font-black text-mud-850 font-display">Yummy Snacks Game Complete!</h4>
                <p className="text-xs text-mud-700 font-bold max-w-md">
                  Fantastic! You gave the jaguar high-energy meat foods and avoided poisonous frogs and dry forest leaves. The big cat is very happy and purring, with a score of {trophicScore}/8!
                </p>
                <button
                  onClick={resetTrophicGame}
                  className="mt-3 px-6 py-2.5 bg-tan-500 hover:bg-tan-600 text-white font-black text-xs rounded-xl shadow cursor-pointer border-0"
                >
                  Play Sorter Again!
                </button>
              </div>
            )}
          </div>
        )}

        {/* GAME 2: COZY PENGUIN HUDDLE */}
        {activeGame === "thermal" && (
          <div className="flex flex-col gap-5 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-sand-200 pb-4">
              <div>
                <h4 className="font-extrabold text-base text-mud-800 font-display">Cozy Penguin Huddle: Share the Heat!</h4>
                <p className="text-xs text-mud-700 font-semibold mt-1">
                  Antarctic blizzards are freezing! Help cold outside baby chicks (🥶 blue) swap into the warm center of other penguins (🥵 pink) to become cozy green!
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-sage-100 text-[#5F745E] border border-[#D0DFC0] px-3 py-1.5 rounded-xl font-bold text-xs font-mono">
                  Storm Waves: {thermalCycles}/4 Done
                </span>
                <button
                  onClick={resetThermalGame}
                  className="p-2 border border-sand-250 bg-white hover:bg-sand-100 rounded-xl transition-all cursor-pointer"
                  title="Reset huddle grid"
                >
                  <RefreshCcw className="w-4 h-4 text-mud-800" />
                </button>
              </div>
            </div>

            {thermalResult === "" ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Visual grid representing the penguin cluster */}
                <div className="bg-[#EAF1F3] border-3 border-teal-200/50 p-6 rounded-3xl md:col-span-2 flex flex-col items-center justify-center gap-4 relative">
                  <span className="text-[10px] font-black uppercase tracking-wider text-teal-800 flex items-center gap-1 bg-white/60 px-2.5 py-1.5 rounded-lg border border-teal-200 animate-pulse absolute top-3 left-4">
                    <Wind className="w-3.5 h-3.5 text-teal-600 animate-spin" style={{ animationDuration: "5s" }} /> ❄️ FREEZING BLIZZARD WIND BLOWING
                  </span>

                  <div className="grid grid-cols-3 gap-4 w-full max-w-[320px] aspect-square p-4 bg-teal-100/30 border border-teal-200/60 rounded-full shadow-inner mt-4">
                    {huddle.map((chick, index) => {
                      let tempStyle = "bg-white border-sand-200 text-mud-800 shadow-sm";
                      if (chick.temp === "cold") {
                        tempStyle = "bg-sky-100 text-teal-900 border-sky-450 animate-pulse outline outline-offset-1 outline-sky-400";
                      } else if (chick.temp === "hyperthermic") {
                        tempStyle = "bg-rose-100 text-rose-900 border-rose-400 outline outline-offset-1 outline-rose-450";
                      } else {
                        tempStyle = "bg-[#F0F4E8] text-[#5F745E] border-sage-300";
                      }

                      return (
                        <button
                          key={chick.id}
                          onClick={() => {
                            const firstColdIdx = huddle.findIndex(c => c.temp === "cold");
                            if (firstColdIdx !== -1 && firstColdIdx !== index) {
                              handleChickSwap(firstColdIdx, index);
                            }
                          }}
                          className={`w-full aspect-square rounded-full border-2 flex flex-col items-center justify-center text-xs transition-transform hover:scale-105 select-none relative cursor-pointer ${tempStyle}`}
                        >
                          <span className="text-xl filter drop-shadow">{chick.emoji}</span>
                          <span className="text-[10px] font-bold mt-0.5 tracking-tighter uppercase font-sans">
                            {chick.temp === "cold" ? "🥶 Cold" : chick.temp === "hyperthermic" ? "🥵 Hot" : "✓ Warm"}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <p className="text-[11px] font-semibold text-teal-850 text-center max-w-sm mt-2">
                     💡 <b>How to Play:</b> Click on any shivering <b>🥶 Cold</b> chick, then click a warm penguin in the middle to swap them so they can warm up!
                  </p>
                </div>

                {/* Wind simulation controls */}
                <div className="flex flex-col justify-between p-5 rounded-3xl bg-white border border-sand-200 shadow-xs gap-3">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-black text-mud-800 uppercase flex items-center gap-1"><Landmark className="w-4 h-4 text-tan-500" /> Huddle Microclimate Notes</span>
                    <p className="text-xs text-mud-700 leading-relaxed font-sans">
                      A penguin huddle is like a giant group hug! Outer penguins block the cold air while inner ones get super warm. When the blizzard wind hits, the outside ones get cold again. You must swap them to share the heat and keep everyone safe!
                    </p>
                  </div>

                  {thermalCycles < 4 ? (
                    <button
                      onClick={cycleWindConvection}
                      id="trigger-wind-btn"
                      className="py-4 bg-[#4A646E] hover:bg-[#3C5159] text-white font-black text-xs rounded-2xl border-0 shadow-sm transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Wind className="w-4 h-4 text-sky-200 animate-pulse" /> Blow Snowy Wind ❄️💨
                    </button>
                  ) : null}
                </div>

              </div>
            ) : (
              <div className="text-center py-10 flex flex-col items-center gap-4 animate-in zoom-in-95">
                <span className="text-5xl">🐧❤️</span>
                <h4 className="text-xl font-black text-mud-850 font-display">Huddle Game Over!</h4>
                <p className="text-xs text-mud-700 font-bold max-w-md">
                  {thermalResult}
                </p>
                <button
                  onClick={resetThermalGame}
                  className="mt-3 px-6 py-2.5 bg-tan-500 hover:bg-tan-600 text-white font-black text-xs rounded-xl shadow cursor-pointer border-0"
                >
                  Play Huddle Game Again!
                </button>
              </div>
            )}
          </div>
        )}

        {/* GAME 3: SUPER NATURE GOGGLES */}
        {activeGame === "camouflage" && (
          <div className="flex flex-col gap-5 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-sand-200 pb-4">
              <div>
                <h4 className="font-extrabold text-base text-mud-800 font-display">Super Nature Goggles: Spot Hidden Camouflage!</h4>
                <p className="text-xs text-mud-700 font-semibold mt-1">
                  Adjust your magic goggle filters to shine different kinds of light and spot hidden animals hiding in the forest or desert hills!
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-sage-100 text-[#5F745E] border border-[#D0DFC0] px-3 py-1.5 rounded-xl font-bold text-xs font-mono">
                  Animals Discovered: {discoveredCamouflage.length}/3
                </span>
                <button
                  onClick={() => {
                    setSpectrum(500);
                    setScannedSpecimen(null);
                    setDiscoveredCamouflage([]);
                  }}
                  className="p-2 border border-sand-250 bg-white hover:bg-sand-100 rounded-xl transition-all cursor-pointer"
                  title="Wipe scans"
                >
                  <RefreshCcw className="w-4 h-4 text-mud-800" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {/* Left Column: Camouflage Specimen targets */}
              <div className="flex flex-col gap-3">
                <span className="text-xs font-black text-mud-800 uppercase tracking-wide">WHERE TO LOOK:</span>
                
                <button
                  onClick={() => checkSpecimenScanner(
                    "autumn_fox", 
                    "Red Fox in the Orange Leaves", 
                    [720, 800], 
                    "Tuning to Infrared Thermal Heat-Vision reveals the warm fox glowing bright red right through the cold, orange fall tree leaves!"
                  )}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between shadow-xs ${
                    discoveredCamouflage.includes("autumn_fox")
                      ? "bg-sage-50 border-sage-405 text-sage-900"
                      : "bg-white hover:bg-sand-100 border-sand-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🍁</span>
                    <div>
                      <h5 className="font-bold text-xs text-mud-850">Orange Fall Woods</h5>
                      <p className="text-[10px] text-mud-700 font-mono">Need: Thermal Heat-Vision</p>
                    </div>
                  </div>
                  <span>{discoveredCamouflage.includes("autumn_fox") ? "🦊 Spotted!" : "❓ Hide"}</span>
                </button>

                <button
                  onClick={() => checkSpecimenScanner(
                    "chlorophyte_sloth", 
                    "Mossy Sloth in the Canopy", 
                    [400, 480], 
                    "Tuning to Ultraviolet light makes the green mossy algae on the sloth's fuzzy hair glow dark and outline clearly against bright kapok leaves!"
                  )}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between shadow-xs ${
                    discoveredCamouflage.includes("chlorophyte_sloth")
                      ? "bg-sage-50 border-sage-405 text-sage-900"
                      : "bg-white hover:bg-sand-100 border-sand-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🌿</span>
                    <div>
                      <h5 className="font-bold text-xs text-mud-850">Kapok Jungle Tree</h5>
                      <p className="text-[10px] text-mud-700 font-mono">Need: Ultraviolet Goggles</p>
                    </div>
                  </div>
                  <span>{discoveredCamouflage.includes("chlorophyte_sloth") ? "🦥 Spotted!" : "❓ Hide"}</span>
                </button>

                <button
                  onClick={() => checkSpecimenScanner(
                    "outback_marsupial", 
                    "Red Kangaroo in the Outback", 
                    [530, 580], 
                    "Tuning to Normal Green Camo goggles filters out the red sand background and highlights the kangaroo's brown fur instantly near the dry desert grass!"
                  )}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between shadow-xs ${
                    discoveredCamouflage.includes("outback_marsupial")
                      ? "bg-sage-50 border-sage-405 text-sage-900"
                      : "bg-white hover:bg-sand-100 border-sand-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🏜️</span>
                    <div>
                      <h5 className="font-bold text-xs text-mud-850">Red Sandy Plains</h5>
                      <p className="text-[10px] text-mud-700 font-mono">Need: Green Camo range</p>
                    </div>
                  </div>
                  <span>{discoveredCamouflage.includes("outback_marsupial") ? "🦘 Spotted!" : "❓ Hide"}</span>
                </button>
              </div>

              {/* Center & Right Column: Scanner interface */}
              <div className="md:col-span-2 flex flex-col gap-4">
                
                {/* Wavelength Slider calibration calibration */}
                <div className="bg-white p-6 rounded-3xl border border-sand-200 shadow-sm flex flex-col gap-4">
                  <span className="text-xs font-black text-mud-800 uppercase flex items-center gap-1.5"><Sun className="w-4 h-4 text-tan-500" /> TUNE NATURE GOGGLE FILTER DIAL:</span>
                  
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-[11px] font-mono font-black text-mud-700">
                      <span className="text-purple-600">💜 400nm (Ultraviolet)</span>
                      <span className="text-green-600">💚 550nm (Green Camo)</span>
                      <span className="text-red-650">❤️ 800nm (Thermal Heat)</span>
                    </div>
                    <input
                      type="range"
                      min="400"
                      max="800"
                      step="10"
                      value={spectrum}
                      onChange={(e) => {
                        setSpectrum(Number(e.target.value));
                        setScannedSpecimen(null);
                      }}
                      className="w-full h-3 bg-gradient-to-r from-purple-500 via-green-400 to-red-600 rounded-lg appearance-none cursor-pointer focus:outline-none"
                    />
                    <div className="text-center mt-2">
                      <span className="p-2.5 bg-sand-100 border border-sand-250 rounded-xl font-mono text-xs font-black text-mud-850">
                        Goggle Dial Frequency: {spectrum} nm
                      </span>
                    </div>
                  </div>
                </div>

                {/* Spectral Readout Screen */}
                <div className="bg-slate-900 border-2 border-tan-400/30 p-5 rounded-3xl flex flex-col gap-3 min-h-[160px] relative text-white">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#93c5fd] font-sans">Goggle View Screen:</span>
                  <p className="text-xs font-semibold leading-relaxed font-mono whitespace-pre-line flex-1 text-sand-100">
                    {scannedSpecimen ? scannedSpecimen : "Slide the bar first to pick a lens color, then click on one of the hidden areas on the left to activate your goggles!"}
                  </p>
                  {discoveredCamouflage.length === 3 && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-sage-500 text-white rounded-md text-[9px] font-black uppercase animate-pulse">
                      All Spied ✓ Excellent Spy Scientist!
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
