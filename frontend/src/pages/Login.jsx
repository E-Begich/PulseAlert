import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import HeartLoader from "../components/HeartLoader"; // import loadera

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showLoader, setShowLoader] = useState(false); // ❤️ loader state

    const navigate = useNavigate();

    const handleLogin = async () => {
        setError("");
        setLoading(true);
        setShowLoader(true); // HeartLoader mount-a i animacija počinje

        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Greška pri prijavi");

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            // Čekamo 1.5s da EKG linija završi
            setTimeout(() => {
                setShowLoader(false); // sakrij HeartLoader
                navigate("/dashboard");
            }, 1500);

        } catch (err) {
            setError(err.message);
            setLoading(false);
            setShowLoader(false);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-700 relative overflow-hidden">

            {/* Floating shapes */}
            <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-40 animate-float" />
            <div className="absolute bottom-20 right-20 w-56 h-56 bg-blue-900 rounded-full blur-3xl opacity-40 animate-floatSlow" />
            <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-blue-400 rounded-full blur-2xl opacity-30 animate-float" />

            {/* Card */}
            <div className={`relative w-[500px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 text-white ${loading ? "opacity-70 pointer-events-none" : ""}`}>
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

                {/* Form */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleLogin();
                    }}
                    className="space-y-4"
                >
                    {/* Email */}
                    <div>
                        <label className="block text-sm mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="username@pulsealert.hr"
                            className="w-full px-3 py-2 rounded bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="block text-sm mb-1">Lozinka</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full px-3 py-2 rounded bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                            required
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
                    <div className="text-right text-xs">
                        <a href="#" className="text-blue-200 hover:underline">
                            Zaboravljena lozinka?
                        </a>
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-900 hover:bg-blue-800 transition py-2 rounded font-semibold flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {loading && (
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        )}
                        {loading ? "Prijava..." : "Sign in"}
                    </button>
                </form>

                {/* Footer */}
                <p className="text-xs text-center text-blue-200 mt-4">
                    Imaš problema s prijavom? Kontaktiraj naš administrativni tim
                </p>
            </div>

            {/* ❤️ HeartLoader overlay */}
            {showLoader && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
                    <HeartLoader />
                </div>
            )}

        </div>
    );
}
