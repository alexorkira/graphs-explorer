import { StrokeData } from "../../../interfaces/ChartData"

export const createTooltipEntry = (
    label: string, 
    value: string, 
    color: string,
    index: number, 
    unit?: string,
    stroke?: StrokeData
) => {
    return (
        `<div class="apexcharts-tooltip-series-group apexcharts-active" style="order: ${index}; display: flex;">
            <span class="apexcharts-tooltip-marker" style="background-color: ${color};"></span>
            <div class="apexcharts-tooltip-text" style="font-size: 12px;">
                <div class="apexcharts-tooltip-y-group">
                    <span class="apexcharts-tooltip-text-y-label">${label}:</span>
                    <span class="apexcharts-tooltip-text-y-value" style="color: ${color};" >${value}${unit ?? ''}</span>
                </div>
            </div>
        </div>
        ${stroke ? `<div class="apexcharts-tooltip-series-group apexcharts-active" style="order: ${index}; display: flex;">
            <span class="apexcharts-tooltip-marker" style="background-color: ${stroke.color}"></span>
            <div class="apexcharts-tooltip-text" style="font-size: 12px;">
                <div class="apexcharts-tooltip-y-group">
                    <span class="apexcharts-tooltip-text-y-label">${stroke.label}:</span>
                    <span class="apexcharts-tooltip-text-y-value" style="color: ${stroke.color};">${stroke.value}${unit ?? ''}</span>
                </div>
            </div>
        </div>` : ''}`
    )
}