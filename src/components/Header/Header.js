import React from "react";
import ContactModal from './ContactModal';

const Header = () => {
  return (
    <header className="masthead mb-auto">
      <div className="inner">
        <h3 className="masthead-brand">Covid-19 U.S</h3>
        <nav className="nav nav-masthead justify-content-center">
          <a className="nav-link" data-toggle="modal" data-target="#contact_modal" style={{cursor: 'pointer'}}>
            Contact
          </a>
        </nav>
      </div>
      <ContactModal />
    </header>
  );
};

export default Header;
