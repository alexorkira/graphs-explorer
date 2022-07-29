import React from "react";
import {
    BrushChart,
    CapacityOffloadChart,
    ConcurrentViewerChart
} from "../../components/Charts";
import Header from "../../components/Header/Header";

const DashboadPage: React.FC = () => {
    const ids = ["capacity-offload-chart", "current-viewer-chart" ];
    return (
        <div className="dashboard-page">
            <Header />
            <CapacityOffloadChart id={ids[0]} />
            <ConcurrentViewerChart id={ids[1]}/>
            <BrushChart ids={ids} />
        </div>
    );
};

export default DashboadPage;
