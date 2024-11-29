import React from "react";
import "./../styles/Locaux.css";

const Locaux = () => {
  return (
    <main className="locaux">
      {/* Navigation Bar */}
      <nav className="navbar">
        <a href="/">Dashboard</a>
        <a href="/exams">Exams</a>
        <a href="/surveillance">Surveillance</a>
        <a href="/emplois">Emploi</a>
        <a href="/departements">Départements</a>
        <a href="/locaux">Locaux</a>
      </nav>

      {/* Header Section */}
      <header>
        <h1>Locaux</h1>
        <p>Gérer locaux</p>
        <button className="add-button">+ Ajouter un nouveau local</button>
      </header>

      {/* Search and Table Section */}
      <section className="content">
        <div className="search-bar">
          <input type="text" placeholder="Rechercher un local..." />
        </div>
        <table className="locaux-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Taille</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Salle A</td>
              <td>50 m²</td>
              <td>Classe</td>
            </tr>
            <tr>
              <td>Amphi 1</td>
              <td>200 m²</td>
              <td>Amphithéâtre</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Locaux;

