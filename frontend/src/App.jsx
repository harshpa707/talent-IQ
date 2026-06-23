import { useUser } from "@clerk/react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import ProblemPage from "./Pages/ProblemPage";

function App() {
  const { isSignedIn } = useUser();

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/problem"
          element={isSignedIn ? <ProblemPage /> : <Navigate to="/" />}
        />
      </Routes>

      <Toaster toastOptions={{ duration: 3000 }} />
    </>
  );
}

export default App;
