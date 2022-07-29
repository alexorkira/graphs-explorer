import { StrokeData } from "./ChartData";

export interface TooltipItem {
    label: string, 
    value: string, 
    color: string,
    unit?: string,
    stroke?: StrokeData,
}

