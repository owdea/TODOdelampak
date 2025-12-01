import { supabase } from '../utils/supabase'

function App() {
    const loginWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin, // kam se má google vrátit
            },
        })

        if (error) console.error(error)
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <button
                onClick={loginWithGoogle}
                className="px-6 py-3 bg-blue-500 text-white rounded-xl"
            >
                Přihlásit se přes Google
            </button>
        </div>
    )
}

export default App
