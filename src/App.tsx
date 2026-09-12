import CategoryJobsPage from "./pages/CategoryJobsPage.tsx";
import { Routes, Route } from "react-router"
import HomePage  from "./pages/HomePage.tsx"


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
      </Routes>
  );
}

export default App;