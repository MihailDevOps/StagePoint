import { toast } from "react-toastify";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  error?: string;
}
export default function ValidateInput({ error, className, ...rest }: InputProps) {
  return (
    <div className="relative items-center w-full ">
      <input {...rest} className={`${className} w-full ${error ? 'bg-red-100' : 'bg-gray-50'} focus:outline-none focus:border focus:border-[#2A52AF] `} />
      {error && <div className="font-[300] absolute top-[35%] left-[25rem] text-[#FA5050] flex items-center 
      gap-[0.6rem]">
      </div>}
    </div>
  )
}