import React, { useState, useEffect } from "react";
import { ArrowLeft, Wind, Sun, ShieldAlert, Sparkles, CheckCircle, RefreshCcw, Landmark, Layers } from "lucide-react";
import confetti from "canvas-confetti";

interface AdaptationLabProps {
  onBack: () => void;
}

export const AdaptationLab: React.FC<AdaptationLabProps> = ({ onBack }) => {
  const [activeGame, setActiveGame] = useState<"trophic" | "thermal" | "camouflage">("trophic");

  // Game 1: Trophic Level Predator Sorter
  const [trophicScore, setTrophicScore] = useState(0);
  const [trophicQueue, setTrophicQueue] = useState<Array<{ id: string; name: string; emoji: string; category: "prey" | "producer" | "toxic"; fact: string }>>([
    { id: "capybara", name: "Capybara", emoji: "🐹", category: "prey", fact: "Primary consumer. Massive, high-moisture vegetation grazer—a staple prey for apex predators." },
    { id: "caiman", name: "Spectacled Caiman", emoji: "🐊", category: "prey", fact: "Secondary consumer. Semi-aquatic predator, but vulnerable to mature feline jaws." },
    { id: "kapok_leaf", name: "Kapok Canopy Leaves", emoji: "🍃", category: "producer", fact: "Primary producer. Rich in cellulose which felines cannot biochemically process." },
    { id: "poison_frog", name: "Poison Dart Frog", emoji: "🐸", category: "toxic", fact: "Toxic Secondary consumer. Accumulates hyper-lethal skin alkaloids from dietary forest beetles." },
    { id: "brazil_nut", name: "Brazil Nut Pod", emoji: "🌰", category: "producer", fact: "Primary producer. Extremely tough vascular pod containing seeds with complex lipids." },
    { id: "fresh_trout", name: "River Bass/Trout", emoji: "🐟", category: "prey", fact: "Secondary consumer. High-protein water resource targeted frequently by jaguars." },
    { id: "tapir", name: "Baird's Tapir", emoji: "🐗", category: "prey", fact: "Primary consumer. Muscular forest-floor herbivore. High metabolic tissue volume." },
    { id: "orchid_flower", name: "Fringe Orchid", emoji: "🌸", category: "producer", fact: "Primary producer. Epiphytic flower collecting solar sugars for nectar-dependent insects." }
  ]);
  const [trophicFeedback, setTrophicFeedback] = useState<string | null>("Sort the dietary organic inputs on the right for our tertiary predator, the Jaguar!");
  const [trophicDone, setTrophicDone] = useState(false);

  const handleTrophicSort = (userDecision: "ingest" | "discard") => {
    if (trophicQueue.length === 0) return;
    const currentItem = trophicQueue[0];

    let isCorrect = false;
    let feedback = "";

    if (userDecision === "ingest") {
      if (currentItem.category === "prey") {
        isCorrect = true;
        feedback = `✓ Correct! ${currentItem.emoji} ${currentItem.name} is a high-protein animal. ${currentItem.fact}`;
      } else if (currentItem.category === "toxic") {
        feedback = `❌ Critical Failure! Ingesting the toxic ${currentItem.emoji} ${currentItem.name} triggers lethal bioaccumulation of alkaloids!`;
      } else {
        feedback = `❌ Incorrect. The Jaguar is an obligate carnivore. It cannot digest cellulose-based primary producers like ${currentItem.emoji} ${currentItem.name}.`;
      }
    } else {
      // User chose to discard/filter out
      if (currentItem.category === "producer" || currentItem.category === "toxic") {
        isCorrect = true;
        feedback = `✓ Wise decision! Discarded the ${currentItem.emoji} ${currentItem.name}. ${currentItem.fact}`;
      } else {
        feedback = `❌ Sub-optimal choice. Discarding the rich prey ${currentItem.emoji} ${currentItem.name} leaves the predator's caloric baseline unfulfilled.`;
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
      { id: "capybara", name: "Capybara", emoji: "🐹", category: "prey", fact: "Primary consumer. Large vegetarian rodent representing a critical source of high-density lipids." },
      { id: "caiman", name: "Spectacled Caiman", emoji: "🐊", category: "prey", fact: "Secondary consumer. Aquatically locked predator, but preyed upon by ambush felines." },
      { id: "kapok_leaf", name: "Kapok Leaves", emoji: "🍃", category: "producer", fact: "Primary producer. Composed of structural cellulose that carnivore guts cannot break down." },
      { id: "poison_frog", name: "Poison Dart Frog", emoji: "🐸", category: "toxic", fact: "Toxic organism. Its vibrant aposematism warns of deadly neuromuscular alkaloids." },
      { id: "brazil_nut", name: "Brazil Nut Pod", emoji: "🌰", category: "producer", fact: "Primary producer. Highly fibrous seed pod requiring dynamic mechanical force to crack." },
      { id: "fresh_trout", name: "River Bass", emoji: "🐟", category: "prey", fact: "Secondary consumer. Abundant aquatic food resource rich in Omega-3 fatty acids." },
      { id: "tapir", name: "Baird's Tapir", emoji: "🐗", category: "prey", fact: "Primary consumer. Heavy-bodied jungle ungulate providing massive protein returns." },
      { id: "orchid_flower", name: "Orchid Nectar", emoji: "🌸", category: "producer", fact: "Primary producer. Simple aqueous sugar which is structurally useless to apex felines." }
    ]);
    setTrophicFeedback("Ecologist Lab operational. Sort inputs on the conveyor belt!");
    setTrophicDone(false);
  };


  // Game 2: Thermal Convection Huddle (Penguin Huddle Solver)
  const [huddle, setHuddle] = useState<Array<{ id: number; name: string; emoji: string; temp: "cold" | "optimal" | "hyperthermic" }>>([
    { id: 1, name: "Outer Chick A", emoji: "👶", temp: "cold" },
    { id: 2, name: "Outer Chick B", emoji: "👶", temp: "cold" },
    { id: 3, name: "Outer Chick C", emoji: "👶", temp: "cold" },
    { id: 4, name: "Core Chick D", emoji: "🐧", temp: "hyperthermic" },
    { id: 5, name: "Core Chick E", emoji: "🐧", temp: "hyperthermic" },
    { id: 6, name: "Core Chick F", emoji: "🐧", temp: "optimal" },
    { id: 7, name: "Middle Chick G", emoji: "👶", temp: "optimal" },
    { id: 8, name: "Middle Chick H", emoji: "👶", temp: "optimal" },
    { id: 9, name: "Outer Chick I", emoji: "👶", temp: "cold" }
  ]);
  const [thermalCycles, setThermalCycles] = useState(0);
  const [thermalResult, setThermalResult] = useState("");

  const cycleWindConvection = () => {
    // Simmons wind drafts
    setHuddle((prev) => {
      const copy = [...prev];
      // Core chicks are indexes 3, 4, 5
      // Outer chicks are indexes 0, 1, 2, 8
      // Middle are 6, 7
      // Convection cycle: Outers become colder, Cores become hotter
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
        // Calculate success
        const coldCount = huddle.filter(c => c.temp === "cold").length;
        const hyperCount = huddle.filter(c => c.temp === "hyperthermic").length;
        if (coldCount === 0 && hyperCount <= 2) {
          setThermalResult("✓ High success! You kept all chicks insulated above freezing and rotated core body temperatures perfectly! 🐧❄️");
          confetti({ particleCount: 70, spread: 80 });
        } else {
          setThermalResult("❌ Suboptimal rotation. Some outer chicks suffered thermal frost shock, or core chicks over-heated. Rotate faster!");
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

      // Swap adjustments: moving to core warms up, moving to outer cools down
      // Index indices 3, 4, 5 are the core
      // Let's adjust temperatures dynamically based on destination
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
      { id: 1, name: "Outer Chick A", emoji: "👶", temp: "cold" },
      { id: 2, name: "Outer Chick B", emoji: "👶", temp: "cold" },
      { id: 3, name: "Outer Chick C", emoji: "👶", temp: "cold" },
      { id: 4, name: "Core Chick D", emoji: "🐧", temp: "hyperthermic" },
      { id: 5, name: "Core Chick E", emoji: "🐧", temp: "hyperthermic" },
      { id: 6, name: "Core Chick F", emoji: "🐧", temp: "optimal" },
      { id: 7, name: "Middle Chick G", emoji: "👶", temp: "optimal" },
      { id: 8, name: "Middle Chick H", emoji: "👶", temp: "optimal" },
      { id: 9, name: "Outer Chick I", emoji: "👶", temp: "cold" }
    ]);
    setThermalCycles(0);
    setThermalResult("");
  };


  // Game 3: Wavelength Camouflage Scanner
  const [spectrum, setSpectrum] = useState(500); // 400nm (UV) to 800nm (Infrared)
  const [scannedSpecimen, setScannedSpecimen] = useState<string | null>(null);
  const [discoveredCamouflage, setDiscoveredCamouflage] = useState<string[]>([]);

  const checkSpecimenScanner = (id: string, name: string, requiredNM: [number, number], info: string) => {
    if (spectrum >= requiredNM[0] && spectrum <= requiredNM[1]) {
      if (!discoveredCamouflage.includes(id)) {
        const next = [...discoveredCamouflage, id];
        setDiscoveredCamouflage(next);
        setScannedSpecimen(`🧬 High Accuracy Match!\n\nSpecimen: ${name}\nWavelength Filter: ${spectrum}nm\n\nAdaptation Mechanism: ${info}`);
        if (next.length === 3) {
          confetti({ particleCount: 60, spread: 70 });
        }
      } else {
        setScannedSpecimen(`Specimen ${name} is already registered in our laboratory log.`);
      }
    } else {
      setScannedSpecimen("❌ Signal Static. Refractory wave patterns did not reveal any active cellular camouflage at this frequency. Calibrate the wavelength slider!");
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
            🧪 Adaptation Research Lab & Simulation
          </h2>
        </div>
        <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 bg-[#F0F4E8] text-[#5F745E] border-2 border-[#D0DFC0] text-[10px] font-black uppercase rounded-full tracking-widest leading-none">
          Scientific Workbench v1.2
        </span>
      </div>

      {/* Lab Welcome Board */}
      <div className="bg-slate-900 text-white p-5 rounded-3xl border-3 border-tan-400/30 shadow-md">
        <div className="flex flex-col md:flex-row items-center gap-5">
          <span className="text-5xl animate-pulse">🧬</span>
          <div>
            <h3 className="text-lg font-black font-display text-tan-300">Biotic Stress Analysis & Adaptation Solvers</h3>
            <p className="text-xs text-sand-100 mt-1 max-w-2xl leading-relaxed">
              Fifth and sixth-grade researchers, welcome to the testbed. Complete three physical and biological simulations to prove how mechanical energy, thermal conduction, and spectrum wavelengths determine survival or death in extreme habitats.
            </p>
          </div>
        </div>

        {/* Tab Selection Row */}
        <div className="grid grid-cols-3 gap-2 mt-6 bg-slate-800/80 p-1.5 rounded-2xl border border-white/5">
          <button
            onClick={() => setActiveGame("trophic")}
            className={`py-3 text-xs font-black rounded-xl transition-all ${
              activeGame === "trophic"
                ? "bg-tan-500 text-white shadow-sm"
                : "text-sand-100 hover:bg-white/5 hover:text-white"
            }`}
          >
            🌽 S1: Trophic Sorter
          </button>
          <button
            onClick={() => setActiveGame("thermal")}
            className={`py-3 text-xs font-black rounded-xl transition-all ${
              activeGame === "thermal"
                ? "bg-tan-500 text-white shadow-sm"
                : "text-sand-100 hover:bg-white/5 hover:text-white"
            }`}
          >
            ❄️ S2: Convection Huddle
          </button>
          <button
            onClick={() => setActiveGame("camouflage")}
            className={`py-3 text-xs font-black rounded-xl transition-all ${
              activeGame === "camouflage"
                ? "bg-tan-500 text-white shadow-sm"
                : "text-sand-100 hover:bg-white/5 hover:text-white"
            }`}
          >
            🌌 S3: Photic Camouflage
          </button>
        </div>
      </div>

      {/* SIMULATOR WINDOW PANEL */}
      <div className="w-full bg-sand-50 rounded-[32px] border-2 border-[#E9E4DB] p-6 shadow-sm min-h-[400px] flex flex-col gap-6">
        
        {/* GAME 1: TROPHIC LEVEL Predator Diet BUFFER */}
        {activeGame === "trophic" && (
          <div className="flex flex-col gap-5 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-sand-200 pb-4">
              <div>
                <h4 className="font-extrabold text-base text-mud-800 font-display">Trophic Level: Tertiary Consumer Ecosystem Buffer</h4>
                <p className="text-xs text-mud-700 font-semibold mt-1">
                  Identify and classify digestible, high-nitrogen protein arrays for Panthera onca (Jaguar). Filter out carbon cell-wall producers and dangerous toxic secondary organisms.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-sage-100 text-[#5F745E] border border-[#D0DFC0] px-3 py-1.5 rounded-xl font-bold text-xs font-mono">
                  Energy Recovered: {trophicScore}/8
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
                  <span className="text-[10px] uppercase font-black tracking-widest text-wood-500">CONVEYOR ENTRY:</span>
                  {trophicQueue.length > 0 ? (
                    <div className="flex flex-col items-center gap-2 animate-pulse">
                      <span className="text-7xl filter drop-shadow">{trophicQueue[0].emoji}</span>
                      <h5 className="font-black text-xl text-mud-800 font-display">{trophicQueue[0].name}</h5>
                      <span className="text-[10px] bg-sand-150 px-2.5 py-1.5 rounded-md font-mono text-mud-700">
                        Unknown chemical biomass signature
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-mud-700 font-bold">Queue completely sorted!</span>
                  )}
                </div>

                {/* Sorter interface */}
                <div className="md:col-span-3 flex flex-col justify-between gap-4">
                  <div className="bg-white p-5 rounded-3xl border border-sand-200 shadow-xs flex-1 flex flex-col gap-3 justify-center">
                    <span className="text-xs font-black text-mud-800 uppercase flex items-center gap-1.5"><Sun className="w-4 h-4 text-amber-500" /> Lab Analyst Instruction:</span>
                    <p className="text-xs font-semibold text-mud-750 font-mono leading-relaxed bg-sand-50/70 p-4 rounded-2xl border border-sand-100 max-h-[140px] overflow-y-auto">
                      {trophicFeedback}
                    </p>
                  </div>

                  {trophicQueue.length > 0 && (
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => handleTrophicSort("ingest")}
                        id="sort-ingest-btn"
                        className="py-4 bg-[#607D53] hover:bg-[#526B47] text-white font-black rounded-2xl shadow-sm hover:shadow active:scale-95 transition-all text-xs border-0 cursor-pointer"
                      >
                        🧬 Ingest (Valid Protein Prey)
                      </button>
                      <button
                        onClick={() => handleTrophicSort("discard")}
                        id="sort-discard-btn"
                        className="py-4 bg-wood-500 hover:bg-wood-600 text-white font-black rounded-2xl shadow-sm hover:shadow active:scale-95 transition-all text-xs border-0 cursor-pointer"
                      >
                        🗑️ Discard (Non-Diet/Hazardous)
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-10 flex flex-col items-center gap-4 animate-in zoom-in-95">
                <span className="text-5xl">🏆</span>
                <h4 className="text-xl font-black text-mud-850 font-display">Trophic Level Processing Complete!</h4>
                <p className="text-xs text-mud-700 font-bold max-w-md">
                  Excellent simulation data, Ecologist. You filtered out energy-draining cellulose producers and avoided the fatal toxins of poison dart frogs, securing a 100% stable predator diet efficiency of {trophicScore}/8 points.
                </p>
                <button
                  onClick={resetTrophicGame}
                  className="mt-3 px-6 py-2.5 bg-tan-500 hover:bg-tan-600 text-white font-black text-xs rounded-xl shadow cursor-pointer border-0"
                >
                  Rerun Trophic Simulation
                </button>
              </div>
            )}
          </div>
        )}

        {/* GAME 2: THERMAL CONVECTION HUDDLE */}
        {activeGame === "thermal" && (
          <div className="flex flex-col gap-5 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-sand-200 pb-4">
              <div>
                <h4 className="font-extrabold text-base text-mud-800 font-display">Thermal Convection & Sub-Zero Wind Conductance Solver</h4>
                <p className="text-xs text-mud-700 font-semibold mt-1">
                  Rotate nesting chicks between outer frost zones (-60°C convective drafts) and inner hyperthermic clusters (+35°C core heat) to maintain homeostasis.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-sage-100 text-[#5F745E] border border-[#D0DFC0] px-3 py-1.5 rounded-xl font-bold text-xs font-mono">
                  Cycle: {thermalCycles}/4 Completed
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
                    <Wind className="w-3.5 h-3.5 text-teal-600 animate-spin" style={{ animationDuration: "5s" }} /> CONVECTIVE WINDS PREVAILING
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
                            // Simple toggle selector swap: select outer first, then clicks inner to swap
                            // Let's swap the first Cold found with this index
                            const firstColdIdx = huddle.findIndex(c => c.temp === "cold");
                            if (firstColdIdx !== -1 && firstColdIdx !== index) {
                              handleChickSwap(firstColdIdx, index);
                            }
                          }}
                          className={`w-full aspect-square rounded-full border-2 flex flex-col items-center justify-center text-xs transition-transform hover:scale-105 select-none relative cursor-pointer ${tempStyle}`}
                        >
                          <span className="text-xl filter drop-shadow">{chick.emoji}</span>
                          <span className="text-[9px] font-bold mt-0.5 tracking-tighter uppercase font-mono">
                            {chick.temp === "cold" ? "🥶 Cold" : chick.temp === "hyperthermic" ? "🥵 Hot" : "✓ Gold"}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <p className="text-[11px] font-bold text-teal-800 text-center max-w-sm mt-2">
                     💡 <b>Ecologist Tweak:</b> Click any <b>🥶 Cold</b> chick, then click an inner chick to swap physical positions instantly and balance core thermoregulation!
                  </p>
                </div>

                {/* Wind simulation controls */}
                <div className="flex flex-col justify-between p-5 rounded-3xl bg-white border border-sand-200 shadow-xs gap-3">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-black text-mud-800 uppercase flex items-center gap-1"><Landmark className="w-4 h-4 text-tan-500" /> Biotic Microclimate Log</span>
                    <p className="text-xs text-mud-700 leading-relaxed font-mono">
                      Antarctic winds strip heat via forced convection. Outer chicks guard the perimeter, experiencing heavy surface cooling. When wind strikes, perimeter chicks lose 1 core thermal wave. You must dynamically swap them to distribute metabolic energy.
                    </p>
                  </div>

                  {thermalCycles < 4 ? (
                    <button
                      onClick={cycleWindConvection}
                      id="trigger-wind-btn"
                      className="py-4 bg-[#4A646E] hover:bg-[#3C5159] text-white font-black text-xs rounded-2xl border-0 shadow-sm transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Wind className="w-4 h-4 text-sky-200" /> Trigger Cold Blizzard Winds ❄️
                    </button>
                  ) : null}
                </div>

              </div>
            ) : (
              <div className="text-center py-10 flex flex-col items-center gap-4 animate-in zoom-in-95">
                <span className="text-5xl">🐧🌋</span>
                <h4 className="text-xl font-black text-mud-850 font-display">Thermal Simulation Completed</h4>
                <p className="text-xs text-mud-700 font-bold max-w-md">
                  {thermalResult}
                </p>
                <button
                  onClick={resetThermalGame}
                  className="mt-3 px-6 py-2.5 bg-tan-500 hover:bg-tan-600 text-white font-black text-xs rounded-xl shadow cursor-pointer border-0"
                >
                  Restart Thermal Simulation
                </button>
              </div>
            )}
          </div>
        )}

        {/* GAME 3: SPECTRAL CAMOUFLAGE MATCHING */}
        {activeGame === "camouflage" && (
          <div className="flex flex-col gap-5 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-sand-200 pb-4">
              <div>
                <h4 className="font-extrabold text-base text-mud-800 font-display">Adaptive Camouflage & Wavelength Spectrum Calibration</h4>
                <p className="text-xs text-mud-700 font-semibold mt-1">
                  Adjust visual spectrum radiation to compromise the physical camouflage of animals concealed in their respective terrains.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-sage-100 text-[#5F745E] border border-[#D0DFC0] px-3 py-1.5 rounded-xl font-bold text-xs font-mono">
                  Cataloged: {discoveredCamouflage.length}/3 Specimen
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
                <span className="text-xs font-black text-mud-800 uppercase tracking-wide">ENVIRONMENT TARGET BLOCKS:</span>
                
                <button
                  onClick={() => checkSpecimenScanner(
                    "autumn_fox", 
                    "Red Fox (Deciduous Woods)", 
                    [720, 800], 
                    "Infrared Spectrum (750nm). In visible light, their orange coat blends perfectly into dry, oxidized copper canopy leaves. However, our thermal infrared sensor slices through chemical pigments, isolating their blood capillary heat signals directly against cool earth."
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
                      <h5 className="font-bold text-xs text-mud-850">European Foliage Layer</h5>
                      <p className="text-[10px] text-mud-700 font-mono">Requires thermal band</p>
                    </div>
                  </div>
                  <span>{discoveredCamouflage.includes("autumn_fox") ? "🦊 Found!" : "❓"}</span>
                </button>

                <button
                  onClick={() => checkSpecimenScanner(
                    "chlorophyte_sloth", 
                    "Symbiotic Sloth Canopy (Rainforest)", 
                    [400, 480], 
                    "Ultraviolet Spectrum (420nm). Chlorophyta green algae growing inside specialized hair ridges absorbs ultraviolet radiation heavily. Under UV sensors, the algae glows fluorescent-dark, instantly revealing the sloth against highly reflective kapok leaves."
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
                      <h5 className="font-bold text-xs text-mud-850">Amazon Tree Canopy</h5>
                      <p className="text-[10px] text-mud-700 font-mono">Requires ultraviolet filter</p>
                    </div>
                  </div>
                  <span>{discoveredCamouflage.includes("chlorophyte_sloth") ? "🦥 Found!" : "❓"}</span>
                </button>

                <button
                  onClick={() => checkSpecimenScanner(
                    "outback_marsupial", 
                    "Red Kangaroo (Arid Outbacks)", 
                    [530, 580], 
                    "Green Visible Band (550nm). The kangaroo's reddish fur relies on copper soil sand reflections. Scanning using green spectrum filters isolates non-green biological skin matrices, contrasting their fur perfectly from chlorophyll-deficient desert shrub grasses."
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
                      <h5 className="font-bold text-xs text-mud-850">Arid Outback Ridge</h5>
                      <p className="text-[10px] text-mud-700 font-mono">Requires visible cyan green range</p>
                    </div>
                  </div>
                  <span>{discoveredCamouflage.includes("outback_marsupial") ? "🦘 Found!" : "❓"}</span>
                </button>
              </div>

              {/* Center & Right Column: Scanner interface */}
              <div className="md:col-span-2 flex flex-col gap-4">
                
                {/* Wavelength Slider calibration calibration */}
                <div className="bg-white p-6 rounded-3xl border border-sand-200 shadow-sm flex flex-col gap-4">
                  <span className="text-xs font-black text-mud-800 uppercase flex items-center gap-1.5"><Sun className="w-4 h-4 text-tan-500" /> SPECTRUPULSER WAVELENGTH:</span>
                  
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-[11px] font-mono font-black text-mud-700">
                      <span className="text-purple-600">💜 400nm (UV Light)</span>
                      <span className="text-green-600">💚 550nm (Visible Green)</span>
                      <span className="text-red-650">❤️ 800nm (Infrared Thermal)</span>
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
                        Current Spectrum Calibration: {spectrum} nm
                      </span>
                    </div>
                  </div>
                </div>

                {/* Spectral Readout Screen */}
                <div className="bg-slate-900 border-2 border-tan-400/30 p-5 rounded-3xl flex flex-col gap-3 min-h-[160px] relative text-white">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#93c5fd] font-sans">Laboratory Spectral Readout:</span>
                  <p className="text-xs font-semibold leading-relaxed font-mono whitespace-pre-line flex-1 text-sand-100">
                    {scannedSpecimen ? scannedSpecimen : "Adjust the slider first, and click any environmental target block above to run a molecular scale wavelength scan!"}
                  </p>
                  {discoveredCamouflage.length === 3 && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-sage-500 text-white rounded-md text-[9px] font-black uppercase animate-pulse">
                      Simulation complete ✓
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
