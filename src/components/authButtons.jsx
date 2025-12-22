import useAuth from "../hooks/useAuth.js";
import supabase from "../utils/supabase.js";

export default function AuthButtons() {
    const { session, loading } = useAuth();

    const login = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: import.meta.env.VITE_REDIRECT_URL,
            },
        });
    };

    const logout = async () => {
        await supabase.auth.signOut();
    };

    if (loading) {
        return <span>Načítání…</span>;
    }

    return (
        <div className="flex flex-col items-center gap-4">
            {session ? (
                <>
                    <div className="px-6 py-3 border border-white bg-gray text-white rounded-xl">
                        Přihlášen jako: {session.user.email}
                    </div>

                    <button
                        onClick={logout}
                        className="px-6 py-3 bg-gray border border-white text-white rounded-xl hover:cursor-pointer"
                    >
                        Odhlásit se
                    </button>
                </>
            ) : (
                <button
                    onClick={login}
                    className="px-6 py-3 bg-blue-500 border border-white text-white rounded-xl hover:cursor-pointer"
                >
                    Přihlásit se
                </button>
            )}
        </div>
    );
}
