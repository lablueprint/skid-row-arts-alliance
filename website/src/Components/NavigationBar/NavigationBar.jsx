import { React } from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

function NavigationBar() {
  return (
    <div className="NavBar">
      <li>
        <Link to="gallery">Gallery</Link>
      </li>
      <li>
        <Link to="zines">Zines</Link>
      </li>
      <li>
        <Link to="events">Events</Link>
      </li>
      <li>
        <Link to="resources">Resources</Link>
      </li>
    </div>
  );
}

export default NavigationBar;
