import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import useBandwidth from "../../hooks/useBandwidth";
import { getChartOptions } from "../../utils/getChartOptions";
import "./Charts.scss";

const TIMESTAMP_FORMAT = 'dddd DD-MM-YYYY HH:mm (Z)';
const X_AXIS_DATETIME_FORMAT = 'MMM DD';

// interface ChartProps {
//     id: string,
//     title?: string;
//     data: Array<ChartData>;
//     timestamps: Array<number>,
//     height?: number;
//     options?: {
//         noFilling?: boolean;
//         showLabel?: boolean;
//         brush?: boolean;
//     }
//     classStyle?: string; 
//     noFilling?: boolean;
//     chartRef?: any
// };

const Charts: React.FC = () => {
    const { bandwidth, fetchBandwidth, timestamps } = useBandwidth();

    useEffect(() => {
        if (bandwidth.length === 0) {
            fetchBandwidth();
        }
        console.log("bandwidth", bandwidth);

    },[]);
    
    // const height = props.height ?? 250;
    const [ series, setSeries ] = useState<ApexAxisChartSeries>([]);
    const [ colors, setColors ] = useState<Array<string>>([]);
    const [ strokes, setStrokes ] = useState<Array<YAxisAnnotations>>([]);
    // const { timestamps } = props;

    // props.data.forEach(d => {
    //     series.push({ name: d.name, data: d.series });
    //     colors.push(d.color);
    //     if (d.stroke) {
    //         strokes.push({ 
    //             y: d.stroke.value, 
    //             borderColor: d.stroke.color, 
    //             strokeDashArray: 3 
    //         });
    //     }
    // });

    useEffect(() => {
        if (bandwidth.length > 0) {
            const s: ApexAxisChartSeries = [];
            const c: Array<string> = [];
            const ss: Array<YAxisAnnotations> = [];
            bandwidth.forEach(d => {
                s.push({ name: d.name, data: d.series });
                c.push(d.color);
                if (d.stroke) {
                    strokes.push({ 
                        y: d.stroke.value, 
                        borderColor: d.stroke.color, 
                        strokeDashArray: 3 
                    });
                }
            });
            setSeries(s);
            setColors(c);
            setStrokes(ss);
        }
        
    }, [bandwidth])

    // const fill = { type: 'solid' };
    // if (props.noFilling) {
    //     Object.assign(fill, {  colors: ['transparent'] });
    // }

    

    const toolbar = { show: false };
    const brush = { enabled: false };
     
    // if (props.id !== "brush") {
    //     Object.assign(toolbar,  { autoSelected:  'zoom' });
    // }
    // else {
    //     Object.assign(brush, { autoScaleYaxis: true, target: ["concurrent-viewer", "capacity-offload"], enabled: true });
    // }
    // else {
    //     Object.assign(toolbar,  { 
    //         brush: {
    //             target: 'capacity-offload',
    //             enabled: true
    //         }
    //     });
    // }

    
    // console.log("x axis min", timestamps[0]);
    // console.log(props.options)
    // console.log("id", props.id);
    
    // const options = {
    //     colors: colors,
    //     title: {
    //         text: 'Capacity offload',
    //         style: {
    //             fontSize: "18px",
    //         }
    //     },
    //     chart: {
    //         id: props.id,
    //         //stacked:false,
    //         type: 'area' as 'area',
    //         // selection: {
    //         //     enabled: true,
    //         //     xaxis: {
    //         //       min: new Date('13 July 2022').getTime(),
    //         //       max: new Date('19 July 2022').getTime()
    //         //     }
    //         //   },
    //         toolbar: { 
    //             show: false,
    //             autoSelected: 'zoom' as 'zoom' 
    //         },
    //         zoom: {
    //             enabled: false //props.options?.brush
    //         },
    //         brush: brush
    //     },
    //     stroke: {
    //         width: 2,
    //         curve: 'straight' as 'straight',
    //     },
    //     dataLabels: {
    //         enabled: false,
    //     },
    //     tooltip: {
    //         custom: (options: any) => {
    //             const { dataPointIndex } = options;
    //             const timestamp = moment(timestamps[dataPointIndex]).local().format(TIMESTAMP_FORMAT);
    //             let content = "";
                
    //             props.data.forEach((d, i) => {
    //                 content += createTooltipEntry(
    //                     d.name,
    //                     options.series[i][dataPointIndex], 
    //                     d.color,
    //                     i,
    //                     d.unit,
    //                     d.stroke
    //                 );
    //             });
                
    //             return (
    //                 `<div class="apexcharts-tooltip-title" style="font-weight: bold; font-size: 14px;">
    //                     ${timestamp}
    //                 </div>
    //                 ${content}`
    //             );
    //         }
    //     },
    //     xaxis: {
    //         tickAmount: 2,
    //         labels: {
    //             formatter: (dt: any) => {
    //                 return moment(dt).local().format(X_AXIS_DATETIME_FORMAT);
    //             }
    //         } 
    //     },
    //     legend: {
    //         show: true,
    //     },
    //     annotations: {
    //         yaxis: strokes
    //     },
    //     fill: fill
    // };


    // const options1 = {
    //     title: {
    //         text: "Graph1",
    //         style: {
    //             fontSize: "18px",
    //         }
    //     },
    //     colors: colors,
    //     chart: {
    //         id: "#1",
    //         //group: "test",
    //         stacked:false,
    //         type: 'area' as 'area',
    //         // selection: {
    //         //     enabled: true,
    //         //     xaxis: {
    //         //       min: new Date('13 July 2022').getTime(),
    //         //       max: new Date('19 July 2022').getTime()
    //         //     }
    //         //   },
    //         toolbar: { 
    //             show: false,
    //             autoSelected:  'zoom' as 'zoom' 
    //         },
    //         //autoSelected: 'zoom' ,
    //         zoom: {
    //             enabled: false //props.options?.brush
    //         },
    //         brush: brush
    //     },
    //     stroke: {
    //         width: 2,
    //         curve: 'straight' as 'straight',
    //     },
    //     dataLabels: {
    //         enabled: false,
    //     },
    //     tooltip: {
    //         enabled: true,
    //         custom: (options: any) => {
    //             const { dataPointIndex } = options;
    //             const timestamp = moment(timestamps[dataPointIndex]).local().format(TIMESTAMP_FORMAT);
    //             let content = "";
                
    //             bandwidth.forEach((d, i) => {
    //                 content += createTooltipEntry(
    //                     d.name,
    //                     options.series[i][dataPointIndex], 
    //                     d.color,
    //                     i,
    //                     d.unit,
    //                     d.stroke
    //                 );
    //             });
                
    //             return (
    //                 `<div class="apexcharts-tooltip-title" style="font-weight: bold; font-size: 14px;">
    //                     ${timestamp}
    //                 </div>
    //                 ${content}`
    //             );
    //         }
    //     },
    //     xaxis: {
    //         tickAmount: 2,
    //         labels: {
    //             formatter: (dt: any) => {
    //                 return moment(dt).local().format(X_AXIS_DATETIME_FORMAT);
    //             }
    //         } 
    //     },
    //     legend: {
    //         show: true,
    //     },
    //     annotations: {
    //         yaxis: strokes
    //     },
    //     fill: fill
    // };


    const optionsBrush = {
        chart: {
            zoom: {
                enabled: true //props.options?.brush
            },
            brush:{
                targets: [
                    "capacity-offload-chart", 
                    "concurrent-viewer-chart"
                ],
                //targets: ["concurrent-viewer-char", "capacity-offload-chart"],
                enabled: true
            },
            //   selection: {
            //     //enabled: true,
            //     xaxis: {
            //       min: timestamps[0], //new Date('22 Jul 2022').getTime(),
            //       max: moment.now(),
            //     }
            //   },
              
            },
            toolbar: {
                tools: {
                    reset: true,
                    download: true,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                }
            },
            legend: {
                show: false,
            },
            tooltip: {
                enabled: true
            },
            xaxis: {
                type: 'datetime' as 'datetime',
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
                tickAmount: 2,
                show: false,
                labels: {
                    show: false
                },
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
            },
          };
    

        const opt1 = getChartOptions(
            "capacity-offload-chart",
            "Capacity Offload",
            colors, 
            timestamps,
            bandwidth,
            { type: "solid" },
            strokes
        );

        const opt2 = getChartOptions(
            "concurrent-viewer-chart",
            "Concurrent Viewer",
            colors, 
            timestamps,
            bandwidth,
            { type: "solid" }
        );
    
    return (
        <>
            <div className="chart">
                {series.length > 0 && <ReactApexChart 
                    type="area" 
                    series={series} 
                    options={opt1} 
                    height={250}
                />}
            </div>
            <div className="chart">
                <ReactApexChart 
                    type="area" 
                    series={series} 
                    options={opt2} 
                    height={250}
                />
            </div>
            <div className={`chart`}>
                <ReactApexChart 
                    type="area" 
                    series={series}
                    options={optionsBrush}  
                    height={100} 
                />
            </div>

        </>
    );
};

export default React.memo(Charts);
