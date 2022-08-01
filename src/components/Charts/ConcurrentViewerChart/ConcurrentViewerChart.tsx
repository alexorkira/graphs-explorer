import React, { useEffect } from "react";
import { ChartProps } from "../../../interfaces/ChartProps";
import ContextStore from "../../../store";
import ChartWrapper from "../ChartWrapper/ChartWrapper";

const ConcurrentViewerChart: React.FC<ChartProps> = (
    { id } : ChartProps
) => {
    const  timestamps = ContextStore.useStoreState((store) => store.chartData.timestamps);
    const  audienceChartData = ContextStore.useStoreState((store) => store.chartData.audienceChartData);
    const  fetchChartData = ContextStore.useStoreActions((actions) => actions.chartData.fetchAudience);
   
    useEffect(() => {
        fetchChartData();  
    }, [fetchChartData]);

    return (
        <>
            {audienceChartData && timestamps.length > 0 &&
                <ChartWrapper 
                    id={id}
                    title={"Concurrent Viewer"} 
                    data={[ audienceChartData ]} 
                    timestamps={timestamps} 
                    noFilling 
                />
            }
        </>
        
    );
};

export default ConcurrentViewerChart;
