import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import KanbanPage from "./pages/KanbanPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoutes from "./components/PrivateRoutes";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Board from "./pages/Board";
import { ToastContainer } from "react-toastify";
import WakeupProvider from "./contexts/wakeupContext";
import Boards from "./pages/Boards";

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
              <Route path="projects/:id" element={<ProjectDetails/>}/>
              <Route path="board/:id" element={<Board/>}/>
              <Route path="boards" element={<Boards/>}/>
            </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
