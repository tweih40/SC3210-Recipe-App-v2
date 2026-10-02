import React from "react";
import { ChefHat, ShieldCheck, Flame, Info } from "lucide-react";

interface HeaderProps {
  onOpenRules: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenRules }) => {
  return (
    <header className="border-b border-stone-200 bg-stone-50/90 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-sm">
            <ChefHat className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-stone-900">
                Dorm Chef
              </h1>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                PGPR Edition
              </span>
            </div>
            <p className="text-xs text-stone-500 hidden sm:block">
              Fast leftover meals for Prince George's Park Residences
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="equipment-rules-btn"
            onClick={onOpenRules}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition border border-stone-200 shadow-xs"
            title="View PGPR Equipment Rules"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">Approved Gear Only</span>
            <Info className="w-3.5 h-3.5 text-stone-400" />
          </button>
        </div>
      </div>
    </header>
  );
};
