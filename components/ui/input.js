import React, {createRef, forwardRef, useState} from "react";
import styles from './input.module.css';

function Input({Icon, IconProps, onClickIcon, width, marginBottom, ...props}, ref) {
  const inputRef = ref || createRef(null);
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
        <input
          ref={inputRef}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        {Icon && (
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
