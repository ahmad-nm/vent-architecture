const categories = [
    "All",
    "Exterior",
    "Interior",
    "Landscape",
];

export default function CategoryFilter({ selectedCategory = "All", onCategoryChange }) {
    return (
        <div className="flex flex-wrap gap-3">

            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onCategoryChange && onCategoryChange(category)}
                    className={`
                        px-5 py-2
                        rounded-full
                        border
                        text-sm
                        transition
                        cursor-pointer
                        ${
                            selectedCategory === category
                                ? "border-white text-white bg-white/5"
                                : "border-white/10 text-white/60 hover:text-white hover:border-white/20"
                        }
                    `}
                    >
                    {category}
                </button>
            ))}

        </div>
    );
}