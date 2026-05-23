import { ContinentData, QuizQuestion } from "./types";

export const CONTINENTS_DB: ContinentData[] = [
  {
    id: "north-america",
    name: "North America",
    emoji: "🦌",
    colorClass: "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200",
    hoverColorClass: "fill-emerald-400 stroke-emerald-650",
    landscapeBg: "bg-gradient-to-b from-sky-200 via-sky-50 to-emerald-900/45",
    habitatDescription: "Diverse biomes of dense temperate coniferous rain forests, cold river networks, and rugged subalpine ranges.",
    animals: [
      {
        id: "grizzly_bear",
        name: "Grizzly Bear",
        species: "Ursus arctos horribilis",
        emoji: "🐻",
        description: "An omnivorous apex predator and keystone species that regulates forest ecosystems, foraging across vast territories to deposit critical marine nitrogen from salmon carcasses into forest soils.",
        diet: "Omnivorous (Forages on berries, roots, insects, and high-protein salmon during autumn hyperphagia)",
        size: "Massive! Stands 7-8 feet tall bipedally; weighs 400-800 pounds to accumulate essential winter adipose tissue.",
        funFact: "Grizzlies experience heavy seasonal hyperphagia, demanding they consume up to 20,000 calories daily to survive winter torpor (hibernation).",
        habitatName: "Riparian Corridors & Subalpine Forests",
        coordinate: { x: 26, y: 70 },
        styleConfig: {
          rotation: "hover:rotate-6",
          scale: "hover:scale-125 focus:scale-125",
          bounceDelay: "delay-100"
        },
        questions: [
          {
            question: "Grizzly bears undergo a period of intense feeding in autumn to build up fat reserves for winter torpor. What is this hormonal state called?",
            options: ["Hyperphagia", "Estivation", "Convective cooling"],
            answer: "Hyperphagia",
            reason: "Hyperphagia is a biological drive where bears eat almost continuously, storing fat which is broken down to release metabolic water, energy, and heat during their long winter sleep."
          },
          {
            question: "By dragging fish carcasses into forests, grizzlies function as a 'keystone species'. How does this specifically benefit the subalpine biome?",
            options: ["It prevents water pollution from rotting fish", "It fertilizes the soil by transferring marine-derived nitrogen and phosphorus", "It feeds subterranean earthworms"],
            answer: "It fertilizes the soil by transferring marine-derived nitrogen and phosphorus",
            reason: "Grizzlies carry nutrient-rich salmon carcasses deep into the woods. The decomposition of these carcasses distributes vital nitrogen isotopes, fertilizing the surrounding pine trees and plants."
          }
        ]
      },
      {
        id: "bald_eagle",
        name: "Bald Eagle",
        species: "Haliaeetus leucocephalus",
        emoji: "🦅",
        description: "An elite raptor equipped with curved talons, a heavy hooked beak, and extraordinary binocular vision that commands coastal and inland riparian corridors.",
        diet: "Piscivorous Carnivore (Primarily scans for fish, trout, and small waterfowl; also behaves as an opportunistic scavenger)",
        size: "Impressive wingspan of 6-7.5 feet; exhibits prominent sexual dimorphism with larger females.",
        funFact: "Eagles have two foveae (visual focal centers) in each eye, granting them up to 8x sharper vision than humans to spot an animal from two miles high.",
        habitatName: "Canopy Nesting & Coastal Thermals",
        coordinate: { x: 74, y: 30 },
        styleConfig: {
          rotation: "hover:-rotate-12",
          scale: "hover:scale-125 focus:scale-125",
          bounceDelay: "delay-300"
        },
        questions: [
          {
            question: "What aerodynamic adaptations do Bald Eagles use to glide across long distances while conserving vital metabolic energy?",
            options: ["They generate high thermal lift and minimize drag using slotted wingtip feathers", "They flap continuously to overcome air resistance", "They minimize air pressure using a dynamic swim bladder"],
            answer: "They generate high thermal lift and minimize drag using slotted wingtip feathers",
            reason: "Slotted primary feathers reduce drag vortices at the wingtips. By catching rising columns of warm air (convective thermals), eagles can soar long distances with minimal biomechanical energy exertion."
          },
          {
            question: "Bald Eagles exhibit high nest fidelity, returning to the same 'eyrie' year after year. What is a remarkable physical consequence of this behavior?",
            options: ["The nests are built exclusively floating on mountain lakes", "The nests grow through accumulation, often weighing up to 2,000 pounds!", "The nests are woven from soft spider silk to preserve humidity"],
            answer: "The nests grow through accumulation, often weighing up to 2,000 pounds!",
            reason: "Because eagles continuously reinforce their nests in large tree forks with thick branches and moss, these generational eyries can grow to massive sizes and heavily strain the host trees."
          }
        ]
      }
    ],
    extras: [
      { id: "pine_tree", name: "Conifer Canopy", emoji: "🌲", x: 12, y: 55, funFact: "Conifers have specialized needle leaves with a thick waxy cuticle designed to inhibit transpiration and handle extreme freezing temperatures." },
      { id: "salmon_jump", name: "Spawning Salmon", emoji: "🐟", x: 42, y: 82, funFact: "Spawning salmon display anadromous life cycles, migrating from ocean saltwater back to freshwater streams to spawn, guided by chemical olfactory markers." },
      { id: "beaver_dam", name: "Beaver Wetlands", emoji: "🦫", x: 88, y: 78, funFact: "Beavers are ecosystem engineers. Their dams create wetland microclimates that sequester carbon, filter sediments, and raise local water tables." },
      { id: "forest_shroom", name: "Mycorrhizal Fungi", emoji: "🍄", x: 58, y: 86, funFact: "Underground fungi form massive mutualistic mycorrhizal networks with tree roots, trading water and vital soil minerals for photosynthetic sugars." }
    ]
  },
  {
    id: "south-america",
    name: "South America",
    emoji: "🦥",
    colorClass: "bg-teal-50 hover:bg-teal-100 text-teal-800 border-teal-200",
    hoverColorClass: "fill-teal-400 stroke-teal-650",
    landscapeBg: "bg-gradient-to-b from-sky-300 via-emerald-100 to-teal-900/40",
    habitatDescription: "The high-density complex strata of the Amazon Basin, showcasing wet undergrowth and dense emergent canopies.",
    animals: [
      {
        id: "jaguar",
        name: "Jaguar",
        species: "Panthera onca",
        emoji: "🐆",
        description: "An enigmatic wild cat and keystone carnivore with an exceptionally powerful bite force capable of piercing reptilian shells, utilizing visual rosettes to master natural forest floor shadows.",
        diet: "Carnivore (An opportunistic hunter of tapirs, caimans, capybaras, and river fish)",
        size: "Stretching 5-6 feet with a muscular build; weighing 120-250 pounds of dense muscle.",
        funFact: "Jaguars are highly atypical felines; they are strong swimmers that frequently utilize river rapids to ambush aquatic prey or cross ecosystems.",
        habitatName: "Rainforest Stratum & Bank Shallows",
        coordinate: { x: 30, y: 74 },
        styleConfig: {
          rotation: "hover:rotate-3",
          scale: "hover:scale-125 focus:scale-125",
          bounceDelay: "delay-200"
        },
        questions: [
          {
            question: "Jaguars display a physical coloration called 'rosettes' that includes center dots. What crucial ecological role does this pattern serve?",
            options: ["It serves as warning coloration to ward off other carnivores", "It acts as disruptive coloration, blending them into dappled rainforest shadows", "It signals sexual maturity to prospective mates"],
            answer: "It acts as disruptive coloration, blending them into dappled rainforest shadows",
            reason: "Rosette spots breaks up the jaguar's physical outline (disruptive camouflage). This mimics the irregular spots of light filtering down through the dense jungle canopy, keeping them invisible as ambush hunters."
          },
          {
            question: "Unlike many domestic felines, Jaguars are strong swimmers. How does this behavior expand their ecological niche?",
            options: ["It lets them forage on marine kelp", "It allows them to actively hunt semi-aquatic prey like caimans and capybaras!", "It helps them migrate to cold polar oceans"],
            answer: "It allows them to actively hunt semi-aquatic prey like caimans and capybaras!",
            reason: "Jaguars have adapted to riparian zones. They are excellent swimmers and routinely patrol river systems, allowing them to compete with crocodilians for high-energy aquatic prey."
          }
        ]
      },
      {
        id: "sloth",
        name: "Sloth",
        species: "Bradypus variegatus",
        emoji: "🦥",
        description: "An arboreal folivore characterized by an extremely low metabolic rate, relying on structural claw adaptations to spend their lives suspended upside-down in the jungle canopy.",
        diet: "Folivore (Feeds on tough canopy leaves, utilizing specialized multi-chambered stomachs)",
        size: "Approximately 2 feet tall; lightweight skeletal structure optimized for branch grip tension.",
        funFact: "Sloths share a mutualistic relationship with green algae (chlorophyta) that grows within grooves on their hair, providing vital camouflage and supplemental nutrients.",
        habitatName: "High Kapok Canopy & Overhangs",
        coordinate: { x: 68, y: 38 },
        styleConfig: {
          rotation: "hover:-rotate-6",
          scale: "hover:scale-125 focus:scale-125",
          bounceDelay: "delay-500"
        },
        questions: [
          {
            question: "What is a major evolutionary advantage of the mutualistic green algae growing on a sloth's fur?",
            options: ["It provides a symbiotic camouflage layer and a supplemental source of dietary lipids", "It increases their body temperature on rainy days", "It deters mosquitoes using a toxic static charge"],
            answer: "It provides a symbiotic camouflage layer and a supplemental source of dietary lipids",
            reason: "The algae absorbs moisture, creating a green hue that camouflages the sloth in the canopy. Sloths also ingest nutrients and lipids directly from the algae when grooming their coarse fur."
          },
          {
            question: "How does a sloth's extremely slow digestive system relate to its specialized folivorous diet?",
            options: ["It digests food instantly to avoid loading down branches", "Leaves have low nutritional value and high toxins; a slow, multi-chambered stomach digests cell walls and filters toxins safely!", "It allows them to synthesize vitamin D from complete darkness"],
            answer: "Leaves have low nutritional value and high toxins; a slow, multi-chambered stomach digests cell walls and filters toxins safely!",
            reason: "Jungle leaves contain cellulose and chemical defense toxins. The sloth's slow, multi-chambered gut utilizes specialized bacteria to ferment and extract maximum nutrients from tough leaves, taking up to 30 days to process a single meal."
          }
        ]
      }
    ],
    extras: [
      { id: "amazon_tree", name: "Kapok Canopy", emoji: "🌳", x: 74, y: 20, funFact: "Emergent Kapok trees can scale up to 200 feet, creating vital nesting microhabitats for structural canopy species." },
      { id: "jungle_butterfly", name: "Blue Morpho", emoji: "🦋", x: 15, y: 35, funFact: "The vivid blue of a Morpho butterfly's wings is not chemical pigment, but structural coloration caused by microscopic scales diffracting light waves." },
      { id: "toucan_bird", name: "Keel-Billed Toucan", emoji: "🪶", x: 88, y: 55, funFact: "The toucan's giant beak is honeycombed with air pockets for extreme weight reduction, serving as an active radiator for thermoregulation (heat dissipation)." },
      { id: "frog_spot", name: "Poison Dart Frog", emoji: "🐸", x: 45, y: 84, funFact: "Dart frogs exhibit vivid aposematic (warning) coloration, signaling their hyper-lethal skin alkaloids derived from their native diet of toxic rainforest beetles." }
    ]
  },
  {
    id: "europe",
    name: "Europe",
    emoji: "🦊",
    colorClass: "bg-blue-50 hover:bg-blue-100 text-blue-800 border-blue-200",
    hoverColorClass: "fill-blue-400 stroke-blue-650",
    landscapeBg: "bg-gradient-to-b from-blue-100 via-orange-50 to-amber-900/40",
    habitatDescription: "The seasonal deciduous woodlands, mixed riverine floodplains, and dense scrub-grasslands of central Europe.",
    animals: [
      {
        id: "red_fox",
        name: "Red Fox",
        species: "Vulpes vulpes",
        emoji: "🦊",
        description: "An incredibly adaptable, opportunistic carnivore showcasing keen acoustic localization skills, active across agricultural edges and deep deciduous forests.",
        diet: "Opportunistic Omnivore (Preys on rodents, lagomorphs, worms, and seasonal wild berries)",
        size: "Slender, agile frame weighing 10-18 pounds; optimized for jumping and fast escapes.",
        funFact: "Red foxes can hear sub-surface mouse movements underneath deep sheets of snow, orienting themselves by sensing the Earth's magnetic fields to leap and capture prey.",
        habitatName: "Deciduous Edge & Grass Fields",
        coordinate: { x: 72, y: 68 },
        styleConfig: {
          rotation: "hover:rotate-12",
          scale: "hover:scale-125 focus:scale-125",
          bounceDelay: "delay-150"
        },
        questions: [
          {
            question: "How do Red Foxes utilize Earth's geomagnetic field to capture sub-surface rodents buried under deep snow?",
            options: ["They jump toward the magnetic north to align their leaps, improving hunting accuracy!", "They use magnetic currents to warm up freezing snow banks", "They navigate towards thermal active volcanoes"],
            answer: "They jump toward the magnetic north to align their leaps, improving hunting accuracy!",
            reason: "Using their compass sense, a fox maps the visual and audio vectors of a mouse. Jumping towards magnetic north ensures a fixed alignment relative to sound refraction, boosting successful hits under deep snow."
          },
          {
            question: "The fox's bushy tail, or 'brush', is an adaptation. What are its dual biological primary functions?",
            options: ["It generates static electricity to stun bugs, and acts as a tracking anchor", "It acts as a counterbalance for sharp turns, and provides insulation for the face and paws in freezing sleep!", "It stores excess water like a desert camel's hump"],
            answer: "It acts as a counterbalance for sharp turns, and provides insulation for the face and paws in freezing sleep!",
            reason: "The brush works as a dynamic rudder when sprinting on a zig-zag vector. In sleep, the fox curls compactly, wrapping its tail over its delicate facial capillaries and digits to reduce thermal radiation loss."
          }
        ]
      },
      {
        id: "eurasian_badger",
        name: "Eurasian Badger",
        species: "Meles meles",
        emoji: "🦡",
        description: "A highly social, stocky burrower with powerful structural adaptations for excavation, inhabiting extensive complex multi-generational underground tunnel systems.",
        diet: "Omnivore (Ecosytem cleanser that feeds on earthworms, bulbs, acorns, small reptiles, and invertebrates)",
        size: "Low-slung, robust skeletal structure; weighing 15-28 pounds of high mechanical power.",
        funFact: "Badgers construct highly organized, clean subterranean networks called 'setts' that are passed down and expanded by badger clans for over a century.",
        habitatName: "Sandy Silt Woods & Sub-surface Setts",
        coordinate: { x: 26, y: 78 },
        styleConfig: {
          rotation: "hover:-rotate-3",
          scale: "hover:scale-125 focus:scale-125",
          bounceDelay: "delay-400"
        },
        questions: [
          {
            question: "A badger family lives in an extensive network of sub-surface tunnels and chambers. What is the scientific term for these structures?",
            options: ["Underground Setts", "Raptor Eyries", "Subalpine Glaciers"],
            answer: "Underground Setts",
            reason: "A badger territory has a main burrow called a 'sett' featuring sleeping nests, emergency escape routes, and nurseries, insulated from thermal swings."
          },
          {
            question: "What hygiene behavioral adaptation is observed in Eurasian Badger clans inside their subterranean living quarters?",
            options: ["They frequently flood their tunnels to flush pests", "They clean their sleeping areas, removing damp nesting vegetation to dry in the sun!", "They construct mud brick air vents using forest timber"],
            answer: "They clean their sleeping areas, removing damp nesting vegetation to dry in the sun!",
            reason: "Badgers are exceptionally tidy. They drag dry grass, straw, and moss underground for bedding, and regularly drag out damp, used bedding to minimize parasitic tick and flea lifecycles."
          }
        ]
      }
    ],
    extras: [
      { id: "birch_tree", name: "Deciduous Birch", emoji: "🌳", x: 80, y: 35, funFact: "Silver birch bark contains betulin, a hydrophobic organic resin that shields trees from decay, pests, and ambient water logging." },
      { id: "red_mushroom", name: "Fly Agaric", emoji: "🍄", x: 14, y: 84, funFact: "The colorful Amanita muscaria mushroom contains powerful psychotropic neurotoxins designed to stun insect grubs and discourage root herbivores." },
      { id: "hedgehog_meadow", name: "Swinhoe Hedgehog", emoji: "🦔", x: 48, y: 82, funFact: "Hedgehogs undergo state fluctuations during seasonal winter cold, entering an inactive state of hibernation where their pulse dips from 200 down to 10 beats per minute." },
      { id: "snail_flower", name: "Garden Gastropod", emoji: "🐌", x: 60, y: 76, funFact: "Some land snails can survive extreme dry heat by entering dry-state estivation, sealing their shells with a dried waxy mucus barrier called an epiphragm." }
    ]
  },
  {
    id: "africa",
    name: "Africa",
    emoji: "🦁",
    colorClass: "bg-amber-50 hover:bg-amber-100 text-amber-805 border-amber-200",
    landscapeBg: "bg-gradient-to-b from-amber-200 via-orange-50 to-orange-950/40",
    hoverColorClass: "fill-amber-400 stroke-amber-650",
    habitatDescription: "The diverse grassy savannas, fluctuating riparian watering basins, and hot acacia plain woodlands.",
    animals: [
      {
        id: "lion",
        name: "Lion",
        species: "Panthera leo",
        emoji: "🦁",
        description: "An apex predator and the only social feline, forming highly cooperative family groups called 'prides' that utilize synchronized pack hunting tactics to take down fast savanna herbivores.",
        diet: "Carnivore (Cooperative tracker of wildebeests, zebras, and buffaloes)",
        size: "Extremely muscular; males can weigh up to 420 pounds with prominent dark protective manes.",
        funFact: "A lion's low-frequency roar is designed to carry up to 5 miles (8 kilometers) through ambient savanna air, communicating group boundaries.",
        habitatName: "Semi-Arid Savanna & Acacia Bluffs",
        coordinate: { x: 30, y: 64 },
        styleConfig: {
          rotation: "hover:rotate-6",
          scale: "hover:scale-125 focus:scale-125",
          bounceDelay: "delay-100"
        },
        questions: [
          {
            question: "Unlike solitary big cats like tigers or jaguars, lions hunt cooperatively in prides. What is an evolutionary advantage of social group hunting?",
            options: ["It reduces thermal sun damage to their coats", "It permits the capture of mega-herbivores and increases territories through organized defensive patrols", "It enables them to digest complex grasses"],
            answer: "It permits the capture of mega-herbivores and increases territories through organized defensive patrols",
            reason: "Organized pride hunting allows lions to overpower large, high-energy herd prey (like African buffaloes) that are too powerful and dangerous for a single feline to handle."
          },
          {
            question: "The thick dark mane of a mature male African Lion serves which primary physiological and behavioral purposes?",
            options: ["It protects vital neck arterials during territory disputes, and works as an honest signal of testosterone and health", "It serves as solar panels to heat up their body core", "It filter-feeds dust particles during savannas sandstorms"],
            answer: "It protects vital neck arterials during territory disputes, and works as an honest signal of testosterone and health",
            reason: "Manes shield vulnerable throat pathways from rival claws during conflicts. A dark, thick mane of high density also signals high fitness and physical status to prospective prides."
          }
        ]
      },
      {
        id: "hippo",
        name: "Hippopotamus",
        species: "Hippopotamus amphibius",
        emoji: "🦛",
        description: "A semi-aquatic mega-herbivore with complex territorial behaviors, relying on riparian river basins and mud cover for active skin protection.",
        diet: "Herbivore (Forages on savanna grasses during nocturnally cooler terrestrial hours)",
        size: "Immense! Weighs up to 3,500 pounds, requiring heavy bone structures and specialized dense limbs.",
        funFact: "Hippos possess specialized skin glands that secrete a red fluid with acidic bactericidal action, acting as a natural sunscreen (often called 'blood sweat').",
        habitatName: "Fluctuating Riparian Waters & Silt Estuaries",
        coordinate: { x: 74, y: 76 },
        styleConfig: {
          rotation: "hover:-rotate-6",
          scale: "hover:scale-125 focus:scale-125",
          bounceDelay: "delay-300"
        },
        questions: [
          {
            question: "Hippos secrete a reddish, alkaline secretion from skin glands. What critical physiological roles does this 'blood sweat' serve?",
            options: ["It carries high-potency toxic poisons to kill predators", "It acts as an broad-spectrum natural sunscreen, moisture sealer, and antiseptic barrier!", "It acts as a pheromone warning of low river levels"],
            answer: "It acts as an broad-spectrum natural sunscreen, moisture sealer, and antiseptic barrier!",
            reason: "Hippos lack sweat glands. This secretion absorbs UV radiation, prevents skin dehydration from blazing winds, and contains acidic compounds that fight bacterial infections in swampy rivers."
          },
          {
            question: "How do hippos actively influence the food webs of African freshwater river basins?",
            options: ["They prey heavily on local river trout", "They transfer tons of digested nutrients from terrestrial grasslands into river basins through their waste, feeding aquatic life!", "They filter-feed on microscopic oceanic phytoplankton"],
            answer: "They transfer tons of digested nutrients from terrestrial grasslands into river basins through their waste, feeding aquatic life!",
            reason: "By feeding on shorelines at night and depositing processed organic matter into aquatic channels during day, hippos act as vital nutrient vectors, feeding diverse aquatic bacteria, fish, and freshwater ecosystems."
          }
        ]
      }
    ],
    extras: [
      { id: "savanna_tree", name: "Savanna Baobab", emoji: "🌳", x: 12, y: 45, funFact: "The Baobab tree is a drought adaptation master, storing up to 30,000 gallons of water in its fibrous, spongy trunk to endure seasonal dry spells." },
      { id: "savanna_grass", name: "Zebra Grass", emoji: "🌾", x: 40, y: 75, funFact: "Savanna grasses rely on deep starch root systems that allow them to regenerate rapidly after grazing strikes or wildfires." },
      { id: "clever_suricate", name: "Reticulated Giraffe", emoji: "🦒", x: 88, y: 48, funFact: "Giraffes have specialized long prehensile tongues up to 18 inches, with thick calloused margins, designed to strip leaves from thorny acacia bushes without tearing tissue." },
      { id: "mud_splash", name: "Mineral Lick Mud", emoji: "💦", x: 62, y: 84, funFact: "Ecosystem mud holes hold concentrated trace minerals and clay salts that animals actively consume or roll in to purge gut parasitic worms." }
    ]
  },
  {
    id: "asia",
    name: "Asia",
    emoji: "🐼",
    colorClass: "bg-red-50 hover:bg-red-100 text-red-800 border-red-200",
    landscapeBg: "bg-gradient-to-b from-sky-200 via-rose-50 to-emerald-900/40",
    hoverColorClass: "fill-red-400 stroke-red-650",
    habitatDescription: "From misty highland bamboo ranges to broad subtropical broadleaf jungle undergrowths.",
    animals: [
      {
        id: "giant_panda",
        name: "Giant Panda",
        species: "Ailuropoda melanoleuca",
        emoji: "🐼",
        description: "A specialized high-altitude bear with complex cranial structures optimized for fiber digestion, inhabiting temperate montane cloud forests.",
        diet: "Herbivore (Bamboo shoots, roots, and fibrous pulp representing 99% of nutritional intake)",
        size: "Approximately 4-5 feet long; robust jaw structures designed to process woody stalks.",
        funFact: "Pandas lack typical ungulate ruminant guts, digesting cellulose inefficiently; they must consume up to 30-40 lbs of bamboo daily to absorb sufficient nutrients.",
        habitatName: "Montane Cloud Bamboo Forests",
        coordinate: { x: 26, y: 72 },
        styleConfig: {
          rotation: "hover:rotate-6",
          scale: "hover:scale-125 focus:scale-125",
          bounceDelay: "delay-200"
        },
        questions: [
          {
            question: "Why do Giant Pandas need to spend up to 12-16 hours every day consuming bamboo woody stalks?",
            options: ["Bamboo has a highly complex, chemical defense pattern that slows them down", "As a member of the carnivore order, pandas have an inefficient carnivorous gut that digests tough plant cellulose poorly, demanding high ingestion volume!", "They rely on the chewing action to heat their body core"],
            answer: "As a member of the carnivore order, pandas have an inefficient carnivorous gut that digests tough plant cellulose poorly, demanding high ingestion volume!",
            reason: "Pandas evolved from carnivores and still possess simple digestive tracts typical of meat-eaters. They lack the multi-chambered cellulose-fermenting stomachs of cows, so they must consume huge volumes of bamboo to extract daily energy."
          },
          {
            question: "What physical wrist adaptation do Giant Pandas possess that helps them hold slippery bamboo stems?",
            options: ["An enlarged sesamoid bone that functions as an opposable 'pseudo-thumb'", "Retractable razor claws for scaling tree canopies", "Suction-cup pads similar to tropical geckos"],
            answer: "An enlarged sesamoid bone that functions as an opposable 'pseudo-thumb'",
            reason: "Pandas have a modified wrist bone called a radial sesamoid. It is covered by a muscular pad, acting as a flexible extra thumb to grasp, peel, and strip tough bamboo leaves with extreme motor control."
          }
        ]
      },
      {
        id: "bengal_tiger",
        name: "Bengal Tiger",
        species: "Panthera tigris tigris",
        emoji: "🐯",
        description: "A formidable apex predator that lives in deep forests and wetlands, possessing distinctive camouflage stripes to execute high-impact ambush strikes.",
        diet: "Carnivore (Solitary hunter of ungulates, deer, wild boars, and river banks crocodiles)",
        size: "Massive! Reaching 9-10 feet in length; weighing 350-500 pounds of powerful strike potential.",
        funFact: "A tiger's stripes are not just on its hair follicles, but are actual dermal pigment patterns directly in its skin.",
        habitatName: "Riparian Swamps & Subtropical Sal Woods",
        coordinate: { x: 70, y: 64 },
        styleConfig: {
          rotation: "hover:-rotate-6",
          scale: "hover:scale-125 focus:scale-125",
          bounceDelay: "delay-400"
        },
        questions: [
          {
            question: "Tiger stripes serve as 'disruptive camouflage'. If a tiger was completely solid orange, how would this affect its ecological success?",
            options: ["It would lose the ability to swim in river delta networks", "Prey animals in dense grasses would spot its silhouette instantly, leading to starvation because tigers are short-burst ambush hunters!", "Solar heat absorption would rise to fatal levels"],
            answer: "Prey animals in dense grasses would spot its silhouette instantly, leading to starvation because tigers are short-burst ambush hunters!",
            reason: "Tigers are solitary predators that cannot chase prey over long distances. They rely on slipping through reeds unnoticed. Their vertical stripes break up their profile in grasslands, allowing them to close the distance for a strike."
          },
          {
            question: "Bengal Tigers inhabit coastal mangrove ecosystems like the Sundarbans. What aquatic behavior reinforces their survival there?",
            options: ["They possess subcutaneous bladders to float permanently in saltwater", "They are strong swimmers, crossing wide tidal estuaries and hunting in aquatic channels!", "They rely on gills to sleep underwater"],
            answer: "They are strong swimmers, crossing wide tidal estuaries and hunting in aquatic channels!",
            reason: "Bengal Tigers are water-tolerant. In delta mangroves, they cross rivers up to 10 miles wide to track prey and secure territories, competing aggressively on water-land edges."
          }
        ]
      }
    ],
    extras: [
      { id: "bamboo_stick", name: "High-Density Bamboo", emoji: "🎋", x: 12, y: 55, funFact: "Bamboo utilizes localized high-growth rhizome root systems, allowing shoots to grow up to 36 inches in 24 hours via cell expansion." },
      { id: "cherry_bloom", name: "Cerasus Flora", emoji: "🌸", x: 80, y: 25, funFact: "Deciduous cherry blossoms bloom synchronously to overload seed predators, facilitating wide-scale forest pollination." },
      { id: "cute_crane", name: "Red-Crowned Crane", emoji: "🦩", x: 42, y: 45, funFact: "Red-crowned cranes act as wetland indicator species; their population health reflects the levels of biological toxins in freshwater water tables." },
      { id: "mist_mountain", name: "Tectonic Uplift Peaks", emoji: "🗻", x: 50, y: 15, funFact: "The Himalayas serve as a critical rain-shadow boundary, blocking moist monsoon clouds and generating the arid Tibetan cold deserts." }
    ]
  },
  {
    id: "australia",
    name: "Australia",
    emoji: "🦘",
    colorClass: "bg-orange-50 hover:bg-orange-100 text-orange-850 border-orange-200",
    landscapeBg: "bg-gradient-to-b from-sky-200 via-orange-100 to-amber-955/40",
    hoverColorClass: "fill-orange-400 stroke-orange-650",
    habitatDescription: "Extreme dry outback arid lands and hyper-specialized eucalyptus forest tracts.",
    animals: [
      {
        id: "kangaroo",
        name: "Red Kangaroo",
        species: "Macropus rufus",
        emoji: "🦘",
        description: "The largest native marsupial, possessing massive hind tendons that function as elastic springs to migrate efficiently across vast, water-scarce deserts.",
        diet: "Herbivore (Grazer of desert scrub-grasses, seed pods, and succulent cacti)",
        size: "Stands up to 6 feet tall; muscular tail performs as a vital third limb for structural tripod support.",
        funFact: "Kangaroo hopping behaves under elastic strain energy; their leg tendons rebound mechanical energy, reducing oxygen demands as speed increases.",
        habitatName: "Xeric Outback Shrublands & Dunes",
        coordinate: { x: 30, y: 68 },
        styleConfig: {
          rotation: "hover:rotate-6",
          scale: "hover:scale-125 focus:scale-125",
          bounceDelay: "delay-150"
        },
        questions: [
          {
            question: "How does a Kangaroo's hopping biomechanics reflect an extraordinary metabolic energy-saving adaptation?",
            options: ["Each bounce stores and releases elastic strain energy in their leg tendons, demanding less respiratory oxygen as speed increases!", "They rely on wind currents to lift their tails", "They digest lipids inside their pouches to generate lift"],
            answer: "Each bounce stores and releases elastic strain energy in their leg tendons, demanding less respiratory oxygen as speed increases!",
            reason: "Kangaroo tendons act like mechanical springs. When they land, energy is captured; when they push off, it rebounds. This makes hopping more energy-efficient than running on four limbs, helping them cross vast desert areas."
          },
          {
            question: "Kangaroo reproduction is highly adapted to drought. What survival strategy do mother kangaroos display?",
            options: ["They lay waterproof eggs under sandy river beds", "They can pause a newly fertilized embryo's development (embryonic diapause) until environmental conditions improve!", "They migrate to cold subalpine regions to give birth"],
            answer: "They can pause a newly fertilized embryo's development (embryonic diapause) until environmental conditions improve!",
            reason: "This is a key adaptation to volatile arid biomes. If food is scarce or water has run dry, the mother can pause the growth of an internal embryo until rain triggers plant growth, preventing metabolic strain."
          }
        ]
      },
      {
        id: "koala",
        name: "Koala",
        species: "Phascolarctos cinereus",
        emoji: "🐨",
        description: "An arboreal marsupial displaying high physical diet-specialization, adapted to occupy the high forks of eucalyptus zones.",
        diet: "Folivore (Consumes leaves of specific eucalyptus species containing toxic terpene compounds)",
        size: "Roughly 2.5 feet tall; dense, insulating gray fur balances volatile wind and rain exposures.",
        funFact: "Koalas sleep up to 20 hours daily; their low-energy eucalyptus diet contains highly toxic tannins that demand heavy liver enzyme processing.",
        habitatName: "Eucalyptus Canopy Forks & Dry Bushes",
        coordinate: { x: 74, y: 35 },
        styleConfig: {
          rotation: "hover:-rotate-12",
          scale: "hover:scale-125 focus:scale-125",
          bounceDelay: "delay-300"
        },
        questions: [
          {
            question: "Eucalyptus leaves contain toxic terpenes and tannins that are lethal to other animals. How do Koalas manage to consume them?",
            options: ["They boil the canopy leaves using early morning sun heat", "They possess specialized cytochrome P450 liver enzymes that break down and detoxify these compounds!", "They only eat petrified fossilized leaves"],
            answer: "They possess specialized cytochrome P450 liver enzymes that break down and detoxify these compounds!",
            reason: "Koalas are highly specialized. Their livers secrete complex enzymes to process toxic foliage. They also have a extremely long caecum containing symbiotic microflora to ferment tough plant cell walls."
          },
          {
            question: "Why do koalas actively spend up to 18-22 hours of their day in complete physical inactivity?",
            options: ["To digest complex fibers and limit oxygen expenditure because their specialized diet contains very low caloric value!", "To avoid falling from high eucalyptus branches during active winds", "To allow solar radiation to synthesize lipids on their fur"],
            answer: "To digest complex fibers and limit oxygen expenditure because their specialized diet contains very low caloric value!",
            reason: "Eucalyptus leaves provide very little digestible energy. Sleeping is a vital behavioral energy-conservation strategy, lowering their basal metabolic rate to manage their restrictive calorie budget."
          }
        ]
      }
    ],
    extras: [
      { id: "euca_trunk", name: "Sclerophyll Eucalyptus", emoji: "🌳", x: 78, y: 20, funFact: "Eucalyptus trees produce oil rich in flammable terpenes, which promote controlled forest fires to eliminate competing vegetation." },
      { id: "desert_rock", name: "Sandstone Monolith", emoji: "⛰️", x: 12, y: 78, funFact: "Uluru is an underground-connected sandstone block whose red pigmentation stems from fast surface oxidation (iron rusting)." },
      { id: "cute_cockatoo", name: "Sulphur Cockatoo", emoji: "🦜", x: 44, y: 30, funFact: "White cockatoos exhibit complex cognitive problem-solving, opening urban bins and warning flocks using targeted high-frequency alarm calls." },
      { id: "outback_dust", name: "Spinifex Hummock", emoji: "🌾", x: 52, y: 82, funFact: "Spinifex grasses utilize deep silica-lined leaves to prevent surface evaporation, stabilizing outback dune systems from wind shear." }
    ]
  },
  {
    id: "antarctica",
    name: "Antarctica",
    emoji: "🐧",
    colorClass: "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200",
    landscapeBg: "bg-gradient-to-b from-sky-300 via-cyan-50 to-slate-300/40",
    hoverColorClass: "fill-slate-300 stroke-slate-550",
    habitatDescription: "Hyper-freezing glacial ice shelves, catastrophic convective blizzards, and deep benthic polar waters.",
    animals: [
      {
        id: "emperor_penguin",
        name: "Emperor Penguin",
        species: "Aptenodytes forsteri",
        emoji: "🐧",
        description: "An incredibly cold-tolerant seabird utilizing deep sub-surface diving skills and complex social behaviors to raise young during polar winters.",
        diet: "Carnivore (Fishes for krill, silverfish, and benthic cephalopods)",
        size: "Stands 4 feet tall; layered, high-density feathers construct a robust thermal canopy.",
        funFact: "Emperor Penguins can dive to depths of 1,700 feet (500 meters), holding their breath for over 20 minutes by reducing cardiovascular activity.",
        habitatName: "Fast Ice Fields & Sub-Zero Waters",
        coordinate: { x: 28, y: 72 },
        styleConfig: {
          rotation: "hover:-rotate-6",
          scale: "hover:scale-125 focus:scale-125",
          bounceDelay: "delay-200"
        },
        questions: [
          {
            question: "How do male Emperor Penguins manage to incubate a clutch egg for 65 sub-zero days without eating or moving?",
            options: ["They protect the egg on top of their fast feet under a specialized abdomen fold (brood patch), relying on deep adipose reserves!", "They bury the egg under hot sulfur geysers", "They share thermal duties with sea whales"],
            answer: "They protect the egg on top of their fast feet under a specialized abdomen fold (brood patch), relying on deep adipose reserves!",
            reason: "The brood patch is a featherless, highly vascularized skin flap. Keeping the egg balanced on their feet isolates it from ice currents, warming it up to 98°F (37°C) while the male survives on high fat reserves."
          },
          {
            question: "Emperor Penguin colonies utilize dense huddling behaviors. What is the physical thermodynamic mechanism of this adaptation?",
            options: ["It blocks UV radiation from reflective snow fields", "It minimizes exposed surface area to volume, reducing individual heat loss by up to 50% and capturing a warm microclimate!", "It generates seismic vibrations that break up solid ice shelves"],
            answer: "It minimizes exposed surface area to volume, reducing individual heat loss by up to 50% and capturing a warm microclimate!",
            reason: "A huddle acts as a single super-organism. By packing tightly together, penguins reduce the cold air drafts flowing over their feathers. The interior path coordinates a microclimate of up to 95°F (35°C), saving immense metabolic energy."
          }
        ]
      },
      {
        id: "blue_whale",
        name: "Blue Whale",
        species: "Balaenoptera musculus",
        emoji: "🐋",
        description: "The largest mammal in Earth's evolutionary history; a baleen filter-feeder that migrates to polar oceans to exploit high-density nutrient upwellings.",
        diet: "Planktivorous Carnivore (Filters massive volumes of water to capture millions of small krill crustacea)",
        size: "Colossal! Reaches lengths of 90-100 feet; weighing up to 150-190 tons.",
        funFact: "A blue whale's vocalization can reach 188 decibels, propagating across ocean basins for hundreds of miles to map geographic terrains.",
        habitatName: "Pelagic Upwelling Zones & Polar Rifts",
        coordinate: { x: 72, y: 58 },
        styleConfig: {
          rotation: "hover:rotate-6",
          scale: "hover:scale-125 focus:scale-125",
          bounceDelay: "delay-450"
        },
        questions: [
          {
            question: "How do Blue Whales process millions of tiny krill from deep polar ocean water while preventing ingestion of massive saltwater volumes?",
            options: ["They use specialized filter structures called 'baleen plates' made of keratin to trap krill while pushing water out using their tongue!", "They rely on long acidic tentacles to stun crustacea", "They swallow whole schools intact, later filtering salt in specialized renal pathways"],
            answer: "They use specialized filter structures called 'baleen plates' made of keratin to trap krill while pushing water out using their tongue!",
            reason: "Instead of teeth, blue whales have fibrous baleen plates. They gulp water, expand their ventral throat pleats, and then use their titanic tongue to compress the pocket, straining water through baleen while trapping tons of krill."
          },
          {
            question: "During polar summer, cold deep-water ocean currents rise to the surface. What is this crucial marine process called, and how does it feed whales?",
            options: ["Eutrophication of nitrogen runoffs", "Ocean Upwelling, which carries deep nitrates and minerals to the surface, triggering massive phytoplankton blooms that feed swarms of krill!", "Tidal gravity subduction"],
            answer: "Ocean Upwelling, which carries deep nitrates and minerals to the surface, triggering massive phytoplankton blooms that feed swarms of krill!",
            reason: "Upwelling brings mineral-filled deep water to the sunlit photic zone. This triggers rapid microscopic plant growth (phytoplankton), which in turn feeds astronomical numbers of krill, attracting blue whales to feed."
          }
        ]
      }
    ],
    extras: [
      { id: "iceberg_floating", name: "Thermohaline Glacier", emoji: "🏔️", x: 14, y: 38, funFact: "Icebergs break off from terrestrial glaciers. Because ice is roughly 10% less dense than cold seawater, 90% of its volume rests underwater." },
      { id: "krill_swarm", name: "Euphausiid Krill Swarms", emoji: "🦐", x: 80, y: 84, funFact: "Polar krill gather in gargantuan swarms that can stretch for miles, acting as the fundamental trophic foundation of the entire ocean food web." },
      { id: "funny_snowman", name: "Scientific Core", emoji: "⛄", x: 50, y: 76, funFact: "Ice cores drilled in Antarctica trap tiny pockets of atmosphere from up to 800,000 years ago, serving as historical records of carbon dioxide levels." },
      { id: "polar_sky", name: "Auroral Magnetosphere", emoji: "🌌", x: 48, y: 15, funFact: "The Southern Lights arise when solar winds (ionized protons and electrons) collide with gases in Earth's upper magnetic field lines, releasing light." }
    ]
  }
];

export const GENERAL_QUIZ_POOL: QuizQuestion[] = [
  {
    question: "Which term describes a species (like the grizzly bear or jaguar) that has a disproportionately large impact on its natural community, maintaining ecosystem diversity?",
    options: ["Invasive species", "Keystone species", "Secondary consumer"],
    answer: "Keystone species",
    reason: "Keystone species operate like the central stone in a stone arch. If removed, the ecological balance collapses, drastically altering prey, plant, and fungal populations."
  },
  {
    question: "What is an aerodynamic advantage of the slotted wingtip feathers (primary feathers) observed in soaring raptors like the Bald Eagle?",
    options: ["They generate chemical propulsion", "They reduce induced drag vortices and harness thermal updrafts efficiently", "They store moisture to prevent temperature dehydration"],
    answer: "They reduce induced drag vortices and harness thermal updrafts efficiently",
    reason: "By separating wingtip feathers, eagles produce tiny high-pressure vents. This dampens circular air eddies (drag vortices), allowing massive gliding distances without burning critical metabolic energy."
  },
  {
    question: "Sloths have a mutualistic relationship with green algae (chlorophyta). What is mutualism?",
    options: ["An ecological interaction where one species suffers while the other benefits", "A symbiotic relationship where both species derive mutual evolutionary benefits!", "A temporary predatory chase"],
    answer: "A symbiotic relationship where both species derive mutual evolutionary benefits!",
    reason: "In mutualism, both species gain. The sloth receives protective camouflage and skin lipids, while the algae gets a safe, hydrated habitat and nitrogen compounds from sloth hair."
  },
  {
    question: "How do male Emperor Penguins manage to keep their eggs warm on frozen Antarctic shelves in high winter storms?",
    options: ["By nesting deep inside geothermal active volcanic vents", "By balancing the egg on their vascular feet under a specialized abdomen skin patch", "By burying the egg under insulating snow dunes"],
    answer: "By balancing the egg on their vascular feet under a specialized abdomen skin patch",
    reason: "Male penguins have a featherless brood patch high in blood vessels. Placing the egg upon their feet shields it from glacial convection currents and supplies body heat via direct contact."
  },
  {
    question: "What biological factor explains why Koalas can feed primarily on toxic Eucalyptus leaves which would kill other mammals?",
    options: ["They crush toxic leaves under heavy gizzard stones in their stomach", "They secrete complex Cytochrome P450 enzymes inside their liver to break down toxins safely!", "They store the toxic tannins in their tails to release later"],
    answer: "They secrete complex Cytochrome P450 enzymes inside their liver to break down toxins safely!",
    reason: "Koalas possess an expanded gene bank for Cytochrome P450 liver proteins. These specialized enzymes bind to and detoxify eucalyptus terpenes, filtering them out before they reach target organs."
  },
  {
    question: "How does the Red Kangaroo save oxygen and conserve physical energy while bounding across dry Outback shrublands?",
    options: ["They absorb trailing wind currents via prehensile ears", "Their powerful leg tendons dynamically act as mechanical springs, storing and releasing elastic strain energy!", "They collapse their lungs to reduce internal friction"],
    answer: "Their powerful leg tendons dynamically act as mechanical springs, storing and releasing elastic strain energy!",
    reason: "Kangaroo tendons function like high-response elastic rubber bands. Upon impact, kinetic energy is conserved; upon rebound, it launches them forward, reducing active muscle work at high speeds."
  }
];
