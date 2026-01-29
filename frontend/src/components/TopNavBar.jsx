import { Search, Bell, ChevronDown, Menu, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function TopNavbar({ onMenuClick }) {
    const [notifications, setNotifications] = useState([]);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    const userRaw = localStorage.getItem("user");
    const user = userRaw ? JSON.parse(userRaw) : null;

    return (
        <header className="h-20 bg-gradient-to-b from-blue-700 to-[var(--main-bg-color)] flex items-center px-6 text-blue-900 shadow-md relative">
            <button className="md:hidden mr-4" onClick={onMenuClick}>
                <Menu />
            </button>

            <div className="relative flex-1 max-w-lg mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={18} />
                <input
                    placeholder="Pretraži..."
                    className="w-full pl-10 pr-4 py-2 rounded-full bg-white/90"
                />
            </div>

            <div className="ml-auto flex items-center gap-6">
                <div className="relative group cursor-pointer">
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold">
                            {user?.first_name} {user?.last_name}
                        </span>
                        <ChevronDown size={16} />
                    </div>

                    <div className=" absolute right-0 top-full w-44 bg-white text-blue-900 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all transform scale-95 group-hover:scale-100 origin-top pointer-events-none group-hover:pointer-events-auto">
                        <div className="px-4 py-2 text-sm text-blue-600">
                            Uloga: {user?.role}
                        </div>
                        <div className="border-t" />
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-blue-100"
                        >
                            <LogOut size={16} />
                            Odjava
                        </button>
                    </div>
                </div>

                <button
                    className="relative"
                    onClick={() => alert("Ovdje ćemo prikazati notifikacije")}
                >
                    <Bell />
                    {notifications.length > 0 && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                    )}
                </button>
            </div>
        </header>
    );
}
