import { StatusCodes } from "http-status-codes";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { BRUSH_CHART_FIXED_OPTIONS } from "../../../constants/brushChartFixedOptions";
import { TIMESTAMP_FORMAT } from "../../../constants/datetimeFormats";
import { BrushChartProps } from "../../../interfaces/ChartProps";
import { Audience } from "../../../models/Audience";
import { AudienceService } from "../../../services/audience.service";
import ContextStore from "../../../store";
import { createTooltipEntry } from "../../../utils/createTooltipEntry";
import "./BrushChart.scss";

const BrushChart: React.FC<BrushChartProps> = (
    { ids }: BrushChartProps
) => {
    const sessionToken = ContextStore.useStoreState((store) => store.sessionToken);
    const invalidateSession = ContextStore.useStoreActions((actions) => actions.setSessionToken);
    const [ data, setData ] = useState<Array<[number,number]>>([]);
    const [ timestamps, setTimestamps ] = useState<Array<number>>([]);
    
    let fromValue = 0;
    let toValue = 0;

    useEffect(() => {
        //FIXME: It's possibile to avoid this call taken the state from the store
        const fetchData = async () => {
            AudienceService.getAll(sessionToken)
                .then(({ audience }: Audience) => {
                    // Extract the array of timestamp (it is the same if taken from p2p array)
                    // in order to display it into the tooltip header
                    setTimestamps(audience.map(c => c[0]));
                    setData(audience);
                })
                .catch(e => {
                    if (e.status === StatusCodes.FORBIDDEN) {
                        invalidateSession(undefined);
                    }
                });
        }
        
        fetchData();  
    }, [invalidateSession, sessionToken]);

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
        <>
            {data.length > 0 && 
                <div className="chart brush">
                    <div className="chart-container">
                        <ReactApexChart 
                            options={brushOptions}
                            series={[{ data: data }]} 
                            type="area" 
                            height={120} 
                        />
                    </div>
                </div>
            }
        </>
    );
};

export default BrushChart;

