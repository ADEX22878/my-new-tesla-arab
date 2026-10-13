import React from "react";
import { Heart, Repeat2, MessageSquare, CheckCircle2 } from "lucide-react";

export default function CEOAnnouncements() {
  return (
    <section className="py-16 bg-slate-900/30 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">
            Straight from the <span className="text-red-500">CEO</span>
          </h2>
          <p className="text-slate-400 text-sm">
            Official announcements from Tesla leadership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Post 1 */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/images/ceo-img.jfif"
                alt="Elon Musk"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-white text-sm">
                    Elon Musk
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-blue-400 fill-blue-400" />
                </div>
                <p className="text-xs text-slate-500">@elonmusk • Official</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Tesla is committed to accelerating the world's transition to
              sustainable energy. As part of our mission, we're launching a
              worldwide giveaway of electric vehicles — completely free entry!
              🚗⚡
            </p>
            <div className="flex items-center gap-6 text-xs text-slate-400 border-t border-slate-800/80 pt-4">
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-500" /> 2.4M
              </span>
              <span className="flex items-center gap-1.5">
                <Repeat2 className="w-4 h-4 text-emerald-400" /> 380K
              </span>
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-indigo-400" /> 125K
              </span>
            </div>
          </div>

          {/* Post 2 */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center font-bold text-white text-lg">
                T
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-white text-sm">
                    Tesla Official
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-blue-400 fill-blue-400" />
                </div>
                <p className="text-xs text-slate-500">
                  @Tesla • Official Account
                </p>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              📢 OFFICIAL ANNOUNCEMENT: Our global Tesla car giveaway is NOW
              LIVE. Open to all registered countries. Model 3, Model Y, Model S,
              Model X and Cybertruck available! ⚡🔋
            </p>
            <div className="flex items-center gap-6 text-xs text-slate-400 border-t border-slate-800/80 pt-4">
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-500" /> 1.8M
              </span>
              <span className="flex items-center gap-1.5">
                <Repeat2 className="w-4 h-4 text-emerald-400" /> 290K
              </span>
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-indigo-400" /> 95K
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
