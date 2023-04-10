import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import SignInPage from './Pages/SignInPage/SignInPage';
import GalleryPage from './Pages/GalleryPage/GalleryPage';
import ZinesPage from './Pages/ZinesPage/ZinesPage';
import EventsPage from './Pages/EventsPage/EventsPage';
import ResourcesPage from './Pages/ResourcesPage/ResourcesPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignInPage />,
    // errorElement: <ErrorPage />,
  },
  {
    path: '/Gallery',
    element: <GalleryPage />,
  },
  {
    path: '/Zines',
    element: <ZinesPage />,
  },
  {
    path: '/Events',
    element: <EventsPage />,
  },
  {
    path: '/Resources',
    element: <ResourcesPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
