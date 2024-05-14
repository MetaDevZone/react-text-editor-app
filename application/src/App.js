import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AnOtherPage from "./pages/AnOtherPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/other" element={<AnOtherPage />}></Route>
    </Routes>
  );
}

export default App;
