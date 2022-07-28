import { StatusCodes } from "http-status-codes";
import React, { useEffect, useRef, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ChartData } from "../../../interfaces/ChartData";
import { Audience } from "../../../models/Audience";
import { AudienceService } from "../../../services/audience.service";
import ContextStore from "../../../store";
import "./BrushChart.scss";


// var _seed = 42;
//       Math.random = function() {
//         _seed = (_seed * 16807) % 2147483647
//         return (_seed - 1) / 2147483646
//       }

// function generateDayWiseTimeSeries(baseval: any, count: any, yrange: any) {
//         var i = 0;
//         var series = [];
//         while (i < count) {
//           var x = baseval;
//           var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      
//           series.push([x, y]);
//           baseval += 86400000;
//           i++;
//         }
//         return series;
//       }
      

const BrushChart: React.FC = () => {
    const sessionToken = ContextStore.useStoreState((store) => store.sessionToken);
    const invalidateSession = ContextStore.useStoreActions((actions) => actions.setSessionToken);
    const [ data, setData ] = useState<Array<ChartData>>([]);
    const [ timestamps, setTimestamps ] = useState<Array<number>>([]);
   
    let chartRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            AudienceService.getAll(sessionToken)
                .then(({ audience }: Audience) => {

                    // Extract the array of timestamp (it is the same if taken from p2p array)
                    // in order to display it into the tooltip header
                    setTimestamps(audience.map(c => c[0]));
                    setData([
                       {
                            name: "Audiance",
                            series: audience,
                            color: "#116530",
                        }
                        , 
                    ]);

                    series.push({ data: audience });

                })
                .catch(e => {
                    if (e.status === StatusCodes.FORBIDDEN) {
                        invalidateSession(undefined);
                    }
                });
        }
        
        fetchData();  
    }, [invalidateSession, sessionToken]);

    const customOption = {
        brush: true
    }

    const optionsLine = {
        chart: {
            zoom: {
                enabled: true //props.options?.brush
            },
            group: "test",
            stacked: false,
          brush:{
            targets: ["concurrent-viewer-chart", "capacity-offload-chart"],
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

      const series: ApexAxisChartSeries = []; 
    return (
        <>
            {data.length > 0 && 
                <ReactApexChart options={optionsLine} series={series} type="area" height={100} />
            }
        </>
        
    );

    // var data = [1,2,3]; // generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 1520, {
    // //     min: 30,
    // //     max: 90
    // //   })
    //   var data2 = [4,5,6];

    //     const state = {
    //         series: [
    //             {
    //             name: "IR min",
    //             data: data
    //             },
    //             {
    //             name: "IR max",
    //             data: data2
    //             }
    //         ],
    //         options: {
    //             chart: {
    //             id: 'chart',
    //             type: 'line' as 'line',
    //             height: 230,
    //             toolbar: {
    //                 show: true,
    //                 tools: {
    //                 download: true,
    //                 selection: true,
    //                 zoom: true,
    //                 zoomin: true,
    //                 zoomout: true,
    //                 },
    //                 autoSelected: 'zoom' as 'zoom'
    //             },
    //             },
    //             title: {
    //             text: 'График',
    //             //align: 'left'
    //             },
    //             legend: {
    //             //position: "top",
    //             floating: true
    //             },
    //             stroke: {
    //             width: 1
    //             },
    //             dataLabels: {
    //             enabled: false
    //             },
    //             markers: {
    //             size: 0
    //             },
    //             xaxis: {
    //               type: 'datetime' as 'datetime'
    //             }
    //         },
    //         seriesLine: [
    //                 {
    //                 data: data
    //             }
    //         ],
    //       optionsLine: {
    //         chart: {
    //           brush:{
    //             target: 'chart',
    //             enabled: true
    //           },
    //           selection: {
    //             enabled: true,
    //             xaxis: {
    //               min: new Date('10 Feb 2017').getTime(),
    //               max: new Date('09 Apr 2021').getTime()
    //             }
    //           },
    //         },
    //         xaxis: {
    //           type: 'datetime' as 'datetime',
    //           tooltip: {
    //             enabled: false
    //           },
    //           labels: {
    //             show: false
    //           }
    //         },
    //         yaxis: {
    //           tickAmount: 2
    //         }
    //       },
        
        
    //     }
      
    //     return (
          
    //       <div>
    //           <ReactApexChart options={state.options} series={state.series} type="area" height={200} />
    //           <ReactApexChart options={state.optionsLine} series={state.seriesLine} type="area" height={100} />
    //       </div>
        
    //     );

};

// export default BrushChart;
export default React.memo(BrushChart);