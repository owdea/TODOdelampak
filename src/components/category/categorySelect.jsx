export default function CategorySelect({
                                           categories,
                                           selectedIds,
                                           onChange,
                                       }) {
    const toggleCategory = (id) => {
        if (selectedIds.includes(id)) {
            onChange(selectedIds.filter((c) => c !== id));
        } else {
            onChange([...selectedIds, id]);
        }
    };

    if (!categories.length) {
        return (
            <div className="text-sm text-gray-400">
                Žádné kategorie
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-300">Kategorie</span>

            <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        type="button"
                        onClick={() => toggleCategory(cat.id)}
                        className={`px-3 py-1 rounded text-sm border ${
                            selectedIds.includes(cat.id)
                                ? "border-white text-white"
                                : "border-gray-600 text-gray-400"
                        }`}
                        style={{
                            backgroundColor: selectedIds.includes(cat.id)
                                ? cat.color
                                : "transparent",
                        }}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
