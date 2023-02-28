import { useFieldArray } from "react-hook-form";
import { Input } from "../../../ui-components/InputComponent";

type Props = {
  register: any;
  control: any;
  arrName?: string;
};

function ActionTypeEditComponent({ register, control, arrName = "" }: Props) {
  if (arrName !== "") arrName = `${arrName}.`;
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: `${arrName}param`, // unique name for your Field Array
  });

  return (
    <>
      <div className="mb-3 xl:w-96">
        <label className="form-label mb-2 inline-block capitalize text-gray-700">
          Path
        </label>
        <Input name={`${arrName}` + "path"} register={register} />
      </div>
      <div className="mb-3 xl:w-96">
        <label className="form-label mb-2 inline-block capitalize text-gray-700">
          Icon
        </label>
        <Input name={`${arrName}` + "icon"} register={register} />
      </div>
      <>
        <div className="flex">
          <div className="m-1 my-auto">
            <p>Parameters</p>
          </div>
          <div className="float-right m-1">
            <button
              className="m-1 inline-block rounded bg-green-600 p-2 capitalize text-white shadow-lg transition duration-100 ease-in-out hover:bg-green-800"
              type="button"
              //@ts-ignore
              onClick={() => append({})}
            >
              Add Parameter
            </button>
          </div>
        </div>

        <ul className="w-full">
          {fields.map((item, index) => (
            <div key={item.id} className="grid grid-cols-12">
              <div className="col-span-4 p-1">
                <label className="form-label mb-2 inline-block capitalize text-gray-700">
                  Type
                </label>
                <input
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
                  {...register(`${arrName}param.${index}.type` as const)}
                />
              </div>
              <div className="col-span-4 p-1">
                <label className="form-label mb-2 inline-block capitalize text-gray-700">
                  Property
                </label>
                <input
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
                  {...register(`${arrName}param.${index}.property` as const)}
                />
              </div>
              <div className="flex flex-col">
                <button
                  className="mt-auto ml-2 mb-1 inline-block rounded bg-slate-600 p-2 capitalize text-white shadow-lg transition duration-100 ease-in-out hover:bg-red-600"
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
    </>
  );
}

export default ActionTypeEditComponent;
