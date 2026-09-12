import CategoryJobsPage from "./pages/CategoryJobsPage.tsx";
import { Routes, Route } from "react-router"


function App() {
  return(
      <Routes>
          <Route
              path="/"
              element={<p>Category grid coming next.</p>}
              />

          <Route 
              path="/categories/:category"
              element={<CategoryJobsPage />}
          />
      </Routes>
  );
}

export default App;