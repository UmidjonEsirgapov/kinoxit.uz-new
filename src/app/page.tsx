"use client";

export default function HomePage() {
  const handleClick = () => {
    alert("Button clicked! Next.js is working on Hostinger! 🚀");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="text-center space-y-8 px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
          Hello from Hostinger!
        </h1>
        <p className="text-2xl md:text-3xl text-white/90">
          Next.js is working. 🎉
        </p>
        
        <button
          onClick={handleClick}
          className="px-8 py-4 bg-white text-purple-600 font-bold text-lg rounded-full hover:bg-purple-50 transition-all transform hover:scale-105 shadow-2xl"
        >
          Click me
        </button>
      </div>
    </div>
  );
}
