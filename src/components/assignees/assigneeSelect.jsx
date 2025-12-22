import { useEffect, useState } from "react";
import supabase from "../../utils/supabase.js";

export default function AssigneeSelect({ selectedIds, onChange }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const load = async () => {
            const { data } = await supabase
                .from("users")
                .select("id, email, raw_user_meta_data");

            setUsers(data || []);
        };

        load();
    }, []);

    const toggleUser = (id) => {
        if (selectedIds.includes(id)) {
            onChange(selectedIds.filter((u) => u !== id));
        } else {
            onChange([...selectedIds, id]);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-300">Řešitelé</span>

            <div className="flex flex-wrap gap-2">
                {users.map((u) => {
                    const name =
                        u.raw_user_meta_data?.full_name || u.email;

                    return (
                        <button
                            key={u.id}
                            type="button"
                            onClick={() => toggleUser(u.id)}
                            className={`px-3 py-1 rounded border text-sm ${
                                selectedIds.includes(u.id)
                                    ? "border-white text-white"
                                    : "border-gray-600 text-gray-400"
                            }`}
                        >
                            {name}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
