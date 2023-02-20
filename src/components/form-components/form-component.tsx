import React from "react";
import { useForm } from "react-hook-form";

export function Form({ defaultValues, children, onSubmit }) {
  const { handleSubmit, register } = useForm({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {Array.isArray(children)
        ? children.map((child) => {
            return child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register,
                    key: child.props.name,
                  },
                })
              : child;
          })
        : children}
    </form>
  );
}

export function Input({ register, name, ...rest }) {
  return <input {...register(name)} {...rest} />;
}

export function Select({ register, options, name, ...rest }) {
  return (
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
    >
      {options.map((value) => (
        <option value={value}>{value}</option>
      ))}
    </select>
  );
}
