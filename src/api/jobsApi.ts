import type { JobsResponse, JobResponse } from "../types/job";

const apiURL = import.meta.env.VITE_API_URL;

type JobFilters = {
    category?: string;
    fresherFriendly?: boolean;
    page?: number;
    limit?: number;
};
export const fetchJobs = async (filters: JobFilters = {}): Promise<JobsResponse> => {

    const params = new URLSearchParams();

    if(filters.page !== undefined) {
        params.set("page", String(filters.page));
    }

    if(filters.limit !== undefined) {
        params.set("limit", String(filters.limit));
    }

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
): Promise<JobResponse | null> => {
    const response = await fetch(
        `${apiURL}/api/jobs/${encodeURIComponent(id)}`
    );

    if (response.status === 404){
        return null;
    }

    if(!response.ok){
        throw new Error(
            `Failed to fetch job: ${response.status}`
        );
    }


    const data: JobResponse = await response.json();

    return data;
}
