import { useEffect } from "react";
import { useFieldArray } from "react-hook-form";
import { RestrictionConstant } from "../../../../constant/RestrictionConstant";
import { Input } from "../../../ui-components/InputComponent";
import { Select } from "../../../ui-components/SelectComponent";
import ActionTypeCallbackComponent from "./ActionTypeCallbackComponent";
import ActionTypeDeleteComponent from "./ActionTypeDeleteComponent";
import ActionTypeEditComponent from "./ActionTypeEditComponent";

type Props = {
  register: any;
  unregister: any;
  control: any;
  watch: any;
  nestedIdx: number;
};

function TypeSwitchDetailComponent({
  register,
  unregister,
  control,
  watch,
  nestedIdx,
}: Props) {
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: `case[${nestedIdx}].conditions`, // unique name for your Field Array
  });

  const watchTypeDdl = watch(`case[${nestedIdx}].result.type`);

  useEffect(() => {
    if (watchTypeDdl === "edit") {
      register(`case[${nestedIdx}].result.` + "icon");
      register(`case[${nestedIdx}].result.` + "path");
      register(`case[${nestedIdx}].result.` + "param");
      unregister(`case[${nestedIdx}].result.` + "property");
      unregister(`case[${nestedIdx}].result.` + "key");
      unregister(`case[${nestedIdx}].result.` + "case");
    }
    if (watchTypeDdl === "delete") {
      register(`case[${nestedIdx}].result.` + "property");
      unregister(`case[${nestedIdx}].result.` + "icon");
      unregister(`case[${nestedIdx}].result.` + "path");
      unregister(`case[${nestedIdx}].result.` + "key");
      unregister(`case[${nestedIdx}].result.` + "case");
      unregister(`case[${nestedIdx}].result.` + "param");
    }
    if (watchTypeDdl === "callback") {
      register(`case[${nestedIdx}].result.` + "key");
      unregister(`case[${nestedIdx}].result.` + "icon");
      unregister(`case[${nestedIdx}].result.` + "path");
      unregister(`case[${nestedIdx}].result.` + "property");
      unregister(`case[${nestedIdx}].result.` + "case");
      unregister(`case[${nestedIdx}].result.` + "param");
    }
  }, [watchTypeDdl]);

  return (
    <div className="border border-solid border-cyan-200 p-2">
      <div className="flex">
        <div className="float-right m-1">
          <button
            className="m-1 inline-block rounded bg-green-600 p-2 capitalize text-white shadow-lg transition duration-100 ease-in-out hover:bg-green-800"
            type="button"
            //@ts-ignore
            onClick={() => append({})}
          >
            Add Condition
          </button>
        </div>
      </div>
      <ul className="w-full">
        {fields.map((item, index) => (
          <div key={item.id} className="grid grid-cols-12">
            <div className="col-span-4 p-1">
              <label className="form-label mb-2 inline-block capitalize text-gray-700">
                Property
              </label>
              <Input
                name={`case[${nestedIdx}].conditions[${index}].property`}
                register={register}
              />
            </div>
            <div className="col-span-4 p-1">
              <label className="form-label mb-2 inline-block capitalize text-gray-700">
                Value
              </label>
              <Input
                name={`case[${nestedIdx}].conditions[${index}].value`}
                register={register}
              />
            </div>
            <div className="col-span-2 p-1">
              <label className="form-label mb-2 inline-block capitalize text-gray-700">
                Restriction
              </label>
              <Select
                name={`case[${nestedIdx}].conditions[${index}].restriction`}
                register={register}
                keyval={RestrictionConstant}
              />
            </div>
            <div className="col-span-2 flex flex-col">
              <button
                className="mt-auto mb-1 inline-block rounded bg-slate-600 p-2 capitalize text-white shadow-lg transition duration-100 ease-in-out hover:bg-red-600"
                type="button"
                onClick={() => remove(index)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </ul>
      <div className="mb-3 xl:w-96">
        <label className="form-label mb-2 inline-block capitalize text-gray-700">
          Action Type
        </label>
        <Select
          name={`case[${nestedIdx}].result.type`}
          register={register}
          options={["url", "delete", "callback"]}
        />
      </div>
      {watchTypeDdl === "url" ? (
        <ActionTypeEditComponent
          register={register}
          control={control}
          arrName={`case[${nestedIdx}].result`}
        />
      ) : null}
      {watchTypeDdl === "delete" ? (
        <ActionTypeDeleteComponent
          register={register}
          arrName={`case[${nestedIdx}].result`}
        />
      ) : null}
      {watchTypeDdl === "callback" ? (
        <ActionTypeCallbackComponent
          register={register}
          arrName={`case[${nestedIdx}].result`}
        />
      ) : null}
    </div>
  );
}

export default TypeSwitchDetailComponent;
