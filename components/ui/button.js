import Link from 'next/link';
import PropTypes from "prop-types";
import Text from "./text";
import styles from './button.module.css';

const Button = ({
  title = null,
  href = null,
  onClick = null,
  shape = "button",
  width = 330,
  height,
  Icon = null,
  IconProps = {},
  marginBottom = 0,
}) => {
    return href ? (
        <Link href={href}>
          <a className={`${styles.button} ${shape === "icon" ? styles.icon : styles.squared}`}
          style={{
            width,
            height,
            marginBottom
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
          height,
          marginBottom
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

export default Button;
