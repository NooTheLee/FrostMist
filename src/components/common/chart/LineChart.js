import React from "react";
import {Line} from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto";
import "chartjs-adapter-moment";

const LineChart = (props) => {
    const option = {
        legend: {
            display: true,
        },
        plugins: {
            tooltip: {
                callbacks: {
                    title: (title) => {
                        console.log(title);
                        return "Hello";
                    },
                    label: (content) => {
                        console.log(content);
                        return "label";
                    },
                },
            },
        },
    };

    const labels = [1, 2, 3, 4, 5, 6, 7];
    return (
        <Line
            data={{
                datasets: props.datasets,
            }}
            // @ts-ignore
            options={props.option || option}
        />
    );
};

export default LineChart;
