import Link from 'next/link';
import PropTypes from "prop-types";
import Text from "./text";
import styles from './button.module.css';

export default function Button({
  title = null,
  href = null,
  onClick = null,
  shape = "button",
  width,
  height,
  Icon = null,
  IconProps = {},
}) {
    return href ? (
        <Link href={href}>
          <a className={`${styles.button} ${shape === "icon" ? styles.icon : styles.squared}`}
           style={{
            width,
            height
          }}>
            {title && <Text variant="button-text">{title}</Text>}
            {Icon &&  <Icon {...IconProps} />}
          </a>
        </Link>
    ) : (
      <button
        className={`${styles.button} ${shape === "icon" ? styles.icon : styles.squared}`}
        onClick={onClick}
        style={{
          width,
          height
        }}>
          {title &&<Text variant="button-text">{title}</Text>}
          {Icon &&  <Icon {...IconProps} />}
      </button>
    );
}

Button.propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  shape: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  Icon: PropTypes.elementType,
  IconProps: PropTypes.object,
  border: PropTypes.bool,
};
