import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Main from "./pages/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";



import AuthProvider from "./context/auth";

function App() {
  return (

    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  );
}

export default App;
