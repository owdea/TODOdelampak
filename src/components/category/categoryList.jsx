import { useEffect, useState } from "react";
import supabase from "../../utils/supabase.js";

export default function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadCategories = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("categories")
            .select("*")
            .order("created_at");

        if (error) {
            setError(error.message);
        } else {
            setCategories(data);
        }

        setLoading(false);
    };

    const deleteCategory = async (id) => {
        const confirmed = confirm(
            "Opravdu chceš tuto kategorii smazat?"
        );
        if (!confirmed) return;

        const { error } = await supabase
            .from("categories")
            .delete()
            .eq("id", id);

        if (error) {
            alert(error.message);
        } else {
            setCategories((prev) =>
                prev.filter((cat) => cat.id !== id)
            );
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    if (loading) return <div>Načítání kategorií…</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="flex flex-col gap-3 mt-6">
            <h3 className="text-white font-semibold">Kategorie</h3>

            {categories.length === 0 && (
                <div className="text-gray-400 text-sm">
                    Zatím žádné kategorie
                </div>
            )}

            <ul className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                    <li
                        key={cat.id}
                        className="flex items-center gap-2 px-3 py-1 rounded text-white"
                        style={{ backgroundColor: cat.color || "#6b7280" }}
                    >
                        <span>{cat.name}</span>

                        <button
                            onClick={() => deleteCategory(cat.id)}
                            className="text-xs opacity-70 hover:opacity-100"
                            title="Smazat"
                        >
                            ✕
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
