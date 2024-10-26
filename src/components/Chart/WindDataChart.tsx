import { WindDataChartProps } from './types';
import ReactEcharts from 'echarts-for-react'
import React from "react";

export const WindDataChart = ({ data, width, height }: WindDataChartProps) => {
  const option = {
    xAxis: {
      type: 'time',
      axisLabel: {
        formatter: (value: number) => new Date(value).toLocaleTimeString(),
      },
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 10,
      axisLabel: {
        formatter: '{value} m/s',
      },
    },
    series: [
      {
        type: 'line',
        symbolSize: 30,
        lineStyle: {
          width: 0.3,
        },
        label: {
          show: true,
          formatter: (params: any) => `${params.data.direction}°`, // Use direction for label
        },
        encode: {
          x: 0,
          y: 1,
        },
      },
    ],
  };

  return <ReactEcharts option={option} style={{ width, height }} />
}
