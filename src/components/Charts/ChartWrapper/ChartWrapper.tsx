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
    tooltipExtraData?: Array<ChartData>
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

                props.data.forEach((item, index) => {
                    const {label, color, unit, stroke} = item;
                    content += createTooltipEntry(
                        index,
                        { 
                            label,
                            value: series[index][dataPointIndex], 
                            color,
                            unit,
                            stroke 
                        },
                    );
                });

                props.tooltipExtraData?.forEach((item, index) => {
                    const {label, color, unit, values } = item;
                    content += createTooltipEntry(
                        index + props.data.length,
                        { 
                            label,
                            // FIXME: Find how to calculate the Spike reduction
                            value: values[dataPointIndex] 
                                ? (values[dataPointIndex] as number).toFixed(2) 
                                : "? ", 
                            color,
                            unit
                        }
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
        grid: {
            show: false,
        },
        fill: fill,
    };

    if (props.noFilling) {
        Object.assign(options, { fill: { type: 'solid', colors: ['transparent'] }});
    }
    
    return (
        <div className="chart">
            <div className="chart-title">{props.title}</div>
            <div className="chart-container">
                <ReactApexChart 
                    type="area" 
                    series={series} 
                    options={options} 
                    height={280} 
                />
            </div>
        </div>
    );
};

export default Chart;
