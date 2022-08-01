import moment from "moment";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { BRUSH_CHART_FIXED_OPTIONS } from "../../../constants/brushChartFixedOptions";
import { TIMESTAMP_FORMAT } from "../../../constants/datetimeFormats";
import { BrushChartProps } from "../../../interfaces/ChartProps";
import ContextStore from "../../../store";
import { createTooltipEntry } from "../../../utils/createTooltipEntry";
import "./BrushChart.scss";

const BrushChart: React.FC<BrushChartProps> = (
    { ids }: BrushChartProps
) => {
    const timestamps  = ContextStore.useStoreState((store) => store.chartData.timestamps);
    const audianceChartData  = ContextStore.useStoreState((store) => store.chartData.audienceChartData);
    
    if (!(audianceChartData && timestamps.length > 0)) {
        return <></>;
    }

    let fromValue = 0;
    let toValue = 0;
    
    const brushOptions = {
        ...BRUSH_CHART_FIXED_OPTIONS,
        colors: [ "#2E8B57" ],
        chart: {
            zoom: {
                enabled: true
            },
            brush:{
                targets: ids,
                enabled: true
            },
            selection: {
                enabled: true
            },
            events: {
                brushScrolled: (_ctx: any, selection: { xaxis: { min: number, max: number }}) => {
                    const { xaxis } = selection;
                    fromValue = xaxis.min;
                    toValue = xaxis.max;
                },
            }
        },
        tooltip: {
            enabled: true,
            custom: (opts: { dataPointIndex: number; }) => {
                // For the first selection, "From" value will be the point 
                // where the mouse is over in the graph
                const from = fromValue ??  timestamps[opts.dataPointIndex];
                let content = createTooltipEntry(
                    0,
                    {
                        label: "From", 
                        value: moment(from).local().format(TIMESTAMP_FORMAT), 
                        color:"green", 
                    },
                );
                if (toValue) {
                    content += createTooltipEntry(
                        1,
                        {
                            label: "To", 
                            value: moment(toValue).local().format(TIMESTAMP_FORMAT), 
                            color: "blue", 
                        },
                    );
                }

                return (
                    `<div class="apexcharts-tooltip-title" style="font-weight: bold; font-size: 14px;">
                       Brush the areas you want to zoom on it
                    </div>
                    ${content}`
                );
            }
        }
    };

    return (
        <div className="chart brush">
            <div className="chart-container">
                <ReactApexChart 
                    options={brushOptions}
                    series={[{ data: audianceChartData.values }]} 
                    type="area" 
                    height={120} 
                />
            </div>
        </div>
    );
};

export default BrushChart;

