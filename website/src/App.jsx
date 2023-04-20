import { React, useEffect } from 'react';
import {
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import './App.css';
import { useSelector } from 'react-redux';
import { isTokenExpired } from './redux/sliceAuth';
import SignInPage from './Pages/SignInPage/SignInPage';
import GalleryPage from './Pages/GalleryPage/GalleryPage';
import ZinesPage from './Pages/ZinesPage/ZinesPage';
import EventsPage from './Pages/EventsPage/EventsPage';
import ResourcesPage from './Pages/ResourcesPage/ResourcesPage';
import NavigationBar from './Components/NavigationBar/NavigationBar';

function App() {
  const { id, token } = useSelector((state) => state.sliceAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || isTokenExpired(token)) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    (token && !isTokenExpired(token) && id) ? (
      <div className="App">
        <NavigationBar />
        <div className="content">
          <Routes>
            <Route path="/" element={(<GalleryPage />)} />
            <Route path="/zines" element={(<ZinesPage />)} />
            <Route path="/events" element={(<EventsPage />)} />
            <Route path="/resources" element={(<ResourcesPage />)} />
          </Routes>
        </div>
      </div>
    ) : (
      <div className="App">
        <Routes>
          <Route path="/" element={(<SignInPage />)} />
        </Routes>
      </div>
    )
  );
}

export default App;
