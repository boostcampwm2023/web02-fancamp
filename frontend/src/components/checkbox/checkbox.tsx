interface CheckboxProps {
  checked: boolean
  onChange: () => void
  children?: React.ReactNode
}

const Checkbox = ({ checked, onChange, children }: CheckboxProps) => {
  return (
    <span className="checkbox__wrapper" onClick={onChange}>
      <input type="checkbox" className="checkbox__input" checked={checked} />
      <span className="checkbox__span"></span>
      {children}
    </span>
  )
}

export default Checkbox
