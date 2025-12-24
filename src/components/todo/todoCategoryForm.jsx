import { useState } from "react";
import supabase from "../../utils/supabase.js";
import CategorySelect from "../category/categorySelect.jsx";
import AssigneeSelect from "../assignees/assigneeSelect.jsx";

export default function TodoCreateForm({ categories, onCreated }) {
    const [title, setTitle] = useState("");
    const [categoryIds, setCategoryIds] = useState([]);
    const [assigneeIds, setAssigneeIds] = useState([]);

    const create = async () => {
        if (!title.trim()) return;

        const { data: todo } = await supabase
            .from("todos")
            .insert({ title })
            .select()
            .single();

        if (categoryIds.length) {
            await supabase.from("todo_categories").insert(
                categoryIds.map((id) => ({
                    todo_id: todo.id,
                    category_id: id,
                }))
            );
        }

        if (assigneeIds.length) {
            await supabase.from("todo_assignees").insert(
                assigneeIds.map((id) => ({
                    todo_id: todo.id,
                    user_id: id,
                }))
            );
        }

        setTitle("");
        setCategoryIds([]);
        setAssigneeIds([]);

        if (onCreated) onCreated();
    };

    return (
        <div className="mb-6 p-4 border rounded">
            <input
                placeholder="Nové TODO"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-2 w-full mb-2 bg-gray-800 border rounded"
            />

            <CategorySelect
                categories={categories}
                selectedIds={categoryIds}
                onChange={setCategoryIds}
            />

            <AssigneeSelect
                selectedIds={assigneeIds}
                onChange={setAssigneeIds}
            />

            <button
                onClick={create}
                className="mt-3 px-4 py-2 bg-blue-500 rounded"
            >
                Přidat TODO
            </button>
        </div>
    );
}
