import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Pages/Home/Home";
import Login from "./components/Pages/Login/Login";
import NewArticle from "./components/Pages/NewArticle/NewArticle";
import Register from "./components/Pages/Register/Register";
import Settings from "./components/Pages/Settings/Settings";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
      <Routes>
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <Routes>
        <Route path="/editor" element={<NewArticle />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
