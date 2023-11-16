interface InputProps<State> {
  type: React.HTMLInputTypeAttribute
  label?: string
  placeholder?: string
  setValue: React.Dispatch<React.SetStateAction<State>>
  icon?: React.ReactNode
  onBlur?: () => void
}

/**
 * @params type input 타입 지정
 * @params setValue 외부에서 상태를 관리하기 위한 setState 함수
 * @params icon 아이콘을 보낼 수 있음
 */
const Input = <State,>({ type, setValue, label, placeholder, icon, onBlur }: InputProps<State>) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setValue(value as State)
  }

  return (
    <label className="input__wrapper">
      {label && <span className="display-regular-14 mb-2">{label}</span>}
      <div className="input__icon_wrapper">
        {icon && icon}
        <input
          type={type}
          className="input"
          placeholder={placeholder}
          onChange={handleOnChange}
          onBlur={onBlur}
        />
      </div>
      <div className="input__border" />
    </label>
  )
}

export default Input