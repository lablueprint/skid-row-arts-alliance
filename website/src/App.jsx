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
import SubmissionDetailsPage from './Pages/GalleryPage/SubmissionDetailsPage';
import HeadingBar from './Components/HeadingBar/HeadingBar';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import ZineDetailsPage from './Pages/ZinesPage/ZineDetailsPage';
import NonprofitsPage from './Pages/NonprofitsPage/NonprofitsPage';
import AddNonprofitPage from './Pages/NonprofitsPage/AddNonprofitPage';
import AddResourcePage from './Pages/ResourcesPage/AddResourcePage';
import EditResourcePage from './Pages/ResourcesPage/EditResourcePage';
import AddEventPage from './Pages/EventsPage/AddEventPage';
import EditEventPage from './Pages/EventsPage/EditEventPage';
import EditNonprofitPage from './Pages/NonprofitsPage/EditNonprofitPage';

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
        <HeadingBar />
        <NavigationBar />
        <div className="content">
          <Routes>
            <Route path="/" element={(<GalleryPage />)} />
            <Route path="/zines" element={(<ZinesPage />)} />
            <Route path="/events" element={(<EventsPage />)} />
            <Route path="/resources" element={(<ResourcesPage />)} />
            <Route path="/submission" element={(<SubmissionDetailsPage />)} />
            <Route path="/zine" element={(<ZineDetailsPage />)} />
            <Route path="/nonprofits" element={(<NonprofitsPage />)} />
            <Route path="/resources/add" element={(<AddResourcePage />)} />
            <Route path="/resources/edit" element={(<EditResourcePage />)} />
            <Route path="/events/add" element={(<AddEventPage />)} />
            <Route path="/events/edit" element={(<EditEventPage />)} />
            <Route path="/nonprofits/add" element={(<AddNonprofitPage />)} />
            <Route path="/nonprofits/edit" element={(<EditNonprofitPage />)} />
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
