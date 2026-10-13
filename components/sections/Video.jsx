import React from "react";

export default function Video() {
  return (
    <section id="video" className="py-20 max-w-7xl mx-auto px-4 text-center">
      <div className="max-w-3xl mx-auto mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          See the Grand Prize
        </h2>
        <p className="text-slate-400">
          Take a tour of the vehicle waiting for its new owner.
        </p>
      </div>
      <div className="relative aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0"
          title="Giveaway Showcase Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  );
}
