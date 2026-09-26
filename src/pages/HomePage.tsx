import { categories } from "../data/categories";
import CategoryCard from "../components/CategoryCard";
import { useEffect } from "react";
import { updatePageMeta } from "../utils/updatePageMeta";

function HomePage() {


    useEffect(()=> {
        updatePageMeta(
            "Fresher and Entry-level Jobs in UAE | Fresher Jobs UAE",
            "Find fresh, entry-level and no-experience job opportunities across the UAE in hospitality, retail, food and beverage, customer service and general services."
        );
    }, []);




    return (
        <main className="min-h-screen bg-[#F7F8F6] px-4 py-6 text-[#142632] sm:px-6 sm:py-10">
            <div className="mx-auto max-w-2xl">
               <header className="max-w-3xl">
            
                    <div className="flex items-center gap-3">
                        <img
                        src="/logo.svg"
                        alt="Fresher Jobs UAE logo"
                        className="h-9 w-auto shrink-0"
                        />
                        <span className="text-[1.05rem] font-semibold tracking-tight text-teal-700">
                        Fresher Jobs UAE
                        </span>
                    </div>

                    
                    <h1 className="mt-9 text-[2.4rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-slate-900 sm:text-[2.9rem] sm:leading-[1.05]">
                        <span className="block text-slate-900">
                        Fresher and Entry-Level Jobs
                        </span>
                        <span className="block mt-1 bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
                        in the UAE
                        </span>
                    </h1>

        
                    <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-slate-600">
                        Find fresh, entry-level and no-experience job opportunities across the UAE.
                        Browse active jobs in hospitality, food & beverage, retail, customer service
                        and general services.
                    </p>
                </header>

                <section className="mt-8">
                    <h2 className="mb-4 text-[22px] font-semibold tracking-[-0.02em] text-[#142632]">
                        Browse jobs by category
                    </h2>

                    <div className="grid grid-cols-2 gap-4 sm:gap-5">
                        {categories.map((category) => (
                            <CategoryCard
                                key={category.value}
                                value={category.value}
                                label={category.label}
                                image={category.image}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}

export default HomePage;