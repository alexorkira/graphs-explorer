import { StatusCodes } from "http-status-codes";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ChartData } from "../../../interfaces/ChartData";
import { BrushChartProps } from "../../../interfaces/ChartProps";
import { Audience } from "../../../models/Audience";
import { AudienceService } from "../../../services/audience.service";
import ContextStore from "../../../store";

const BrushChart: React.FC<BrushChartProps> = (
    { ids }: BrushChartProps
) => {
    const sessionToken = ContextStore.useStoreState((store) => store.sessionToken);
    const invalidateSession = ContextStore.useStoreActions((actions) => actions.setSessionToken);
    const [ data, setData ] = useState<ChartData>();
    //const [ timestamps, setTimestamps ] = useState<Array<number>>([]);
  
    useEffect(() => {
        const fetchData = async () => {
            AudienceService.getAll(sessionToken)
                .then(({ audience }: Audience) => {

                    // Extract the array of timestamp (it is the same if taken from p2p array)
                    // in order to display it into the tooltip header
                    //setTimestamps(audience.map(c => c[0]));
                    setData(
                       {
                            label: "",
                            values: audience,
                            color: "",
                        }
                        
                    );

                })
                .catch(e => {
                    if (e.status === StatusCodes.FORBIDDEN) {
                        invalidateSession(undefined);
                    }
                });
        }
        
        fetchData();  
    }, [invalidateSession, sessionToken]);

    const brushOpptions = {
        colors: [ "#2E8B57" ],
        chart: {
            zoom: {
                enabled: true
            },
            brush:{
                targets: ids,
                enabled: true
            },
        },
        stroke: {
            width: 0,
            curve: 'straight' as "straight",
        },
        tooltip: {
            enabled: true,
            custom: (options: any) => {
                console.log(options);
                console.log(options.w.globals.timescaleLabels);
                const { series, dataPointIndex } = options;
                let content = ""
                // FIXME: Add tooltip with the timestamp info
                // let content = createTooltipEntry(
                //         "From",
                //         series[0][dataPointIndex], 
                //         "green",
                //         0
                //     )
                // + createTooltipEntry(
                //     "To",
                //     series[1][dataPointIndex], 
                //     "blue",
                //     1,
                // );

                console.log("forse ", series[dataPointIndex]);
            
                return (
                    `<div class="apexcharts-tooltip-title" style="font-weight: bold; font-size: 14px;">
                       Brush the areas you want to zoom on it
                    </div>
                    ${content}`
                );
            }
        },
        legend: {
            show: false,
        },
        xaxis: {
            type: 'datetime' as 'datetime',
            labels: {
                show: false
            },
            show: false,
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
        },
        yaxis: {
            tickAmount: 1,
            show: false,
            labels: {
                show: false
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            max: (max: number) => max
        },
        fill: {
            type: 'solid'
        },
        grid: {
            show: false,
          }
    };

    return (
        <>
            {data && 
                <div className="chart">
                    <div className="chart-container">
                        <ReactApexChart 
                            options={brushOpptions}
                            series={[{ data: data.values }]} 
                            type="area" 
                            height={100} 
                        />
                    </div>
                </div>
            }
        </>
    );
};

export default BrushChart;

