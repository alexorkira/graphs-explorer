import moment from "moment";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { ChartData } from "../../../interfaces/ChartData";
import "./Chart.scss";
import { createTooltipEntry } from "./createTooltipEntry";

const TIMESTAMP_FORMAT = 'dddd DD-MM-YYYY HH:mm (Z)';
const X_AXIS_DATETIME_FORMAT = 'MMM DD';

interface ChartProps {
    id: string,
    title?: string;
    data: Array<ChartData>;
    timestamps: Array<number>,
    height?: number;
    options?: {
        noFilling?: boolean;
        showLabel?: boolean;
        brush?: boolean;
    }
    classStyle?: string; 
    noFilling?: boolean;
    chartRef?: any
};

const Chart: React.FC<ChartProps> = (props: ChartProps) => {
    const height = props.height ?? 250;
    const series: ApexAxisChartSeries = [];
    const strokes: Array<YAxisAnnotations> = []; 
    const colors: Array<string> = [];
    const { timestamps } = props;

    props.data.forEach(d => {
        series.push({ name: d.label, data: d.values });
        colors.push(d.color);
        if (d.stroke) {
            strokes.push({ 
                y: d.stroke.value, 
                borderColor: d.stroke.color, 
                strokeDashArray: 3 
            });
        }
    });

    const fill = { type: 'solid' };
    if (props.noFilling) {
        Object.assign(fill, {  colors: ['transparent'] });
    }

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

    
    console.log("x axis min", timestamps[0]);
    console.log(props.options)
    console.log("id", props.id);
    
    const options = {
        colors: colors,
        title: {
            text: 'Capacity offload',
            style: {
                fontSize: "22px",
            }
        },
        chart: {
            id: props.id,
            //group: "test",
            //stacked:false,
            type: 'area' as 'area',
            // selection: {
            //     enabled: true,
            //     xaxis: {
            //       min: new Date('13 July 2022').getTime(),
            //       max: new Date('19 July 2022').getTime()
            //     }
            //   },
            toolbar: { autoSelected:  'zoom' as 'zoom' },
            //autoSelected: 'zoom' ,
            zoom: {
                enabled: false //props.options?.brush
            },
            brush: brush
        },
        stroke: {
            width: 2,
            curve: 'straight' as 'straight',
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            custom: (options: any) => {
                const { series, dataPointIndex } = options;
                const timestamp = moment(timestamps[dataPointIndex]).local().format(TIMESTAMP_FORMAT);
                let content = "";
                
                props.data.forEach((d, i) => {
                    content += createTooltipEntry(
                        d.label,
                        series[i][dataPointIndex], 
                        d.color,
                        i,
                        d.unit,
                        d.stroke
                    );
                });
                
                return (
                    `<div class="apexcharts-tooltip-title" style="font-weight: bold; font-size: 14px;">
                        ${timestamp}
                    </div>
                    ${content}`
                );
            }
        },
        xaxis: {
            tickAmount: 2,
            labels: {
                formatter: (dt: any) => {
                    return moment(dt).local().format(X_AXIS_DATETIME_FORMAT);
                }
            } 
        },
        // xaxis: {
        //               type: 'datetime' as 'datetime',
        //               tooltip: {
        //                 enabled: false
        //               },
        //               labels: {
        //                 show: false
        //               }
        //             },
        //             yaxis: {
        //               tickAmount: 2
        //             },
        
        // grid: {
        //     show: false,
        // },
        // xaxis: {
        //     show: false,
        //     labels: {
        //       show: false
        //     },
        //     axisBorder: {
        //       show: false
        //     },
        //     axisTicks: {
        //       show: false
        //     },
        //   },
        //   yaxis: {
        //     show: false,
        //     labels: {
        //       show: false
        //     },
        //     axisBorder: {
        //       show: false
        //     },
        //     axisTicks: {
        //       show: false
        //     },
        //   },
        legend: {
            show: true,
        },
        annotations: {
            yaxis: strokes
        },
        fill: fill
    };


    const options1 = {
        title: {
            text: "Graph1",
            style: {
                fontSize: "22px",
            }
        },
        colors: colors,
        chart: {
            id: "#1",
            //group: "test",
            stacked:false,
            type: 'area' as 'area',
            // selection: {
            //     enabled: true,
            //     xaxis: {
            //       min: new Date('13 July 2022').getTime(),
            //       max: new Date('19 July 2022').getTime()
            //     }
            //   },
            toolbar: { autoSelected:  'zoom' as 'zoom' },
            //autoSelected: 'zoom' ,
            zoom: {
                enabled: false //props.options?.brush
            },
            brush: brush
        },
        stroke: {
            width: 2,
            curve: 'straight' as 'straight',
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            custom: (options: any) => {
                const { series, dataPointIndex } = options;
                const timestamp = moment(timestamps[dataPointIndex]).local().format(TIMESTAMP_FORMAT);
                let content = "";
                
                props.data.forEach((d, i) => {
                    content += createTooltipEntry(
                        d.label,
                        series[i][dataPointIndex], 
                        d.color,
                        i,
                        d.unit,
                        d.stroke
                    );
                });
                
                return (
                    `<div class="apexcharts-tooltip-title" style="font-weight: bold; font-size: 14px;">
                        ${timestamp}
                    </div>
                    ${content}`
                );
            }
        },
        xaxis: {
            tickAmount: 2,
            labels: {
                formatter: (dt: any) => {
                    return moment(dt).local().format(X_AXIS_DATETIME_FORMAT);
                }
            } 
        },
        // xaxis: {
        //               type: 'datetime' as 'datetime',
        //               tooltip: {
        //                 enabled: false
        //               },
        //               labels: {
        //                 show: false
        //               }
        //             },
        //             yaxis: {
        //               tickAmount: 2
        //             },
        
        // grid: {
        //     show: false,
        // },
        // xaxis: {
        //     show: false,
        //     labels: {
        //       show: false
        //     },
        //     axisBorder: {
        //       show: false
        //     },
        //     axisTicks: {
        //       show: false
        //     },
        //   },
        //   yaxis: {
        //     show: false,
        //     labels: {
        //       show: false
        //     },
        //     axisBorder: {
        //       show: false
        //     },
        //     axisTicks: {
        //       show: false
        //     },
        //   },
        legend: {
            show: true,
        },
        annotations: {
            yaxis: strokes
        },
        fill: fill
    };


    const optionsLine = {
            chart: {
                zoom: {
                    enabled: true //props.options?.brush
                },
              brush:{
                targets: [props.id, `#1`],
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
    

    console.log("option", options)
    return (
        <>
            <div className={`chart ${props.classStyle ?? ''}`}>
                
                    <ReactApexChart 
                        ref={props.chartRef}
                        type="area" 
                        series={series} 
                        options={options} 
                        height={height}
                    />
               
            </div>
            <div className={`chart ${props.classStyle ?? ''}`}>
              
                    <ReactApexChart 
                        type="area" 
                        series={series} 
                        options={options1} 
                        height={height}
                    />
                
            </div>
            <div className={`chart ${props.classStyle ?? ''}`}>
                
                    <ReactApexChart options={optionsLine} series={series} type="area" height={100} />
                
            </div>

        </>
    );
};

export default React.memo(Chart);
