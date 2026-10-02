import React from "react";
import { RecipeResponse } from "../types";
import { History, Clock, ArrowUpRight, Trash2 } from "lucide-react";

interface HistoryListProps {
  history: RecipeResponse[];
  onSelect: (recipe: RecipeResponse) => void;
  onClear: () => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({
  history,
  onSelect,
  onClear,
}) => {
  if (history.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-stone-500" />
          <h3 className="text-sm font-bold text-stone-900">Recent Dorm Meals</h3>
          <span className="text-xs text-stone-400">({history.length})</span>
        </div>
        <button
          onClick={onClear}
          className="text-xs text-stone-400 hover:text-rose-600 transition flex items-center gap-1"
          title="Clear history"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear</span>
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-2.5">
        {history.slice(0, 4).map((item, idx) => (
          <div
            key={idx}
            onClick={() => onSelect(item)}
            className="group p-3 rounded-xl border border-stone-200 hover:border-amber-400 hover:bg-amber-50/30 transition cursor-pointer flex items-center justify-between gap-2"
          >
            <div className="min-w-0">
              <span className="font-semibold text-xs text-stone-800 group-hover:text-amber-900 truncate block">
                {item.recipeName}
              </span>
              <span className="text-[11px] text-stone-400 truncate block">
                {item.cookTime || "Fast"} • {item.steps.length} steps
              </span>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-700 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};
