export type Job = {
    id: string;
    title: string;
    company:string | null;
    city: string | null;
    industry: string | null;
    description: string | null;
    sourceURL: string | null;
    postedAt: string | null;
    expiresAt: string | null;
    categories: string[];
    fresherFriendly: boolean;
    fresherScore: number;
};


export type Pagination = {
    page: number;
    limit: number;
    totalJobs: number;
    totalPages: number;
    returnedJobs: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
};

export type JobsResponse = {
    jobs: Job[];
    pagination: Pagination;
};


export type JobResponse = {
    job: Job;
};