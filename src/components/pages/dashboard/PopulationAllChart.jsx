import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PopulationAllChart = ({ continentData }) => {
  const labels = Object.keys(continentData);

  const formatPopulation = (population) => {
    if (population === 0) return '0';
    const billion = population / 1_000_000_000;
    return billion % 1 === 0 ? `${billion} Billion` : `${billion.toFixed(1)} Billion`;
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Total Population',
        data: labels.map(label => continentData[label].population),
        backgroundColor: 'rgba(215, 178, 109, 0.6)',
        borderColor: 'rgba(243, 234, 229, 0.8)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true, // Nonaktifkan responsivitas
    maintainAspectRatio: false, // Tidak menjaga rasio aspek
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Countries and Population by Continent',
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return formatPopulation(value);
          },
        },
      },
    },
  };

  return (
    <div className='w-full h-96'> 
      <Bar data={data} options={options} />
    </div>
  );
};

export default PopulationAllChart;
