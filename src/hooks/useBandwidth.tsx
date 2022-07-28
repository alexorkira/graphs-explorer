import { useState } from "react";
import { ChartData } from "../interfaces/ChartData";
import { Bandwidth } from "../models/Bandwidth";
import { BandwidthService } from "../services/bandwidth.services";
import ContextStore from "../store";
import { bpsToGbps } from "../utils/bpsToGbps";

type UseBandwidthReturnType = {
    fetchBandwidth: () => Promise<void>;
    bandwidth: Array<ChartData>;
    timestamps: Array<number>;
};

// const customBuildErrorMessage = (
//   errorKey: string,
//   options: MessageBuilderOptions
// ): string => {
//   const { t } = options;
//   let errorMessage;

//   if (errorKey.endsWith("users/id/not-found")) {
//     errorMessage = t(errorKey, { id: options.id ?? "" });
//   } else if (errorKey.endsWith("users/username/in-use")) {
//     errorMessage = t(errorKey, { username: options.username ?? "" });
//   } else {
//     errorMessage = t(errorKey);
//   }
//   return errorMessage;
// };

// export type UserFormInput = {
//   username: string;
//   name: string;
//   password: string;
//   confirmedPassword: string;
//   profile: string;
// };

/**
 * Custom Hook used to fetch bandwidth data for the graph creation 
 * @returns Functions concerning fetching and modelling data for the creation of graph based on apex-chart library
 */
const useBandwidth = (): UseBandwidthReturnType => {
    const sessionToken = ContextStore.useStoreState((store) => store.sessionToken);
    //const invalidateSession = ContextStore.useStoreActions((actions) => actions.setSessionToken);
    const [bandwidth, setBandwidth] = useState<Array<ChartData>>([]);
    const [timestamps, setTimestamps] = useState<Array<number>>([]); // save in the store

    const fetchBandwidth = async () => {
        BandwidthService.getAll(sessionToken)
            .then((bandiwidth: Bandwidth) => {
                // The first element is timestamp, 
                // second one the value of the bandwidth selected (cdn or p2p)
                const {cdn, p2p} = bandiwidth;
                
                // Extract the array of timestamp (it is the same if taken from p2p array)
                // in order to display it into the tooltip header
                setTimestamps(cdn.map(c => c[0]));

                const gbpsP2p: Array<[number,number]> = 
                    p2p.map(([timestamp, value]) => [timestamp, bpsToGbps(value)]
                );
                const gbpsHttp: Array<[number,number]> = 
                    cdn.map(([timestamp, value]) => [timestamp, bpsToGbps(value)]
                ); 

                setBandwidth([
                    {
                        name: "P2p",
                        series: gbpsP2p,
                        unit: "Gbps",
                        color: "#FF7D71",
                        stroke: {
                            label: "MAX P2p",
                            color: "#FF7D71",
                            value : Math.max(...gbpsP2p.map(p => p[1]))
                        }
                    }, 
                    {
                        name: "Http",
                        series: gbpsHttp,
                        unit: "Gbps",
                        color: "#F8AB8D",
                        stroke: {
                            label: "MAX Http",
                            color: "#0075C9",
                            value: Math.max(...gbpsHttp.map(c => c[1]))
                        }
                    }
                ]);
            })
            .catch(e => {
            console.error(e);
                // if (e.status === StatusCodes.FORBIDDEN) {
                //     invalidateSession(undefined);
                // }
            });
    }

    return {
        fetchBandwidth,
        bandwidth,
        timestamps
    };
};

export default useBandwidth;
