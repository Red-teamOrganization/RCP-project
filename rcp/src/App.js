import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@tremor/react/dist/esm/tremor.css';
import Error404 from "./pages/Error404";
function App() {

 
  return (
  
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/main" element={<Main />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
        <Footer />
        <ToastContainer />
      </BrowserRouter>
    
  );
}

export default App;
