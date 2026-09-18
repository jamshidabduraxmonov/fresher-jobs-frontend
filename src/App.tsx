import CategoryJobsPage from "./pages/CategoryJobsPage.tsx";
import { Routes, Route, Link } from "react-router"
import HomePage  from "./pages/HomePage.tsx"
import JobDetailsPage from "./pages/JobDetailsPage.jsx"


function App() {
  return(
      <Routes>
          <Route
              path="/"
              element={<HomePage />}
              />

          <Route 
              path="/categories/:category"
              element={<CategoryJobsPage />}
          />

          <Route 
            path="/jobs/:id"
            element={<JobDetailsPage />}
          />

          <Route 
                path="*"
                element={
                    <main>
                        <h1>
                            Page not found
                        </h1>

                        <p>
                            The page you're looking for doesn't exist.
                        </p>

                        <Link
                            to="/"
                            className="mt-6 inline-block text-slate-900 underline"
                        >
                            Back to categories
                        </Link>
                    </main>
                }
          />
            
          
      </Routes>
  );
}

export default App;