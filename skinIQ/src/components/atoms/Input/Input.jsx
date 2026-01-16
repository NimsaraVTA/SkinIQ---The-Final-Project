import "./Input.css";

const Input = ({
  label = "",
  type = "text",
  placeholder = "",
  value,
  onChange,
  disabled = false,
  error = "",
  className = "",
  fullWidth = false,
  style = {},
}) => {
  return (
    <div className={`input-wrapper ${fullWidth ? "full-width" : ""} ${className}`} style={style}>
      {label && <label className="input-label">{label}</label>}
      <input
        className={`input-field ${error ? "input-error" : ""}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {error && <span className="input-error-text">{error}</span>}
    </div>
  );
};

export default Input;
