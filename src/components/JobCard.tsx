import type { Job } from "../types/job";
import { Link, useLocation } from "react-router";
import { categories } from '../data/categories'

type JobCardProps = {
    job: Job;
};


const JobCard = ({ job } : JobCardProps) => {

    const location = useLocation();

    const categoryLabels = job.categories.map(value=> {
        const category = categories.find(item => item.value === value);

        return category?.label ?? value.replaceAll("_", " ");
    })

    return(
        <article className="rounded-2xl border border-slate-200 bg-white p-5 text-[#142632] transition-shadow hover:shadow-sm">
            <h2 className="text-lg font-bold leading-snug tracking-tight break-words">
            <Link
                onClick={() => {
                    const scrollKey =
                        `jobs-scroll:${location.pathname}${location.search}`;
                    
                        sessionStorage.setItem(
                            scrollKey,
                            String(window.scrollY)
                        );

                }}
                
                state={{ from: location.pathname + location.search }}
                to={`/jobs/${encodeURIComponent(job.id)}`}
                className="rounded-sm hover:text-teal-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700"
            >
                {job.title}
            </Link>    
                
            </h2>

            <p className="mt-3 text-sm font-medium text-slate-700">
                {job.company || "Company not provided"}
            </p>

            <p className="mt-1 text-sm text-slate-500">
                {job.city || "Location not provided"}
            </p>

            <p className="mt-3 text-xs leading-relaxed text-slate-500">
                {categoryLabels.length > 0
                    ? categoryLabels.join(" · ")
                    : "Category not provided"}
            </p>

            {job.fresherFriendly && (
                <span className="mt-4 inline-block rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800">
                    FresherFriendly
                </span>
            )}

            
        </article>
    );
};


export default JobCard;

