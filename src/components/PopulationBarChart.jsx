import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PopulationBarChart = () => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const loadData = async () => {
            const countries = await fetchPopulationData();
            setChartData({
                labels: countries.map(country => country.name),
                datasets: [
                    {
                        label: 'Population',
                        data: countries.map(country => country.population),
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    }
                ]
            });
        };
        loadData();
    }, []);

    const options = {
        responsive: true,
        scales: {
            x: {
                type: 'category',
                title: {
                    display: true,
                    text: 'Country',
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Population',
                }
            }
        }
    };

    return <Bar data={chartData} options={options} />;
};

export default PopulationBarChart;
