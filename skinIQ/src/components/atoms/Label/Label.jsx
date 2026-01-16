import "./Label.css";

const Label = ({
  children,
  htmlFor = "",
  className = "",
  required = false,
  style = {},
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`label ${className}`}
      style={style}
    >
      {children}
      {required && <span className="label-required">*</span>}
    </label>
  );
};

export default Label;
