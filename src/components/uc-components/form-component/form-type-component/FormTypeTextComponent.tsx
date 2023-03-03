import { useFieldArray } from "react-hook-form";
import { Input } from "../../../ui-components/InputComponent";

type Props = {
  register: any;
  watch: any;
  control: any;
};

function FormTypeTextComponent({ register, watch, control }: Props) {
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: `CustomPattern`, // unique name for your Field Array
  });

  const watchUseCustomPattern = watch("UseCustomPattern");

  return (
    <>
      <div className="mb-3 xl:w-96">
        <label className="form-label mb-2 inline-block capitalize text-gray-700">
          Label
        </label>
        <Input name="Label" register={register} />
      </div>
      <div className="mb-3 xl:w-96">
        <label className="form-label mb-2 inline-block capitalize text-gray-700">
          Variable
        </label>
        <Input name="Variable" register={register} />
      </div>
      <div className="mt-2 grid grid-cols-3 text-left">
        <label className="col-span-1">Use Custom Pattern?</label>
        <div className="col-span-2 text-left">
          <input type={"checkbox"} {...register("UseCustomPattern")} />
        </div>
      </div>
      {watchUseCustomPattern ? (
        <>
          <div className="flex">
            <div className="m-1 my-auto">
              <p>Patterns</p>
            </div>
            <div className="float-right m-1">
              <button
                className="m-1 inline-block rounded bg-green-600 p-2 capitalize text-white shadow-lg transition duration-100 ease-in-out hover:bg-green-800"
                type="button"
                //@ts-ignore
                onClick={() => append({})}
              >
                Add Pattern
              </button>
            </div>
          </div>

          <ul className="w-full">
            {fields.map((item, index) => (
              <div key={item.id} className="grid grid-cols-12">
                <div className="col-span-4 p-1">
                  <label className="form-label mb-2 inline-block capitalize text-gray-700">
                    Regex Pattern
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
                    {...register(`CustomPattern.${index}.pattern` as const)}
                  />
                </div>
                <div className="col-span-4 p-1">
                  <label className="form-label mb-2 inline-block capitalize text-gray-700">
                    Error Message
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
                    {...register(`CustomPattern.${index}.invalidMsg` as const)}
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
      ) : (
        <>
          <div className="mb-3 xl:w-96">
            <label className="form-label mb-2 inline-block capitalize text-gray-700">
              Pattern Optional
            </label>
            <Input name="Pattern" register={register} />
          </div>
        </>
      )}

      <div className="mt-2 grid grid-cols-3 text-left">
        <label className="col-span-1">Required Field?</label>
        <div className="col-span-2 text-left">
          <input type={"checkbox"} {...register("IsRequired")} />
        </div>
      </div>
      <div className="mt-2 grid grid-cols-3 text-left">
        <label className="col-span-1">Uppercase Input?</label>
        <div className="col-span-2 text-left">
          <input type={"checkbox"} {...register("IsUppercase")} />
        </div>
      </div>
      <div className="mt-2 grid grid-cols-3 text-left">
        <label className="col-span-1">Callback Option?</label>
        <div className="col-span-2 text-left">
          <input type={"checkbox"} {...register("IsCallback")} />
        </div>
      </div>
      <div className="mt-2 grid grid-cols-3 text-left">
        <label className="col-span-1">Readonly?</label>
        <div className="col-span-2 text-left">
          <input type={"checkbox"} {...register("IsReadonly")} />
        </div>
      </div>
      <div className="mt-2 grid grid-cols-3 text-left">
        <label className="col-span-1">Hide Input?</label>
        <div className="col-span-2 text-left">
          <input type={"checkbox"} {...register("IsHide")} />
        </div>
      </div>
      <div className="mt-2 grid grid-cols-3 text-left">
        <label className="col-span-1">Input Editable When Mode Edit?</label>
        <div className="col-span-2 text-left">
          <input type={"checkbox"} {...register("IsEditable")} />
        </div>
      </div>
      <div className="mb-3 xl:w-96">
        <label className="form-label mb-2 inline-block capitalize text-gray-700">
          Minimum Text Length optional
        </label>
        <Input name="Min" inputType="number" register={register} />
      </div>
      <div className="mb-3 xl:w-96">
        <label className="form-label mb-2 inline-block capitalize text-gray-700">
          Maximum Text Length optional
        </label>
        <Input name="Max" inputType="number" register={register} />
      </div>
      <div className="mb-3 xl:w-96">
        <label className="form-label mb-2 inline-block capitalize text-gray-700">
          Placeholder optional
        </label>
        <Input name="Placeholder" register={register} />
      </div>
    </>
  );
}

export default FormTypeTextComponent;
