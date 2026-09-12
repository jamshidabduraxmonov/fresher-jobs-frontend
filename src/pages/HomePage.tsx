import { categories } from "../data/categories";
import CategoryCard from "../components/CategoryCard"



function HomePage(){
    return (
        <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900">
            <div className="mx-auto max-w-2xl">
                <h1 className="text-2xl font-bold">
                    Fresher Jobs UAE
                </h1>

                <p className="mt-2 text-slate-600">
                    Choose a category to explore jobs.
                </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
                {categories.map((category) => (
                    <CategoryCard
                        key={category.value}
                        value={category.value}
                        label={category.label}
                    />
                ))}
            </div>
        </main>
    )
}


export default HomePage;