import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Enregistrer les composants nécessaires pour Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartComponent = () => {
  const data = {
    labels: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin"],
    datasets: [
      {
        label: "Nombre d'exams",
        data: [12, 19, 13, 15, 22, 30],
        borderColor: "#4e73df",
        backgroundColor: "rgba(78, 115, 223, 0.5)",
        tension: 0.4,
      },
      {
        label: "Surveillance moyenne",
        data: [5, 9, 6, 7, 11, 15],
        borderColor: "#1cc88a",
        backgroundColor: "rgba(28, 200, 138, 0.5)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Aperçu des données",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default ChartComponent;
