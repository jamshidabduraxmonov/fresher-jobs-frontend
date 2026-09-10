import { useEffect, useState } from "react";
import { fetchJobs } from "./api/jobsApi";
import type {Job} from "./types/job";
import  JobCard  from "./components/JobCard.tsx"



export default function App() {
      const [jobs, setJobs] = useState<Job[]>([]);
      const [isLoading, setIsLoading] = useState(true);
      const [errorMessage, setErrorMessage] =
          useState<string | null>(null);


      useEffect(()=> {
          const loadJobs = async ()=> {
            try {
              const data = await fetchJobs();

              setJobs(data.jobs);
            }catch(error){
              console.error(
                "Failed to load jobs: ",
                error
              );

              setErrorMessage(
                "Unable to load jobs. Please try again."
              );
            }finally {
              setIsLoading(false);
            }
          };

          loadJobs();
      }, []);

      if(isLoading) {
        return <p>Loading jobs...</p>;
      }

      if(errorMessage) {
        return <p>{errorMessage}</p>;
      }

      return(
        <main>
          <h1>Fresher Jobs UAE</h1>

          {
            jobs.length === 0 && (
              <p>No jobs are currently available.</p>
            )
          }

          {jobs.map((job)=> (
            <JobCard job={job}  key={job.id}/>
          ))}
        </main>
      );
}