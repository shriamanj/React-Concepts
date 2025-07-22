const Button = ({ type, children, onClick, disabled }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="flex justify-center items-center bg-black text-white w-20 rounded-sm py-[2px] h-8 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </button>
  );
};

export default Button;
