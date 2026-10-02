export interface RecipeResponse {
  recipeName: string;
  rawOutput: string;
  analysis: string;
  method: string;
  recipe: string;
  steps: string[];
  equipmentUsed: string[];
  equipmentComplianceCheck: boolean;
  cookTime?: string;
  cleanupRating?: string;
  dormChefTip?: string;
  createdAt?: string;
}

export interface DormPantryItem {
  name: string;
  category: "staple" | "protein" | "seasoning" | "fresh";
}
