import React, { useState, useEffect } from 'react';
import './HeadingBar.css';
import '../../fonts/Montserrat.css';
import SRAAlogo from '../../assets/SRAA-logo.svg';

function HeadingBar() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsVisible(prevScrollPos > currentScrollPos);
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`heading-bar ${isVisible ? 'visible' : 'hidden'}`}>
      <span className="header-content">
        <img src={SRAAlogo} alt="SRAA logo" className="logo" />
        <p className="admin-text">Admin</p>
      </span>
    </div>

  );
}

export default HeadingBar;
