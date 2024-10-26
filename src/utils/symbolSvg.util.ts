export const symbolSvg = (direction: number, speed: number): string => `
  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="${speed * 10}" viewBox="0 0 50 50" style="transform:rotate(${direction - 180}deg)">
    <path d="M31 24.7343L21.7917 24.7343V0L9.20826 0L9.20826 24.7343H0L15.5 45L31 24.7343Z" fill="blue"/>
  </svg>
`
