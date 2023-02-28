import { useFieldArray } from "react-hook-form";
import { Input } from "../../../ui-components/InputComponent";
import TypeSwitchDetailComponent from "./TypeSwitchDetailComponent";

type Props = {
  register: any;
  unregister: any;
  control: any;
  watch: any;
};

function ActionTypeSwitchComponent({
  register,
  unregister,
  control,
  watch,
}: Props) {
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
            <div className="col-span-10 p-1">
              <TypeSwitchDetailComponent
                register={register}
                unregister={unregister}
                control={control}
                watch={watch}
                nestedIdx={index}
              />
            </div>
            <div className="col-span-2 flex flex-col">
              <button
                className="mb-1 mt-auto inline-block rounded bg-slate-600 p-2 capitalize text-white shadow-lg transition duration-100 ease-in-out hover:bg-red-600"
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
