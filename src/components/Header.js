import React from "react";
import "./../styles/Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <img
          src="/logo-placeholder.png"
          alt="University Logo"
          className="logo"
        />
        <nav>
          <a href="#" className="nav-link active">
            Dashboard
          </a>
          <a href="#" className="nav-link">Exams</a>
          <a href="#" className="nav-link">Surveillance</a>
          <a href="#" className="nav-link">Emploi</a>
          <a href="#" className="nav-link">Departements</a>
          <a href="#" className="nav-link">Locaux</a>
        </nav>
      </div>
      <div className="header-right">
        <img
          src="/user-icon-placeholder.png"
          alt="User Icon"
          className="user-icon"
        />
      </div>
    </header>
  );
};

export default Header;
