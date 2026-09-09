import { useEffect, useState } from "react";
import { fetchJobs } from "./api/jobsApi";
import type {Job} from "./types/job";
import  JobCard  from "./components/JobCard.tsx"



export default function App() {
      const [jobs, setJobs] = useState<Job[]>([]);
      const [isLoading, setIsLoading] = useState(true);


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
            }finally {
              setIsLoading(false);
            }
          };

          loadJobs();
      }, []);

      if(isLoading) {
        return <p>Loading jobs...</p>;
      }

      return(
        <main>
          <h1>Fresher Jobs UAE</h1>

          {jobs.map((job)=> (
            <JobCard job={job}  key={job.id}/>
          ))}
        </main>
      );
}