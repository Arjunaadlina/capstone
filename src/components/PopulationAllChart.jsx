// src/components/PopulationAllChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PopulationAllChart = ({ continentData }) => {
  const labels = Object.keys(continentData);

  // Fungsi untuk memformat populasi
  const formatPopulation = (population) => {
    if (population === 0) return '0'; // Jika populasi 0
    const million = (population / 1_000_000_000); // Mengonversi ke juta
    return million % 1 === 0 ? `${million} Billion` : `${million.toFixed(1)} Billion`; // Hapus .0 jika integer
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Total Population',
        data: labels.map(label => continentData[label].population), // Tetap gunakan data numerik
        backgroundColor: 'rgba(215, 178, 109, 0.6)',
        borderColor: 'rgba(243, 234, 229, 0.8)',
        borderWidth: 1,
      },
    ],
  };
  

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Countries and Population by Continent',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const datasetIndex = tooltipItem.datasetIndex;
            const population = tooltipItem.raw; // Ambil nilai mentah

            if (datasetIndex === 1) { // Jika dataset adalah Total Population
              return `Total Population: ${formatPopulation(population)}`; // Format label untuk tooltip
            }
            return `${tooltipItem.label}: ${population}`; // Untuk dataset Number of Countries
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return formatPopulation(value); // Format label y-axis
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default PopulationAllChart;
