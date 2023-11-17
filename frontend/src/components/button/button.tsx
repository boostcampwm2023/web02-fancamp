interface ButtonProps {
  text: string;
  handleOnClick: () => void;
}

const Button = ({ text, handleOnClick }: ButtonProps) => {
  return (
    <button
      className="display-regular-14 border-sm bg-point-yellow p-[0.25rem]"
      onClick={handleOnClick}
    >
      {text}
    </button>
  );
};

export default Button;
