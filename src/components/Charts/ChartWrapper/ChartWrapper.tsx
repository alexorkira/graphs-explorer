import moment from "moment";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { TIMESTAMP_FORMAT, X_AXIS_DATETIME_FORMAT } from "../../../constants/datetimeFormats";
import { ChartData } from "../../../interfaces/ChartData";
import { createTooltipEntry } from "../../../utils/createTooltipEntry";
import "./ChartWrapper.scss";

interface ChartProps {
    id: string;
    title?: string;
    data: Array<ChartData>;
    timestamps: Array<number>,
    noFilling?: boolean;
    unit?: string;
};

const Chart: React.FC<ChartProps> = (props: ChartProps) => {
    const series: ApexAxisChartSeries = [];
    const strokes: Array<YAxisAnnotations> = []; 
    const colors: Array<string> = [];
    const { timestamps } = props;

    props.data.forEach(d => {
        series.push({ name: d.label, data: d.values });
        colors.push(d.color);
        if (d.stroke) {
            strokes.push({ 
                y: d.stroke.value, 
                borderColor: d.stroke.color, 
                strokeDashArray: 3 
            });
        }
    });

    const fill = { type: 'solid' };
    if (props.noFilling) {
        Object.assign(fill, {  colors: ['transparent'] });
    }

    const options = {
        colors: colors,
        chart: {
            id: props.id,
            type: "area" as "area",
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false
            }
        },
        stroke: {
            width: 2,
            curve: 'straight' as "straight",
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            custom: (options: any) => {
                const { series, dataPointIndex } = options;
                const timestamp = moment(timestamps[dataPointIndex]).local().format(TIMESTAMP_FORMAT);
                let content = "";
                
                props.data.forEach((d, i) => {
                    content += createTooltipEntry(
                        d.label,
                        series[i][dataPointIndex], 
                        d.color,
                        i,
                        d.unit,
                        d.stroke
                    );
                });
                
                return (
                    `<div class="apexcharts-tooltip-title" style="font-weight: bold; font-size: 14px;">
                        ${timestamp}
                    </div>
                    ${content}`
                );
            }
        },
        xaxis: {
            tickAmount: 2,
            labels: {
                formatter: (dt: any) => {
                    return moment(dt).local().format(X_AXIS_DATETIME_FORMAT);
                }
            } 
        },
        yaxis: {
            tickAmount: 3,
            max: (max: number) => Math.floor(max),
            labels: {
                formatter: (val: number) => `${Math.floor(val).toFixed(2)}${props.unit ?? ''}`
            }
        },
        legend: {
            show: true,
        },
        annotations: {
            yaxis: strokes
        },
        fill: fill,
        grid: {
            show: false,
        }
    };

    if (props.noFilling) {
        Object.assign(options, { fill: { type: 'solid', colors: ['transparent'] }});
    }
    
    return (
        <div className="chart">
            <div className="chart-title">{props.title}</div>
            <div className="chart-container">
                <ReactApexChart type="area" series={series} options={options} height={280} />
            </div>
        </div>
    );
};

export default Chart;
