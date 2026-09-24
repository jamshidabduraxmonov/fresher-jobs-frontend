import type { Job } from "../types/job";
import { Link, useLocation } from "react-router";
import { categories } from '../data/categories'
import FormatPostedDate from "../utils/formatPostedDate"

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

            
            <div>
                {job.fresherFriendly && (
                    <span className="mt-4 inline-block rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800">
                        FresherFriendly
                    </span>
                )}

                 <div className="mt-3 flex justify-end">
                    <p className="rounded-md border border-green-300 bg-green-100 px-3 py-2 text-xs font-bold tracking-wide text-green-900">
                        {FormatPostedDate(job.postedAt)}
                    </p>
                </div>
            </div>

            

            
        </article>
    );
};


export default JobCard;

