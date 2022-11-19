import React, {createRef, forwardRef, useState} from "react";
import styles from './input.module.css';

function Input({Icon, IconProps, onClickIcon, width, marginBottom, textarea = false, rows = 10, ...props}, ref) {
  const inputRef = ref || createRef();
  const [focused, setFocused] = useState(ref?.current?.onfocus);
  return (
      <div className={`${styles.container} ${focused ? styles.focus : ""}`}
       onMouseDown={(event) => {
         event.preventDefault();
         inputRef?.current.focus();
       }}
       style={{
         marginBottom
      }}
      >
        {textarea ?
            (
              <textarea
                ref={inputRef}
                rows={rows}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                {...props} >
              </textarea>
            ):
        (
            <input
                ref={inputRef}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                {...props}
            />
        )}
        {Icon && !textarea && (
          <Icon
              onClick={onClickIcon}
              style={{cursor: onClickIcon ? 'pointer' : 'default'}}
              {...IconProps}
          />
        )}
      </div>
  );
}
export default forwardRef(Input);
