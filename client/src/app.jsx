
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Footer from './components/footer';
import Modal from './components/modal';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import DailyQuiz from './components/dailyQuiz';
import frameQuiz from './components/frameQuiz';
import CharacterQuiz from './components/characterQuiz';
import About from './components/about';
import News from './components/News';
import { useState } from 'react';
import FrameQuiz from './components/frameQuiz';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'login' or 'signup'

  const handleOpenModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalType('');
  };

  const handleLogin = (credentials) => {
    console.log('Login:', credentials);
    // Perform login logic here
    handleCloseModal();
  };

  const handleSignup = (credentials) => {
    console.log('Signup:', credentials);
    // Perform signup logic here
    handleCloseModal();
  };

  return (
    <Router>
      <div className="main">
        <Modal show={showModal} onClose={handleCloseModal}>
          {modalType === 'login' && (
            <LoginModal
              onSubmit={handleLogin}
              switchToSignup={() => handleOpenModal('signup')}
            />
          )}
          {modalType === 'signup' && (
            <SignupModal
              onSubmit={handleSignup}
              switchToLogin={() => handleOpenModal('login')}
            />
          )}
        </Modal>

        <div className="header">
          <a
            onClick={() => handleOpenModal('login')}
            className="header-element login-header"
          >
            Login
          </a>
          <h2 className="page-title header-element">AniFrames</h2>

          <p className="logged-in">Logged In as: </p>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
          <Route path="/frame" element={<FrameQuiz />} />
          <Route path="/character" element={<CharacterQuiz />} />
          <Route path="/daily" element={<DailyQuiz />} />
        </Routes>

        <Home />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
