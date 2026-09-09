import type { JobsResponse } from "../types/job";

const apiURL = import.meta.env.VITE_API_URL;

export const fetchJobs = async (): Promise<JobsResponse> => {
    const response = await fetch(
        `${apiURL}/api/jobs`
    );

    if(!response.ok){
        throw new Error(
            `Failed to fetch jobs: ${response.status}`
        );
    }

    const data: JobsResponse =
        await response.json();

    return data;
}