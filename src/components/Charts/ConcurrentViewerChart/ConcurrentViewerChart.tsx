import { StatusCodes } from "http-status-codes";
import React, { useEffect, useState } from "react";
import { ChartData } from "../../../interfaces/ChartData";
import { Audience } from "../../../models/Audience";
import { AudienceService } from "../../../services/audience.service";
import ContextStore from "../../../store";
import Chart from "../Chart/Chart";

const ConcurrentViewerChart: React.FC = () => {
    const sessionToken = ContextStore.useStoreState((store) => store.sessionToken);
    const invalidateSession = ContextStore.useStoreActions((actions) => actions.setSessionToken);
    const [ data, setData ] = useState<Array<ChartData>>([]);
    const [ timestamps, setTimestamps ] = useState<Array<number>>([]);
   

    useEffect(() => {
        const fetchData = async () => {
            AudienceService.getAll(sessionToken)
                .then(({ audience }: Audience) => {

                    // Extract the array of timestamp (it is the same if taken from p2p array)
                    // in order to display it into the tooltip header
                    setTimestamps(audience.map(c => c[0]));
                    setData([
                       {
                            label: "Audiance",
                            values: audience,
                            color: "#FF7D71",
                        }
                        , 
                    ]);
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
                <Chart title={"Concurrent Viewer"} data={data} timestamps={timestamps} noFilling />
            }
        </>
        
    );
};

export default ConcurrentViewerChart;
