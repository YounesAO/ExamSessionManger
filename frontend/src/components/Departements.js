import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Enseignants from "./Enseignants";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const Departements = () => {
  const [departements, setDepartements] = useState([]);
  const [departementCount, setDepartementCount] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newDepartementName, setNewDepartementName] = useState("");
  const [editDepartement, setEditDepartement] = useState(null);
  const [filter, setFilter] = useState("");
  const [selectedDepartement, setSelectedDepartement] = useState(null);

  useEffect(() => {
    fetchDepartements();
    fetchDepartementCount();
  }, []);

  const fetchDepartements = async () => {
    try {
      const response = await axios.get("http://localhost:8088/departements");
      setDepartements(response.data);
    } catch (error) {
      console.error("Error fetching departements:", error);
    }
  };

  const fetchDepartementCount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8088/departements/count"
      );
      setDepartementCount(response.data);
    } catch (error) {
      console.error("Error fetching departement count:", error);
    }
  };

  const handleAddDepartement = async (e) => {
    e.preventDefault();
    if (!newDepartementName) {
      alert("Please enter a department name.");
      return;
    }
    try {
      await axios.post("http://localhost:8088/departements", {
        name: newDepartementName,
      });
      fetchDepartements();
      fetchDepartementCount();
      setNewDepartementName("");
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error adding departement:", error);
    }
  };

  const handleEditDepartement = async (e) => {
    e.preventDefault();
    if (!editDepartement || !editDepartement.name) {
      alert("Please enter a department name.");
      return;
    }
    try {
      await axios.put(
        `http://localhost:8088/departements/${editDepartement.id}`,
        editDepartement.name, // Send the name directly
        {
          headers: {
            "Content-Type": "text/plain", // Explicitly set content type
          },
        }
      );
      fetchDepartements();
      setEditDepartement(null);
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error editing departement:", error);
    }
  };

  const handleDeleteDepartement = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await axios.delete(`http://localhost:8088/departements/${id}`);
        fetchDepartements();
        fetchDepartementCount();
      } catch (error) {
        console.error("Error deleting departement:", error);
      }
    }
  };

  const filteredDepartements = departements.filter((departement) =>
    departement.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto">
        {!selectedDepartement ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Departments ({departementCount})
                </h1>
                <p className="text-sm text-gray-500">Manage departments</p>
              </div>
              <button
                onClick={() => setIsDialogOpen(true)}
                className="inline-flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none"
              >
                <span className="mr-2">+</span> Add New Department
              </button>
            </div>

            <div className="mb-6">
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="grid grid-cols-3 gap-4 p-4 text-sm font-medium text-gray-500 border-b">
                <div>Name</div>
                <div className="text-right col-span-2">Actions</div>
              </div>
              <div className="divide-y divide-gray-100">
                {filteredDepartements.map((departement) => (
                  <div
                    key={departement.id}
                    className="grid grid-cols-3 gap-4 p-4 items-center hover:bg-gray-50"
                  >
                    <div
                      className="text-gray-900 cursor-pointer"
                      onClick={() => setSelectedDepartement(departement)}
                    >
                      {departement.name}
                    </div>
                    <div className="flex justify-end col-span-2 space-x-4">
                      {/* Modify Button */}
                      <button
                        onClick={() => {
                          setEditDepartement(departement);
                          setIsEditDialogOpen(true);
                        }}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      {/* Delete Button */}
                      <button
                        onClick={() =>
                          handleDeleteDepartement(departement.id)
                        }
                        className="text-red-500 hover:text-red-700"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <Enseignants
  departementId={selectedDepartement.id} // Pass the department ID
  departementName={selectedDepartement.name}
  onBack={() => setSelectedDepartement(null)}
/>

        )}

        {/* Add Department Dialog */}
        {isDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg w-[80%] max-w-md p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Add Department</h2>
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="text-gray-700 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleAddDepartement} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    value={newDepartementName}
                    onChange={(e) => setNewDepartementName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Department Dialog */}
        {isEditDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg w-[80%] max-w-md p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Edit Department</h2>
                <button
                  onClick={() => setIsEditDialogOpen(false)}
                  className="text-gray-700 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleEditDepartement} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    value={editDepartement?.name || ""}
                    onChange={(e) =>
                      setEditDepartement({
                        ...editDepartement,
                        name: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Departements;
