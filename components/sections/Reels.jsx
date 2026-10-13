import React from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  ThumbsUp,
  CheckCircle2,
} from "lucide-react";

const reelPosts = [
  {
    id: 1,
    title: "2026 Tesla Model 3 Standard Review",
    subtitle: "First review and driving experience of Tesla's cheapest car.",
    videoUrl: "https://www.youtube.com/embed/XTeWKmlNmN8",
    channel: "Edmunds Cars",
    subscribers: "1.4M subscribers",
    likes: "2.8K",
    commentsCount: "450",
    comments: [
      {
        user: "Mike Johnson",
        time: "2 hours ago",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
        text: "The return of the physical turn signal stalk is a game changer!",
        likes: "240",
      },
      {
        user: "Sarah Williams",
        time: "5 hours ago",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
        text: "Great review as always from Edmunds! The price point looks very compelling.",
        likes: "180",
      },
    ],
  },
  {
    id: 2,
    title: "More Proof from Winners",
    subtitle:
      "Watch real testimonials from Tesla car recipients around the world.",
    videoUrl: "https://www.youtube.com/embed/XTeWKmlNmN8",
    channel: "Tesla Global",
    subscribers: "8.5M subscribers",
    likes: "95K",
    commentsCount: "8,890",
    comments: [
      {
        user: "Elena Rostova",
        time: "3 hours ago",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
        text: "Delivery was super smooth! Tesla customer support guided me all the way.",
        likes: "3.1K",
      },
    ],
  },
];

export default function Reels() {
  return (
    <section className="py-16 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        {reelPosts.map((post) => (
          <div key={post.id} className="max-w-2xl mx-auto mb-20 last:mb-0">
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                {post.title}
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm">
                {post.subtitle}
              </p>
            </div>

            {/* Video Player Box */}
            <div className="relative aspect-9/16 max-w-85 mx-auto rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 mb-6">
              <iframe
                className="w-full h-full"
                src={post.videoUrl}
                title={post.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Social Channel Bar */}
            <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800/80 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center font-bold text-white text-base">
                  E
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-white text-sm">
                      {post.channel}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-blue-400 fill-blue-400" />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {post.subscribers}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-colors">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Engagement Stats Bar */}
            <div className="flex items-center justify-between text-xs text-slate-400 px-2 py-2 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 hover:text-white cursor-pointer">
                  <ThumbsUp className="w-4 h-4 text-indigo-400" /> {post.likes}
                </span>
                <span className="flex items-center gap-1.5 hover:text-white cursor-pointer">
                  <MessageCircle className="w-4 h-4 text-slate-400" />{" "}
                  {post.commentsCount} Comments
                </span>
              </div>
              <button className="flex items-center gap-1.5 hover:text-white">
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>

            {/* Comments Stream */}
            <div className="bg-slate-900/40 rounded-2xl p-4 border border-slate-800/60 space-y-4">
              <div className="text-xs font-bold text-slate-300 border-b border-slate-800 pb-2">
                Comments • {post.commentsCount}
              </div>

              {post.comments.map((comment, cIdx) => (
                <div key={cIdx} className="flex gap-3 text-left">
                  <img
                    src={comment.avatar}
                    alt={comment.user}
                    className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5"
                  />
                  <div className="flex-1 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-white">
                        {comment.user}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {comment.time}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mb-2">
                      {comment.text}
                    </p>
                    <div className="flex items-center gap-3 text-[10px] text-slate-400">
                      <button className="flex items-center gap-1 hover:text-indigo-400">
                        <ThumbsUp className="w-3 h-3" /> {comment.likes}
                      </button>
                      <button className="hover:text-white">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
