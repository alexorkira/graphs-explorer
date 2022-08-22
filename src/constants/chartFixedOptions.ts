
export const CHART_FIXED_OPTIONS = {
    chart: {
        type: 'area' as const,
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false
        }
    },
    stroke: {
        width: 2,
        curve: 'straight' as const,
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
