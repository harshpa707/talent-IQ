import { useUser } from "@clerk/react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./Pages/HomePage";
import ProblemPage from "./Pages/ProblemPage";
import DashboardPages from "./Pages/DashboardPages";

function App() {
  const { isSignedIn, isLoaded } = useUser();
  if (!isLoaded) return null;

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={!isSignedIn ? <HomePage /> : <Navigate to={"/dashboard"} />}
        />
        <Route path="/dashboard" element={<DashboardPages />} />

        <Route path="/problems" element={<ProblemPage />} />
      </Routes>

      <Toaster toastOptions={{ duration: 3000 }} />
    </>
  );
}

export default App;
