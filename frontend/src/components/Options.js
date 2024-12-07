import React, { useState, useEffect } from "react";
import axios from "axios";
import Module from "./Module";
import Navbar from "./Navbar";

const Options = () => {
  const [options, setOptions] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newOptionName, setNewOptionName] = useState("");
  const [editOption, setEditOption] = useState(null);
  const [filter, setFilter] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState("");  // State to capture error messages

  const apiBaseUrl = "http://localhost:8088/api/options";

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const response = await axios.get(apiBaseUrl);
      setOptions(response.data);
    } catch (error) {
      console.error("Error fetching options:", error);
      setError("Failed to fetch options.");
    }
  };

  const handleAddOption = async (e) => {
    e.preventDefault();
    if (!newOptionName) {
      alert("Please enter an option name.");
      return;
    }
    try {
      const newOption = { name: newOptionName };
      await axios.post(apiBaseUrl, newOption);
      fetchOptions(); // Refresh options list
      setNewOptionName("");
      setIsDialogOpen(false);
      setError("");  // Clear any previous errors
    } catch (error) {
      console.error("Error adding option:", error);
      setError("Failed to add option. Please try again.");
    }
  };

  const handleEditOption = async (e) => {
    e.preventDefault();
    if (!editOption || !editOption.name) {
      alert("Please enter a valid option name.");
      return;
    }
    try {
      await axios.put(`${apiBaseUrl}/${editOption.id}`, editOption);
      fetchOptions(); // Refresh options list
      setEditOption(null);
      setIsEditDialogOpen(false);
      setError("");  // Clear any previous errors
    } catch (error) {
      console.error("Error editing option:", error);
      setError("Failed to edit option. Please try again.");
    }
  };

  const handleDeleteOption = async (id) => {
    if (window.confirm("Are you sure you want to delete this option?")) {
      try {
        await axios.delete(`${apiBaseUrl}/${id}`);
        fetchOptions(); // Refresh options list
      } catch (error) {
        console.error("Error deleting option:", error);
        setError("Failed to delete option. Please try again.");
      }
    }
  };

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto">
        {!selectedOption ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Options</h1>
                <p className="text-sm text-gray-500">Manage departments</p>
              </div>
              <button
                onClick={() => setIsDialogOpen(true)}
                className="px-4 py-2 bg-black text-white rounded-md"
              >
                + Add New Option
              </button>
            </div>

            <div className="mb-6">
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none"
                placeholder="Search"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>

            {error && (
              <div className="text-red-500 mb-4">
                <strong>{error}</strong>
              </div>
            )}

            <div className="bg-white rounded-lg shadow">
              <div className="grid grid-cols-3 gap-4 p-4 text-sm font-medium text-gray-500 border-b">
                <div>Name</div>
                <div className="text-right col-span-2">Actions</div>
              </div>
              <div className="divide-y divide-gray-100">
                {filteredOptions.map((option) => (
                  <div
                    key={option.id}
                    className="grid grid-cols-3 gap-4 p-4 items-center hover:bg-gray-50"
                  >
                    <div
                      className="text-gray-900 cursor-pointer"
                      onClick={() => setSelectedOption(option)}
                    >
                      {option.name}
                    </div>
                    <div className="flex justify-end col-span-2 space-x-4">
                      <button
                        onClick={() => {
                          setEditOption(option);
                          setIsEditDialogOpen(true);
                        }}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteOption(option.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <Module
            optionId={selectedOption.id}
            optionName={selectedOption.name}
            onBack={() => setSelectedOption(null)}
          />
        )}

        {/* Add Dialog */}
        {isDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-4">Add Option</h2>
              <form onSubmit={handleAddOption}>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md mb-4"
                  placeholder="Option Name"
                  value={newOptionName}
                  onChange={(e) => setNewOptionName(e.target.value)}
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 mr-2"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-black text-white">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Dialog */}
        {isEditDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-4">Edit Option</h2>
              <form onSubmit={handleEditOption}>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md mb-4"
                  value={editOption.name || ""}
                  onChange={(e) =>
                    setEditOption({ ...editOption, name: e.target.value })
                  }
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 mr-2"
                    onClick={() => {
                      setEditOption(null);
                      setIsEditDialogOpen(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-black text-white">
                    Save
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

export default Options;
