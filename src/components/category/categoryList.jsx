export default function CategoryList({ categories }) {
    if (!categories.length) {
        return <div className="text-gray-400">Žádné kategorie</div>;
    }

    return (
        <div className="flex gap-2 flex-wrap">
            {categories.map((c) => (
                <span
                    key={c.id}
                    className="px-2 py-1 text-sm rounded"
                    style={{ backgroundColor: c.color }}
                >
          {c.name}
        </span>
            ))}
        </div>
    );
}
