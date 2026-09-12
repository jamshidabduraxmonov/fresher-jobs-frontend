import { Link } from "react-router"

type CategoryCardProps = {
    value: string;
    label: string;
};

function CategoryCard({ value, label}: CategoryCardProps) {
    return (
        <Link
            to={`/categories/${value}`}
            className="flex min-h-32 items-center justify-center rounded-xl border-slate-200 bg-white p-5 text-center font-semibold hover:bg-slate-50"
        >
            {label}
        </Link>
    )
}

export default CategoryCard;