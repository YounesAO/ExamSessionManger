import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";

const Modules = ({ optionId, optionName, onBack }) => {
  const [modules, setModules] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentModule, setCurrentModule] = useState({
    id: null,
    name: "",
    option: { id: optionId },
  });

  useEffect(() => {
    if (optionId) {
      fetchModules();
    }
  }, [optionId]);

  const fetchModules = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:8088/api/modules/byOption/${optionId}`
      );
      setModules(response.data || []); // Ensure modules is always an array
    } catch (err) {
      console.error("Error fetching modules:", err);
      setError("Failed to load modules. Please try again later.");
      setModules([]); // Ensure modules is always an array
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleDialogOpen = (module = null) => {
    setEditMode(!!module);
    setCurrentModule(
      module || {
        id: null,
        name: "",
        option: { id: optionId },
      }
    );
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setCurrentModule({
      id: null,
      name: "",
      option: { id: optionId },
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const moduleData = { ...currentModule, option: { id: optionId } };
      if (editMode) {
        await axios.put(
          `http://localhost:8088/api/modules/${currentModule.id}`,
          moduleData
        );
      } else {
        await axios.post("http://localhost:8088/api/modules", moduleData);
      }
      fetchModules();
      handleDialogClose();
    } catch (err) {
      console.error("Error saving module:", err);
      setError("An error occurred while saving the module. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this module?")) {
      setLoading(true);
      try {
        await axios.delete(`http://localhost:8088/api/modules/${id}`);
        fetchModules();
      } catch (err) {
        console.error("Error deleting module:", err);
        setError("An error occurred while deleting the module.");
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredModules = modules.filter((m) =>
    m.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <button onClick={onBack} className="mb-4 text-blue-600 hover:underline">
        Back to Options
      </button>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">
          {optionName} - Modules ({filteredModules.length})
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
            + Add Module
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
          <div className="grid grid-cols-2 gap-4 p-4 border-b font-medium">
            <div>Name</div>
            <div className="text-right">Actions</div>
          </div>
          <div className="divide-y">
            {filteredModules.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No modules found</div>
            ) : (
              filteredModules.map((module) => (
                <div
                  key={module.id}
                  className="grid grid-cols-2 gap-4 p-4 hover:bg-gray-50"
                >
                  <div>{module.name}</div>
                  <div className="text-right space-x-2">
                    <button
                      onClick={() => handleDialogOpen(module)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => handleDelete(module.id)}
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
          <div className="bg-white rounded-lg w-[80%] max-w-md p-6 relative">
            {/* Close button */}
            <button
              onClick={handleDialogClose}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
            <h2 className="text-xl font-bold mb-4">
              {editMode ? "Edit Module" : "Add Module"}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name:</label>
                <input
                  type="text"
                  value={currentModule.name}
                  onChange={(e) =>
                    setCurrentModule({ ...currentModule, name: e.target.value })
                  }
                  required
                  className="border rounded-md w-full px-3 py-2"
                />
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  {editMode ? "Save Changes" : "Add Module"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modules;
