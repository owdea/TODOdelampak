import supabase from "../utils/supabase.js";
import {useState} from "react";

export default function UserInviteForm() {
    const [email, setEmail] = useState("");
    const [hasError, setHasError] = useState(false);

    const sendInvite = () => {
        const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        const errorMessage = document.getElementById('user-invite-form-error')
        if (email && email.match(isValidEmail)) {
            console.log("Posílám pozvánku na email: " + email);
            setHasError(false);
        } else {
            console.log("Email není validní");
            setHasError(true);
        }
    }

    return (
        <div className="p-3 mt-4">
            <div className="flex gap-4">
                <input
                    type="email"
                    id="user-invite"
                    name="invite user"
                    className="text-white border border-white rounded-xl p-2"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    text="Pozvat uživatele"
                    onClick={sendInvite}
                    className="border border-white rounded-xl p-2 disabled:opacity-50 hover:cursor-pointer"
                    disabled={!email}
                >
                    Pozvat
                </button>
            </div>
            <span id="user-invite-form-error" className={`block p-2 text-red-500 ${
                hasError ? "visible" : "invisible"
            }`}
            >
                Zadejte platný email
            </span>
        </div>
    )
}