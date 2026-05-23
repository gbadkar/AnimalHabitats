import React, { useState, useEffect } from "react";
import { Animal, UserProgress, QuizQuestion } from "../types";
import { X, Sparkles, MessageSquare, BookOpen, Send, Award, AlertCircle, RefreshCw, Smile } from "lucide-react";
import confetti from "canvas-confetti";

interface AnimalModalProps {
  animal: Animal;
  progress: UserProgress;
  onClose: () => void;
  onQuizCompleted: (animalId: string) => void;
}

export const AnimalModal: React.FC<AnimalModalProps> = ({
  animal,
  progress,
  onClose,
  onQuizCompleted
}) => {
  const [activeTab, setActiveTab] = useState<"learn" | "quiz" | "chat">("learn");

  // Chat State
  const [chatMessage, setChatMessage] = useState("");
  const [chatLog, setChatLog] = useState<Array<{ sender: "user" | "animal"; text: string }>>([
    {
      sender: "animal",
      text: `*bounces happily* Hello there, explorer! I am ${animal.name}! I love visitors in my ${animal.habitatName}. What would you like to know about me? Ask me anything! 🐾✨`
    }
  ]);
  const [chatLoading, setChatLoading] = useState(false);

  // Quiz State
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const isQuizAlreadyDone = progress.completedQuizzes.includes(animal.id);

  // Select questions (usually 2 defined in local DB)
  const quizQuestions: QuizQuestion[] = animal.questions;

  // Pre-configured fun questions kids can click for quick chat
  const SUGGESTED_CHATS: Record<string, string[]> = {
    "Grizzly Bear": [
      "Do you sleep all winter long?",
      "Can you climb up really tall trees?",
      "How do you catch salmon in the water?"
    ],
    "Bald Eagle": [
      "How high up in the sky can you fly?",
      "What is your giant nest made of?",
      "Can we play hide and seek?"
    ],
    "Jaguar": [
      "Do you like eating fish in the river?",
      "Why do you have rose-shaped spots?",
      "Can you roar like a regular lion?"
    ],
    "Sloth": [
      "Why do you move so incredibly slow?",
      "Why are you upside down all day?",
      "Are you good at swimming, too?"
    ],
    "Lion": [
      "Why do you have such a big fluffy mane?",
      "Do you cuddle with your baby cubs?",
      "Can we play a tag game?"
    ],
    "Hippopotamus": [
      "How long can you hold your breath?",
      "Do you like playing in squishy mud?",
      "What is your absolute favorite food?"
    ],
    "Red Fox": [
      "Why is your tail so bushy and red?",
      "Can you hear a silent mouse under the snow?",
      "Tell me a clever forest joke!"
    ],
    "Eurasian Badger": [
      "How clean is your underground bedroom?",
      "Why do badgers have white stripes?",
      "Do you dig tunnels all night long?"
    ],
    "Giant Panda": [
      "How much bamboo can you eat in a day?",
      "Why do you look like a giant teddy bear?",
      "Do you like doing silly rolls?"
    ],
    "Bengal Tiger": [
      "Why are your tiger stripes so unique?",
      "Do you enjoy taking swimming baths?",
      "Are your soft paws completely silent?"
    ],
    "Kangaroo": [
      "How high can you bounce in a single bound?",
      "Is your baby cozy inside your pouch?",
      "Why do you stand on your strong tail?"
    ],
    "Koala": [
      "What do eucalyptus leaves taste like?",
      "Why do you sleep for 20 hours a day?",
      "Do you have fingerprints just like me?"
    ],
    "Emperor Penguin": [
      "Let's slide on our tummies!",
      "How deep can you dive under the cold ice?",
      "Is a penguin huddle super cozy?"
    ],
    "Blue Whale": [
      "Just how big is your elephant-sized tongue?",
      "What do you sound like when singing songs?",
      "What is a little shrimp krill?"
    ],
    "default": [
      "What is your absolute favorite game?",
      "Tell me a silly forest joke!",
      "What makes your habitat so special?"
    ]
  };

  const currentSuggested = SUGGESTED_CHATS[animal.name] || SUGGESTED_CHATS["default"];

  // Handle Send Chat to API
  const handleSendChat = async (text: string) => {
    if (!text.trim() || chatLoading) return;

    // Append user message
    const updatedLog = [...chatLog, { sender: "user" as const, text }];
    setChatLog(updatedLog);
    setChatMessage("");
    setChatLoading(true);

    try {
      const response = await fetch("/api/chat-animal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          animalName: animal.name,
          habitat: animal.habitatName,
          messageToAnimal: text
        })
      });

      if (!response.ok) {
        throw new Error("Chat network response failed.");
      }

      const data = await response.json();
      setChatLog([...updatedLog, { sender: "animal", text: data.response }]);
    } catch (err) {
      console.error(err);
      setChatLog([
        ...updatedLog,
        {
          sender: "animal",
          text: `*yawn* Ah, sorry little ranger. The cellular coverage in my wilderness has static loops. Let's try chatting again! 🐾🍂`
        }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  // Handle Quiz selection
  const handleAnswerOption = (option: string) => {
    if (quizAnswered) return;
    setSelectedOption(option);
    setQuizAnswered(true);

    const isCorrect = option === quizQuestions[currentQuizIndex].answer;
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
    }
  };

  // Next Question
  const handleNextQuizQuestion = () => {
    setSelectedOption(null);
    setQuizAnswered(false);

    if (currentQuizIndex + 1 < quizQuestions.length) {
      setCurrentQuizIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
      // If user score is perfect (or all correct) -> Unlock Badge!
      const totalCorrect = quizScore + (selectedOption === quizQuestions[currentQuizIndex].answer ? 1 : 0);
      const passed = totalCorrect === quizQuestions.length;

      if (passed && !isQuizAlreadyDone) {
        // Fire confetti!
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ["#FFFF00", "#00FF00", "#FF00FF", "#00FFFF", "#FF5F1E"]
        });
        onQuizCompleted(animal.id);
      }
    }
  };

  // Restart Quiz
  const handleRestartQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    setQuizAnswered(false);
    setQuizScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-mud-800/60 backdrop-blur-sm p-4 flex items-center justify-center animate-in fade-in duration-200 text-mud-800">
      <div
        id={`animal-modal-card-${animal.id}`}
        className="bg-sand-50 rounded-[32px] w-full max-w-2xl border-3 border-tan-400/40 shadow-2xl flex flex-col overflow-hidden max-h-[90vh]"
      >
        {/* Modal Decorative Banner Header */}
        <div className="relative bg-gradient-to-r from-sage-450 to-sage-500 text-white p-5 pr-14 flex items-center gap-4 shadow-md">
          <span className="text-5xl filter drop-shadow animate-bounce">{animal.emoji}</span>
          <div className="flex flex-col">
            <span className="text-[10px] font-black tracking-widest uppercase text-sage-50">Safari Discovery</span>
            <h3 className="text-2xl font-black text-white font-display">{animal.name}</h3>
            <span className="text-[11px] italic font-medium text-sand-100">{animal.species}</span>
          </div>

          <button
            onClick={onClose}
            id="modal-close-btn"
            className="absolute top-4 right-4 p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white cursor-pointer active:scale-90 transition-transform"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bubbly Tab Navigators */}
        <div className="flex border-b border-sand-200 p-2.5 bg-sand-100/80 gap-2 font-bold justify-around">
          <button
            onClick={() => setActiveTab("learn")}
            id="tab-learn-btn"
            className={`flex-1 py-3 px-1 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === "learn"
                ? "bg-wood-500 text-white shadow-sm"
                : "text-mud-700/85 hover:bg-sand-200/50"
            }`}
          >
            <BookOpen className="w-4 h-4" /> Kid Fact Card
          </button>

          <button
            onClick={() => setActiveTab("quiz")}
            id="tab-quiz-btn"
            className={`flex-1 py-3 px-1 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === "quiz"
                ? "bg-tan-500 text-white shadow-sm"
                : "text-mud-700/85 hover:bg-sand-200/50"
            }`}
          >
            <Award className="w-4 h-4" /> {isQuizAlreadyDone ? "Earned Badge! 🏆" : "Take Quiz! ❓"}
          </button>

          <button
            onClick={() => setActiveTab("chat")}
            id="tab-chat-btn"
            className={`flex-1 py-3 px-1 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === "chat"
                ? "bg-sage-500 text-white shadow-sm"
                : "text-mud-700/85 hover:bg-sand-200/50"
            }`}
          >
            <MessageSquare className="w-4 h-4" /> Ask Me Anything!
          </button>
        </div>

        {/* Modal Scrollable Contents */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {/* TAB 1: LEARN DATA SHEET */}
          {activeTab === "learn" && (
            <div className="flex flex-col gap-5 animate-in fade-in duration-200 text-mud-800">
              {/* Habitat Info Block */}
              <div className="bg-sage-50 rounded-3xl p-5 border border-sage-200 flex items-start gap-4">
                <span className="text-3xl">🏡</span>
                <div>
                  <h4 className="font-bold text-sage-600 text-sm">Where I Live:</h4>
                  <p className="text-xs font-semibold text-mud-800 mt-0.5">{animal.habitatName}</p>
                  <p className="text-xs text-mud-700 font-medium mt-1 leading-relaxed">{animal.description}</p>
                </div>
              </div>

              {/* Bento Grid Properties */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-tan-50 rounded-2xl p-5 border border-tan-400/25 flex items-start gap-3 text-wood-700">
                  <span className="text-2xl">🍎</span>
                  <div>
                    <h5 className="font-bold text-wood-500 text-xs uppercase tracking-wide">My Diet:</h5>
                    <p className="text-xs text-mud-800 font-bold mt-1 leading-relaxed">{animal.diet}</p>
                  </div>
                </div>

                <div className="bg-sand-100 rounded-2xl p-5 border border-sand-300 flex items-start gap-3">
                  <span className="text-2xl">⚖️</span>
                  <div>
                    <h5 className="font-bold text-mud-700 text-xs uppercase tracking-wide">My Size:</h5>
                    <p className="text-xs text-mud-800 font-bold mt-1 leading-relaxed">{animal.size}</p>
                  </div>
                </div>
              </div>

              {/* Mega Fun Fact Display */}
              <div className="bg-sage-50/70 rounded-3xl p-5 border-2 border-dashed border-sage-200 relative overflow-hidden">
                <div className="absolute right-2 bottom-0 text-7xl opacity-10 leading-none select-none pointer-events-none">✨</div>
                <h4 className="font-black text-sage-600 text-sm mb-1.5 flex items-center gap-1.5 font-sans">
                  <Sparkles className="w-4 h-4 text-sage-500 animate-pulse" /> Ranger's Favorite Secret:
                </h4>
                <p className="text-xs font-semibold text-mud-700 leading-relaxed">
                  {animal.funFact}
                </p>
              </div>

              {/* Button to jump to Challenge Quiz */}
              {!isQuizAlreadyDone && (
                <button
                  onClick={() => setActiveTab("quiz")}
                  className="w-full py-3.5 bg-tan-500 hover:bg-tan-600 text-white font-black text-sm rounded-3xl shadow-sm border-2 border-tan-400 flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <Award className="w-5 h-5 text-white fill-white/20" />
                  Take my short quiz & collect my shiny badge!
                </button>
              )}
            </div>
          )}

          {/* TAB 2: INTERACTIVE QUIZ */}
          {activeTab === "quiz" && (
            <div className="flex flex-col gap-5 animate-in fade-in duration-200 text-mud-800">
              {isQuizAlreadyDone ? (
                // Already completed state
                <div className="text-center py-8 flex flex-col items-center gap-4">
                  <div className="w-20 h-20 bg-tan-50 rounded-full border-4 border-tan-400 flex items-center justify-center text-4xl animate-bounce">
                    🏆
                  </div>
                  <h4 className="text-xl font-black text-mud-800">Ranger Badge Unlocked!</h4>
                  <p className="text-xs text-mud-700 font-bold max-w-sm mt-1 leading-relaxed">
                    Splendid work! You cleared the {animal.name} habitat trivia and locked down the official badge inside your trophies cabinet!
                  </p>
                  <div className="px-5 py-2.5 bg-tan-100 text-wood-700 rounded-3xl border border-tan-400/25 font-bold text-sm">
                    ✨ Badge unlocked!
                  </div>
                </div>
              ) : quizFinished ? (
                // Quiz evaluation screen
                <div className="text-center py-6 flex flex-col items-center gap-4">
                  {quizScore === quizQuestions.length ? (
                    <>
                      <div className="w-20 h-20 bg-sage-50 rounded-full border-4 border-sage-400 flex items-center justify-center text-5xl animate-bounce">
                        👑
                      </div>
                      <h4 className="text-xl font-black text-sage-600">100% Perfect Score!</h4>
                      <p className="text-xs text-mud-700 font-bold max-w-sm">
                        Legendary! You correctly answered every single question about the {animal.name}! Your shiny badge has been added to the trophy room.
                      </p>
                      <button
                        onClick={onClose}
                        className="py-3 px-6 bg-sage-500 hover:bg-sage-600 text-white font-extrabold text-sm rounded-3xl shadow-md border-b-4 border-sage-600 active:scale-95 cursor-pointer mt-2"
                      >
                        Hooray! Close Card
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-tan-50 rounded-full border-4 border-tan-400 flex items-center justify-center text-3xl">
                        😢
                      </div>
                      <h4 className="text-lg font-black text-mud-800">So Close! ({quizScore}/{quizQuestions.length})</h4>
                      <p className="text-xs text-mud-700 font-bold max-w-sm">
                        You need to get all answers correct to earn the badge! Let's read the explorer cards again and try once more.
                      </p>
                      <button
                        onClick={handleRestartQuiz}
                        className="py-3 px-6 bg-wood-500 hover:bg-wood-600 text-white font-black text-xs rounded-2xl shadow cursor-pointer mt-2 flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-4 h-4" /> Try Again!
                      </button>
                    </>
                  )}
                </div>
              ) : (
                // Active Quiz loop
                <div className="flex flex-col gap-4">
                  {/* Progress Bubble */}
                  <div className="flex items-center justify-between text-xs font-bold text-mud-700">
                    <span className="uppercase tracking-wider">Animal Trivia Challenge</span>
                    <span>Question {currentQuizIndex + 1} of {quizQuestions.length}</span>
                  </div>

                  {/* Question */}
                  <div className="bg-sand-100 p-5 rounded-3xl border border-sand-200">
                    <p className="text-base font-black text-mud-850 leading-normal font-sans">
                      {quizQuestions[currentQuizIndex].question}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="flex flex-col gap-3">
                    {quizQuestions[currentQuizIndex].options.map((option) => {
                      const isSelected = selectedOption === option;
                      const isCorrect = option === quizQuestions[currentQuizIndex].answer;

                      let btnStyle = "bg-white border-sand-200 hover:bg-sand-50 text-mud-800 shadow-sm";
                      if (quizAnswered) {
                        if (isCorrect) {
                          btnStyle = "bg-sage-50 border-sage-400 text-sage-600 shadow";
                        } else if (isSelected) {
                          btnStyle = "bg-wood-100 border-wood-500 text-wood-700";
                        } else {
                          btnStyle = "bg-sand-100 border-sand-200 text-mud-700/50";
                        }
                      }

                      return (
                        <button
                          key={option}
                          onClick={() => handleAnswerOption(option)}
                          className={`w-full p-4 rounded-2xl border-2 text-left text-sm font-bold transition-all relative ${btnStyle} ${
                            !quizAnswered ? "cursor-pointer active:scale-99 hover:-translate-y-0.5" : "cursor-default"
                          }`}
                        >
                          {option}
                          {quizAnswered && isCorrect && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg">✅</span>}
                          {quizAnswered && isSelected && !isCorrect && (
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg">❌</span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Post-answer feedback prompt */}
                  {quizAnswered && (
                    <div className="bg-sage-50 p-5 rounded-3xl border border-sage-200 flex flex-col gap-1.5 animate-in slide-in-from-top mt-2">
                      <span className="text-xs font-black text-sage-600 uppercase tracking-widest flex items-center gap-1">
                        <Smile className="w-4 h-4 text-sage-500" /> Explanation:
                      </span>
                      <p className="text-xs text-mud-700 font-semibold leading-relaxed">
                        {quizQuestions[currentQuizIndex].reason}
                      </p>

                      <button
                        onClick={handleNextQuizQuestion}
                        className="py-2 px-4 bg-tan-500 hover:bg-tan-600 text-white font-black text-xs rounded-xl shadow self-end mt-2 cursor-pointer"
                      >
                        {currentQuizIndex + 1 === quizQuestions.length ? "Finish Quiz!" : "Next Question! ➔"}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ANIMAL CREATURE CHAT (GEMINI API) */}
          {activeTab === "chat" && (
            <div className="flex flex-col h-[400px] animate-in fade-in duration-200 text-mud-800">
              {/* Chat Display Log */}
              <div className="flex-1 bg-sand-150 rounded-3xl border border-sand-300 p-4 overflow-y-auto flex flex-col gap-4 mb-4">
                {chatLog.map((chat, idx) => {
                  const isAnimal = chat.sender === "animal";
                  return (
                    <div
                      key={idx}
                      className={`flex gap-2.5 max-w-[85%] ${isAnimal ? "self-start" : "self-end flex-row-reverse"}`}
                    >
                      {isAnimal && (
                        <span className="text-3xl filter drop-shadow select-none self-end">{animal.emoji}</span>
                      )}
                      <div
                        className={`p-3.5 rounded-2xl text-xs md:text-sm shadow-sm font-bold leading-relaxed ${
                          isAnimal
                            ? "bg-white border text-mud-800 rounded-bl-none border-sand-200"
                            : "bg-sage-500 text-white rounded-br-none"
                        }`}
                      >
                        {chat.text}
                      </div>
                    </div>
                  );
                })}
                {chatLoading && (
                  <div className="flex gap-2.5 max-w-[85%] self-start items-center">
                    <span className="text-3xl animate-bounce">{animal.emoji}</span>
                    <div className="bg-white border border-sand-200 text-mud-700/60 text-xs font-semibold p-3 rounded-2xl rounded-bl-none flex items-center gap-2">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-mud-700 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-mud-700 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-1.5 h-1.5 bg-mud-700 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                      </div>
                      {animal.name} is speaking...
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Prompt Suggester Buttons */}
              <div className="flex flex-wrap gap-2 mb-3">
                {currentSuggested.map((phrase) => (
                  <button
                    key={phrase}
                    disabled={chatLoading}
                    onClick={() => handleSendChat(phrase)}
                    className="px-3 py-1.5 bg-[#F0F4E8] hover:bg-[#E2ECD5] disabled:opacity-50 text-[#5F745E] border border-[#D0DFC0] font-bold rounded-xl text-[11px] cursor-pointer transition-all active:scale-95 flex items-center gap-1"
                  >
                    💬 {phrase}
                  </button>
                ))}
              </div>

              {/* Chat Send Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendChat(chatMessage);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder={`Mumble a question to ${animal.name}...`}
                  maxLength={100}
                  className="flex-1 px-4 py-3 bg-white border border-sand-300 focus:border-wood-500 rounded-2xl font-bold text-xs md:text-sm outline-none text-mud-800"
                />
                <button
                  type="submit"
                  disabled={!chatMessage.trim() || chatLoading}
                  className="p-3 bg-wood-500 disabled:opacity-50 text-white hover:bg-wood-600 rounded-2xl shadow cursor-pointer transition-all active:scale-90"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
