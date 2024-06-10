type InputProps = {
    name: string;
    label?: string;
    placeholder:string,
    type:React.InputHTMLAttributes<unknown>["type"],
    className?:string,
    required?:boolean,
  };
export const InputComponent  = ({name,label,placeholder,type,className,required = false,}:InputProps) => {
  return (
    <div  className="flex flex-col gap-1">
      {label && <label htmlFor={name}>{label}</label>}
      <input type={type} id={name} name={name} placeholder={placeholder} className={`focus-visible:outline-none ${className}`} required={required} />
    </div>
  )
}
