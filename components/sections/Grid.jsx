import React from "react";

export default function Grid() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-2xl bg-linear-to-br from-indigo-900/30 to-slate-900 border border-indigo-500/20">
          <p className="text-indigo-400 font-semibold text-sm uppercase mb-2">
            Step 1
          </p>
          <h3 className="text-2xl font-bold text-white mb-2">Register</h3>
          <p className="text-slate-400 text-sm">
            Submit your email address and basic details to secure your base
            entry slot.
          </p>
        </div>
        <div className="p-8 rounded-2xl bg-linear-to-br from-violet-900/30 to-slate-900 border border-violet-500/20">
          <p className="text-violet-400 font-semibold text-sm uppercase mb-2">
            Step 2
          </p>
          <h3 className="text-2xl font-bold text-white mb-2">Verify</h3>
          <p className="text-slate-400 text-sm">
            Confirm your contact info so we can reach you immediately if
            selected.
          </p>
        </div>
        <div className="p-8 rounded-2xl bg-linear-to-br from-pink-900/30 to-slate-900 border border-pink-500/20">
          <p className="text-pink-400 font-semibold text-sm uppercase mb-2">
            Step 3
          </p>
          <h3 className="text-2xl font-bold text-white mb-2">Win</h3>
          <p className="text-slate-400 text-sm">
            Live draw takes place at the end of the month with direct
            notification.
          </p>
        </div>
      </div>
    </section>
  );
}
