import React, { useState, useEffect } from "react";
import axios from "axios";

const EnseignantDetails = ({ id, onClose }) => {
    const [enseignant, setEnseignant] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEnseignantDetails = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8088/enseignants/${id}`
                );
                setEnseignant(response.data);
            } catch (err) {
                console.error("Error fetching enseignant details:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchEnseignantDetails();
    }, [id]);

    if (loading) {
        return <div className="text-center">Chargement des détails...</div>;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-[90%] max-w-lg p-6 shadow-lg transform transition-all">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
                    Détails de l'Enseignant
                </h2>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">Prénom:</span>
                        <span>{enseignant.firstName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">Nom:</span>
                        <span>{enseignant.lastName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">Email:</span>
                        <span>{enseignant.email}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">Numéro de téléphone:</span>
                        <span>{enseignant.phoneNumber}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">Dispense:</span>
                        <span>{enseignant.dispense ? "Oui" : "Non"}</span>
                    </div>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-300"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EnseignantDetails;
