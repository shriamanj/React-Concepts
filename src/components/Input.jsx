const Input = ({
  label,
  onChange,
  type,
  name,
  value,
  isError = false,
  customClass,
  placeholder,
}) => {
  return (
    <div className="flex flex-col mb-4">
      {label && <label htmlFor={name} className="font-medium mb-2">
        {label}
      </label>}
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border border-gray-500 rounded-sm w-full h-8  mb-0 px-2 ${customClass}`}
      />
      {isError && (
        <p className="text-sm font-medium  text-red-700">Please enter {name}</p>
      )}
    </div>
  );
};

export default Input;
