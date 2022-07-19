import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "chartjs-adapter-moment";

import chartAxesArrow from "./plugins/ChartAxisArrow";

import { Chart as ChartJS } from "chart.js";

ChartJS.register(chartAxesArrow);

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
