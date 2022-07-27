import React from "react";
import {
    CapacityOffloadChart,
    ConcurrentViewerChart
} from "../../components/Charts";
import Header from "../../components/Header/Header";

const DashboadPage: React.FC = () => {
    return (
        <div className="dashboard-page">
            <Header />
            <CapacityOffloadChart />
            <ConcurrentViewerChart />
        </div>
    );
};

export default DashboadPage;
