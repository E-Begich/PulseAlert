import { Search, Bell, ChevronDown, Menu } from "lucide-react";

export default function TopNavbar({ onMenuClick }) {
    return (
        <header className="h-20 bg-gradient-to-b from-blue-700 to-[var(--main-bg-color)] flex items-center px-6 text-blue-900 shadow-md relative">
            {/* Mobile hamburger */}
            <button className="md:hidden mr-4" onClick={onMenuClick}>
                <Menu />
            </button>

            {/* Search */}
            <div className="relative flex-1 max-w-lg mx-auto">
                <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-900 drop-shadow-sm z-10"
                    size={18}
                />
                <input
                    type="text"
                    placeholder="Pretraži..."
                    className="
            w-full pl-10 pr-4 py-2 rounded-full
            bg-white/90 text-blue-900 placeholder-blue-400 shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-400
            backdrop-blur-sm
          "
                />
            </div>

            {/* Right side */}
            <div className="ml-auto flex items-center gap-6">
                {/* User dropdown */}
                <div className="relative group cursor-pointer">
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold">Ivana Horvat</span>
                        <ChevronDown size={16} />
                    </div>

                    <div className="absolute right-0 mt-2 w-40 bg-white/90 text-blue-900 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all transform scale-95 group-hover:scale-100 origin-top pointer-events-none group-hover:pointer-events-auto">
                        <div className="px-4 py-2 text-sm text-blue-600">
                            Uloga: Admin
                        </div>
                        <div className="border-t border-blue-200" />
                        <button className="w-full text-left px-4 py-2 text-sm hover:bg-blue-100/60">
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
