import React from "react";
import ReactApexChart from "react-apexcharts";
import "./Chart.scss";

export type ChartData = {
    label: string,
    values: Array<number>;
    unit: string;
    style: {
        color: string;
    }
    stroke?: {
        label: string,
        color: string;
        value: number; 
    }
};


interface ChartProps {
    title?: string;
    data: Array<ChartData>;
};

const Chart: React.FC<ChartProps> = (props: ChartProps) => {
    const series: ApexAxisChartSeries = [];
    const strokes: Array<YAxisAnnotations> = []; 
    const colors: Array<string> = [];

    props.data.forEach(d => {
        series.push({ name: d.label, data: d.values });
        colors.push(d.style.color);
        if (d.stroke) {
            strokes.push({ 
                y: d.stroke.value, 
                borderColor: d.stroke.color, 
                strokeDashArray: 3 
            });
        }
    });

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
            x: {
                format: 'dd MMM yyyy'
            },
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
    };
    
    return (
        <div className="chart">
            <h3 className="chart-title">{props.title}</h3>
            <ReactApexChart 
                type="area" 
                series={series} 
                options={options} 
                height={330}
            />
        </div>
        
    );
};

export default React.memo(Chart);
