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
    Filler,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, Filler);

interface ChartProps {
    chartData: any;
    color?: string;
}

const Chart: React.FC<ChartProps> = ({ chartData, color = 'green' }) => {
    const chartRef = useRef<any>(null);

    // Add gradient background to the first dataset if fill is true
    if (chartData.datasets && chartData.datasets[0]?.fill) {
        chartData.datasets[0].backgroundColor = (context: any) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) return null;
            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            gradient.addColorStop(0, `rgba(0, 128, 0, 0.4)`);
            gradient.addColorStop(1, `rgba(255, 255, 255, 1)`);
            return gradient;
        };
        chartData.datasets[0].borderColor = color;
    }

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

export default Chart;
