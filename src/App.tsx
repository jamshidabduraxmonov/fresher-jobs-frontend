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
      
      const [selectedCategory, setSelectedCategory] =
       useState<string>("");


      useEffect(()=> {
          const loadJobs = async ()=> {
            
            setIsLoading(true);
            setErrorMessage(null);

            try {
              const data = await fetchJobs({
                category: selectedCategory,
              });

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
      }, [selectedCategory]);

      // if(isLoading) {
      //   return <p>Loading jobs...</p>;
      // }

      // if(errorMessage) {
      //   return <p>{errorMessage}</p>;
      // }

      return(
        <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900">
          <div className="mx-auto max-w-2xl">
              <h1 className="mb-6 text-2xl font-bold">
                Fresher Jobs UAE
              </h1>
              
              <div>
                <button
                    type="button"
                    onClick={() => setSelectedCategory("")}
                    aria-pressed={selectedCategory === ""}
                    className="rounded-lg border px-4 py-2"
                >
                  All Jobs
                </button>

                <button
                    type="button"
                    onClick={()=> setSelectedCategory("retail")}
                    aria-pressed={selectedCategory === "retail"}
                    className="rounded-lg border px-4 py-2"
                >
                  Retail
                </button>
              </div>




              {isLoading && (
                <p role="status"
                   className="rounded-xl bg-white p-6 text-center text-slate-600"
                >
                  Loading jobs...
                </p>
              )}

              {!isLoading && errorMessage && (
                <p 
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700"
                >
                  {errorMessage}
                </p>
              )}


              {!isLoading && !errorMessage && (
                jobs.length === 0 ? (
                  <p className="rounded-xl bg-white p-6 text-center text-slate-600">
                    No jobs are currently available.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {jobs.map((job)=> (
                      <JobCard job={job}  key={job.id}/>
                    ))}
                  </div>
                )
              )}
              
          </div>
          
        </main>
      );
}