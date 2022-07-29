export interface StrokeData {
    label: string,
    value: number; 
    color: string;
}

export interface ChartData {
    label: string,
    values: Array<[number, number]> | Array<number>,
    unit?: string;
    color: string;
    stroke?: StrokeData;
};