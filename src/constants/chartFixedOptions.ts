
export const CHART_FIXED_OPTIONS = {
    chart: {
        //id:
        type: "area" as "area",
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false
        }
    },
    stroke: {
        width: 2,
        curve: 'straight' as "straight",
    },
    dataLabels: {
        enabled: false,
    },
    xaxis: {
        tickAmount: 2,
    },
    yaxis: {
        tickAmount: 3,
        max: (max: number) => Math.floor(max),
    },
    legend: {
        show: true,
    },
    grid: {
        show: false,
    },
};