import { React } from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
// need to use Redux to determine if the admin is signed in
import SignInPage from './Pages/SignInPage/SignInPage';
import GalleryPage from './Pages/GalleryPage/GalleryPage';
import ZinesPage from './Pages/ZinesPage/ZinesPage';
import EventsPage from './Pages/EventsPage/EventsPage';
import ResourcesPage from './Pages/ResourcesPage/ResourcesPage';
import NavigationBar from './Components/NavigationBar/NavigationBar';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <div className="content">
        <Routes>
          <Route path="/" element={(<SignInPage />)} />
          <Route path="/gallery" element={(<GalleryPage />)} />
          <Route path="/zines" element={(<ZinesPage />)} />
          <Route path="/events" element={(<EventsPage />)} />
          <Route path="/resources" element={(<ResourcesPage />)} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
