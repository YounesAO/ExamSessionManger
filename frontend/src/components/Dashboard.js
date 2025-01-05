import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import ChartComponent from "./ChartComponent";

const Dashboard = () => {
  const [data, setData] = useState({
    exams: 0,
    teachers: 0,
    departments: 0,
    currentSurveillance: 0,
    recentExams: [],
  });

  const sessionId = localStorage.getItem('sessionid');

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          sessionExamsResponse,
          enseignantsResponse,
          departementsResponse,
        ] = await Promise.all([
          axios.get(`http://localhost:8088/api/exams/bySession/${sessionId}`),
          axios.get("http://localhost:8088/enseignants/count"),
          axios.get("http://localhost:8088/departements/count"),
        ]);

        setData((prevData) => ({
          ...prevData,
          exams: sessionExamsResponse.data.length || 0, // Count exams
          recentExams: sessionExamsResponse.data || [], // List of exams
          teachers: enseignantsResponse.data || 0,
          departments: departementsResponse.data || 0,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800">Sessions</h1>
        <p className="text-gray-500 mb-4">Gérer les sessions</p>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-lg font-medium text-gray-600">Exams</h3>
            <p className="text-2xl font-semibold text-blue-500">{data.exams}</p>
            <p className="text-sm text-gray-400">Nombre total d'examens</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-lg font-medium text-gray-600">Enseignants</h3>
            <p className="text-2xl font-semibold text-green-500">
              {data.teachers}
            </p>
            <p className="text-sm text-gray-400">Total enseignants</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-lg font-medium text-gray-600">
              Nombre de départements
            </h3>
            <p className="text-2xl font-semibold text-yellow-500">
              {data.departments}
            </p>
            <p className="text-sm text-gray-400">+19% par rapport à mois dernier</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-lg font-medium text-gray-600">
              Surveillance actuelle
            </h3>
            <p className="text-2xl font-semibold text-red-500">
              {data.currentSurveillance}
            </p>
            <p className="text-sm text-gray-400">
              Moyenne surveillance par enseignant
            </p>
          </div>
        </div>

        {/* Charts and Recent Exams */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Chart Placeholder */}
          <div className="chart">
            <h3>Aperçu</h3>
            <ChartComponent />
          </div>

          {/* Recent Exams */}
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-600 mb-4">
              Examens récentes
            </h3>
            <ul className="divide-y divide-gray-200">
              {data.recentExams.length > 0 ? (
                data.recentExams.map((exam, index) => (
                  <li key={index} className="py-3">
                    <div className="flex items-center justify-between">
                      <p className="text-gray-800">{exam.name || "N/A"}</p>
                      <p className="text-sm text-gray-500">{exam.date}</p>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">Pas d'exams récentes</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;