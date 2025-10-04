import React, { useRef } from 'react';
import Chart from '../components/common/Chart';

interface PriceChartProps {
    data: { time: string; price: number }[];
}

const PriceChart: React.FC<PriceChartProps> = ({ data }) => {
    const chartData = {
        labels: data.map((d) => d.time),
        datasets: [
            {
                label: 'Price',
                data: data.map((d) => d.price),
                borderColor: 'green',
                fill: true,
                tension: 0.1,
            },
        ],
    };

    return <Chart chartData={chartData} color="green" />;
};

export default PriceChart;
