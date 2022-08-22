export const BRUSH_CHART_FIXED_OPTIONS = {
    stroke: {
        width: 0,
        curve: 'straight' as const,
    },
    legend: {
        show: false,
    },
    xaxis: {
        type: 'datetime' as const,
        labels: {
            show: false
        },
        show: false,
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        },
    },
    yaxis: {
        show: false,
        tickAmount: 1,
        labels: {
            show: false
        },
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        },
        max: (max: number) => max
    },
    fill: {
        type: 'solid'
    },
    grid: {
        show: false,
    }
};
