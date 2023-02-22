import { useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import usePageStore from "../../../stores/PageStore";
import {
  InputsSearchComponentType,
  SearchComponentType,
} from "../../../types/Type";
import {
  generateIdentifier,
  removeUndefinedProp,
  transformToObjUndefined,
} from "../../../utils/utils";
import { Input } from "../../ui-components/InputComponent";
import { Modal } from "../../ui-components/ModalComponent";
import { Select } from "../../ui-components/SelectComponent";

type Props = {
  open: boolean;
  onClose: () => void;
  index: number;
  data?: InputsSearchComponentType;
  id: string;
};

function AddSearchModal({ open, onClose, id, data, index }: Props) {
  if (!open) return null;
  const [isDdl, setIsDdl] = useState(false);

  const {
    register,
    unregister,
    control,
    handleSubmit,
    reset,
    resetField,
    watch,
    formState: { errors },
  } = useForm<InputsSearchComponentType>({
    defaultValues: {
      ddlType: data?.ddlType,
      name: data?.name,
      label: data?.label,
      type: data?.type,
      environment: data?.environment,
      isFromURL: data?.isFromURL,
      items: data?.items,
      path: data?.path,
    },
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "items", // unique name for your Field Array
    }
  );

  const watchTypeDdl = watch("type");
  const watchIsFromUrlCheck = watch("isFromURL");
  const pageStore = usePageStore();

  useEffect(() => {
    console.log("effect ddl");
    if (watchTypeDdl === "textbox" || watchTypeDdl === "numeric") {
      setIsDdl(() => false);
      register("label");
      register("name");
      unregister("ddlType");
      unregister("environment");
      unregister("isFromURL");
      unregister("items");
      unregister("path");
      fields.forEach((el, idx) => {
        remove(idx);
      });
      reset(
        transformToObjUndefined(["ddlType", "environment", "isFromURL", "path"])
      );
    }
    if (watchTypeDdl === "dropdown") {
      setIsDdl(() => true);
      register("label");
      register("name");
      register("ddlType");
      register("isFromURL");
    }
  }, [register, unregister, watchTypeDdl]);

  useEffect(() => {
    console.log("effect checkbox");
    if (watchIsFromUrlCheck === undefined) return;
    if (watchIsFromUrlCheck) {
      register("environment");
      register("path");
      unregister("items");
      fields.forEach((el, idx) => {
        remove(idx);
      });
    }
    if (!watchIsFromUrlCheck) {
      register("items");
      unregister("environment");
      unregister("path");
      reset(transformToObjUndefined(["environment", "path"]));
    }
  }, [register, unregister, watchIsFromUrlCheck]);

  const getDataType = (type: string) => {
    if (type === "textbox" || type === "dropdown") return "text";
    return type;
  };

  const onSubmit: SubmitHandler<InputsSearchComponentType> = (data) => {
    const comp: SearchComponentType = {
      id: generateIdentifier(data.label, "search"),
      type: data.type,
      label: data.label,
      name: data.name,
      value: "",
      placeholder: "",
      datatype: getDataType(data.type),
      isFromURL: data.isFromURL,
      ddlType: data.ddlType,
      items: data.items,
      environment: data.environment,
      path: data.path,
    };
    if (index === -1) {
      pageStore.addSearchComponent(id, removeUndefinedProp(comp));
    }
    if (index > -1) {
      pageStore.editSearchComponent(id, index, removeUndefinedProp(comp));
    }
    reset();
    onClose();
  };

  const onClickCancel = () => {
    reset();
    onClose();
  };

  return (
    <>
      <Modal>
        <div className="text-right">
          <button
            type="button"
            className="inline-block rounded bg-slate-600 p-2 capitalize text-white shadow-lg transition duration-100 ease-in-out hover:bg-red-600"
            onClick={() => onClickCancel()}
          >
            cancel
          </button>
        </div>
        <p>form goes here</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="m-2 p-2 text-left">
            <div className="mb-3 xl:w-96">
              <label className="form-label mb-2 inline-block capitalize text-gray-700">
                Type
              </label>
              <Select
                name="type"
                options={["textbox", "dropdown", "numeric"]}
                register={register}
              />
            </div>
            <div className="mb-3 xl:w-96">
              <label className="form-label mb-2 inline-block capitalize text-gray-700">
                Label
              </label>
              <Input name="label" register={register} />
            </div>
            <div className="mb-3 xl:w-96">
              <label className="form-label mb-2 inline-block capitalize text-gray-700">
                Column Name
              </label>
              <Input name="name" register={register} />
            </div>
            {isDdl ? (
              <>
                <div className="mb-3 xl:w-96">
                  <label className="form-label mb-2 inline-block capitalize text-gray-700">
                    Dropdown Type
                  </label>
                  <Select
                    name="ddlType"
                    options={["all", "one", "none"]}
                    register={register}
                  />
                </div>
                <div className="mb-3 grid grid-cols-3 text-left">
                  <label className="col-span-1">Use API?</label>
                  <div className="col-span-2 text-left">
                    <input type={"checkbox"} {...register("isFromURL")} />
                  </div>
                </div>
                {watchIsFromUrlCheck ? (
                  <>
                    <div className="mb-3 xl:w-96">
                      <label className="form-label mb-2 inline-block capitalize text-gray-700">
                        Environment
                      </label>
                      <Select
                        name="environment"
                        options={["FOU", "LOS"]}
                        register={register}
                      />
                    </div>
                    <div className="mb-3 xl:w-96">
                      <label className="form-label mb-2 inline-block capitalize text-gray-700">
                        API Path
                      </label>
                      <Input name="path" register={register} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex">
                      <div className="m-1 my-auto">
                        <p>Items</p>
                      </div>
                      <div className="float-right m-1">
                        <button
                          className="m-1 inline-block rounded bg-green-600 p-2 capitalize text-white shadow-lg transition duration-100 ease-in-out hover:bg-green-800"
                          type="button"
                          //@ts-ignore
                          onClick={() => append({})}
                        >
                          Add Items
                        </button>
                      </div>
                    </div>

                    <ul className="w-full">
                      {fields.map((item, index) => (
                        <div key={item.id} className="grid grid-cols-12">
                          <div className="col-span-4 p-1">
                            <label>Key</label>
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
                              {...register(`items.${index}.key` as const)}
                            />
                          </div>
                          <div className="col-span-4 p-1">
                            <label>Value</label>
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
                              {...register(`items.${index}.value` as const)}
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
                )}
              </>
            ) : null}
          </div>
          <div className="text-center">
            <input
              type="submit"
              value={data === undefined ? "Add" : "Save Changes"}
              className="inline-block w-full rounded bg-green-500 px-6 py-2.5 text-xs font-bold capitalize leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-green-700 hover:text-white hover:shadow-lg"
            />
          </div>
        </form>
      </Modal>
    </>
  );
}

export default AddSearchModal;
