import { UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<any>;
  options?: string[];
  keyval?: { key: string | undefined; value: string | undefined }[];
  isRequired?: boolean;
  name: string;
  onChange?: (val: string) => void;
  children?: any;
};

export function Select({
  register,
  options,
  keyval,
  isRequired = false,
  name,
  onChange = () => null,
}: Props) {
  return (
    <>
      <Select1
        register={register}
        options={options}
        keyval={keyval}
        isRequired={isRequired}
        name={name}
        onChange={onChange}
      >
        <option value={""}>--Select One--</option>
        {typeof options !== "undefined" ? (
          <>
            {options.map((value) => (
              <option value={value}>{value}</option>
            ))}
          </>
        ) : null}
        {typeof keyval !== "undefined" ? (
          <>
            {keyval.map((item) => (
              <option value={item.key}>{item.value}</option>
            ))}
          </>
        ) : null}
      </Select1>
    </>
  );
}

export function Select1({
  register,
  options,
  keyval,
  isRequired = false,
  name,
  onChange = () => null,
  children,
  ...rest
}: Props) {
  return (
    <>
      {onChange.length === 0 ? (
        <select
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
          {...register(`${name}` as const)}
          {...rest}
          required={isRequired}
        >
          {children}
        </select>
      ) : (
        <select
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
          {...register(`${name}` as const)}
          {...rest}
          required={isRequired}
          onChange={(e) => onChange(e.target.value)}
        >
          {children}
        </select>
      )}
    </>
  );
}

export function Select2({
  register,
  options,
  keyval,
  isRequired = false,
  name,
  onChange = () => null,
  children,
  ...rest
}: Props) {
  return (
    <>
      <select
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
      >
        <option value={""}>--Select One--</option>
        {typeof options !== "undefined" ? (
          <>
            {options.map((value) => (
              <option value={value}>{value}</option>
            ))}
          </>
        ) : null}
        {typeof keyval !== "undefined" ? (
          <>
            {keyval.map((item) => (
              <option value={item.key}>{item.value}</option>
            ))}
          </>
        ) : null}
      </select>
    </>
  );
}
