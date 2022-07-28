export interface StrokeData {
    label: string,
    value: number; 
    color: string;
}

export interface ChartData {
    name: string,
    series: Array<[number, number]>,
    unit?: string;
    color: string;
    stroke?: StrokeData;
};