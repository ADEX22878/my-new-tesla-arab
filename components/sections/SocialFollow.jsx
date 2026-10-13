import React from "react";

const socials = [
  {
    name: "Tesla Official",
    handle: "@Tesla",
    platform: "X / Twitter",
    followers: "21.5M Followers",
    color: "border-slate-800 hover:border-slate-600",
    url: "https://x.com/tesla",
  },
  {
    name: "Tesla",
    handle: "@Tesla",
    platform: "Facebook Page",
    followers: "12.8M Likes",
    color: "border-slate-800 hover:border-blue-500/50",
    url: "https://facebook.com/tesla",
  },
  {
    name: "Tesla",
    handle: "@teslamotors",
    platform: "Instagram",
    followers: "9.8M Followers",
    color: "border-slate-800 hover:border-pink-500/50",
    url: "https://instagram.com/teslamotors",
  },
];

export default function SocialFollow() {
  return (
    <section className="py-16 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">
          Follow <span className="text-red-500">Tesla</span> Official
        </h2>
        <p className="text-slate-400 text-sm mb-10">
          Verified official social media accounts of Tesla worldwide.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {socials.map((s, idx) => (
            <a
              key={idx}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-6 rounded-2xl bg-slate-900 border ${s.color} transition-all flex flex-col items-center justify-between cursor-pointer group hover:scale-[1.02]`}
            >
              <div className="w-12 h-12 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center font-bold text-xl mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors">
                T
              </div>
              <div>
                <h3 className="font-bold text-white text-base">{s.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{s.platform}</p>
                <p className="text-xs text-indigo-400 font-semibold mt-3">
                  {s.followers}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
