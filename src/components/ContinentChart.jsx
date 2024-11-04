// src/components/ContinentChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ContinentChart = ({ continentData }) => {
  const labels = Object.keys(continentData);
  
  // Warna untuk setiap benua
  const colors = [
    '#FF6384', // Africa
    '#36A2EB', // Americas
    '#FFCE56', // Asia
    '#4BC0C0', // Europe
    '#9966FF', // Oceania
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Countries by Continent',
        data: labels.map(label => continentData[label].count),
        backgroundColor: colors,
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
        text: 'Number of Countries by Continent',
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default ContinentChart;
