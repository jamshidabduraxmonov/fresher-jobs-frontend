import { useParams, Link, useLocation } from "react-router";
import type { Job } from "../types/job";
import { fetchJobById } from "../api/jobsApi"
import { useEffect, useState } from "react";
import FormatPostedDate from '../utils/formatPostedDate.ts'






    const getApplicationURL = (value: string | null): string | null => {
        if(!value) {
            return null;
        }

        try {
            const url = new URL(value);

            if(url.protocol === "https:" || url.protocol === "http:") {
                return url.href;
            }

            return null;
        }catch(error){
            console.error(error);
            return null;
        }
    }


export default function JobDetailsPage() {
    const { id } = useParams();
    const location = useLocation();
    const backPath = location.state?.from ?? "/";

    const [job, setJob] = useState<Job | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] =
        useState<string | null>(null);

    const [retryCount, setRetryCount] = useState(0);

    const [isDescriptionExpanded, setIsDescriptionExpanded] =
            useState(false);

    const applicationURL = getApplicationURL(job?.sourceURL ?? null);


    useEffect(()=> {
        if(!id) return;


        let ignore = false;

        const loadJob = async () => {
            setIsLoading(true);
            setErrorMessage(null);
            setJob(null);

            try {
                const data = await fetchJobById(id);

                if(!ignore) {
                    setJob(data === null ? null : data.job);
                    setIsDescriptionExpanded(false);
                }

            }catch(error){
                console.error("Failed to load job: ", error);

                if(!ignore) {
                    setErrorMessage(
                        "We couldn't load this job. Please try again."
                    );
                }
            } finally{
                if (!ignore) {
                    setIsLoading(false);
                }
            }
        };

        loadJob();

        return () => {
            ignore = true;
        };
    }, [id, retryCount]);

  
    const description =
        job?.description?.trim() || "No description provided.";

    const descriptionLimit = 600;

    const isLongDescription  = description.length > descriptionLimit;

    const visibleDescription =
        isLongDescription && !isDescriptionExpanded
            ? `${description.slice(0, descriptionLimit).trimEnd()}...`
            : description;

    return (
        <main className="min-h-screen bg-[#F7F8F6] px-4 py-6 text-[#142632] sm:px-6 sm:py-10">

            <div className="mx-auto max-w-2xl">

                

                <Link
                    to={backPath}
                    state={{ restoreScroll: true }}
                    className="mb-5 inline-flex min-h-11 items-center rounded-sm text-sm font-medium text-teal-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700"
                >
                    {backPath === "/" ? "← Back to categories" : "← Back to jobs"}
                </Link>

                {isLoading && (
                    <p
                        role="status"
                        className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-slate-600"
                    >
                        Loading job details...
                    </p>
                )}

                {!isLoading && errorMessage && (

                    <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
                        <p role="alert" className="text-sm leading-relaxed text-red-800">
                            {errorMessage}
                        </p>

                        <button
                            type="button"
                            onClick={()=> setRetryCount(count=> count+1)}
                            className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700"
                        >
                            Try again
                        </button>
                    </div>
                    
                )}

                {!isLoading && !errorMessage && !job && (
                    <div className="rounded-2xl border border-slate-200 bg-white p-6">
                        <h1 className="text-xl font-bold">
                            Job unavailable
                        </h1>

                        <p className="mt-2 text-sm leading-relaxed text-slate-600">
                            This job is no longer available or the link is incorrect.
                        </p>
                    </div>
                )}

                
                {!isLoading && !errorMessage && job && (
                <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
                    <h1 className="text-2xl font-bold leading-tight tracking-tight break-words sm:text-3xl">
                        {job.title}
                    </h1>

                    <p className="mt-3 text-sm text-slate-500">
                        {FormatPostedDate(job.postedAt)}
                    </p>

                    <p className="mt-5 font-semibold text-slate-800">
                        {job.company || "Company not provided"}
                    </p>

                    <p className="mt-1 text-sm text-slate-600">
                        {job.city || "Location not provided"}
                    </p>

                    <h2 className="mt-6 border-t border-slate-200 pt-6 text-lg font-bold">
                        About this job
                    </h2>

                    <p id="job-description" className="mt-3 whitespace-pre-wrap break-words text-base leading-7 text-slate-700">
                        {visibleDescription}
                    </p>

                    {isLongDescription && (
                        <button
                            type="button"
                            aria-expanded={isDescriptionExpanded}
                            aria-controls="job-description"
                            onClick={()=> {
                                setIsDescriptionExpanded(expanded => !expanded);
                            }}
                            className="mt-3 inline-flex min-h-11 items-center rounded-lg px-2 text-sm font-semibold text-teal-700 hover:bg-teal-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
                         >
                            {isDescriptionExpanded ? "Show less ↑" : "Read more ↓"}
                        </button>
                    )}



                    {applicationURL ? (
                        <a
                            href={applicationURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-teal-700 px-5 py-3 text-center font-semibold text-white hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700"
                        >
                            Apply on original website
                        </a>
                    ) : (
                        <p className="mt-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                            An application link is not available for this job.
                        </p>
                    )}
                    </article>
                )}

            </div>
        </main>
    )
}