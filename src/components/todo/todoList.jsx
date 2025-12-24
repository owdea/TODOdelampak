export default function TodoList({ todos }) {
    if (!todos.length) {
        return (
            <div className="text-gray-400 text-sm">
                Žádné TODO zatím nejsou
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {todos.map((todo) => (
                <div
                    key={todo.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-gray-800 border border-gray-700"
                >
                    {/* LEVÁ ČÁST */}
                    <div className="flex flex-col gap-1">
            <span className="font-medium text-white">
              {todo.title}
            </span>

                        <div className="flex gap-2 flex-wrap">
                            {todo.todo_categories?.map((tc) => (
                                <span
                                    key={tc.categories.id}
                                    className="text-xs px-2 py-0.5 rounded-full"
                                    style={{
                                        backgroundColor: tc.categories.color,
                                    }}
                                >
                  {tc.categories.name}
                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center -space-x-2">
                        {todo.todo_assignees?.map((ta) => (
                            <img
                                key={ta.user_id}
                                src={ta.users_public.avatar_url}
                                alt={ta.users_public.name}
                                title={ta.users_public.name}
                                className="w-8 h-8 rounded-full border-2 border-gray-800"
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
