import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Courses from './pages/Coures';
import Subscription from './pages/Subscription';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import ResetPassword from './components/ResetPassword';
import Footer from './components/Footer';
import { PrivacyPolicy, TermsOfService } from './components/Footer';
import Contact from './components/Contact';
import ForgotPassword from './components/Forgotpassword';
import MyCourses from './pages/Mycourses';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
     
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/subscribe" element={<Subscription />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/my-courses" element={<MyCourses/>} />

      
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;