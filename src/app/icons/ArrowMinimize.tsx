export default function ArrowMinimizeIcon({width = '2rem', height = '2rem', color = '#FFF', rotate = false} : {width? : string, heigth? : string, color? : string, rotate? : boolean}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={rotate && 'rotate-180'}
    >
      <path d="M9 13L9 10H16V6L9 6L9 3L8 3L3 8L8 13H9Z" fill={color} />
      <path d="M2 14L2 2L0 2L5.24537e-07 14H2Z" fill={color} />
    </svg>
  );
}
