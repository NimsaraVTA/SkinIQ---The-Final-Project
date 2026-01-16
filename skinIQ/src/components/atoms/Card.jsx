import "./Card.css";

const Card = ({
  children,
  className = "",
  padding = "md",
  shadow = true,
  rounded = true,
  style = {},
}) => {
  const paddingClass = `card-padding-${padding}`;
  const shadowClass = shadow ? "card-shadow" : "";
  const roundedClass = rounded ? "card-rounded" : "";

  return (
    <div
      className={`card ${paddingClass} ${shadowClass} ${roundedClass} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default Card;
