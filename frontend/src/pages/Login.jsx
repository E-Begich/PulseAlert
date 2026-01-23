import { useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setError("");
        setLoading(true);

        // fake delay (kasnije ide pravi API)
        setTimeout(() => {
            if (email !== "admin@pulsealert.hr" || password !== "password123") {
                setError("Neispravni email ili lozinka");
                setLoading(false);
                return;
            }

            // success (kasnije redirect)
            console.log("LOGIN OK");
            setLoading(false);
        }, 1200);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-700 relative overflow-hidden">

            <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-40 animate-float" />
            <div className="absolute bottom-20 right-20 w-56 h-56 bg-blue-900 rounded-full blur-3xl opacity-40 animate-floatSlow" />
            <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-blue-400 rounded-full blur-2xl opacity-30 animate-float" />

            {/* Card */}
            <div className="relative w-[500px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 text-white">

                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <h1 className="text-3xl font-bold tracking-wide">
                        PULSE <span className="text-blue-300">ALERT</span>
                    </h1>
                </div>

                <h2 className="text-xl font-semibold mb-6 text-center">Prijava</h2>

                {/* Error toast */}
                {error && (
                    <div className="flex items-center gap-2 bg-red-500/20 border border-red-400 text-red-200 px-3 py-2 rounded mb-4 text-sm">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-sm mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="username@pulsealert.hr"
                        className="w-full px-3 py-2 rounded bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Password */}
                <div className="mb-2 relative">
                    <label className="block text-sm mb-1">Lozinka</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full px-3 py-2 rounded bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-8 text-gray-600"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                {/* Forgot */}
                <div className="text-right mb-4">
                    <a href="#" className="text-xs text-blue-200 hover:underline">
                        Zaboravljena lozinka?
                    </a>
                </div>

                {/* Button */}
                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full bg-blue-900 hover:bg-blue-800 transition py-2 rounded font-semibold flex items-center justify-center gap-2 disabled:opacity-70"
                >
                    {loading && (
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    )}
                    {loading ? "Prijava..." : "Sign in"}
                </button>

                {/* Footer */}
                <p className="text-xs text-center text-blue-200 mt-4">
                    Imaš problema s prijavom? Kontaktiraj naš administrativni tim
                </p>
            </div>
        </div>
    );
}
