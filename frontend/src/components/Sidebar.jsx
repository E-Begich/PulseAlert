import { Users, FileText, CreditCard, Bell, BarChart2, Settings, Home } from "lucide-react";
import { NavLink } from "react-router-dom";


export default function Sidebar({ isOpen, toggleSidebar }) {
  const userRaw = localStorage.getItem("user");
  const user = userRaw ? JSON.parse(userRaw) : null;

  const isAdmin = user?.role === "admin";

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen w-72
        bg-blue-900 text-white shadow-md
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 z-40 pt-20
      `}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center">
        <h1 className="text-2xl font-bold tracking-wide">
          PULSE <span className="text-blue-300">ALERT</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2 mt-20">
        <NavItem to="/dashboard" end icon={<Home size={22} />} label="Početna" />

        <NavItem to="/dashboard/patients" icon={<Users size={22} />} label="Pacijenti" />

        {isAdmin && (
          <>
            <NavItem to="/dashboard/users" icon={<Users size={22} />} label="Korisnici" />
            <NavItem to="/dashboard/settings" icon={<Settings size={22} />} label="Postavke" />
          </>
        )}

        <NavItem to="/dashboard/invoices" icon={<FileText size={22} />} label="Računi" />
        <NavItem to="/dashboard/payments" icon={<CreditCard size={22} />} label="Uplate" />
        <NavItem to="/dashboard/reports" icon={<BarChart2 size={22} />} label="Izvještaji" />
      </nav>

      {/* Close button (mobile) */}
      <button
        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 flex items-center justify-center
                   text-white bg-blue-700 hover:bg-blue-600 rounded-full shadow-lg md:hidden"
        onClick={toggleSidebar}
      >
        &times;
      </button>
    </aside>
  );
}
function NavItem({ to, icon, label, end = false}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `
        flex items-center gap-3 px-5 py-3 rounded-lg
        text-white text-lg font-semibold
        transition-colors duration-200
        ${isActive ? "bg-blue-700/60 backdrop-blur-sm" : "hover:bg-blue-800/40"}
        `
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}


