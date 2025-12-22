import { useEffect, useState } from "react";
import supabase from "../../utils/supabase.js";

export default function TodoList() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadTodos = async () => {
        setLoading(true);

        const { data, error } = await supabase
            .from("todos")
            .select(`
        id,
        title,
        description,
        due_at,
        completed,
        todo_categories (
          categories (
            id,
            name,
            color
          )
        ),
        todo_assignees (
          users (
            id,
            email,
            raw_user_meta_data
          )
        )
      `)
            .order("due_at", { ascending: true });

        if (error) {
            setError(error.message);
        } else {
            setTodos(data || []);
        }

        setLoading(false);
    };

    useEffect(() => {
        loadTodos();
    }, []);

    if (loading) return <div>Načítání TODO…</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    if (todos.length === 0) {
        return (
            <div className="text-gray-400">
                Zatím žádné TODO 🎉
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 mt-6">
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </div>
    );
}

function TodoItem({ todo }) {
    const due =
        todo.due_at &&
        new Date(todo.due_at).toLocaleString("cs-CZ");

    return (
        <div className="p-4 rounded border border-gray-700 bg-gray-900">
            {/* Titulek */}
            <div className="flex justify-between items-start">
                <h4 className="text-white font-semibold">
                    {todo.title}
                </h4>

                {due && (
                    <span className="text-sm text-gray-400">
            ⏰ {due}
          </span>
                )}
            </div>

            {/* Popis */}
            {todo.description && (
                <p className="text-gray-300 text-sm mt-1">
                    {todo.description}
                </p>
            )}

            {/* Kategorie */}
            {todo.todo_categories?.length > 0 && (
                <div className="flex gap-2 mt-3 flex-wrap">
                    {todo.todo_categories.map((tc) => (
                        <span
                            key={tc.categories.id}
                            className="px-2 py-0.5 text-xs rounded text-white"
                            style={{
                                backgroundColor:
                                    tc.categories.color || "#6b7280",
                            }}
                        >
              {tc.categories.name}
            </span>
                    ))}
                </div>
            )}

            {/* Řešitelé */}
            {todo.todo_assignees?.length > 0 && (
                <div className="flex gap-2 mt-2 flex-wrap">
                    {todo.todo_assignees.map((ta) => {
                        const user = ta.users;
                        const name =
                            user?.raw_user_meta_data?.full_name ||
                            user?.email;

                        return (
                            <span
                                key={user.id}
                                className="px-2 py-0.5 text-xs rounded border border-gray-600 text-gray-200"
                            >
                👤 {name}
              </span>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
