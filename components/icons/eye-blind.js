export default function EyeBlind({size = 24, color = "var(--text-color)", ...props}) {
  return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height={size} width={size} {...props}>
        <defs id="defs3051">
          <style type="text/css" id="current-color-scheme">
            .ColorScheme-Text {
            color
          }
          </style>
        </defs>
        <path style={{fill: color, fillOpacity: 1, stroke: 'none'}}
              d="M 13.314453 2 L 2 13.294922 L 2.7148438 14 L 14 2.6972656 L 13.314453 2 z M 8 3 A 8.9999916 9.000003 0 0 0 0.12304688 7.6679688 C 0.25199187 8.0317035 0.48048562 8.3445563 0.77929688 8.5761719 A 7.9999926 8.0000028 0 0 1 8 4 A 3.9999993 4.0000007 0 0 0 4 8 A 3.9999993 4.0000007 0 0 0 4.1054688 8.8945312 L 5 8 A 2.9999993 3.0000005 0 0 1 8 5 L 8.8925781 4.1074219 A 3.9999993 4.0000007 0 0 0 8.3496094 4.0175781 A 7.9999926 8.0000028 0 0 1 8.9277344 4.0722656 L 9.8066406 3.1933594 A 8.9999916 9.000003 0 0 0 8 3 z M 13.835938 5.1640625 L 13.121094 5.8789062 A 7.9999926 8.0000028 0 0 1 15.220703 8.5761719 C 15.522218 8.3424607 15.752612 8.0261216 15.880859 7.6582031 A 8.9999916 9.000003 0 0 0 13.835938 5.1640625 z M 11.894531 7.1054688 L 11 8 A 2.9999993 3.0000005 0 0 1 8 11 L 7.1074219 11.892578 A 3.9999993 4.0000007 0 0 0 8 12 A 3.9999993 4.0000007 0 0 0 12 8 A 3.9999993 4.0000007 0 0 0 11.894531 7.1054688 z "
              className="ColorScheme-Text"></path>
      </svg>
  );
}
