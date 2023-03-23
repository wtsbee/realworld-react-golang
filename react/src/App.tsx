import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Pages/Home/Home";
import Login from "./components/Pages/Login/Login";
import NewArticle from "./components/Pages/NewArticle/NewArticle";
import Profile from "./components/Pages/Profile/Profile";
import Register from "./components/Pages/Register/Register";
import Settings from "./components/Pages/Settings/Settings";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/editor" element={<NewArticle />} />
        <Route path="/" element={<Home />} />
        <Route path="/:username" element={<Profile></Profile>}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
