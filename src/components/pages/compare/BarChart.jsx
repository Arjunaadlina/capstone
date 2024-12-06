import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart({selectedCountry1, selectedCountry2}) {
    const chartData = {
        labels: [
            selectedCountry1?.name.common || "Country 1",
            selectedCountry2?.name.common || "Country 2",
        ],
        datasets: [
            {
                label: "Population",
                data: [
                    selectedCountry1?.population || 0,
                    selectedCountry2?.population || 0,
                ],
                backgroundColor: [ 'rgba(215, 178, 109, 0.6)', '#2c2724'],
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
                text: "Population Comparison",
            },
        },
    };

    return (
        <div className="mt-6 h-96 w-[700px]">
            <Bar data={chartData} options={chartOptions} />
        </div>
    )
}

export default BarChart