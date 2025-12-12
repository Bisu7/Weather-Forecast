'use client';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary-600">
            🌤️ Weather Platform
          </h1>
          <nav className="flex gap-4">
            <a href="/" className="text-gray-700 hover:text-primary-600 transition-colors">
              Home
            </a>
            <a href="/favorites" className="text-gray-700 hover:text-primary-600 transition-colors">
              Favorites
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

