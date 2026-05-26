import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateTemplate from "./pages/CreateTemplate";
import ProtectedRoute from "./routes/ProtectedRoute";
import Templates from "./pages/Templates";
import EditTemplate from "./pages/EditTemplate";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/create-template" 
        element={
          <ProtectedRoute>
          <CreateTemplate />
          </ProtectedRoute>
          }
        />

        <Route
          path="/templates"
          element={
            <ProtectedRoute>
              <Templates />
            </ProtectedRoute>
          }
        />

        <Route
          path="/templates/:id/edit"
          element={<EditTemplate />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;