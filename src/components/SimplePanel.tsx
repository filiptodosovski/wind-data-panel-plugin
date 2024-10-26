import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { WindDataChart } from './Chart';

interface Props extends PanelProps<SimpleOptions> { }


export const SimplePanel: React.FC<Props> = ({ data, width, height }) => {
  console.log(width, height)
  return (
    <div>
      <WindDataChart data={data} height={height} width={width} />
    </div>
  );
};
