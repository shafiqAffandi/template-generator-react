import { RegisterOptions, UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<any>;
  name: string;
  isRequired?: boolean;
  inputType?: string;
};

export function Input({
  register,
  name,
  isRequired = false,
  inputType = undefined,
  ...rest
}: Props) {
  return (
    <>
      <input
        type={inputType ?? "text"}
        className="
        form-control
        m-0
        block
        w-full
        rounded
        border
        border-solid
        border-gray-300
        bg-white bg-clip-padding
        px-3 py-1.5 text-base
        font-normal
        text-gray-700
        transition
        ease-in-out
        focus:border-blue-400 focus:bg-white focus:text-gray-700 focus:outline-none
      "
        {...register(name)}
        {...rest}
        required={isRequired}
      />
    </>
  );
}
