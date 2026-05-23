/**
 * Types representing state and data structure of Animal Habitat Explorer.
 */

export type ContinentId = 
  | "north-america"
  | "south-america"
  | "europe"
  | "africa"
  | "asia"
  | "australia"
  | "antarctica";

export interface Coordinate {
  x: number; // percentage from left, e.g. 20 for 20%
  y: number; // percentage from top, e.g. 50 for 50%
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
  reason: string;
}

export interface Animal {
  id: string;
  name: string;
  species: string;
  emoji: string;
  description: string;
  diet: string;
  size: string;
  funFact: string;
  habitatName: string;
  coordinate: Coordinate; // Position in the scavenger hunt view
  styleConfig: { // style tweaks for visual presentation
    rotation: string;
    scale: string;
    bounceDelay: string;
  };
  questions: QuizQuestion[];
}

export interface ContinentData {
  id: ContinentId;
  name: string;
  emoji: string;
  colorClass: string; // Background color for map
  hoverColorClass: string;
  habitatDescription: string;
  landscapeBg: string; // Tailwind class representing the landscape
  animals: Animal[];
  extras: Array<{ // Extra interactable environment props for scavenger hunts (e.g. tree, cloud, rock)
    id: string;
    name: string;
    emoji: string;
    x: number;
    y: number;
    funFact: string;
  }>;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  emoji: string;
  unlockedAt?: string;
  type: "animal" | "continent" | "quiz-champion";
  targetId?: string; // animal id or continent id
}

export interface UserProgress {
  foundAnimals: string[]; // ids of animals spotted
  completedQuizzes: string[]; // ids of animals whose quiz is completed (badge earned)
  consecutiveDays: number; // Daily streak tracker
  unlockedContinentBadges: ContinentId[]; // Continents fully completed
  generalQuizScore: number;
  generalQuizzesTaken: number;
}
