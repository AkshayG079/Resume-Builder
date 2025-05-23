import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/authentication/Login";
import Signup from "./pages/authentication/Signup";
import Templates from "./pages/Templates";
import AddResumeDetails from "./pages/AddResumeDetails";
import Preview from "./pages/Preview";
import ResumeScanner from "./pages/ResumeScanner";
import MyAccount from "./pages/MyAccount";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/addResumeDetails/template" element={<AddResumeDetails />} />
          <Route path="/preview/template" element={<Preview />} />
          <Route path="/resumeScan" element={<ResumeScanner />} />
          <Route path="/myAccount" element={<MyAccount />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
