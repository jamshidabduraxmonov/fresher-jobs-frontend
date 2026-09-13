import CategoryJobsPage from "./pages/CategoryJobsPage.tsx";
import { Routes, Route } from "react-router"
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
      </Routes>
  );
}

export default App;