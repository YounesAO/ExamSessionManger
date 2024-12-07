import React from "react";
import "./../styles/Dashboard.css";
import ChartComponent from "./ChartComponent";
import Navbar from "./Navbar";


const Dashboard = () => {
  return (
    <main className="dashboard">
      <Navbar />

      {/* Header Section */}
      <header>
        <h1>Sessions</h1>
        <p>Gérer les sessions</p>
      </header>

      {/* Dashboard Content */}
      <section className="stats-section">
        <div className="stat-card">
          <h3>Exams</h3>
          <p className="stat-value">7</p>
          <p>Nombre total d'exams du dernier session</p>
        </div>
        <div className="stat-card">
          <h3>Enseignants</h3>
          <p className="stat-value">268</p>
          <p>Nombre total d'enseignants dans la faculté</p>
        </div>
        <div className="stat-card">
          <h3>Nombre total de départements</h3>
          <p className="stat-value">7</p>
          <p>+19% par rapport au mois dernier</p>
        </div>
        <div className="stat-card">
          <h3>Surveillance actuelle</h3>
          <p className="stat-value">0.22</p>
          <p>Moyenne par enseignant par demi-journée</p>
        </div>
      </section>

      <section className="overview">
        <div className="chart">
          <h3>Aperçu</h3>
          <ChartComponent />
        </div>
        <div className="recent-exams">
          <h3>Exams récentes</h3>
          <ul>
            <li>
              <span className="badge">NA</span>
              culture et art skills
            </li>
            <li>
              <span className="badge">NA</span>
              langues étrangères
            </li>
            <li>
              <span className="badge">NA</span>
              mathématiques pour la chimie
            </li>
            <li>
              <span className="badge">NA</span>
              mécanique quantique
            </li>
            <li>
              <span className="badge">NA</span>
              chimie descriptive
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
