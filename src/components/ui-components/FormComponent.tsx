import { createElement } from "react";
import { useForm } from "react-hook-form";

type Props = {
  defaultValues?: any;
  children: any;
  onSubmit: (data: any) => void;
};

export function Form({ defaultValues, children, onSubmit }: Props) {
  const { handleSubmit, register } = useForm({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {Array.isArray(children)
        ? children.map((child) => {
            return child.props.name
              ? createElement(child.type, {
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
