import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const Enseignants = ({ departementId, departementName, onBack }) => {
  const [enseignants, setEnseignants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentEnseignant, setCurrentEnseignant] = useState({
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dispense: false,
  });

  const fetchEnseignants = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:8088/enseignants/search/departement?departementName=${departementName}`
      );
      setEnseignants(response.data);
    } catch (err) {
      console.error("Error fetching enseignants:", err);
      setError("Failed to load instructors. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [departementName]);

  useEffect(() => {
    if (departementName) {
      fetchEnseignants();
    }
  }, [departementName, fetchEnseignants]);

  const handleSearch = (e) => setSearchQuery(e.target.value.toLowerCase());

  const handleDialogOpen = (enseignant = null) => {
    setEditMode(!!enseignant);
    setCurrentEnseignant(
      enseignant || {
        id: null,
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        dispense: false,
        departement: { id: departementId },
      }
    );
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setCurrentEnseignant({
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      dispense: false,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const enseignantData = {
        ...currentEnseignant,
        departement: { id: departementId },
      };

      if (editMode) {
        await axios.put(
          `http://localhost:8088/enseignants/${currentEnseignant.id}`,
          enseignantData
        );
      } else {
        await axios.post("http://localhost:8088/enseignants", enseignantData);
      }
      fetchEnseignants();
      handleDialogClose();
    } catch (err) {
      console.error("Error saving enseignant:", err);
      setError("An error occurred while saving the instructor. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this instructor?")) {
      setLoading(true);
      try {
        await axios.delete(`http://localhost:8088/enseignants/${id}`);
        fetchEnseignants();
      } catch (err) {
        console.error("Error deleting enseignant:", err);
        setError("An error occurred while deleting the instructor.");
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredEnseignants = enseignants.filter((e) =>
    `${e.firstName} ${e.lastName} ${e.email} ${e.phoneNumber}`
      .toLowerCase()
      .includes(searchQuery)
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <button onClick={onBack} className="mb-4 text-blue-600 hover:underline">
        Back to Departments
      </button>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">
          {departementName} - Instructors ({filteredEnseignants.length})
        </h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            className="border rounded-md px-4 py-2"
          />
          <button
            onClick={() => handleDialogOpen()}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            + Add Instructor
          </button>
        </div>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <div className="grid grid-cols-6 gap-4 p-4 border-b font-medium">
            <div>First Name</div>
            <div>Last Name</div>
            <div>Email</div>
            <div>Phone</div>
            <div>Dispense</div>
            <div className="text-right">Actions</div>
          </div>
          <div className="divide-y">
            {filteredEnseignants.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No instructors found
              </div>
            ) : (
              filteredEnseignants.map((enseignant) => (
                <div
                  key={enseignant.id}
                  className="grid grid-cols-6 gap-4 p-4 hover:bg-gray-50"
                >
                  <div>{enseignant.firstName}</div>
                  <div>{enseignant.lastName}</div>
                  <div>{enseignant.email}</div>
                  <div>{enseignant.phoneNumber}</div>
                  <div>
                    <input type="checkbox" checked={enseignant.dispense} readOnly />
                  </div>
                  <div className="text-right space-x-2">
                    <button
                      onClick={() => handleDialogOpen(enseignant)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => handleDelete(enseignant.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[80%] max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">
              {editMode ? "Edit Instructor" : "Add Instructor"}
            </h2>
            <form onSubmit={handleSave}>
              <div className="mb-4">
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  value={currentEnseignant.firstName}
                  onChange={(e) =>
                    setCurrentEnseignant({ ...currentEnseignant, firstName: e.target.value })
                  }
                  className="border rounded-md w-full px-4 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  value={currentEnseignant.lastName}
                  onChange={(e) =>
                    setCurrentEnseignant({ ...currentEnseignant, lastName: e.target.value })
                  }
                  className="border rounded-md w-full px-4 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  value={currentEnseignant.email}
                  onChange={(e) =>
                    setCurrentEnseignant({ ...currentEnseignant, email: e.target.value })
                  }
                  className="border rounded-md w-full px-4 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="text"
                  value={currentEnseignant.phoneNumber}
                  onChange={(e) =>
                    setCurrentEnseignant({
                      ...currentEnseignant,
                      phoneNumber: e.target.value,
                    })
                  }
                  className="border rounded-md w-full px-4 py-2"
                />
              </div>
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  checked={currentEnseignant.dispense}
                  onChange={(e) =>
                    setCurrentEnseignant({ ...currentEnseignant, dispense: e.target.checked })
                  }
                  className="mr-2"
                />
                <label className="text-gray-700">Dispense</label>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleDialogClose}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Enseignants;
