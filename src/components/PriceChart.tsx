import React, { useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler, // <-- add filler for area shading
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, Filler);

interface PriceChartProps {
    data: { time: string; price: number }[];
}

const PriceChart: React.FC<PriceChartProps> = ({ data }) => {
    const chartRef = useRef<any>(null);

    const chartData = {
        labels: data.map((d) => d.time),
        datasets: [
            {
                label: 'Price',
                data: data.map((d) => d.price),
                borderColor: 'green',
                fill: true,
                tension: 0.1,
                backgroundColor: (context: any) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) return null; // needed for initial render

                    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0, 'rgba(0, 128, 0, 0.4)'); // green at top
                    gradient.addColorStop(1, 'rgba(255, 255, 255, 1)'); // white at bottom
                    return gradient;
                },
            },
        ],
    };

    const chartOptions = {
        maintainAspectRatio: false,
        responsive: true,
    };

    return (
        <div style={{ width: '90vw', height: '70vh' }}>
            <Line ref={chartRef} data={chartData} options={chartOptions} />
        </div>
    );
};

export default PriceChart;
