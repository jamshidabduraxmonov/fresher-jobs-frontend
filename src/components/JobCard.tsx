import type { Job } from "../types/job";
import { Link, useLocation } from "react-router";

type JobCardProps = {
    job: Job;
};


const JobCard = ({ job } : JobCardProps) => {

    const location = useLocation();

    return(
        <article className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-slate-900">{
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
                className="hover:underline"
            >
                {job.title}
            </Link>    
                
            }</h2>

            <p className="mt-2 text-sm text-slate-700">
                {job.company || "Company not provided"}
            </p>

            <p className="mt-1 text-sm text-slate-500">
                {job.city || "Location not provided"}
            </p>

            <p className="mt-1 text-sm text-slate-500">
                {job.categories || "Category not provided"}
            </p>

            {job.fresherFriendly && (
                <span className="mt-4 inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                    FresherFriendly
                </span>
            )}

            
        </article>
    );
};


export default JobCard;

