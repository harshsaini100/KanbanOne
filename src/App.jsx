import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import KanbanPage from "./pages/KanbanPage";
import Login from "./pages/Login";

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<KanbanPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
