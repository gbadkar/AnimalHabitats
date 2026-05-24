import { ContinentData, QuizQuestion } from "./types";

export const CONTINENTS_DB: ContinentData[] = [
  {
    id: "north-america",
    name: "North America",
    emoji: "🦌",
    colorClass: "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200",
    hoverColorClass: "fill-emerald-400 stroke-emerald-650",
    landscapeBg: "bg-gradient-to-b from-sky-200 via-sky-50 to-emerald-900/45",
    habitatDescription: "Cool pine forests, roaring mountain rivers, and snow-capped mountain peaks.",
    animals: [
      {
        id: "grizzly_bear",
        name: "Grizzly Bear",
        species: "Ursus arctos (Brown Bear)",
        emoji: "🐻",
        description: "Grizzly bears are big, fuzzy bears that love to play in cool rivers. They help pine trees grow tall by dropping salmon fish on the forest floor, which feeds the soil!",
        diet: "Berries, sweet plant roots, and yummy orange salmon fish!",
        size: "Super massive! Up to 8 feet tall when standing up, and as heavy as a small car!",
        funFact: "Grizzlies need to eat up to 20,000 calories a day before taking a super long winter nap. That's like eating 40 whole pizzas in one single day!",
        habitatName: "Forests & Rivers",
        coordinate: { x: 26, y: 70 },
        styleConfig: {
          rotation: "hover:rotate-6",
          scale: "hover:scale-125 focus:scale-125",
          bounceDelay: "delay-100"
        },
        questions: [
          {
            question: "Why do Grizzly Bears eat so much food in the fall?",
            options: ["To get ready for a long winter sleep", "To win a high-jump contest", "To grow fluffy feathers"],
            answer: "To get ready for a long winter sleep",
            reason: "Bears go to sleep for the winter because there is no food in the cold snow. Eating lots of food in the fall helps their bodies stay warm and healthy all winter long!"
          },
          {
            question: "How do Grizzly Bears help pine trees in the forest grow taller?",
            options: ["They spray water on them using their ears", "They drop leftover rich salmon fish onto the dirt, which feeds the plants", "They sing sweet songs to the tree seeds"],
            answer: "They drop leftover rich salmon fish onto the dirt, which feeds the plants",
            reason: "When bears carry salmon into the forest and drop food scraps, it fertilizes the soil just like magic plant food! This helps pine trees scratch the sky!"
          }
        ]
      },
      {
        id: "bald_eagle",
        name: "Bald Eagle",
        species: "Haliaeetus leucocephalus",
        emoji: "🦅",
        description: "Bald Eagles are amazing birds of prey with huge wings and super-sharp eyes. They can zoom through the air and grab fish with their strong yellow claws!",
        diet: "Mostly fresh fish and other small water animals!",
        size: "A giant wingspan of 6 feet! That is wider than a tall grown-up spreading out their arms!",
        funFact: "An eagle has eyes that are eight times sharper than ours. They can spot a tiny bunny wiggling from two whole miles high in the sky!",
        habitatName: "Sky & Tall Treetops",
        coordinate: { x: 74, y: 30 },
        styleConfig: {
          rotation: "hover:-rotate-12",
          scale: "hover:scale-125 focus:scale-125",
          bounceDelay: "delay-300"
        },
        questions: [
          {
            question: "How do Bald Eagles soar in the sky for hours without getting tired?",
            options: ["By catching warm rising air bubbles using their spread-out wingtip feathers", "By flapping their wings super-fast like a tiny hummingbird", "By holding their breath underwater"],
            answer: "By catching warm rising air bubbles using their spread-out wingtip feathers",
            reason: "Eagles have special feathers that spread out like fingers. They catch warm air bubbles rising from the warm ground, allowing them to ride the sky like a kite with almost no wing flaps!"
          },
          {
            question: "Eagles return to the exact same nest (called an 'eyrie') every year. What happens to the nest over time?",
            options: ["It floats away onto mountain lakes", "The nest grows bigger and heavier, sometimes weighing as much as a small truck!", "It turns into a fancy wooden birdhouse with a door"],
            answer: "The nest grows bigger and heavier, sometimes weighing as much as a small truck!",
            reason: "Eagles add new branches, twigs, and soft moss to their nests every single spring. Over many years, the nest can grow so heavy that it bends the tree!"
          }
        ]
      }
    ],
    extras: [
      { id: "pine_tree", name: "Conifer Tree", emoji: "🌲", x: 12, y: 55, funFact: "Conifer needles have a thick waxy skin that stops water from escaping and helps them handle freezing winter ice!" },
      { id: "salmon_jump", name: "Spawning Salmon", emoji: "🐟", x: 42, y: 82, funFact: "Salmon are amazing swimmers that travel from the wide salty ocean back to the tiny sweet rivers where they were born to lay eggs!" },
      { id: "beaver_dam", name: "Beaver Wetlands", emoji: "🦫", x: 88, y: 78, funFact: "Beavers are nature's clever builders! Their wooden dams make nice wetlands that house frogs, filter muddy water, and keep forests green!" },
      { id: "forest_shroom", name: "Mushroom Threads", emoji: "🍄", x: 58, y: 86, funFact: "Underground mushroom threads act like a forest telephone line! They trade soil food and water with tree roots in exchange for sweet solar sugars!" }
    ]
  },
  {
    id: "south-america",
    name: "South America",
    emoji: "🦥",
    colorClass: "bg-teal-50 hover:bg-teal-100 text-teal-800 border-teal-200",
    hoverColorClass: "fill-teal-400 stroke-teal-650",
    landscapeBg: "bg-gradient-to-b from-sky-300 via-emerald-100 to-teal-900/40",
    habitatDescription: "Vibrant layer-cake rainforests, leafy tree canopies, and wide winding rivers.",
    animals: [
      {
        id: "jaguar",
        name: "Jaguar",
        species: "Panthera onca",
        emoji: "🐆",
        description: "Jaguars are beautiful big cats with black ring spots. They are great at climbing trees and are excellent swimmers who love to splash in river water!",
        diet: "Wild pigs, river fish, and sometimes small turtles!",
        size: "Up to 6 feet long and as heavy as two big school backpacks!",
        funFact: "Jaguars are very special felines because they love swimming! They play and hunt in water, which most house cats really hate!",
        habitatName: "Rainforest Floor & Rivers",
        coordinate: { x: 30, y: 74 },
        styleConfig: {
          rotation: "hover:rotate-3",
          scale: "hover:scale-125 focus:scale-125",
          bounceDelay: "delay-200"
        },
        questions: [
          {
            question: "What are the rose-like spots on a jaguar's fur called?",
            options: ["Polka dots", "Rosettes", "Leopard stripes"],
            answer: "Rosettes",
            reason: "These pretty spots are called rosettes because they look like little roses. They help the jaguar hide perfectly in the dappled jungle shadows!"
          },
          {
            question: "Unlike regular house cats, why do jaguars spend time in rivers?",
            options: ["To play water polo with monkeys", "To cool off and hunt water animals like fish and caimans", "Because their fur turns blue in water"],
            answer: "To cool off and hunt water animals like fish and caimans",
            reason: "Jaguars are master swimmers! They patrol the rivers to catch tasty aquatic prey and keep cool under the hot jungle sun."
          }
        ]
      },
      {
        id: "sloth",
        name: "Sloth",
        species: "Bradypus variegatus",
        emoji: "🦥",
        description: "Sloths are super slow tree-climbers that live upside down in the rainforest. They are friendly, cute, and hold onto branches with magic hook claws!",
        diet: "Tough green leaves that are hard to chew!",
        size: "About 2 feet long, which is the size of a cute teddy bear!",
        funFact: "Sloths move so slowly that tiny green plants (algae) grow right on their fur! This makes them look green, helping them hide from hungry hawks!",
        habitatName: "High Jungle Trees",
        coordinate: { x: 68, y: 38 },
        styleConfig: {
          rotation: "hover:-rotate-6",
          scale: "hover:scale-125 focus:scale-125",
          bounceDelay: "delay-500"
        },
        questions: [
          {
            question: "Why is having green algae plants growing on a sloth's fur helpful?",
            options: ["It gives them a green camo coat to hide in the leaves!", "It makes them run super-fast like a lion", "It glows in the dark so they can find fruit"],
            answer: "It gives them a green camo coat to hide in the leaves!",
            reason: "The green algae blends perfectly with the green leaves of the forest trees! This makes the sloth look like a bunch of mossy leaves, keeping them safe."
          },
          {
            question: "A sloth's tummy is very slow and takes up to 30 days to digest one meal! Why?",
            options: ["They forget to drink water", "Tough leaves are hard to digest; a slow tummy breaks them down step-by-step and filters toxins", "They only eat once a year"],
            answer: "Tough leaves are hard to digest; a slow tummy breaks them down step-by-step and filters toxins",
            reason: "Forest leaves are full of tough plant fiber and natural defense chemicals. A sloth's slow, multi-chambered stomach safely ferments and breaks them down to get every bit of energy!"
          }
        ]
      }
    ],
    extras: [
      { id: "amazon_tree", name: "Kapok Tree", emoji: "🌳", x: 74, y: 20, funFact: "Giant Kapok trees can grow as tall as a 20-story building, making a perfect high-sky home for colorful jungle birds!" },
      { id: "jungle_butterfly", name: "Blue Morpho", emoji: "🦋", x: 15, y: 35, funFact: "The bright blue wings of a Blue Morpho butterfly aren't painted! They have microscopic scales that reflect light like tiny mirrors to shine super bright blue!" },
      { id: "toucan_bird", name: "Toucan", emoji: "🪶", x: 88, y: 55, funFact: "A toucan's massive beak is super lightweight, and it acts like a built-in fan to help them cool off on hot jungle afternoons!" },
      { id: "frog_spot", name: "Poison Dart Frog", emoji: "🐸", x: 45, y: 84, funFact: "Poison dart frogs have bright red and blue skins that act like danger signs to warn predators: 'Do not eat me, I am poisonous!'" }
    ]
  },
  {
    id: "europe",
    name: "Europe",
    emoji: "🦊",
    colorClass: "bg-blue-50 hover:bg-blue-100 text-blue-800 border-blue-200",
    hoverColorClass: "fill-blue-400 stroke-blue-650",
    landscapeBg: "bg-gradient-to-b from-blue-100 via-orange-50 to-amber-900/40",
    habitatDescription: "Cozy woodlands, green fields where bunnies run, and underground burrow towns.",
    animals: [
      {
        id: "red_fox",
        name: "Red Fox",
        species: "Vulpes vulpes",
        emoji: "🦊",
        description: "Red Foxes are clever, speedy animals with a fluffy red coat and a big bushy tail. They are great hunters who can hear tiny sounds!",
        diet: "Mice, insects, earthworms, and delicious sweet berries!",
        size: "About the size of a friendly house dog, weighing 10 to 15 pounds!",
        funFact: "Red Foxes can hear a tiny mouse squeak and wiggle under deep, thick snow! They jump high up and dive nose-first into the snow to catch it!",
        habitatName: "Meadows & Woods Edge",
        coordinate: { x: 72, y: 68 },
        styleConfig: {
          rotation: "hover:rotate-12",
          scale: "hover:scale-125 focus:scale-125",
          bounceDelay: "delay-150"
        },
        questions: [
          {
            question: "How do Red Foxes catch mice hiding under deep winter snow?",
            options: ["By using their super-sharp hearing and diving nose-first into the snow!", "By blowing hot air to melt the snow banks", "By digging with long metal spoons"],
            answer: "By using their super-sharp hearing and diving nose-first into the snow!",
            reason: "Foxes can hear a mouse wiggling under the snow from far away. They leap high into the air and dive down nose-first like a fuzzy lawn dart!"
          },
          {
            question: "What does a fox use its warm, fluffy tail (called a brush) for?",
            options: ["To sweep up leaves in their home", "To help them balance when running fast, and to wrap around their face like a warm winter blanket!", "To store drinking water for the summer"],
            answer: "To help them balance when running fast, and to wrap around their face like a warm winter blanket!",
            reason: "A fox's tail works like a tightrope walker's balancing pole when they make sharp turns, and it acts as a cozy sleeping bag for their nose when they sleep in the cold!"
          }
        ]
      },
      {
        id: "eurasian_badger",
        name: "Eurasian Badger",
        species: "Meles meles",
        emoji: "🦡",
        description: "Badgers are chubby, striped animals that love to dig deep holes! They build huge, clean underground homes called 'setts' where they live with their clans!",
        diet: "Juicy earthworms, roots, plant bulbs, and wild acorns!",
        size: "A short, sturdy body that weighs as much as three big watermelons!",
        funFact: "Badgers are super tidy! They drag out dry grass beds to air them out in the warm sun, keeping their underground bedrooms fresh and clean!",
        habitatName: "Underground Setts",
        coordinate: { x: 26, y: 78 },
        styleConfig: {
          rotation: "hover:-rotate-3",
          scale: "hover:scale-125 focus:scale-125",
          bounceDelay: "delay-400"
        },
        questions: [
          {
            question: "What is the name of a badger family's cozy underground home?",
            options: ["An underground sett", "A high tree nest", "A water puddle"],
            answer: "An underground sett",
            reason: "A sett is a complex underground maze of tunnels, sleeping chambers, and nurseries that badgers dig out with their strong claws!"
          },
          {
            question: "How do badgers keep their underground homes tidy?",
            options: ["They invite forest beetles to clean up", "They drag damp bedding out to sun-dry and bring in clean, fresh dry grass", "They sweep dirt using their tails"],
            answer: "They drag damp bedding out to sun-dry and bring in clean, fresh dry grass",
            reason: "Badgers hate fleas and ticks! They regularly swap out old, dusty bedding for new, clean dry plants to keep their home clean and safe."
          }
        ]
      }
    ],
    extras: [
      { id: "birch_tree", name: "Birch Tree", emoji: "🌳", x: 80, y: 35, funFact: "White birch tree bark is covered in a natural wax that acts like a handy rain jacket, protecting the wood from bugs!" },
      { id: "red_mushroom", name: "Red Fungus", emoji: "🍄", x: 14, y: 84, funFact: "This bright red polka-dot mushroom acts like a warning sign! It is poisonous to keep hungry bugs and deer from eating it." },
      { id: "hedgehog_meadow", name: "Hedgehog", emoji: "🦔", x: 48, y: 82, funFact: "Hedgehogs go to sleep during chilly winters! Their heartbeat drops from 200 beats a minute to just 10 beats to save energy." },
      { id: "snail_flower", name: "Garden Snail", emoji: "🐌", x: 60, y: 76, funFact: "To stay safe in hot dry weather, garden snails pull into their shell and seal the door with a waxy mucus sheet so they don't dry out!" }
    ]
  },
  {
    id: "africa",
    name: "Africa",
    emoji: "🦁",
    colorClass: "bg-amber-50 hover:bg-amber-100 text-amber-805 border-amber-200",
    landscapeBg: "bg-gradient-to-b from-amber-200 via-orange-50 to-orange-950/40",
    hoverColorClass: "fill-amber-400 stroke-amber-650",
    habitatDescription: "Wide sunny grasslands, muddy watering holes, and giant shade trees.",
    animals: [
      {
        id: "lion",
        name: "Lion",
        species: "Panthera leo",
        emoji: "🦁",
        description: "Lions are big, beautiful cats that live in families called prides. The fathers have magnificent fuzzy manes, while the mothers do the teamwork hunting!",
        diet: "Meat (herds of zebras and wild antelopes!)",
        size: "Very massive! Can weigh up to 400 pounds, which is as heavy as five kids!",
        funFact: "A lion's roar is so loud that other animals can hear it from five miles away! It tells others: 'This is my home! Go hunt somewhere else!'",
        habitatName: "Grasslands & Savannas",
        coordinate: { x: 30, y: 64 },
        styleConfig: {
          rotation: "hover:rotate-6",
          scale: "hover:scale-125 focus:scale-125",
          bounceDelay: "delay-100"
        },
        questions: [
          {
            question: "Why do lions hunt in big groups (called prides) instead of alone?",
            options: ["So they can take turns holding a map", "To work as a team to catch big, strong prey that one lion couldn't catch alone", "To practice their running races"],
            answer: "To work as a team to catch big, strong prey that one lion couldn't catch alone",
            reason: "Savanna herd animals are super-fast and strong. By working as an amazing feline team, lions can easily catch food and feed the whole family!"
          },
          {
            question: "What is the main use of a male lion's beautiful, fluffy mane?",
            options: ["To play peek-a-boo with cubs", "To protect their neck during fights and show everyone how healthy and strong they are", "To brush their cubs' hair"],
            answer: "To protect their neck during fights and show everyone how healthy and strong they are",
            reason: "A thick mane acts like a helmet for the lion's throat during play or territory battles, and healthy lions have the darkest, fluffiest manes!"
          }
        ]
      },
      {
        id: "hippo",
        name: "Hippopotamus",
        species: "Hippopotamus amphibius",
        emoji: "🦛",
        description: "Hippos are gigantic, round water-lovers that spend all day floating like rubber ducks in African rivers. They have super wide mouths to eat sweet grass!",
        diet: "Green river-bank grass that they graze on at night!",
        size: "Enormous! Weighs up to 3,500 pounds, which is as heavy as a big family minivan!",
        funFact: "Hippos make their own pink skin oil that works as a natural sunscreen! It protects their skin from sunburns and kills germs!",
        habitatName: "Rivers & Mud Pools",
        coordinate: { x: 74, y: 76 },
        styleConfig: {
          rotation: "hover:-rotate-6",
          scale: "hover:scale-125 focus:scale-125",
          bounceDelay: "delay-300"
        },
        questions: [
          {
            question: "What does a hippo's red 'blood sweat' do for its skin?",
            options: ["It changes their skin color to matching pink", "It acts as a natural sunscreen, a skin lotion, and a shield against germs!", "It smells like sweet strawberry flowers"],
            answer: "It acts as a natural sunscreen, a skin lotion, and a shield against germs!",
            reason: "Hippos do not have sweat glands. This special pink slime blocks bad sunburns, stops skin from drying out in dry winds, and keeps river-water bugs away!"
          },
          {
            question: "How do hippos help river ecosystems stay healthy?",
            options: ["They teach the fish how to swim", "They eat grass on land and drop plant food in the water through their waste, feeding small water animals!", "By blowing cold bubbles to make ice cubes"],
            answer: "They eat grass on land and drop plant food in the water through their waste, feeding small water animals!",
            reason: "Hippos eat tons of river grass on land, and then poop in the rivers! This transfers vital nutrients from land to water, feeding thousands of small larvae and river fish!"
          }
        ]
      }
    ],
    extras: [
      { id: "savanna_tree", name: "Baobab Tree", emoji: "🌳", x: 12, y: 45, funFact: "The Baobab tree is a water superhero! It stores up to 30,000 gallons of drinking water inside its spongy trunk to survive dry years!" },
      { id: "savanna_grass", name: "Zebra Grass", emoji: "🌾", x: 40, y: 75, funFact: "Savanna grass has super deep roots! This lets them sprout back fresh and green even after huge savanna forest fires!" },
      { id: "clever_suricate", name: "Giraffe", emoji: "🦒", x: 88, y: 48, funFact: "Giraffes have purple tongues up to 18 inches long! They are tough and leathery, letting them eat juicy leaves from thorny trees without getting hurt!" },
      { id: "mud_splash", name: "Minerals Mud", emoji: "💦", x: 62, y: 84, funFact: "Mud holes contain healthy minerals! Animals roll around in the mud to cool off their skin and keep itchy bugs away." }
    ]
  },
  {
    id: "asia",
    name: "Asia",
    emoji: "🐼",
    colorClass: "bg-red-50 hover:bg-red-100 text-red-800 border-red-200",
    hoverColorClass: "fill-red-400 stroke-red-650",
    landscapeBg: "bg-gradient-to-b from-sky-200 via-rose-50 to-emerald-900/40",
    habitatDescription: "Misty mountain forests full of bamboo, cherry blossoms, and wide rivers.",
    animals: [
      {
        id: "giant_panda",
        name: "Giant Panda",
        species: "Ailuropoda melanoleuca",
        emoji: "🐼",
        description: "Giant Pandas are big, cuddly black-and-white bears that love eating bamboo! They live in foggy, peaceful mountain forests in Asia.",
        diet: "Almost 100% crunchy, green bamboo stalks and leaves!",
        size: "About 5 feet long, weighing as much as fifteen kids' backpacks!",
        funFact: "Pandas have a special extra wrist bone that acts like a handy thumb! This helps them hold onto slippery green bamboo stems perfectly!",
        habitatName: "Misty Bamboo Highlands",
        coordinate: { x: 26, y: 72 },
        styleConfig: {
          rotation: "hover:rotate-6",
          scale: "hover:scale-125 focus:scale-125",
          bounceDelay: "delay-200"
        },
        questions: [
          {
            question: "Why must Giant Pandas spend up to 16 hours every single day eating bamboo?",
            options: ["Because bamboo is full of sweet chocolate inside", "Because bamboo doesn't have much energy, so they must eat a lot of it to stay strong!", "Because their parents tell them not to waste food"],
            answer: "Because bamboo doesn't have much energy, so they must eat a lot of it to stay strong!",
            reason: "Pandas have stomachs like meat-eating bears, which aren't built for digesting plants. Since they digest other foods poorly, they have to eat up to 40 pounds of bamboo every single day!"
          },
          {
            question: "What is the extra 'wrist bone' on a panda's paw used for?",
            options: ["To act like an extra thumb so they can grip, strip, and hold bamboo stems", "To play a tiny thumb-wars game with friends", "To help them scale snowy mountains faster"],
            answer: "To act like an extra thumb so they can grip, strip, and hold bamboo stems",
            reason: "This bone is called a 'radial sesamoid' or pseudo-thumb. It works just like our thumb, letting the panda peel and eat woody stems with high-precision grip!"
          }
        ]
      },
      {
        id: "bengal_tiger",
        name: "Bengal Tiger",
        species: "Panthera tigris",
        emoji: "🐯",
        description: "Bengal Tigers are the largest master cats on Earth! They are orange with unique black stripes that help them hide in the tall reed grass.",
        diet: "Deer, wild pigs, and other forest animals!",
        size: "Up to 10 feet long and weighing as much as four grown-ups!",
        funFact: "A tiger's stripes are pint-sized skin tattoos! Even if you shaved off a tiger's fur, the stripes would still be right there on its skin!",
        habitatName: "Swamps & Thick Grasslands",
        coordinate: { x: 70, y: 64 },
        styleConfig: {
          rotation: "hover:-rotate-6",
          scale: "hover:scale-125 focus:scale-125",
          bounceDelay: "delay-400"
        },
        questions: [
          {
            question: "Why do tigers have black vertical stripes on their bodies?",
            options: ["To show everyone they are forest referees", "To look like stripes of grass shadows, helping them sneak up close to wild deer", "To catch warm sun lines from the canopy"],
            answer: "To look like stripes of grass shadows, helping them sneak up close to wild deer",
            reason: "This is called camouflage! The black stripes blend with the vertical shadows of reeds and forest grass, so they look invisible to a passing deer!"
          },
          {
            question: "Bengal Tigers swim across swamp channels. How does this help them survive?",
            options: ["By hunting deep ocean sharks", "By crossing wide swamp rivers to track prey and stay cooled off", "By letting them drink salty sea water"],
            answer: "By crossing wide swamp rivers to track prey and stay cooled off",
            reason: "Unlike little domestic house cats, tigers are champion swimmers who cross wide rivers easily and can chase prey right into the jungle water!"
          }
        ]
      }
    ],
    extras: [
      { id: "bamboo_stick", name: "Bamboo stalks", emoji: "🎋", x: 12, y: 55, funFact: "Bamboo is the fastest growing plant in the world! It can grow as tall as you in just one single day!" },
      { id: "cherry_bloom", name: "Cherry Bloom", emoji: "🌸", x: 80, y: 25, funFact: "Cherry blossoms bloom all at the exact same time in spring! This makes the trees look beautiful and attracts millions of friendly honeybees!" },
      { id: "cute_crane", name: "Crane Bird", emoji: "🦩", x: 42, y: 45, funFact: "Red-Crowned cranes are highly protected birds! If they are happy and healthy, it means the wetland water is clean and fresh for everyone." },
      { id: "mist_mountain", name: "Himalaya Peaks", emoji: "🗻", x: 50, y: 15, funFact: "The massive Himalaya mountains are so high they block rain clouds, creating a dry desert on one side and wet forests on the other!" }
    ]
  },
  {
    id: "australia",
    name: "Australia",
    emoji: "🦘",
    colorClass: "bg-orange-50 hover:bg-orange-100 text-orange-850 border-orange-200",
    landscapeBg: "bg-gradient-to-b from-sky-200 via-orange-100 to-amber-955/40",
    hoverColorClass: "fill-orange-400 stroke-orange-650",
    habitatDescription: "Dry red outback deserts, sandy ridges, and sweet-smelling eucalyptus trees.",
    animals: [
      {
        id: "kangaroo",
        name: "Red Kangaroo",
        species: "Macropus rufus",
        emoji: "🦘",
        description: "Red Kangaroos are large desert-hoppers from Australia! They have powerful legs that act like springs and a big pocket-pouch for baby joeys!",
        diet: "Dry desert grass and sweet seeds!",
        size: "Very tall! Can stand up to 6 feet high, which is taller than most kids!",
        funFact: "A kangaroo's bouncy hops are super energy savers! Their leg tendons act like giant rubber bands that rebound off the ground!",
        habitatName: "Outback Hills & Dunes",
        coordinate: { x: 30, y: 68 },
        styleConfig: {
          rotation: "hover:rotate-6",
          scale: "hover:scale-125 focus:scale-125",
          bounceDelay: "delay-150"
        },
        questions: [
          {
            question: "Why do kangaroo leg tendons act like spring coils?",
            options: ["They store and bounce energy, helping them hop long distances without getting tired!", "They make a funny squeak noise with each step", "They let them hop all the way to the moon"],
            answer: "They store and bounce energy, helping them hop long distances without getting tired!",
            reason: "Their leg tendons work just like giant rubber bands! When they hit the ground, the tendon stores energy and snaps it back to launch them forward, saving lots of oxygen!"
          },
          {
            question: "What is the kangaroo's large, muscular tail used for?",
            options: ["To sweep up dust storms", "To act like a strong third leg to balance when hopping or resting", "To carry backup food"],
            answer: "To act like a strong third leg to balance when hopping or resting",
            reason: "A kangaroo's tail is packed with muscle! It acts as a safety kickstand when they stand, and a steering rudder when hopping around!"
          }
        ]
      },
      {
        id: "koala",
        name: "Koala",
        species: "Phascolarctos cinereus",
        emoji: "🐨",
        description: "An adorable, fuzzy tree-hugger with a large black nose. They live in eucalyptus trees and love to sleep almost all day long!",
        diet: "Eucalyptus leaves, which smell like clean medicine!",
        size: "About the size of a fluffy puppy, up to 2.5 feet tall!",
        funFact: "Koalas sleep for up to 20 hours a day because eucalyptus leaves are very low in energy and extremely hard to digest!",
        habitatName: "Eucalyptus Treetops",
        coordinate: { x: 74, y: 35 },
        styleConfig: {
          rotation: "hover:-rotate-12",
          scale: "hover:scale-125 focus:scale-125",
          bounceDelay: "delay-300"
        },
        questions: [
          {
            question: "Eucalyptus leaves are poisonous to almost all animals. Why can koalas eat them safely?",
            options: ["They wash the leaves in hot water baths", "Their livers have special cleaning filters that break down and clear the leaf toxins!", "They only eat fake leaves made of paper"],
            answer: "Their livers have special cleaning filters that break down and clear the leaf toxins!",
            reason: "Koalas are super specialized! Their bodies have complex digestive systems and liver filters that render the poisonous oils completely safe!"
          },
          {
            question: "Why do koalas sleep for almost the entire day (up to 20 hours)?",
            options: ["To save energy, because their leaves diet provides very little calories", "Because they are lazy bone play-athletes", "To practice sweet dreams in tree forks"],
            answer: "To save energy, because their leaves diet provides very little calories",
            reason: "Eucalyptus leaves are hard to digest and have low nutritional energy. Sleeping helps the koala lower its body needs so it doesn't run out of fuel!"
          }
        ]
      }
    ],
    extras: [
      { id: "euca_trunk", name: "Eucalyptus tree", emoji: "🌳", x: 78, y: 20, funFact: "Eucalyptus leaves contain yummy scented oils that koalas love, but they are highly flammable and can catch fire in hot outback summers!" },
      { id: "desert_rock", name: "Uluru Rock", emoji: "⛰️", x: 12, y: 78, funFact: "Uluru is a giant red sandstone rock in Australia. It looks reddish-rusty because the iron in the rock is rusting in the air!" },
      { id: "cute_cockatoo", name: "Cockatoo Bird", emoji: "🦜", x: 44, y: 30, funFact: "Clever white cockatoos can open backyard trash cans and warn their friends of danger using loud, high-pitched squawk calls!" },
      { id: "outback_dust", name: "Spinifex Grass", emoji: "🌾", x: 52, y: 82, funFact: "Spinifex grass grows in round prickly cushions! Their tough, pointy leaves block dry winds and help stop sand dunes from blowing away." }
    ]
  },
  {
    id: "antarctica",
    name: "Antarctica",
    emoji: "🐧",
    colorClass: "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200",
    landscapeBg: "bg-gradient-to-b from-sky-300 via-cyan-50 to-slate-300/40",
    hoverColorClass: "fill-slate-300 stroke-slate-550",
    habitatDescription: "Freezing cold ice sheets, snowy blizzards, and deep blue polar seas.",
    animals: [
      {
        id: "emperor_penguin",
        name: "Emperor Penguin",
        species: "Aptenodytes forsteri",
        emoji: "🐧",
        description: "Emperor Penguins are champion cold-survivors! They are big, beautiful birds that slide on their bellies and live on the ice of Antarctica!",
        diet: "Yummy silverfish, small krill, and squid!",
        size: "Very tall! Up to 4 feet tall, which is about the same height as you!",
        funFact: "Emperor Penguins can dive deep into freezing water, holding their breath for 20 minutes! That's longer than a whole school recess!",
        habitatName: "Antarctic Ice Shelves",
        coordinate: { x: 28, y: 72 },
        styleConfig: {
          rotation: "hover:-rotate-6",
          scale: "hover:scale-125 focus:scale-125",
          bounceDelay: "delay-200"
        },
        questions: [
          {
            question: "How do male Emperor Penguins keep their egg warm during the freezing winter?",
            options: ["They balance the egg on top of their feet under a cozy warm belly flap called a brood patch", "They bury the egg under warm snow blankets", "They ask a polar bear to sit on it"],
            answer: "They balance the egg on top of their feet under a cozy warm belly flap called a brood patch",
            reason: "Penguins do not build nests of twigs. Instead, they balance the delicate egg perfectly on their feet and cover it with a warm, featherless skin fold to keep it warm at 98°F!"
          },
          {
            question: "Why do penguins huddle closely together in a giant, friendly cluster?",
            options: ["To share body heat, shielding each other from freezing winds and keeping everyone cozy!", "To play a big game of freeze-tag", "To look like a giant ice monster"],
            answer: "To share body heat, shielding each other from freezing winds and keeping everyone cozy!",
            reason: "A penguin huddle is like a giant group hug! By packed tightly together, they block the cold drafts and create a cozy warm microclimate up to 95°F inside, taking turns moving in and out!"
          }
        ]
      },
      {
        id: "blue_whale",
        name: "Blue Whale",
        species: "Balaenoptera musculus",
        emoji: "🐋",
        description: "Blue Whales are the biggest, most magical giants in Earth's history! They make massive water fountains and sing ocean songs.",
        diet: "Millions of tiny, pink shrimp-like creatures called Krill!",
        size: "Colossal! Up to 100 feet long—longer than three big yellow school buses parked nose-to-tail!",
        funFact: "A blue whale's tongue weighs as much as a whole adult elephant, and its heart is as big as a small car! That is one giant heart!",
        habitatName: "Deep Frozen Oceans",
        coordinate: { x: 72, y: 58 },
        styleConfig: {
          rotation: "hover:rotate-6",
          scale: "hover:scale-125 focus:scale-125",
          bounceDelay: "delay-450"
        },
        questions: [
          {
            question: "How do Blue Whales process millions of tiny krill from deep ocean water while preventing ingestion of massive saltwater volumes?",
            options: ["Using safe comb-like filter plates called baleen to trap krill while pushing out water with their tongue!", "Using long tentacles to grab individual krill", "By drinking all water and spitting salt from their ears"],
            answer: "Using safe comb-like filter plates called baleen to trap krill while pushing out water with their tongue!",
            reason: "Whales do not have regular teeth! They have combs of fingernail-like material called baleen. They gulp water, squeeze it out with their gigantic tongue, and eat the tasty trapped krill!"
          },
          {
            question: "What is the oceanic process of deep-water nutrients rising to the surface called, which feeds the whales' favorite snack (krill)?",
            options: ["Ocean Upwelling, which carries deep nitrates to the surface, triggering huge plant blooms that feed swarms of krill!", "Salt crystal cooking", "Tidal wave surfing"],
            answer: "Ocean Upwelling, which carries deep nitrates to the surface, triggering huge plant blooms that feed swarms of krill!",
            reason: "Upwelling brings mineral-filled deep water to the sunlit zone. This triggers rapid microscopic plant growth (phytoplankton), which in turn feeds astronomical numbers of tasty krill!"
          }
        ]
      }
    ],
    extras: [
      { id: "iceberg_floating", name: "Iceberg Glacier", emoji: "🏔️", x: 14, y: 38, funFact: "Icebergs are giant floating ice rocks! Since ice is lighter than water, only 10% of the iceberg peaks above water, while the rest hides below!" },
      { id: "krill_swarm", name: "Krill Swarms", emoji: "🦐", x: 80, y: 84, funFact: "Little pink krill swim in giant groups that stretch for miles! They are the most important snack in the ocean, feeding penguins, fish, and big whales!" },
      { id: "funny_snowman", name: "Ice-Core Snowman", emoji: "⛄", x: 50, y: 76, funFact: "Scientists drill deep into Antarctic ice to pull out ice tubes. These tubes contain tiny air bubbles from thousands of years ago, matching ancient air!" },
      { id: "polar_sky", name: "Southern Lights", emoji: "🌌", x: 48, y: 15, funFact: "The Southern Lights (Aurora) are magical green and purple lights that dance in the polar night sky when space particles bump into Earth's protection shield!" }
    ]
  }
];

export const GENERAL_QUIZ_POOL: QuizQuestion[] = [
  {
    question: "Which special name describes an animal (like a grizzly bear or jaguar) that is super important for keeping their entire habitat healthy?",
    options: ["Keystone species", "Invasive species", "Water glider"],
    answer: "Keystone species",
    reason: "Keystone species are like the middle puzzle piece of an arch! If you remove them, the whole arch collapses and other plants and animals lose their homes."
  },
  {
    question: "How do Bald Eagles soar in the sky for a long time without getting tired?",
    options: ["By catching rising bubbles of warm air (thermal currents)", "By flapping their wings super-fast like a bumblebee", "By holding onto helium party balloons"],
    answer: "By catching rising bubbles of warm air (thermal currents)",
    reason: "Eagles spread out their slotted feathers to ride bubbles of warm air rising from the ground, soaring with almost zero wing flaps!"
  },
  {
    question: "Sloths have green algae plants growing directly on their fur, which helps them hide. What is this type of friendly relationship called?",
    options: ["A mutual helper partnership (mutualism)", "An animal wrestle match", "A leaf eating contest"],
    answer: "A mutual helper partnership (mutualism)",
    reason: "In mutualism, both sides help each other! The sloth gets free camouflage, and the green algae gets a wet, safe home to live in!"
  },
  {
    question: "Where do male Emperor Penguins keep their delicate egg to warm it up in Antarctica?",
    options: ["Burying it under warm snow piles", "Balancing it on their feet under a cozy belly skin flap", "Inside a geothermal hot volcano"],
    answer: "Balancing it on their feet under a cozy belly skin flap",
    reason: "Since Antarctica is fully made of cold ice, male penguins carry the egg on their feet under a warm vascular belly pouch to keep it cozy at 98°F!"
  },
  {
    question: "Eucalyptus leaves can be highly poisonous to other creatures. How do Koalas digest them safely?",
    options: ["They boil the leaves in hot river water", "Their livers have special cleaning filters that detoxify the leaves safely!", "They only eat fake leaves made of paper"],
    answer: "Their livers have special cleaning filters that detoxify the leaves safely!",
    reason: "Koalas are amazing specialists! Their bodies are custom-made to break down tough plant chemicals, rendering poisonous leaves completely harmless!"
  },
  {
    question: "How does a Kangaroo save leg energy while jumping across hot Australian deserts?",
    options: ["Their powerful leg tendons act like elastic rubber bands, storing and releasing bounce-power!", "They float on desert breeze waves using their long ears", "They ride on the backs of giant emu birds"],
    answer: "Their powerful leg tendons act like elastic rubber bands, storing and releasing bounce-power!",
    reason: "Each bounce stores energy in their leg tendons like a pogo stick. When they jump off, the tendon recoils and launches them forward with very little effort!"
  }
];
