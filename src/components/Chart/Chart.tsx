import moment from "moment";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { ChartData } from "../../models/ChartData";
import "./Chart.scss";
import { createTooltipEntry } from "./createTooltipEntry";


const TIMESTAMP_FORMAT = 'dddd DD-MM-YYYY HH:mm (Z)';

interface ChartProps {
    title?: string;
    data: Array<ChartData>;
    noFilling?: boolean;
};

const Chart: React.FC<ChartProps> = (props: ChartProps) => {
    const series: ApexAxisChartSeries = [];
    const strokes: Array<YAxisAnnotations> = []; 
    const colors: Array<string> = [];

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

    const fill = {};
    if (props.noFilling) {
        Object.assign(fill, { type: 'solid', colors: ['transparent'] });
    }
    else {
        Object.assign(fill, { type: 'solid', opacity: 0.6 });
    }

    const options = {
        colors: colors,
        chart: {
            toolbar: {
                show: false,
            },
        },
        stroke: {
            width: 2,
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            custom: (options: any) => {
                const { series, dataPointIndex } = options;
                const timestamp = moment().utc().format(TIMESTAMP_FORMAT);
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
        },
        legend: {
            show: true,
        },
        annotations: {
            yaxis: strokes
        },
        fill: fill
    };

    if (props.noFilling) {
        Object.assign(options, { fill: { type: 'solid', colors: ['transparent'] }});
    }
    
    return (
        <div className="chart">
            <h3 className="chart-title">{props.title}</h3>
            <div className="chart-container">
                <ReactApexChart 
                    type="area" 
                    series={series} 
                    options={options} 
                    height={330}
                />
            </div>
        </div>
        
    );
};

export default React.memo(Chart);
