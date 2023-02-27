import { useFieldArray } from "react-hook-form";
import { Input } from "../../../ui-components/InputComponent";
import TypeSwitchDetailComponent from "./TypeSwitchDetailComponent";

type Props = {
  register: any;
  control: any;
};

function ActionTypeSwitchComponent({ register, control }: Props) {
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "case", // unique name for your Field Array
  });

  return (
    <>
      <div className="flex">
        <div className="m-1 my-auto">
          <p>Case</p>
        </div>
        <div className="float-right m-1">
          <button
            className="m-1 inline-block rounded bg-green-600 p-2 capitalize text-white shadow-lg transition duration-100 ease-in-out hover:bg-green-800"
            type="button"
            //@ts-ignore
            onClick={() => append({})}
          >
            Add
          </button>
        </div>
      </div>
      <ul className="w-full">
        {fields.map((item, index) => (
          <div key={item.id} className="grid grid-cols-12">
            <div className="col-span-4 p-1">
              <TypeSwitchDetailComponent
                register={register}
                control={control}
              />
            </div>
            <div className="flex flex-col">
              <button
                className="mt-auto inline-block rounded bg-slate-600 p-2 capitalize text-white shadow-lg transition duration-100 ease-in-out hover:bg-red-600"
                type="button"
                onClick={() => remove(index)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </ul>
    </>
  );
}

export default ActionTypeSwitchComponent;
