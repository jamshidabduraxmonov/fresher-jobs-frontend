import type { Job } from "../types/job";

type JobCardProps = {
    job: Job;
};



const JobCard = ({ job } : JobCardProps) => {
    return(
        <article>
            <h2>{job.title}</h2>

            <p>
                {job.company || "Company not provided"}
            </p>

            <p>
                {job.city || "Location not provided"}
            </p>
        </article>
    );
};


export default JobCard;

