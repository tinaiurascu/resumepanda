import {
  Route,
  Routes,
  Navigate,
  useLocation,
  useMatch,
} from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import ResetPage from "./pages/Reset/ResetPage";
import ExperiencePage from "./pages/Experience/ExperiencePage";
import ProfilePage from "./pages/Profile/ProfilePage";
import AppNavbar from "./components/AppNavbar/AppNavbar";
import PublicResume from "./pages/Resumes/PublicResume";
import EducationPage from "./pages/Education/EducationPage";
import LandingPage from "./pages/Landing/LandingPage";
import ResumePage from "./pages/Resumes/ResumePage";
import "./App.scss";

function App() {
  const location = useLocation();
  const match = useMatch({ path: "resume/*" }, location.pathname);
  const renderAppNavbar = match === null;

  return (
    <div className="App">
      <>
        {renderAppNavbar && <AppNavbar />}
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<ResumePage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/resume/:id" element={<PublicResume />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset" element={<ResetPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
