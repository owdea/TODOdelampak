export default function TodoList({ todos }) {
    if (!todos.length) {
        return <div className="text-gray-400">Žádné TODO</div>;
    }

    return (
        <div className="flex flex-col gap-3">
            {todos.map((todo) => (
                <div
                    key={todo.id}
                    className="p-3 border rounded bg-gray-900"
                >
                    <div className="font-semibold">{todo.title}</div>

                    <div className="flex gap-2 mt-1 flex-wrap">
                        {todo.todo_categories?.map((tc) => (
                            <span
                                key={tc.categories.id}
                                className="text-xs px-2 rounded"
                                style={{ backgroundColor: tc.categories.color }}
                            >
                {tc.categories.name}
              </span>
                        ))}
                    </div>

                    <div className="flex gap-2 mt-1 text-xs text-gray-300">
                        {todo.todo_assignees?.map((ta) => (
                            <span key={ta.users.id}>
                {ta.users.raw_user_meta_data?.full_name ||
                    ta.users.email}
              </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
