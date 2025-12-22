import { useState } from "react";
import supabase from "../../utils/supabase.js";

export default function CategoryCreateForm({ onCreated }) {
    const [name, setName] = useState("");
    const [color, setColor] = useState("#3b82f6"); // default blue
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createCategory = async () => {
        if (!name.trim()) {
            setError("Název kategorie je povinný");
            return;
        }

        setLoading(true);
        setError(null);

        const { data, error } = await supabase
            .from("categories")
            .insert({
                name: name.trim(),
                color,
            })
            .select()
            .single();

        setLoading(false);

        if (error) {
            setError(error.message);
            return;
        }

        setName("");
        setColor("#3b82f6");

        if (onCreated) {
            onCreated(data);
        }
    };

    return (
        <div>
            <h3>Přidat kategorii</h3>

            <input
                type="text"
                placeholder="Název kategorie"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <div>
                <label>
                    Barva kategorie
                </label>

                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />
            </div>

            {error && <span>{error}</span>}

            <button
                onClick={createCategory}
                disabled={loading}
            >
                {loading ? "Ukládám…" : "Přidat kategorii"}
            </button>
        </div>
    );
}
