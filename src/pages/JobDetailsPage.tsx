import { useParams } from "react-router";
import type { Job } from "../types/job";
import { fetchJobById } from "../api/jobsApi"
import { useEffect, useState } from "react";


export default function JobDetailsPage() {
    const { id } = useParams();

    const [job, setJob] = useState<Job | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] =
        useState<string | null>(null);


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
                    setJob(data.job);
                }

            }catch(error){
                console.error("Failed to load job: ", error);

                if(!ignore) {
                    setErrorMessage(
                        "Unable to load this job. It may no longer be available."
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
    }, [id]);

    if(isLoading) {
        return <p>Loading job details...</p>;
    }

    if(errorMessage) {
        return <p role="alert">{errorMessage}</p>;
    };

    if(!job) {
        return <p>Job not found.</p>;
    }


    return (
        <main className="min-h-screen bg-slate-100 px-4 py-8">
            <h1 className="text-2xl font-bold">
                {job.title}
            </h1>

            <p className="mt-2 text-slate-700">
                {job.company || "Company not provided"}
            </p>

            <p className="mt-1 text-slate-500">
                {job.city || "Location not provided"}
            </p>

            <p className="mt-6 whitespace-pre-wrap text-slate-700">
                {job.description || "No description provided."}
            </p>

            
        </main>
    )
}