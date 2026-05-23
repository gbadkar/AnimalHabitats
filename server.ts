import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK lazily to prevent crashing if the key is missing or invalid on startup
let ai: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!ai) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY") {
      ai = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return ai;
}

// Animal Fallback Dialogues when API Key is offline or fails
const ANIMAL_FALLBACKS: Record<string, string[]> = {
  "Grizzly Bear": [
    "ROAR! *rubs big fluffy belly* Hello junior explorer! I am Grizzly Bear, and I live in the dense pine forests. I love catching wild salmon swimming upstream and eating sweet huckleberries! What's your favorite forest snack? 🐻🌲",
    "Yawn... *stretches huge paws* I spent the whole winter sleeping in my cozy den. Now I'm super hungry! Did you know my sense of smell is even better than a dog's? I can smell lunch from miles away! 🐻👃",
    "Scratch, scratch, scratch! *scratches back on a tall pine tree* Oh, that feels so good! Living in the woods is wonderful because there are so many trees to climb and streams to splash in! 🌲💦"
  ],
  "Bald Eagle": [
    "Screeeech! *spreads majestic wings* Hello down there! I am the Bald Eagle. I soar high above lakes and rivers in North America, searching for yummy fish with my super-duper mega sharp eyesight! 🦅🐟",
    "Whoosh! *glides on a warm wind current* Did you know my nest is called an 'eyrie'? It is so big, it can weigh as much as a small car! I build them high up on cliffs and tall tree tops to keep my baby eaglets safe. 🦅🌲",
    "Flap flap! My feathers are like a perfect, warm dynamic jacket. I can fly up to 100 miles an hour when I dive! That's faster than a highway car! Zoom! 🦅⚡"
  ],
  "Jaguar": [
    "Grrr-meow! *spots you through the jungle leaves* G'day explorer! I'm the Jaguar, the king of the South American rainforest! I love swimming in tropical rivers—unlike regular house cats, water is my absolute favorite playground! 🐆💦",
    "Prowl, prowl... *steps silently on soft moss* Did you know my beautiful spots are called 'rosettes' because they look like little roses with dark dots in the middle? They are the perfect camouflage in the rainforest shadows. 🐆🌿",
    "Yaaaaawn... *shows big white teeth* I love climbing tall trees in the Amazon canopy to take nice, long afternoon catnaps. Are you ready to hunt for more rainforest badges? 🐆🌳"
  ],
  "Sloth": [
    "H... e... l... l... o... explorer... *blinks slowly* I... am... the... Sloth. I love hanging upside down from branches in South America. I move so slow, tiny green moss actually grows on my fur, which helps me hide! 🦥🌿",
    "Chew... chew... *takes 5 minutes to munch on a single leaf* Yum! Did you know that it takes my tummy up to a whole week to digest just one leafy meal? Being slow takes high-energy turtle-patience! 🦥🍃",
    "Yawn... did you know we sloshy sloths sleep for almost 15 hours every single day? Hanging upside down is super cozy because my claws lock onto the branch like a safety buckle! Sweet dreams! 🦥💤"
  ],
  "Lion": [
    "ROOAAAR! *shakes magnificent golden mane* Greetings, young scout! I am the Lion, king of the sunny African Savanna! I live with my big family called a 'pride'. We love resting together in the golden grasses. 🦁☀️",
    "Yawn... *stretches like a giant kitty* We lions sleep or rest for up to 20 hours a day to save our energy for the cool night. My roar is so loud, other animals can hear it five miles away! Roariiing power! 🦁🌾",
    "Pounce! *swishes tail* Did you know that lionesses (the mom lions) do almost all of the hunting for the pride? They work as an amazing team! Go team lions! 🦁💪"
  ],
  "Hippopotamus": [
    "Splash! *blows bubbly water bubbles* Hello! I'm the Hippo. I spend almost my whole day floating in African rivers to keep my sensitive skin cool and safe from the hot blazing sun. Want to join my pool party? 🦛💦",
    "Chomp! *opens mouth ultra-wide* Check out my gigantic teeth! Even though I look super tough, I mostly eat yummy, sweet grass at night. I can munch up to 80 pounds of grass in one feast! 🦛🌾",
    "Snort! Did you know that I can hold my breath underwater for 5 whole minutes? I can even sleep underwater because my nose and ears close up automatically like tiny scuba valves! 🦛🤿"
  ],
  "Lion Lioness": [
    "Hello explorer! I am the Lioness, the brave hunter and protector of our pride. We work as a great team! 🦁"
  ],
  "Red Fox": [
    "Yip yip! *swishes fluffy white-tipped tail* Hello explorer! I am the Red Fox. I roam the beautiful meadows and forests of Europe. Did you know my ears are so powerful, I can hear a tiny mouse squeak under the deep winter snow? 🦊❄️",
    "Pounce! *jumps high in the air and lands nose-first* That's my special hunting jump! My warm bushy tail is called a 'brush'. It keeps my nose warm when I curl up to sleep on chilly European nights. 🦊🍂",
    "Hello! People think we foxes are clever, and we definitely are! We use our whiskers not just on our faces, but on our legs too, to feel our way around dark forests! 🦊✨"
  ],
  "Eurasian Badger": [
    "Snuffle snuffle! *pokes striped face out of the soil* Hello! I am the Eurasian Badger. I am an expert digger! I build massive underground apartments called 'setts' where my family sleeps cozy and safe. 🦡🕳️",
    "Crunch! *eats a juicy earthworm* Did you know badger setts are passed down for generations? Some setts are over a hundred years old! We love keeping our underground rooms super clean with fresh dry grass. 🦡🍂",
    "Hello! I might have short legs, but they are incredibly strong. Together with my long claws, they act like biological bulldozers to dig through European clay! 🦡⛰️"
  ],
  "Giant Panda": [
    "Munch, munch, crunch! *chews happily on a green bamboo shoot* Ni Hao, explorer! I am the Giant Panda. I live in the misty, cool mountains of Asia. I can eat bamboo for 12 hours a day! It is so crunchy and delicious! 🐼🎋",
    "Tumble, roll! *does a playful somersault* I am incredibly good at climbing trees! I have a special extra 'pseudo-thumb' bone on my wrist that helps me grip slippery bamboo stems tight. Want a high-five? 🐼🐾",
    "Snore... *cuddles with a bamboo stalk* We pandas love to nap after eating. My thick, fluffy black and white coat is like a built-in outdoor blanket that keeps me cool in summer and cozy in winter snow! 🐼❄️"
  ],
  "Bengal Tiger": [
    "ROOARR! *steps gracefully out of the tall grass* Hello adventurous kid! I am the Bengal Tiger. Did you know that my beautiful tiger stripes are like human fingerprints? No two tigers in the world have the identical pattern! 🐯🌿",
    "Splash! *swims across a jungle river* Guess what? I am an amazing swimmer! Unlike domestic cats, I love playing in water pools during hot afternoons to stay sharp and refreshed. Let's make a big splash! 🐯💦",
    "Prowl... *sinks silently into the jungle floor* I have magical soft pads on my paws that let me sneak up on things without making a single sound. Quiet as a whisper... shh! 🐯🤫"
  ],
  "Kangaroo": [
    "Boing, boing, boing! *zooms past you with a cheerful australian jump* G'day mate! I'm Kangaroo. I can bounce up to 30 feet in a single bound! It is the most energy-saving way to travel across the dry Australian outback! 🦘☀️",
    "Peek-a-boo! *a little head pops out of the belly* Meet my baby joey! Joeys live in my warm, cozy pouch for about six months until they are ready to hop around on their own. Say hello to my little helper! 🦘👶",
    "Box box! *stands tall on tail* I have a super-strong, heavy tail that acts like a third leg! It helps me balance when I hop or when I stand to wave hello to cool explorers like you! 🦘🌾"
  ],
  "Koala": [
    "Yawn... *hugs a eucalyptus branch tight* Hello buddy... I am the Koala. I live high up in the Australian eucalyptus forests. I spend almost all my time sleeping because eating eucalyptus leaves takes a lot of energy to digest! 🐨🍃",
    "Sniff sniff! *points big leathery black nose* Did you know we are super picky eaters? We use our special noses to sniff out only the juiciest, best-tasting eucalyptus leaves. Plus, we rarely drink water because leaves are full of juice! 🐨💧",
    "Cuddle cuddle! My thick woolly fur protects me from both rain and hot sun, acting like an all-weather umbrella. I have unique fingerprints just like you! We are thumb buddies! 🐨🖐️"
  ],
  "Emperor Penguin": [
    "Waddle waddle, slide! *slides tummy-first across the shiny ice* Hello! I am the Emperor Penguin. I live in the freezing, windy ice of Antarctica. We slide on our tummies to slip-and-slide super fast across the ice sheets! Wheee! 🐧❄️",
    "Huddle up! *snuggles closely with hundreds of other penguins* Brrr! To stay warm on freezing nights, we make a giant penguin huddle. We take turns standing on the outside and then moving to the cozy warm middle! Teamwork keeps us cozy! 🐧❤️",
    "Splashee! *dives into the deep blue freezing ocean* My feathers are like a super sleek waterproof wetsuit! I can dive deeper than any other bird to catch delicious krill and squid. Swim along! 🐧🌊"
  ],
  "Blue Whale": [
    "WHHHOOOOOSH! *blows a huge water spout high into the cold air* Hello young oceanologist! I'm the Blue Whale. I am the biggest animal to have EVER lived on Earth! I am even bigger than the largest dinosaur ever was! 🐋🌊",
    "Singing a gentle tune... *makes a low humming sound* My whale sounds are so loud and deep, they can travel hundreds of miles through the ocean to talk to my whale friends. I drink thousands of tiny shrimp creatures called krill in one gulp! 🐋🦐",
    "Flick! *waves giant tail flukes* Did you know my heart is as big as a small car, and my tongue weighs as much as an entire adult elephant? But don't worry, I am a very gentle giant! 🐋❤️"
  ]
};

// Quiz Fallback Questions when AI is offline or fails
const TRIVIA_FALLBACK: Record<string, Array<{ question: string; options: string[]; answer: string; reason: string }>> = {
  "General": [
    {
      question: "Which habitat is very hot, dry, and gets less rain in a year than you can fit in a tiny bucket?",
      options: ["Rainforest", "Desert", "Polar Ice"],
      answer: "Desert",
      reason: "Deserts are super dry and warm! Animals like camels have special humps to store fat so they can go days without drinking water!"
    },
    {
      question: "What is the biggest animal currently living on our beautiful planet Earth?",
      options: ["T-Rex Dinosaur", "African Elephant", "Blue Whale"],
      answer: "Blue Whale",
      reason: "The Blue Whale is a gentle giant of the ocean and is bigger than any dinosaur that ever walked the Earth! It is as long as three school buses parked in a line!"
    },
    {
      question: "Why do Emperor Penguins huddle together in a big friendly circle in Antarctica?",
      options: ["To play red-light green-light", "To stay warm against the cold wind", "To hide from polar bears"],
      answer: "To stay warm against the cold wind",
      reason: "Antarctica is super cold with biting winds! By huddling tightly together, penguins share their warm body heat. Plus, there are no polar bears in Antarctica!"
    }
  ],
  "Rainforest": [
    {
      question: "Why do Sloths move so incredibly slowly through the tropical rainforest tree branches?",
      options: ["They are always wearing heavy backpacks", "They eat leaves that provide very low energy and take a long time to digest", "They are afraid of speed limits"],
      answer: "They eat leaves that provide very low energy and take a long time to digest",
      reason: "Sloths eat fibrous leaves that have very little energy. Moving super slowly helps them save energy, and it makes them invisible to owls and hungry jaguars!"
    },
    {
      question: "What camouflage pattern does a stealthy Jaguar have to hide in the leafy forest shadows?",
      options: ["Spooky tiger stripes", "Checkerboard squares", "Rosette spot patterns resembling roses"],
      answer: "Rosette spot patterns resembling roses",
      reason: "Jaguars have beautiful spot patterns called 'rosettes' that mimic the broken sunlight filtering through the trees, making them masters of hide-and-seek!"
    }
  ],
  "Polar": [
    {
      question: "How do Emperor Penguins travel fast across the slippery, glassy ice fields of Antarctica?",
      options: ["By riding on little ocean ice-skates", "By sliding on their round bellies like a toboggan sled", "By flying with their majestic wings"],
      answer: "By sliding on their round bellies like a toboggan sled",
      reason: "Penguins can't fly, but they slide on their bellies using their feet and flippers to steer! It is called tobogganing and is super fun and fast!"
    }
  ],
  "Savanna": [
    {
      question: "Why does a Hippopotamus spend up to 16 hours floating in rivers and Lakes every day?",
      options: ["To practice their Olympic swimming strokes", "To keep their sensitive skin cool and safe from the hot African sun", "To play hidden submarine tag"],
      answer: "To keep their sensitive skin cool and safe from the hot African sun",
      reason: "Hippos do not have sweat glands like us! Spending the hot day in cool water or mud keeps them from getting painful sunburns."
    }
  ],
  "Ocean": [
    {
      question: "What do giant Blue Whales eat to grow so incredibly big?",
      options: ["Gigantic sharks and octopuses", "Seaweed salads", "Thousands of super tiny shrimp-like creatures called Krill"],
      answer: "Thousands of super tiny shrimp-like creatures called Krill",
      reason: "Even though they are the largest animals on earth, blue whales are gentle filter feeders. They filter massive mouthfuls of tiny krill from the water using safe comb-like baleen plates!"
    }
  ]
};

// API Endpoint 1: Chat with Animal (powered by Gemini with offline content fallback)
app.post("/api/chat-animal", async (req, res) => {
  const { animalName, messageToAnimal } = req.body;
  if (!animalName || !messageToAnimal) {
    return res.status(400).json({ error: "Missing animalName or messageToAnimal." });
  }

  const client = getGeminiClient();
  if (client) {
    try {
      const systemInstruction = `You are a friendly, adorable, cartoon-like animal named ${animalName}. Talk to an elementary school student who is visiting your habitat in a scavenger hunt.
Speak in a highly engaging, happy, and child-friendly tone. Use appropriate animal sounds, actions, and lots of emojis (e.g. *boing boing*, *growl*, *waddle*).
Keep your response short and sweet (MAXIMUM 3 short sentences) so it's easy and fun for kids to read. Maintain the persona at all times! Do not break character. Do not give complex technical explanations. Use child-level explanations.`;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: messageToAnimal,
        config: {
          systemInstruction,
          temperature: 0.8,
        },
      });

      const replyText = response.text || "Oops! *blinks cute eyes* I lost my train of thought. Can you ask me again? 🐾";
      return res.json({ response: replyText.trim(), sourcedFromAI: true });
    } catch (error) {
      console.error("Gemini Chat Error, falling back to offline chat:", error);
    }
  }

  // Fallback to pre-scripted high-contrast kid dialogs
  const list = ANIMAL_FALLBACKS[animalName] || [
    `Hi there, explorer! I'm your animal friend, the ${animalName}. I love living in my cozy habitat. It's so fun to meet you! Let's find more badges together! 🐾✨`,
    `Hello! *happy chirps* As a ${animalName}, I love playing and jumping around here! What are you learning about habitats today? 🍃🌟`
  ];
  const randomIndex = Math.floor(Math.random() * list.length);
  return res.json({ response: list[randomIndex], sourcedFromAI: false });
});

// API Endpoint 2: Generate Quiz (powered by Gemini with offline schema fallback)
app.post("/api/generate-trivia", async (req, res) => {
  const { category } = req.body;
  const habitatCategory = category || "General";

  const client = getGeminiClient();
  if (client) {
    try {
      const prompt = `Generate a set of 3 fun, high-contrast multiple-choice quiz questions for elementary school kids about the habitat category: "${habitatCategory}". 
Each question should focus on unique animal adaptations, survival tricks, or habitat facts.
The questions, options, and reasons must be simple, lighthearted, and highly encouraging. Explain the answer with cute emojis.`;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            description: "A list of 3 interactive multiple-choice questions for kids.",
            items: {
              type: Type.OBJECT,
              properties: {
                question: {
                  type: Type.STRING,
                  description: "The playful question text, simple for a 7-year-old child to read."
                },
                options: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Exactly 3 easy-to-read multiple-choice answers."
                },
                answer: {
                  type: Type.STRING,
                  description: "The exact matching correct answer from the options array."
                },
                reason: {
                  type: Type.STRING,
                  description: "A cute, happy 1-2 sentence explanation of why this answer is correct, with fun animal emojis."
                }
              },
              required: ["question", "options", "answer", "reason"]
            }
          }
        }
      });

      if (response.text) {
        const questions = JSON.parse(response.text);
        return res.json({ questions, sourcedFromAI: true });
      }
    } catch (error) {
      console.error("Gemini Trivia error, falling back to offline questions:", error);
    }
  }

  // Fallback pre-built queries
  const fallbackList = TRIVIA_FALLBACK[habitatCategory] || TRIVIA_FALLBACK["General"];
  // Randomly shuffle to look dynamic!
  const shuffled = [...fallbackList].sort(() => 0.5 - Math.random());
  return res.json({ questions: shuffled.slice(0, 3), sourcedFromAI: false });
});

// Configure Vite integration for live rendering in AI Studio
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`EcoExplorer server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
