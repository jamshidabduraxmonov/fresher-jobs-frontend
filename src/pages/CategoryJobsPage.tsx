import "../index.css";
import { useEffect, useState } from "react";
import { fetchJobs } from "../api/jobsApi.ts";
import type {Job} from "../types/job.ts";
import  JobCard  from "../components/JobCard.tsx"
import { categories } from "../data/categories.ts";
import { Link, useParams } from "react-router"



export default function CategoryJobsPage() {
      const [jobs, setJobs] = useState<Job[]>([]);
      const [isLoading, setIsLoading] = useState(true);
      const [errorMessage, setErrorMessage] =
          useState<string | null>(null);
      
      const { category: selectedCategory } = useParams();

      const activeCategory = categories.find(
        (category)=> category.value === selectedCategory
      );
  


      useEffect(()=> {

        if(!activeCategory) return;

          const loadJobs = async ()=> {
            
            setIsLoading(true);
            setErrorMessage(null);

            try {
              const data = await fetchJobs({
                category: 
                  selectedCategory === "freshers"
                    ? undefined
                    : selectedCategory,
                fresherFriendly: 
                    selectedCategory === "freshers"
                        ? true
                        : undefined
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
      }, [activeCategory, selectedCategory]);


      if(!activeCategory){
          return(
          <main className="min-h-screen bg-slate-100 px-4 py-8">
              <h1 className="text-2xl font-bold text-slate-900">
                Category not found
              </h1>

              <p className="mt-2 text-slate-600">
                This job category does not exist.
              </p>
          </main>
        )
      };

      return(
        <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900">
          <div className="mx-auto max-w-2xl">
              <Link
                  to="/"
                  className="mb-4 inline-block text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                  ← Back to categories
              </Link>

              <h1 className="mb-6 text-2xl font-bold">
                {activeCategory.label}
              </h1>



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