import { useState } from "react";
import supabase from "../../utils/supabase.js";
import CategorySelect from "../category/categorySelect.jsx";
import AssigneeSelect from "../assignees/assigneeSelect.jsx";

export default function TodoCreateForm({ onCreated }) {
    // základ
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // vazby
    const [categoryIds, setCategoryIds] = useState([]);
    const [assigneeIds, setAssigneeIds] = useState([]);

    // termín
    const [dueAt, setDueAt] = useState("");

    // opakování
    const [isRecurring, setIsRecurring] = useState(false);
    const [recurrenceInterval, setRecurrenceInterval] = useState("weekly");
    const [recurrenceEvery, setRecurrenceEvery] = useState(1);
    const [recurrenceWeekdays, setRecurrenceWeekdays] = useState([]);

    // UI
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createTodo = async () => {
        if (!title.trim()) {
            setError("Název TODO je povinný");
            return;
        }

        setLoading(true);
        setError(null);

        // 1️⃣ vytvoř TODO
        const { data: todo, error: todoError } = await supabase
            .from("todos")
            .insert({
                title: title.trim(),
                description: description || null,
                due_at: dueAt || null,
                is_recurring: isRecurring,
                recurrence_interval: isRecurring ? recurrenceInterval : null,
                recurrence_every: isRecurring ? recurrenceEvery : null,
                recurrence_weekdays:
                    isRecurring && recurrenceInterval === "weekly"
                        ? recurrenceWeekdays
                        : null,
            })
            .select()
            .single();

        if (todoError) {
            setError(todoError.message);
            setLoading(false);
            return;
        }

        // 2️⃣ vazby – kategorie
        if (categoryIds.length > 0) {
            await supabase.from("todo_categories").insert(
                categoryIds.map((categoryId) => ({
                    todo_id: todo.id,
                    category_id: categoryId,
                }))
            );
        }

        // 3️⃣ vazby – řešitelé
        if (assigneeIds.length > 0) {
            await supabase.from("todo_assignees").insert(
                assigneeIds.map((userId) => ({
                    todo_id: todo.id,
                    user_id: userId,
                }))
            );
        }

        // reset
        setTitle("");
        setDescription("");
        setCategoryIds([]);
        setAssigneeIds([]);
        setDueAt("");
        setIsRecurring(false);
        setRecurrenceEvery(1);
        setRecurrenceWeekdays([]);

        setLoading(false);

        if (onCreated) onCreated(todo);
    };

    return (
        <div className="flex flex-col gap-5 p-4 border border-gray-700 rounded-xl">
            <h3 className="text-white font-semibold">Přidat TODO</h3>

            {/* Název */}
            <input
                type="text"
                placeholder="Název úkolu"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-2 rounded bg-gray-800 text-white border border-gray-600"
            />

            {/* Popis */}
            <textarea
                placeholder="Popis (nepovinné)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-2 rounded bg-gray-800 text-white border border-gray-600"
            />

            {/* Kategorie */}
            <CategorySelect
                selectedIds={categoryIds}
                onChange={setCategoryIds}
            />

            {/* Řešitelé */}
            <AssigneeSelect
                selectedIds={assigneeIds}
                onChange={setAssigneeIds}
            />

            {/* Termín */}
            <div>
                <label className="text-sm text-gray-300">Termín splnění</label>
                <input
                    type="datetime-local"
                    value={dueAt}
                    onChange={(e) => setDueAt(e.target.value)}
                    className="p-2 rounded bg-gray-800 text-white border border-gray-600"
                />
            </div>

            {/* Opakování */}
            <div className="flex flex-col gap-3">
                <label className="flex items-center gap-2 text-sm text-gray-300">
                    <input
                        type="checkbox"
                        checked={isRecurring}
                        onChange={(e) => setIsRecurring(e.target.checked)}
                    />
                    Opakovat úkol
                </label>

                {isRecurring && (
                    <>
                        <div className="flex gap-3 items-center">
                            <span className="text-sm text-gray-300">Každý</span>
                            <input
                                type="number"
                                min="1"
                                value={recurrenceEvery}
                                onChange={(e) => setRecurrenceEvery(Number(e.target.value))}
                                className="w-16 p-1 rounded bg-gray-800 text-white border border-gray-600"
                            />
                            <select
                                value={recurrenceInterval}
                                onChange={(e) =>
                                    setRecurrenceInterval(e.target.value)
                                }
                                className="p-2 rounded bg-gray-800 text-white border border-gray-600"
                            >
                                <option value="daily">den</option>
                                <option value="weekly">týden</option>
                                <option value="monthly">měsíc</option>
                            </select>
                        </div>

                        {recurrenceInterval === "weekly" && (
                            <div className="flex gap-2 flex-wrap">
                                {["Po", "Út", "St", "Čt", "Pá", "So", "Ne"].map(
                                    (day, index) => (
                                        <label key={day} className="flex gap-1 text-sm">
                                            <input
                                                type="checkbox"
                                                checked={recurrenceWeekdays.includes(
                                                    index + 1
                                                )}
                                                onChange={() =>
                                                    setRecurrenceWeekdays((prev) =>
                                                        prev.includes(index + 1)
                                                            ? prev.filter((d) => d !== index + 1)
                                                            : [...prev, index + 1]
                                                    )
                                                }
                                            />
                                            {day}
                                        </label>
                                    )
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>

            {error && <div className="text-red-500">{error}</div>}

            <button
                onClick={createTodo}
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
                {loading ? "Ukládám…" : "Přidat TODO"}
            </button>
        </div>
    );
}
