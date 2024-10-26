import { symbolSvg } from './symbolSvg.util'

export const createSymbolBase64 = (direction: number): string => {
  const svgString = symbolSvg(direction);

  return `image://data:image/svg+xml;base64,${btoa(svgString)}`;
};
