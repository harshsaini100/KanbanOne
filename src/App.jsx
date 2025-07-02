import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import KanbanPage from "./pages/KanbanPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoutes from "./components/PrivateRoutes";
import Projects from "./pages/Projects";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
            <Route path="/" element={<PrivateRoutes><Layout /></PrivateRoutes>}>
              <Route index element={<KanbanPage />} />
              <Route path="projects" element={<Projects/>}/>
            </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
