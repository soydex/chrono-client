import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import CreationClient from "./pages/CreationClient";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";


function Dashboard_temp() {
  return <h1 className="text-2xl p-4">Bienvenue sur le tableau de bord !</h1>;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>  
          <Route path="/" element={<Home />} />
          <Route
            path="/CreationClient"
            element={<CreationClient />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Dashboard_temp />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
