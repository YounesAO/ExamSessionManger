import React, { useState } from 'react';
import * as XLSX from 'xlsx';  // Importer la bibliothèque xlsx
import Navbar from './Navbar';

const Emploi = () => {
  // État pour stocker les données du fichier Excel
  const [data, setData] = useState([]);

  // Fonction pour gérer le fichier Excel téléchargé
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Lire le fichier Excel avec XLSX
      const reader = new FileReader();
      reader.onload = (event) => {
        const binaryStr = event.target.result;
        const wb = XLSX.read(binaryStr, { type: 'binary' });
        // Prendre la première feuille du fichier
        const ws = wb.Sheets[wb.SheetNames[0]];
        // Convertir la feuille en JSON
        const jsonData = XLSX.utils.sheet_to_json(ws);
        // Mettre à jour l'état avec les données du fichier Excel
        setData(jsonData);
      };
      reader.readAsBinaryString(file);
    }
  };

  return (
    <div>
      <Navbar />
    <div className="p-6">
      {/* Navbar avec bouton de téléchargement de fichier Excel */}
    

      {/* Section pour télécharger le fichier Excel */}
      <div className="mb-4">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          className="p-2 border rounded mr-2"
        />
      </div>

      {/* Tableau des étudiants, centré et avec une largeur maximale */}
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Liste des Étudiants</h2>
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Nom complet</th>
              <th className="px-4 py-2 border">CNE</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="2" className="px-4 py-2 text-center">
                  Aucune donnée disponible
                </td>
              </tr>
            ) : (
              // Remplir le tableau avec les données du fichier Excel
              data.map((row, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{row['Nom complet']}</td>
                  <td className="px-4 py-2 border">{row['CNE']}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default Emploi;
