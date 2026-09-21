import { Link } from "react-router"

type CategoryCardProps = {
    value: string;
    label: string;
    image: string;
};

function CategoryCard({ value, label, image}: CategoryCardProps) {
    return (
        <Link
            to={`/categories/${value}`}
            className={`flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700 ${
                value === "freshers"
                    ? "border-teal-600 text-teal-700"
                    : "border-slate-200 text-[#142632]"
            }`}
        >
            <img 
                src={image}
                alt=""
                className="aspect-[3/2] w-full object-cover"
            />

            <div className="flex flex-1 items-center justify-between gap-2 p-3 sm:p-4">
                <span className="text-sm font-semibold leading-snug sm:text-base">
                    {label}
                </span>

                <span aria-hidden="true" className="shrink-0 text-xl">
                    →
                </span>
            </div>
        </Link>
    )
}

export default CategoryCard;