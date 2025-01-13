
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Footer from './components/footer';
import Modal from './components/modal';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import DailyQuiz from './components/dailyQuiz';
import FrameQuiz from './components/frameQuiz';
import CharacterQuiz from './components/characterQuiz';
import About from './components/about';
import News from './components/News';
import Submission from './adminComponents/submission.jsx';
import Admin from './adminComponents/admin.jsx'
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from './utils/authContext.jsx';


function App() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'login' or 'signup'
  let adminType;
  const { authInfo, isLoggedIn, login, logout } = useContext(AuthContext);
  if (authInfo) {console.log(authInfo.username, ':authInfo.username', authInfo.adminType); adminType = authInfo.adminType;}

  
  const handleOpenModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalType('');
  };

  const handleLogin = (credentials) => {
    login();
    handleCloseModal();
  };

  const handleLogout = () => {
    logout()
  }

  const handleSignup = (credentials) => {
    console.log('Signup:', credentials);
    
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
          {isLoggedIn ? ( <a 
            className="header-element login-header" 
            onClick={() => handleLogout()}>Logout</a> 
            ) : ( <a
            onClick={() => handleOpenModal('login')}
            className="header-element login-header"
          >Login</a> )}

          {isLoggedIn && (adminType === 'admin' || adminType === 'owner')? (<Link 
          className='header-element admin-header'
          to='/admin'>Admin</Link>
          ) : (<></>) }
          
          <Link to='/' className="page-title header-element">AniFrames</Link>
          
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About handleOpenModal={handleOpenModal} />} />
          <Route path="/news" element={<News />} />
          <Route path="/frame" element={<FrameQuiz />} />
          <Route path="/character" element={<CharacterQuiz />} />
          <Route path="/daily" element={<DailyQuiz />} />
          <Route path="/submission" element={<Submission />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
