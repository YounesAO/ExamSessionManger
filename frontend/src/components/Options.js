import React, { useState, useEffect } from "react";
import axios from "axios";
import Module from "./Module";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Options = () => {
  const [options, setOptions] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newOptionName, setNewOptionName] = useState("");
  const [editOption, setEditOption] = useState(null);
  const [filter, setFilter] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState("");

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
      fetchOptions();
      setNewOptionName("");
      setIsDialogOpen(false);
      setError("");
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
      fetchOptions();
      setEditOption(null);
      setIsEditDialogOpen(false);
      setError("");
    } catch (error) {
      console.error("Error editing option:", error);
      setError("Failed to edit option. Please try again.");
    }
  };

  const handleDeleteOption = async (id) => {
    if (window.confirm("Are you sure you want to delete this option?")) {
      try {
        await axios.delete(`${apiBaseUrl}/${id}`);
        fetchOptions();
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
                <p className="text-sm text-gray-500">Manage options</p>
              </div>
              <button
                onClick={() => setIsDialogOpen(true)}
                className="inline-flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none"
              >
                <span className="mr-2">+</span> Add New Option
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
            <div className="bg-white p-6 rounded-lg shadow-lg relative">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </button>
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
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                  >
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
            <div className="bg-white p-6 rounded-lg shadow-lg relative">
              <button
                onClick={() => setIsEditDialogOpen(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </button>
              <h2 className="text-lg font-bold mb-4">Edit Option</h2>
              <form onSubmit={handleEditOption}>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md mb-4"
                  value={editOption?.name || ""}
                  onChange={(e) =>
                    setEditOption({ ...editOption, name: e.target.value })
                  }
                />
                <div className="flex justify-end">
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
    </div>
  );
};

export default Options;
