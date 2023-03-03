import { useFieldArray } from "react-hook-form";
import { ListEnvironment } from "../../../../constant/ListEnvironment";
import { Input } from "../../../ui-components/InputComponent";
import { Select } from "../../../ui-components/SelectComponent";

type Props = {
  register: any;
  watch: any;
  control: any;
};

function FormTypeDdlComponent({ register, watch, control }: Props) {
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: `DdlItemsObj`, // unique name for your Field Array
  });

  const {
    fields: ReqObjFields,
    append: AppendReqObjFields,
    remove: RemoveReqObjFields,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: `ReqObj`, // unique name for your Field Array
  });

  const watchIsUseAPI = watch("isUseAPI");

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
        <label className="col-span-1">Required Field?</label>
        <div className="col-span-2 text-left">
          <input type={"checkbox"} {...register("IsRequired")} />
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
      <div className="mt-2 grid grid-cols-3 text-left">
        <label className="col-span-1">Use Default Value?</label>
        <div className="col-span-2 text-left">
          <input type={"checkbox"} {...register("UseDefaultValue")} />
        </div>
      </div>
      <div className="mt-2 grid grid-cols-3 text-left">
        <label className="col-span-1">Get List From API?</label>
        <div className="col-span-2 text-left">
          <input type={"checkbox"} {...register("isUseAPI")} />
        </div>
      </div>
      {watchIsUseAPI ? (
        <div className="my-2 border-2 border-solid border-green-200">
          <div className="mb-3 xl:w-96">
            <label className="form-label mb-2 inline-block capitalize text-gray-700">
              Environment
            </label>
            <Select
              name="Environment"
              keyval={ListEnvironment}
              register={register}
            />
          </div>
          <div className="mb-3 xl:w-96">
            <label className="form-label mb-2 inline-block capitalize text-gray-700">
              API Path
            </label>
            <Input name="Url" register={register} />
          </div>
          <div className="mb-3 xl:w-96">
            <label className="form-label mb-2 inline-block capitalize text-gray-700">
              Custom Object name? default `ReturnObject`
            </label>
            <Input name="CustomObjName" register={register} />
          </div>
          <div className="mb-3 xl:w-96">
            <label className="form-label mb-2 inline-block capitalize text-gray-700">
              Custom Key name? default `Key`
            </label>
            <Input name="CustomKeyName" register={register} />
          </div>
          <div className="mb-3 xl:w-96">
            <label className="form-label mb-2 inline-block capitalize text-gray-700">
              Custom Value name? default `Value`
            </label>
            <Input name="CustomValueName" register={register} />
          </div>
          <div className="flex">
            <div className="m-1 my-auto">
              <p>Request Object</p>
            </div>
            <div className="float-right m-1">
              <button
                className="m-1 inline-block rounded bg-green-600 p-2 capitalize text-white shadow-lg transition duration-100 ease-in-out hover:bg-green-800"
                type="button"
                //@ts-ignore
                onClick={() => AppendReqObjFields({})}
              >
                Add Item
              </button>
            </div>
          </div>

          <ul className="w-full">
            {ReqObjFields.map((item, index) => (
              <div key={item.id} className="grid grid-cols-12">
                <div className="col-span-4 p-1">
                  <label className="form-label mb-2 inline-block capitalize text-gray-700">
                    Property Name
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
                    {...register(`ReqObj.${index}.PropName` as const)}
                  />
                </div>
                <div className="col-span-4 p-1">
                  <label className="form-label mb-2 inline-block capitalize text-gray-700">
                    Property Value
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
                    {...register(`ReqObj.${index}.PropValue` as const)}
                  />
                </div>
                <div className="flex flex-col">
                  <button
                    className="mt-auto ml-2 mb-1 inline-block rounded bg-slate-600 p-2 capitalize text-white shadow-lg transition duration-100 ease-in-out hover:bg-red-600"
                    type="button"
                    onClick={() => RemoveReqObjFields(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </ul>
        </div>
      ) : (
        <div className="my-2 border-2 border-solid border-green-200">
          <div className="flex">
            <div className="m-1 my-auto">
              <p>List Items</p>
            </div>
            <div className="float-right m-1">
              <button
                className="m-1 inline-block rounded bg-green-600 p-2 capitalize text-white shadow-lg transition duration-100 ease-in-out hover:bg-green-800"
                type="button"
                //@ts-ignore
                onClick={() => append({})}
              >
                Add Item
              </button>
            </div>
          </div>

          <ul className="w-full">
            {fields.map((item, index) => (
              <div key={item.id} className="grid grid-cols-12">
                <div className="col-span-4 p-1">
                  <label className="form-label mb-2 inline-block capitalize text-gray-700">
                    Key
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
                    {...register(`DdlItemsObj.${index}.Key` as const)}
                  />
                </div>
                <div className="col-span-4 p-1">
                  <label className="form-label mb-2 inline-block capitalize text-gray-700">
                    Value
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
                    {...register(`DdlItemsObj.${index}.Value` as const)}
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
        </div>
      )}
    </>
  );
}

export default FormTypeDdlComponent;
