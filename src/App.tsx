import CategoryJobsPage from "./pages/CategoryJobsPage.tsx";
import { Routes, Route, Link, useNavigate } from "react-router";
import HomePage  from "./pages/HomePage.tsx"
import JobDetailsPage from "./pages/JobDetailsPage.jsx"
import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { App as CapacitorApp } from "@capacitor/app";


function App() {

    const navigate = useNavigate();

    useEffect(()=> {
        if(Capacitor.getPlatform() !== "android") return;

        const listener = CapacitorApp.addListener(
            "backButton",
            ({ canGoBack }) => {
                if(window.location.pathname === "/") {
                    void CapacitorApp.minimizeApp();
                } else if (canGoBack) {
                    navigate(-1);
                }else {
                    navigate("/", { replace: true });
                }
            }
        );

        return () => {
            void listener.then(handle => handle.remove());
        };
    }, [navigate]);

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