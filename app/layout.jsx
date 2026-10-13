import "@/styles/globals.css";

export const metadata = {
  title: "Tesla Motors",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="bg-slate-950 text-white min-h-screen"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
