import { useState } from "react";
import supabase from "../../utils/supabase.js";

export default function CategoryCreateForm({ onCreated }) {
    const [name, setName] = useState("");
    const [color, setColor] = useState("#3b82f6");

    const create = async () => {
        if (!name.trim()) return;

        await supabase.from("categories").insert({
            name: name.trim(),
            color,
        });

        setName("");
        setColor("#3b82f6");

        if (onCreated) onCreated();
    };

    return (
        <div className="flex gap-2 mb-4">
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nová kategorie"
                className="p-2 bg-gray-800 border rounded"
            />

            <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
            />

            <button
                onClick={create}
                className="px-3 bg-blue-500 rounded"
            >
                Přidat
            </button>
        </div>
    );
}
