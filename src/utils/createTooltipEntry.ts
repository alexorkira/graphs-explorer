import { TooltipItem } from '../interfaces/TooltipItem';

export const createTooltipEntry = (
    order: number,
    { label, value, unit, color, stroke }: TooltipItem,
) => {
    return (
        `<div class="apexcharts-tooltip-series-group apexcharts-active" style="order: ${order}; display: flex;">
            <span class="apexcharts-tooltip-marker" style="background-color: ${color};"></span>
            <div class="apexcharts-tooltip-text" style="font-size: 12px;">
                <div class="apexcharts-tooltip-y-group">
                    <span class="apexcharts-tooltip-text-y-label">${label}:</span>
                    <span class="apexcharts-tooltip-text-y-value" style="color: ${color};" >${value}${unit ?? ''}</span>
                </div>
            </div>
        </div>
        ${stroke
            ? `<div class="apexcharts-tooltip-series-group apexcharts-active" style="order: ${order}; display: flex;">
                <span class="apexcharts-tooltip-marker" style="background-color: ${stroke.color}"></span>
                <div class="apexcharts-tooltip-text" style="font-size: 12px;">
                    <div class="apexcharts-tooltip-y-group">
                        <span class="apexcharts-tooltip-text-y-label">${stroke.label}:</span>
                        <span class="apexcharts-tooltip-text-y-value" style="color: ${stroke.color};">${stroke.value}${unit ?? ''}</span>
                    </div>
                </div>
            </div>`
            : ''
        }`
    );
};
