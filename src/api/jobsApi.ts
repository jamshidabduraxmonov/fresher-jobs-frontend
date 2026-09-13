import type { JobsResponse, JobResponse } from "../types/job";

const apiURL = import.meta.env.VITE_API_URL;

type JobFilters = {
    category?: string;
    fresherFriendly?: boolean;
};
export const fetchJobs = async (filters: JobFilters = {}): Promise<JobsResponse> => {

    const params = new URLSearchParams();

    if(filters.fresherFriendly !== undefined){
        params.set(
            "fresherFriendly",
            String(filters.fresherFriendly)
        );
    }

    if(filters.category) {
        params.set("category", filters.category);
    }

    const query = params.toString();

    const response = await fetch(
        `${apiURL}/api/jobs${query ? `?${query}` : ""}`
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

export const fetchJobById = async (
    id: string
): Promise<JobResponse> => {
    const response = await fetch(
        `${apiURL}/api/jobs/${encodeURIComponent(id)}`
    );

    if(!response.ok){
        throw new Error(
            `Failed to fetch job: ${response.status}`
        );
    }


    const data: JobResponse = await response.json();

    return data;
}
