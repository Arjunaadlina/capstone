import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

function PieChart({ selectedCountry1, selectedCountry2 }) {
    const chartData = {
        labels: [
            selectedCountry1?.name.common || "Country 1",
            selectedCountry2?.name.common || "Country 2",
        ],
        datasets: [
            {
                label: "Area (km)",
                data: [
                    selectedCountry1?.area || 0,
                    selectedCountry2?.area || 0,
                ],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Country Area Comparison",
            },
        },
    };

    return (
        <div className="mt-6 h-96">
            <Pie data={chartData} options={chartOptions} />
        </div>
    );
}

export default PieChart;
