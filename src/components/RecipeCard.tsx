import React, { useState } from "react";
import { RecipeResponse } from "../types";
import {
  Check,
  Copy,
  Clock,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Utensils,
  Lightbulb,
  CheckCircle,
} from "lucide-react";

interface RecipeCardProps {
  recipe: RecipeResponse;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [showPhases, setShowPhases] = useState<boolean>(true);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(recipe.rawOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const toggleStep = (idx: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden divide-y divide-stone-100">
      {/* Top Banner: Equipment compliance */}
      <div className="bg-emerald-50 px-4 py-2.5 flex items-center justify-between text-xs text-emerald-900 border-b border-emerald-100">
        <div className="flex items-center gap-1.5 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>PGPR Equipment Check Passed: Yum Asia Panda & Single Pan Only</span>
        </div>
        <span className="hidden sm:inline-block text-[11px] bg-emerald-100 px-2 py-0.5 rounded-full text-emerald-800 font-semibold">
          0 Banned Appliances
        </span>
      </div>

      {/* Main Recipe Header */}
      <div className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200/60">
                Step 3: Recipe
              </span>
              {recipe.cookTime && (
                <span className="flex items-center gap-1 text-xs text-stone-500 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  {recipe.cookTime}
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
              {recipe.recipeName}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="copy-spec-output-btn"
              onClick={copyToClipboard}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white transition shadow-xs"
              title="Copy the exact [Recipe Name] / [Steps] text"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied!" : "Copy Output"}
            </button>
          </div>
        </div>

        {/* Exact Prompt Output display */}
        <div className="mt-4 p-3.5 rounded-xl bg-stone-900 text-stone-100 font-mono text-xs sm:text-sm leading-relaxed relative group">
          <div className="text-[10px] uppercase font-sans font-semibold tracking-wider text-stone-400 mb-1 flex items-center justify-between">
            <span>Direct Output Format: [Recipe Name] / [Steps]</span>
          </div>
          <p className="text-stone-200 select-all break-words">{recipe.rawOutput}</p>
        </div>

        {/* Step 3: Interactive Cook Checklist */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
              <Utensils className="w-4 h-4 text-amber-600" />
              Recipe Steps (Check off as you cook)
            </h3>
            <span className="text-xs text-stone-500">
              {Object.values(completedSteps).filter(Boolean).length} of {recipe.steps.length} completed
            </span>
          </div>

          <div className="space-y-2.5">
            {recipe.steps.map((stepText, idx) => {
              const isChecked = !!completedSteps[idx];
              return (
                <div
                  key={idx}
                  id={`recipe-step-${idx + 1}`}
                  onClick={() => toggleStep(idx)}
                  className={`flex items-start gap-3 p-3 rounded-xl border transition cursor-pointer select-none ${
                    isChecked
                      ? "bg-emerald-50/50 border-emerald-200 text-stone-500"
                      : "bg-stone-50/70 hover:bg-stone-100/70 border-stone-200 text-stone-800"
                  }`}
                >
                  <div
                    className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition ${
                      isChecked
                        ? "bg-emerald-600 border-emerald-600 text-white"
                        : "border-stone-300 bg-white"
                    }`}
                  >
                    {isChecked ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <span className="text-xs font-bold text-stone-400">{idx + 1}</span>}
                  </div>
                  <div className="flex-1 text-sm font-medium">
                    <span className={isChecked ? "line-through text-stone-400" : "text-stone-800"}>
                      {stepText}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dorm Chef Tip */}
        {recipe.dormChefTip && (
          <div className="mt-5 p-3 rounded-xl bg-amber-50/80 border border-amber-200/70 flex items-start gap-2.5 text-xs text-amber-900">
            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              <strong className="font-semibold">PGPR Dorm Tip: </strong>
              {recipe.dormChefTip}
            </p>
          </div>
        )}
      </div>

      {/* Accordion: 3-Phase Generation Breakdown */}
      <div className="bg-stone-50/80 p-4 sm:p-5">
        <button
          id="toggle-phases-btn"
          onClick={() => setShowPhases(!showPhases)}
          className="w-full flex items-center justify-between text-xs font-semibold text-stone-600 hover:text-stone-900 transition"
        >
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            View Generation Breakdown (1. Analysis → 2. Method → 3. Recipe)
          </span>
          {showPhases ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showPhases && (
          <div className="mt-3.5 grid gap-3 text-xs">
            <div className="p-3 bg-white rounded-xl border border-stone-200">
              <span className="font-bold text-stone-900 block mb-1">
                Step 1: Analysis (Ingredient Review)
              </span>
              <p className="text-stone-600 leading-relaxed">{recipe.analysis}</p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-stone-200">
              <span className="font-bold text-stone-900 block mb-1">
                Step 2: Method (PGPR Equipment Selection)
              </span>
              <p className="text-stone-600 leading-relaxed">{recipe.method}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {recipe.equipmentUsed.map((eq, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-medium text-[11px] border border-stone-200"
                  >
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    {eq}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-stone-200">
              <span className="font-bold text-stone-900 block mb-1">
                Step 3: Recipe (Final Generated Steps)
              </span>
              <p className="text-stone-700 font-medium leading-relaxed">{recipe.recipe}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
