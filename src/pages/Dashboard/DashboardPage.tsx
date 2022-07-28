import React from "react";
import Charts from "../../components/Charts/Charts";
import Header from "../../components/Header/Header";

const DashboadPage: React.FC = () => {
    return (
        <div className="dashboard-page">
            <Header />
            <Charts />
            {/* <ConcurrentViewerChart />
            <BrushChart /> */}
        </div>
    );
};

export default DashboadPage;
