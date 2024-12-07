import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const Module = ({ optionId }) => {
    const [modules, setModules] = useState([]); // Ensure it's initialized as an array
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentModule, setCurrentModule] = useState(null);
    const [form, setForm] = useState({ name: "", optionId: optionId || "" });

    const fetchModules = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:8088/api/modules/byOption/${optionId}`);

            // Affichage de la réponse pour débogage
            console.log(response.data);

            // Vérifier si la réponse est bien un tableau
            if (Array.isArray(response.data)) {
                setModules(response.data);
           
            }
        } catch (err) {
            // Capture des erreurs spécifiques
            setError("Unable to fetch modules. Please try again later.");
            console.error(err); // Log de l'erreur
        } finally {
            setLoading(false);
        }
    }, [optionId]);

    useEffect(() => {
        fetchModules();
    }, [optionId, fetchModules]);

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAddModule = async () => {
        if (!form.name.trim()) {
            setError("Module name cannot be empty.");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:8088/api/modules", {
                name: form.name,
                option: { id: form.optionId },
            });
            setModules([...modules, response.data]);
            setForm({ name: "", optionId: form.optionId });
        } catch (err) {
            setError("Failed to add the module.");
        } finally {
            setLoading(false);
        }
    };

    const handleEditModule = async () => {
        if (!form.name.trim()) {
            setError("Module name cannot be empty.");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.put(
                `http://localhost:8088/api/modules/${currentModule.id}`,
                { name: form.name, option: { id: form.optionId } }
            );
            setModules(
                modules.map((module) =>
                    module.id === currentModule.id ? response.data : module
                )
            );
            setIsEditing(false);
            setCurrentModule(null);
            setForm({ name: "", optionId: form.optionId });
        } catch (err) {
            setError("Failed to update the module.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteModule = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:8088/api/modules/${id}`);
            setModules(modules.filter((module) => module.id !== id));
        } catch (err) {
            setError("Failed to delete the module.");
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (module) => {
        setIsEditing(true);
        setCurrentModule(module);
        setForm({ name: module.name, optionId: module.option.id });
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Modules</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h2 className="text-xl font-semibold mb-2">
                    {isEditing ? "Edit Module" : "Add Module"}
                </h2>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    placeholder="Module Name"
                    className="p-2 border rounded mb-2"
                />
                <button
                    onClick={isEditing ? handleEditModule : handleAddModule}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    disabled={loading}
                >
                    {isEditing ? "Update" : "Add"}
                </button>
                {isEditing && (
                    <button
                        onClick={() => {
                            setIsEditing(false);
                            setForm({ name: "", optionId: form.optionId });
                        }}
                        className="bg-gray-500 text-white px-4 py-2 ml-2 rounded"
                    >
                        Cancel
                    </button>
                )}
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid gap-4">
                    {modules.length > 0 ? (
                        modules.map((module) => (
                            <div key={module.id} className="border p-4 rounded-lg">
                                <p>{module.name}</p>
                                <button
                                    onClick={() => handleEditClick(module)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteModule(module.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No modules available.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Module;
