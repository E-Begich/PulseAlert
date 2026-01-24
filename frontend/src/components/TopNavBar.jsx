import { Search, Bell, ChevronDown, Menu } from "lucide-react";

export default function TopNavbar({ onMenuClick }) {
  return (
    <header className="h-16 bg-blue-800 flex items-center px-6 text-white">
      {/* Mobile menu */}
      <button className="md:hidden mr-4" onClick={onMenuClick}>
        <Menu />
      </button>

      {/* Search */}
      <div className="relative w-1/3">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-200"
          size={18}
        />
        <input
          type="text"
          placeholder="Pretraži..."
          className="
            w-full pl-10 pr-4 py-2 rounded-full
            bg-blue-700 text-white placeholder-blue-200
            focus:outline-none
          "
        />
      </div>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-6">
        {/* User dropdown */}
        <div className="relative group cursor-pointer">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Ivana Horvat</span>
            <ChevronDown size={16} />
          </div>

          <div className="absolute right-0 mt-2 w-40 bg-blue-700 text-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition">
            <div className="px-4 py-2 text-sm text-blue-200">
              Uloga: Admin
            </div>
            <div className="border-t border-blue-600" />
            <button className="w-full text-left px-4 py-2 text-sm hover:bg-blue-600">
              Odjava
            </button>
          </div>
        </div>

        {/* Notifications */}
        <button className="relative">
          <Bell />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
      </div>
    </header>
  );
}
