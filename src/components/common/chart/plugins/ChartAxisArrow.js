import { Chart } from "chart.js";
import drawArrow from "./utils/DrawArrow";

const ArrowDirection = {
    Up: "Up",
    Down: "Down",
    Left: "Left",
    Right: "Right",
};

const chartAxesArrow = {
    id: "chartAxesArrow",
    beforeDraw(chart, _args, options) {
        const {
            ctx,
            chartArea: { left, right, top, bottom },
        } = chart;
        const borderWidth = options.borderWidth || 2;
        const arrowW = borderWidth * 3;

        ctx.save();

        // init style
        ctx.lineWidth = borderWidth;
        ctx.strokeStyle = "#455A64";
        ctx.fillStyle = "#455A64";
        ctx.setLineDash(options.borderDash || []);
        ctx.lineDashOffset = options.borderDashOffset;

        // draw axes: x and y
        ctx.beginPath();
        ctx.moveTo(left, top);
        ctx.lineTo(left, bottom);
        ctx.lineTo(right, bottom);
        ctx.stroke();

        // draw arrow up
        drawArrow(ctx, left, top, arrowW, ArrowDirection.Up);
        // draw arrow right
        drawArrow(ctx, right, bottom, arrowW, ArrowDirection.Right);

        ctx.restore();
    },
};

export default chartAxesArrow;
