import { useParams, Link, useLocation } from "react-router";
import type { Job } from "../types/job";
import { fetchJobById } from "../api/jobsApi"
import { useEffect, useState } from "react";


const formatPostedDate = (value: string | null): string => {
    if(!value) {
        return "Posting date not provided";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "Posting date not available";
    }

    return `Posted at ${date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Dubai",
    })}`;
};



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

  


    return (
        <main className="min-h-screen bg-slate-100 px-4 py-8">

            <Link
                to={backPath}
                className="mb-4 inline-block text-sm font-medium text-slate-600 hover:text-slate-900"
            >
                {backPath === "/" ? "← Back to categories" : "← Back to jobs"}
            </Link>

            {isLoading && <p>Loading job details...</p>}

            {!isLoading && errorMessage && (

                <div>
                    <p role="alert">{errorMessage}</p>

                    <button
                        type="button"
                        onClick={()=> setRetryCount(count=> count+1)}
                        className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-700"
                    >
                        Try again
                    </button>
                </div>
                
            )}

            {!isLoading && !errorMessage && !job && (
                <p>This job is no longer available or the link is incorrect.</p>
            )}

            
            {!isLoading && !errorMessage && job && (
            <>
                <h1 className="text-2xl font-bold">
                    {job.title}
                </h1>

                <p>{formatPostedDate(job.postedAt)}</p>

                <p className="mt-2 text-slate-700">
                    {job.company || "Company not provided"}
                </p>

                <p className="mt-1 text-slate-500">
                    {job.city || "Location not provided"}
                </p>

                <p className="mt-6 whitespace-pre-wrap text-slate-700">
                    {job.description || "No description provided."}
                </p>



                {applicationURL ? (
                    <a
                        href={applicationURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700"
                    >
                        Apply on original website
                    </a>
                ) : (
                    <p>
                        An application link is not available for this job.
                    </p>
                )}
                </>
            )}

            
        </main>
    )
}