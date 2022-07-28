import moment from "moment";
import { createTooltipEntry } from "../components/Charts/Chart/createTooltipEntry";
import { ChartData } from "../interfaces/ChartData";

const TIMESTAMP_FORMAT = 'dddd DD-MM-YYYY HH:mm (Z)';
const X_AXIS_DATETIME_FORMAT = 'MMM DD';

export const getChartOptions = (
    id: string, 
    title: string,
    colors: Array<string>,
    timestamps: Array<number>,
    data: Array<ChartData>,
    fill: {type: string, colors?: Array<string>},
    strokes?: Array<YAxisAnnotations>,
) => {
    console.log("strokes>>>> ", strokes);
    
    return {
        colors: colors,
        title: {
            text: title,
            style: {
                fontSize: "18px",
            }
        },
        chart: {
            id: id,
            type: 'area' as 'area',
            toolbar: { 
                show: false,
                autoSelected: 'zoom' as 'zoom' 
            },
            zoom: {
                enabled: false
            },
        },
        stroke: {
            width: 2,
            curve: 'straight' as 'straight',
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            custom: (options: { 
                series: { [x: string]: { [x: string]: string; }; }; 
                dataPointIndex: number 
            }) => {
                const { dataPointIndex } = options;
                const timestamp = moment(timestamps[dataPointIndex]).local().format(TIMESTAMP_FORMAT);
                let content = "";
                
                data.forEach((item, index) => {
                    content += createTooltipEntry(
                        item.name,
                        options.series[index][dataPointIndex], 
                        item.color,
                        index,
                        item.unit,
                        item.stroke
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
        legend: {
            show: true,
        },
        annotations: {
            yaxis: strokes
        },
        fill: fill
    };

}