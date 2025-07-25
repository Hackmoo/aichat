export default function AddChatIcon({width = '2.5rem', height = '2.5rem', color = '#FFF'}) : {width? : string, height?: string, color?: string} {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      stroke-width="3"
      stroke={color}
      fill="none"
    >
      <path
        d="M58.48,28.81c0,10.72-11,19.41-24.58,19.41A29.69,29.69,0,0,1,30.22,48c-2.08-.24-7.91,7.19-9.79,6.56-1.5-.51.91-9-.43-9.73-6.45-3.5-10.69-9.37-10.69-16,0-10.72,11-19.4,24.59-19.4S58.48,18.09,58.48,28.81Z"
        stroke-linecap="round"
      />
      <line x1="35.03" y1="21.84" x2="35.03" y2="35.84" />
      <line x1="28.03" y1="28.84" x2="42.03" y2="28.84" />
      <script />
    </svg>
  );
}
