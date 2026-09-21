import { categories } from "../data/categories";
import CategoryCard from "../components/CategoryCard"



function HomePage(){
    return (
        <main className="min-h-screen bg-[#F7F8F6] px-4 py-6 text-[#142632] sm:px-6 sm:py-10">
            <div className="mx-auto max-w-2xl">
                <header>
                    <p className="text-xl font-bold tracking-tight">
                        Fresher Jobs UAE
                    </p>

                    <h1 className="mt-8 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                        Find your next opportunity.
                    </h1>

                    <p className="mt-3 text-base leading-relaxed text-slate-600">
                        Choose a category to explore jobs.
                    </p>
                </header>

                <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5">
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.value}
                            value={category.value}
                            label={category.label}
                        />
                    ))}
                </div>
            </div>

            
        </main>
    )
}


export default HomePage;