import React, {createRef, forwardRef, useState} from "react";
import styles from './input.module.css';

const Input = ({
 Icon,
 IconProps,
 onClickIcon,
 width = 330,
 marginBottom,
 textarea = false,
 rows = 10,
 ...props
}, ref) => {
  const inputRef = ref || createRef();
  const [focused, setFocused] = useState(inputRef?.current?.onfocus);
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
              autoComplete={'off'}
              {...props} >
            </textarea>
          ):
        (
          <input
              ref={inputRef}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              autoComplete={'off'}
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
