import "./index.css";
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
        <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900">
          <div className="mx-auto max-w-2xl">
              <h1 className="mb-6 text-2xl font-bold">
                Fresher Jobs UAE
              </h1>

              {
                jobs.length === 0 && (
                  <p>No jobs are currently available.</p>
                )
              }
              <div>
                  {jobs.map((job)=> (
                    <JobCard job={job}  key={job.id}/>
                  ))}
              </div>
              
          </div>
          
        </main>
      );
}