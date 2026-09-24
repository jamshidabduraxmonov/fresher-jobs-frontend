import "../index.css";
import { useEffect, useState } from "react";
import { fetchJobs } from "../api/jobsApi.ts";
import type {Job, Pagination} from "../types/job.ts";
import  JobCard  from "../components/JobCard.tsx"
import { categories } from "../data/categories.ts";
import { Link, useParams, useSearchParams, useLocation } from "react-router";




export default function CategoryJobsPage() {
      const [jobs, setJobs] = useState<Job[]>([]);
      const [isLoading, setIsLoading] = useState(true);
      const [errorMessage, setErrorMessage] =
          useState<string | null>(null);

      const [pagination, setPagination] = useState<Pagination | null>(null);
      
      const { category: selectedCategory } = useParams();

      const location = useLocation();

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




      useEffect(()=> {

        if(location.state?.restoreScroll !== true) return;

          if(
            !activeCategory ||
            isLoading ||
            errorMessage ||
            !pagination ||
            pagination.page !== currentPage ||
            jobs.length === 0
          ){
            return;
          }

          const scrollKey =
              `jobs-scroll:${location.pathname}${location.search}`;

          const savedPosition = sessionStorage.getItem(scrollKey);
          
          if(savedPosition === null) return;

          const scrollY = Number(savedPosition);

          if (Number.isFinite(scrollY) && scrollY >= 0){
            window.scrollTo({
              top: scrollY,
              left: 0,
              behavior: "instant",
            });
          }

          sessionStorage.removeItem(scrollKey);

      }, [
        location,
        activeCategory,
        isLoading,
        errorMessage,
        pagination,
        currentPage,
        jobs.length,
      ])





      const isPageOutOfRange =
            pagination !== null &&
            currentPage > Math.max(1, pagination.totalPages);


      if(!activeCategory){
          return(
          <main className="min-h-screen bg-[#F7F8F6] px-4 py-6 text-[#142632] sm:px-6 sm:py-10">
            <div className="mx-auto max-w-2xl">
              <h1 className="text-2xl font-bold text-slate-900">
                Category not found
              </h1>

              <p className="mt-2 text-slate-600">
                This job category does not exist.
              </p>

              <Link
                  to="/"
                  className="mt-5 inline-flex min-h-11 items-center rounded-sm text-sm font-medium text-teal-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700"
              >
                  Back to categories
              </Link>
            </div>
          </main>
        )
      };

      return(
        <main className="min-h-screen bg-[#F7F8F6] px-4 py-6 text-[#142632] sm:px-6 sm:py-10">
          <div className="mx-auto max-w-2xl">
              <Link
                  to="/"
                  className="mb-5 inline-flex min-h-11 items-center rounded-sm text-sm font-medium text-teal-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700"
              >
                  ← Back to categories
              </Link>

              <h1 className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl">
                {activeCategory.label}
              </h1>



              {isLoading && (
                <p role="status"
                   className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-slate-600"
                >
                  Loading jobs...
                </p>
              )}

              {!isLoading && errorMessage && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
                    <p 
                      role="alert"
                      className="text-sm leading-relaxed text-red-800"
                    >
                      {errorMessage}
                    </p>

                    <button
                        type="button"
                        onClick={() => setRetryCount(count => count + 1)}
                        className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700" 
                    >
                        Try Again
                    </button>
                </div>
                
              )}

              {!isLoading && !errorMessage && isPageOutOfRange && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <p className="text-sm leading-relaxed text-slate-600">
                    This page of jobs does not exist.
                  </p>

                  <button
                        type="button"
                        onClick={()=> changePage(1)}
                        className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700"
                  >
                    Go to first page
                  </button>
                </div>
              )

              }


              {!isLoading && !errorMessage && !isPageOutOfRange && (
                jobs.length === 0 ? (
                  <p className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-slate-600">
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


              {!isLoading && !errorMessage && pagination && pagination.totalPages > 0 && !isPageOutOfRange && (
                <div className="mt-8 flex items-center justify-between gap-2 border-t border-slate-200 pt-5">
                    <button
                        type="button"
                        onClick={() => changePage(currentPage -1)}
                        disabled={!pagination.hasPreviousPage}
                        className="min-h-11 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-teal-800 transition-colors hover:bg-teal-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
                    >
                        Previous
                    </button>

                    <span className="text-center text-xs font-medium text-slate-600 sm:text-sm">
                        Page {pagination.page} of {pagination.totalPages}
                    </span>

                    <button
                        type="button"
                        onClick={()=> changePage(currentPage + 1)}
                        disabled={!pagination.hasNextPage}
                        className="min-h-11 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-teal-800 transition-colors hover:bg-teal-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
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