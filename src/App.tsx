import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { EquipmentModal } from "./components/EquipmentModal";
import { RecipeCard } from "./components/RecipeCard";
import { CookingTimer } from "./components/CookingTimer";
import { HistoryList } from "./components/HistoryList";
import { RecipeResponse } from "./types";
import {
  Sparkles,
  Search,
  Plus,
  RotateCw,
  AlertCircle,
  Flame,
  CheckCircle,
  X,
  ChefHat,
  Disc,
  UtensilsCrossed,
} from "lucide-react";

// Common leftovers in PGPR student mini-fridges
const QUICK_PANTRY_TAGS = [
  "short-grain Japanese rice",
  "eggs",
  "soy sauce",
  "spring onion",
  "chicken broth",
  "instant noodles",
  "leftover kimchi",
  "spam",
  "canned tuna",
  "tofu",
  "frozen dumplings",
  "sesame oil",
  "cheese slice",
  "garlic",
];

const PRESET_EXAMPLES = [
  {
    label: "Rice Cooker Oyakodon",
    ingredients: "short-grain Japanese rice, eggs, soy sauce, spring onion",
  },
  {
    label: "Kimchi Broth Noodles",
    ingredients: "chicken broth, instant noodles, leftover kimchi",
  },
  {
    label: "PGPR Spam & Egg Fried Rice",
    ingredients: "cooked rice, spam, eggs, soy sauce, spring onion",
  },
  {
    label: "Gyoza & Crisp Egg Pan",
    ingredients: "frozen dumplings, eggs, soy sauce, sesame oil",
  },
];

export default function App() {
  const [ingredientsInput, setIngredientsInput] = useState<string>(
    "short-grain Japanese rice, eggs, soy sauce, spring onion"
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentRecipe, setCurrentRecipe] = useState<RecipeResponse | null>(null);
  const [history, setHistory] = useState<RecipeResponse[]>([]);
  const [showRulesModal, setShowRulesModal] = useState<boolean>(false);

  // Load history from localStorage and populate initial recipe
  useEffect(() => {
    try {
      const saved = localStorage.getItem("dormchef_pgpr_history");
      if (saved) {
        const parsed = JSON.parse(saved);
        setHistory(parsed);
        if (parsed.length > 0) {
          setCurrentRecipe(parsed[0]);
          return;
        }
      }
    } catch {
      // Ignore localStorage read errors
    }

    // Default initial recipe from spec
    handleGenerate("short-grain Japanese rice, eggs, soy sauce, spring onion");
  }, []);

  // Save history to localStorage
  const saveToHistory = (newRecipe: RecipeResponse) => {
    setHistory((prev) => {
      const filtered = prev.filter((r) => r.recipeName !== newRecipe.recipeName);
      const updated = [newRecipe, ...filtered].slice(0, 10);
      try {
        localStorage.setItem("dormchef_pgpr_history", JSON.stringify(updated));
      } catch {
        // storage quota
      }
      return updated;
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem("dormchef_pgpr_history");
    } catch {
      // ignore
    }
  };

  const handleAddTag = (tag: string) => {
    const current = ingredientsInput.trim();
    if (!current) {
      setIngredientsInput(tag);
      return;
    }
    const list = current
      .split(",")
      .map((s) => s.trim().toLowerCase());
    if (!list.includes(tag.toLowerCase())) {
      setIngredientsInput(`${current}, ${tag}`);
    }
  };

  const handleGenerate = async (ingredientsToUse?: string) => {
    const rawInput = ingredientsToUse !== undefined ? ingredientsToUse : ingredientsInput;
    const trimmed = rawInput.trim();

    if (!trimmed) {
      setError("Please type or select at least 1 or 2 leftover ingredients.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: trimmed }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to generate recipe.");
      }

      const data: RecipeResponse = await res.json();
      data.createdAt = new Date().toISOString();
      setCurrentRecipe(data);
      saveToHistory(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 flex flex-col font-sans selection:bg-amber-200">
      <Header onOpenRules={() => setShowRulesModal(true)} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Intro banner */}
        <div className="bg-gradient-to-br from-amber-700 via-amber-800 to-stone-900 rounded-2xl p-5 sm:p-7 text-white shadow-sm relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-amber-200 text-xs font-semibold backdrop-blur-xs mb-3 border border-white/10">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Speed & Simplicity First</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
              Turn Dorm Leftovers into a Hot Meal in Minutes
            </h2>
            <p className="mt-2 text-stone-300 text-xs sm:text-sm leading-relaxed">
              Designed for PGPR students cooking on a single induction spot. Strictly zero ovens, zero multiple burners—just your{" "}
              <strong className="text-amber-300">Yum Asia Panda mini rice cooker</strong> and a{" "}
              <strong className="text-amber-300">single tri-ply stainless steel pan</strong>.
            </p>

            {/* Quick Equipment Tags */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
                <Disc className="w-3.5 h-3.5 text-emerald-400" />
                Yum Asia Panda (0.6L)
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
                <UtensilsCrossed className="w-3.5 h-3.5 text-emerald-400" />
                Single Tri-Ply Pan
              </span>
              <span className="text-stone-400 text-[11px] flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                Dorm Fire Code Compliant
              </span>
            </div>
          </div>
        </div>

        {/* Input Card */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <label
              htmlFor="ingredients-input"
              className="text-sm font-bold text-stone-900 flex items-center gap-2"
            >
              <Search className="w-4 h-4 text-amber-600" />
              What leftovers or pantry items do you have?
            </label>
            <span className="text-xs text-stone-400 font-medium">Comma-separated</span>
          </div>

          <div className="relative">
            <textarea
              id="ingredients-input"
              rows={2}
              value={ingredientsInput}
              onChange={(e) => setIngredientsInput(e.target.value)}
              placeholder="e.g. short-grain Japanese rice, eggs, soy sauce, spring onion"
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-100 text-sm placeholder:text-stone-400 outline-hidden transition resize-none bg-stone-50/50"
            />
            {ingredientsInput && (
              <button
                type="button"
                onClick={() => setIngredientsInput("")}
                className="absolute top-2.5 right-2.5 p-1 rounded-md text-stone-400 hover:text-stone-600 hover:bg-stone-200 transition"
                title="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick pantry chips */}
          <div>
            <div className="text-xs font-semibold text-stone-500 mb-2 flex items-center gap-1.5">
              <span>Quick add dorm staples:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_PANTRY_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleAddTag(tag)}
                  className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200 transition cursor-pointer"
                >
                  <Plus className="w-3 h-3 text-stone-400" />
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Presets */}
          <div className="pt-2 border-t border-stone-100">
            <div className="text-xs font-semibold text-stone-500 mb-2">
              Or test verified PGPR examples:
            </div>
            <div className="flex flex-wrap gap-2">
              {PRESET_EXAMPLES.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setIngredientsInput(preset.ingredients);
                    handleGenerate(preset.ingredients);
                  }}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/60 transition"
                >
                  ⚡ {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Error display */}
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit button */}
          <div className="pt-1">
            <button
              id="generate-recipe-btn"
              type="button"
              disabled={loading}
              onClick={() => handleGenerate()}
              className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white text-sm font-bold shadow-sm transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin" />
                  <span>Analyzing leftovers & selecting PGPR method...</span>
                </>
              ) : (
                <>
                  <ChefHat className="w-4 h-4" />
                  <span>Generate Dorm Recipe</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Cook Timer */}
        <CookingTimer />

        {/* Active Generated Recipe */}
        {currentRecipe && <RecipeCard recipe={currentRecipe} />}

        {/* History */}
        <HistoryList
          history={history}
          onSelect={(rec) => {
            setCurrentRecipe(rec);
            window.scrollTo({ top: 400, behavior: "smooth" });
          }}
          onClear={handleClearHistory}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-stone-50 py-4 text-center text-xs text-stone-500">
        <div className="max-w-4xl mx-auto px-4">
          <p>
            Dorm Chef • Optimized for Prince George's Park Residences (PGPR) • Yum Asia Panda Mini Rice Cooker & Single Tri-Ply Pan
          </p>
        </div>
      </footer>

      {/* Equipment rules modal */}
      <EquipmentModal
        isOpen={showRulesModal}
        onClose={() => setShowRulesModal(false)}
      />
    </div>
  );
}
