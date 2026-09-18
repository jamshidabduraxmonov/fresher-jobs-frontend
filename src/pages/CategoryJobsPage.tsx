import "../index.css";
import { useEffect, useState } from "react";
import { fetchJobs } from "../api/jobsApi.ts";
import type {Job, Pagination} from "../types/job.ts";
import  JobCard  from "../components/JobCard.tsx"
import { categories } from "../data/categories.ts";
import { Link, useParams, useSearchParams } from "react-router";



export default function CategoryJobsPage() {
      const [jobs, setJobs] = useState<Job[]>([]);
      const [isLoading, setIsLoading] = useState(true);
      const [errorMessage, setErrorMessage] =
          useState<string | null>(null);

      const [pagination, setPagination] = useState<Pagination | null>(null);
      
      const { category: selectedCategory } = useParams();

      const [searchParams, setSearchParams] = useSearchParams();

      const requestedPage = Number(searchParams.get("page") ?? "1");

      const currentPage = Number.isInteger(requestedPage) && requestedPage > 0
              ? requestedPage
              : 1;

      const activeCategory = categories.find(
        (category)=> category.value === selectedCategory
      );
  

      const changePage = (page: number)=> {
        const nextParams = new URLSearchParams(searchParams);
        nextParams.set("page", String(page));
        setSearchParams(nextParams);
      }

      const [retryCount, setRetryCount] = useState(0);

      useEffect(()=> {

        if(!activeCategory) return;

        let ignore = false;

          const loadJobs = async ()=> {
            
            setIsLoading(true);
            setErrorMessage(null);

            setPagination(null);

            try {
              const data = await fetchJobs({
                category: 
                  selectedCategory === "freshers"
                    ? undefined
                    : selectedCategory,
                fresherFriendly: 
                    selectedCategory === "freshers"
                        ? true
                        : undefined,

                page: currentPage,
                limit: 20,
              });

              if(!ignore) {
                setJobs(data.jobs);
                setPagination(data.pagination);
              }
              
            }catch(error){
              console.error(
                "Failed to load jobs: ",
                error
              );

              if(!ignore){
                setErrorMessage(
                  "Unable to load jobs. Please try again."
                );
              }
              
            }finally {
              if(!ignore){
                setIsLoading(false);
              }
            }
          };

          loadJobs();

          return ()=> {
            ignore = true;
          }
      }, [activeCategory, selectedCategory, currentPage, retryCount]);


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
                <div>
                    <p 
                      role="alert"
                      className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700"
                    >
                      {errorMessage}
                    </p>

                    <button
                        type="button"
                        onClick={() => setRetryCount(count => count + 1)}
                        className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-700" 
                    >
                        Try Again
                    </button>
                </div>
                
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


              {!isLoading && !errorMessage && pagination && pagination.totalPages > 0 && (
                <div>
                    <button
                        type="button"
                        onClick={() => changePage(currentPage -1)}
                        disabled={!pagination.hasPreviousPage}
                        className="rounded-lg border px-4 py-2 disabled:opacity-40"
                    >
                        Previous
                    </button>

                    <span>
                        Page {pagination.page} of {pagination.totalPages}
                    </span>

                    <button
                        type="button"
                        onClick={()=> changePage(currentPage + 1)}
                        disabled={!pagination.hasNextPage}
                        className="rounded-lg border px-4 py-2 disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>
              )

              }
              
          </div>
          
        </main>
      );
}