import { useEffect, useState } from "react";
import supabase from "../../utils/supabase.js";

export default function AssigneeSelect({ selectedIds, onChange }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const loadUsers = async () => {
            const { data, error } = await supabase
                .from("users_public") // 👈 viz níže
                .select("id, name, avatar_url");

            if (!error) setUsers(data);
        };

        loadUsers();
    }, []);

    const toggleUser = (id) => {
        onChange(
            selectedIds.includes(id)
                ? selectedIds.filter((u) => u !== id)
                : [...selectedIds, id]
        );
    };

    return (
        <div className="flex flex-wrap gap-3">
            {users.map((user) => {
                const selected = selectedIds.includes(user.id);

                return (
                    <button
                        key={user.id}
                        onClick={() => toggleUser(user.id)}
                        type="button"
                        className={`flex items-center gap-2 px-3 py-2 rounded-full border transition
                            ${
                            selected
                                ? "bg-blue-600 border-blue-500"
                                : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                        }
                        `}
                    >
                        <img
                            src={user.avatar_url}
                            alt={user.name}
                            className="w-6 h-6 rounded-full"
                        />
                        <span className="text-sm text-white">
                            {user.name}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
