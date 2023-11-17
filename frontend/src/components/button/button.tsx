interface ButtonProps {
  text: string
  handleOnClick: () => void
}

const Button = ({ text, handleOnClick }: ButtonProps) => {
  return (
    <button
      className="display-regular-14 border-sm p-[0.25rem] bg-point-yellow"
      onClick={handleOnClick}
    >
      {text}
    </button>
  )
}

export default Button
