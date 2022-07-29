import { StatusCodes } from "http-status-codes";
import React, { useEffect, useState } from "react";
import { ChartData } from "../../../interfaces/ChartData";
import { ChartProps } from "../../../interfaces/ChartProps";
import { Bandwidth } from "../../../models/Bandwidth";

import { BandwidthService } from "../../../services/bandwidth.services";
import ContextStore from "../../../store";
import { bpsToGbps } from "../../../utils/bpsToGbps";
import ChartWrapper from "../ChartWrapper/ChartWrapper";

const CapacityOffloadChart: React.FC<ChartProps> = (
    { id } : ChartProps
) => {
    const sessionToken = ContextStore.useStoreState((store) => store.sessionToken);
    const invalidateSession = ContextStore.useStoreActions((actions) => actions.setSessionToken);
    const [ data, setData ] = useState<Array<ChartData>>([]);
    const [ tooltipItems, setTooltipItems ] = useState<Array<ChartData>>([]);
    const [ timestamps, setTimestamps ] = useState<Array<number>>([]);

    useEffect(() => {
        const fetchData = async () => {
            BandwidthService.getAll(sessionToken)
                .then((bandiwidth: Bandwidth) => {
                    // The first element is timestamp, 
                    // second one the value of the bandwidth selected (cdn or p2p)
                    const { cdn, p2p } = bandiwidth;
                    
                    // Extract the array of timestamp (it is the same if taken from p2p array)
                    // in order to display it into the tooltip header
                    setTimestamps(cdn.map(c => c[0]));
                   
                    const gbpsP2p: Array<[number,number]> = 
                        p2p.map(([timestamp, value]) => [timestamp, bpsToGbps(value)]
                    );
                    const p2pValues = gbpsP2p.map(p => p[1]);
                    const p2pMax = Math.max(...p2pValues);
                    const gbpsHttp: Array<[number,number]> = 
                        cdn.map(([timestamp, value]) => [timestamp, bpsToGbps(value)]
                    );
                    const httpValues = gbpsHttp.map(h => h[1]);
                    const httpMax = Math.max(...httpValues);

                    // Sums of p2p and http values
                    const total = p2pValues.map((p,i) => p + httpValues[i])

                    setData([
                       {
                            label: "P2p",
                            values: gbpsP2p,
                            unit: "Gbps",
                            color: "#FF7D71",
                            stroke: {
                                label: "MAX P2p",
                                color: "#FF7D71",
                                value: p2pMax
                            }
                        }, 
                        {
                            label: "Http",
                            values: gbpsHttp,
                            unit: "Gbps",
                            color: "#F8AB8D",
                            stroke: {
                                label: "MAX Http",
                                color: "#0075C9",
                                value: httpMax
                            }
                        },
                    ]);
    
                    setTooltipItems([
                        {
                            label: "Total",
                            values: total,
                            unit: "Gbps",
                            color: "#1ec71e"
                        },
                        {
                            label: "Spike reduction",
                            values: [],
                            unit: "%",
                            color: "#E74C3C"
                        },
                    ])
                })
                .catch(e => {
                    if (e.status === StatusCodes.FORBIDDEN) {
                        invalidateSession(undefined);
                    }
                });
        }
        
        fetchData();  
    }, [invalidateSession, sessionToken]);

    return (
        <>
            {data.length > 0 && 
                <ChartWrapper 
                    id={id}
                    title={"Capacity offload"} 
                    data={data} 
                    timestamps={timestamps}
                    unit={"Gbps"}
                    tooltipExtraData={tooltipItems}
                />
            }
        </>
    );
};

export default CapacityOffloadChart;
