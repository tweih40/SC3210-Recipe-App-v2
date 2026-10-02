import React from "react";
import { X, CheckCircle2, XCircle, ShieldAlert, Utensils, Disc } from "lucide-react";

interface EquipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EquipmentModal: React.FC<EquipmentModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 relative max-h-[90vh] overflow-y-auto">
        <button
          id="close-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-3 text-amber-800">
          <ShieldAlert className="w-6 h-6 text-amber-600" />
          <h2 className="text-lg font-bold text-stone-900">
            PGPR Kitchenette & Equipment Policy
          </h2>
        </div>

        <p className="text-sm text-stone-600 mb-4 leading-relaxed">
          Prince George's Park Residences (PGPR) enforces strict fire safety and electrical load restrictions. Every generated recipe strictly adheres to the student's exact gear allowance:
        </p>

        <div className="space-y-3 mb-6">
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Allowed Equipment (Strictly Enforced)
            </h3>
            <ul className="text-sm text-emerald-950 space-y-1.5">
              <li className="flex items-start gap-2">
                <Disc className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Yum Asia Panda Mini Rice Cooker:</strong> 0.6L / 3.5-cup capacity, smart white/brown rice, steam, and slow cook functions.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Utensils className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Single Tri-Ply Stainless Steel Pan:</strong> Used on the single kitchenette induction/electric burner.
                </span>
              </li>
            </ul>
          </div>

          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-900 mb-2 flex items-center gap-1.5">
              <XCircle className="w-4 h-4 text-rose-600" />
              Prohibited in Generated Recipes
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs text-rose-900">
              <span className="flex items-center gap-1.5">🚫 No Oven or Broiler</span>
              <span className="flex items-center gap-1.5">🚫 No Multiple Burners</span>
              <span className="flex items-center gap-1.5">🚫 No Air Fryer</span>
              <span className="flex items-center gap-1.5">🚫 No Blender / Processor</span>
              <span className="flex items-center gap-1.5">🚫 No Deep Fryer</span>
              <span className="flex items-center gap-1.5">🚫 No Grill Appliances</span>
            </div>
          </div>
        </div>

        <button
          id="confirm-equipment-btn"
          onClick={onClose}
          className="w-full py-2.5 px-4 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 transition shadow-sm"
        >
          Got it, cook with approved equipment
        </button>
      </div>
    </div>
  );
};
