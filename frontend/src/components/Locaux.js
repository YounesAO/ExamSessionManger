import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

const Locaux = () => {
  const [locals, setLocals] = useState([]);
  const [search, setSearch] = useState("");
  const [newLocal, setNewLocal] = useState({ nom: "", taille: "", type: "SALLE" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedLocal, setSelectedLocal] = useState(null);

  useEffect(() => {
    fetchLocals();
  }, []);

  const fetchLocals = async () => {
    try {
      const response = await axios.get("http://localhost:8088/locals/all");
      setLocals(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des locaux:", error);
    }
  };

  const handleAddLocal = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8088/locals/save", newLocal);
      fetchLocals();
      setNewLocal({ nom: "", taille: "", type: "SALLE" });
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout d'un local:", error);
    }
  };

  const handleEditLocal = async (e) => {
    e.preventDefault();
    if (!selectedLocal) return;

    try {
      await axios.put(`http://localhost:8088/locals/update`, newLocal);
      fetchLocals();
      setIsEditDialogOpen(false);
      setSelectedLocal(null);
    } catch (error) {
      console.error("Erreur lors de la modification du local:", error);
    }
  };

  const handleDeleteLocal = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce local ?")) {
      try {
        await axios.delete(`http://localhost:8088/locals/delete/${id}`);
        fetchLocals();
      } catch (error) {
        console.error("Erreur lors de la suppression du local:", error);
      }
    }
  };

  const filteredLocals = locals.filter((local) =>
    local.nom.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Gestion des Locaux</h1>
            <p className="text-sm text-gray-500">Ajoutez, modifiez ou supprimez les locaux</p>
          </div>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Ajouter un local
          </button>
        </div>

        <div className="mb-6">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Rechercher un local"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="grid grid-cols-4 gap-4 p-4 text-sm font-medium text-gray-500 border-b">
            <div>Nom</div>
            <div>Taille</div>
            <div>Type</div>
            <div className="text-right">Actions</div>
          </div>
          <div className="divide-y divide-gray-100">
            {filteredLocals.map((local) => (
              <div
                key={local.id}
                className="grid grid-cols-4 gap-4 p-4 items-center hover:bg-gray-50"
              >
                <div>{local.nom}</div>
                <div>{local.taille}</div>
                <div>{local.type}</div>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => {
                      setSelectedLocal(local);
                      setNewLocal(local);
                      setIsEditDialogOpen(true);
                    }}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => handleDeleteLocal(local.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {isDialogOpen && (
          <Dialog
            title="Ajouter un local"
            onClose={() => setIsDialogOpen(false)}
            onSubmit={handleAddLocal}
            newLocal={newLocal}
            setNewLocal={setNewLocal}
          />
        )}

        {isEditDialogOpen && (
          <Dialog
            title="Modifier un local"
            onClose={() => setIsEditDialogOpen(false)}
            onSubmit={handleEditLocal}
            newLocal={newLocal}
            setNewLocal={setNewLocal}
          />
        )}
      </div>
    </div>
  );
};

const Dialog = ({ title, onClose, onSubmit, newLocal, setNewLocal }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white rounded-lg w-96 p-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Nom</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newLocal.nom}
            onChange={(e) => setNewLocal({ ...newLocal, nom: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Taille</label>
          <input
            type="number"
            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newLocal.taille}
            onChange={(e) => setNewLocal({ ...newLocal, taille: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Type</label>
          <select
            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newLocal.type}
            onChange={(e) => setNewLocal({ ...newLocal, type: e.target.value })}
          >
            <option value="SALLE">Salle</option>
            <option value="AMPHI">Amphi</option>
          </select>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default Locaux;
