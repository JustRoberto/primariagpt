import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import ChatPage from "./pages/chatpage";
import DocumentPortfolio from "./pages/portofoliu";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/portfolio" element={<DocumentPortfolio />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
