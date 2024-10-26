import { WindDataChartProps } from './types';
import ReactEcharts from 'echarts-for-react'
import React, { useMemo } from "react";
import { createSymbolBase64 } from 'utils/createSymbolBase64.util';
import { LABELS } from './utils/labels';
import dayjs from 'dayjs';

export const WindDataChart = ({ data, width, height }: WindDataChartProps) => {

  const windData = useMemo(() => data.series[0]?.fields || [], [data]);
  const timeField = useMemo(() => windData.find(field => field.name === 'time')?.values || [], [windData]);
  const speedField = useMemo(() => windData.find(field => field.name === 'wind_speed')?.values || [], [windData]);
  const directionField = useMemo(() => windData.find(field => field.name === 'wind_direction')?.values || [], [windData]);

  if (timeField.length !== speedField.length || timeField.length !== directionField.length) {
    console.error(`${LABELS.ErrorMessage}`);
    return <div>
      <h2>{`${LABELS.Error}${LABELS.ErrorMessage}`}</h2>
    </div>;
  }

  const baseSize = Math.min(width, height) * 0.05;
  const maxSpeed = 10;

  const formattedData = timeField.map((time: number, index: number) => {
    const speed = speedField[index];
    const symbolSize = baseSize + (speed / maxSpeed) * baseSize;

    const symbol = createSymbolBase64(directionField[index]);

    return {
      symbol,
      value: [time, speed, directionField[index]],
      symbolSize,
    }
  });


  const option = {
    xAxis: {
      type: 'time',
      axisLabel: {
        formatter: function(value: number) {
          const date = dayjs(value);
          const minutes = date.minute();

          if (minutes % 15 === 0) {
            return date.format('HH:mm');
          }
          return '';
        }
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 10,
      axisLabel: {
        formatter: `{value} ${LABELS.WindSpeedMeasure}`,
      },
    },
    series: [
      {
        data: formattedData,
        type: 'line',
        symbolSize: 30,
        lineStyle: {
          width: 0.9,
        },
        label: {
          show: true,
          formatter: (params: { data: { symbol: string, symbolSize: number, value: number[] } }) => {
            return `${params.data.value[2]}°`
          },
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
