import { Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Process from './components/Process';
import Features from './components/Features';
import Users from './components/Users';
import Sponsors from './components/Sponsors';
import Footer from './components/Footer';
import ChatScreen from './components/chat/ChatScreen';
import ReportScreen from './components/chat/ReportScreen';
import Login from './pages/Login';
import Register from './pages/Register';

const LandingPage = () => (
  <div className="bg-[#0f0c29] text-white parallax-bg">
    <Hero />
    <Process />
    <Features />
    <Users />
    <Sponsors />
    <Footer />
  </div>
);

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/chat" element={<ChatScreen />} />
      <Route path="/report" element={<ReportScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
