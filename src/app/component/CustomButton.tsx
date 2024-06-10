type InputProps = {
    title: string;
    type:React.InputHTMLAttributes<unknown>["type"],
    className?:string,
};

export const CustomButton  = ({className,type,title}:InputProps) => {
  return (
    <input type={type} value={title} className={`cursor-pointer bg-gray-400 p-4 rounded-sm  ${className}`} />
  )
}
