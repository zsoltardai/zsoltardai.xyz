export default function Menu({ width = 40, height = 40, color = '#000000'}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height={height} width={width} fill={color}>
            <g>
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"></path>
            </g>
        </svg>
    );
}