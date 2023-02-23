import { useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import usePageStore from "../../../stores/PageStore";
import {
  ActionEditType,
  ActionPagingType,
  InputActionPagingType,
  ParamType,
} from "../../../types/ActionPagingType";
import { BodyPagingType, HeaderPagingType } from "../../../types/Type";
import { removeUndefinedProp } from "../../../utils/utils";
import { Input } from "../../ui-components/InputComponent";
import { Modal } from "../../ui-components/ModalComponent";
import { Select } from "../../ui-components/SelectComponent";

type Props = {
  open: boolean;
  onClose: () => void;
  index: number;
  data?: {
    header: HeaderPagingType | undefined;
    body: BodyPagingType | undefined;
  };
  id: string;
};

function AddActionModal({ open, onClose, index, data, id }: Props) {
  if (!open) return null;

  const pageStore = usePageStore();
  const [actionType, setActionType] = useState("");

  const onClickCancel = () => {
    // reset();
    onClose();
  };

  const {
    register,
    control,
    unregister,
    setValue,
    handleSubmit,
    reset,
    resetField,
    watch,
    formState: { errors },
  } = useForm<InputActionPagingType>();

  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "param", // unique name for your Field Array
  });

  const onSubmit: SubmitHandler<InputActionPagingType> = (data) => {
    console.log(data);
    const actions: ActionPagingType[] = [];

    const compHeader: HeaderPagingType = {
      type: "label",
      label: data.label,
      position: "center",
    };
    console.log(compHeader);

    const compBody: BodyPagingType = {} as BodyPagingType;

    if (data.actionType === "edit") {
      const _data = data as ActionEditType;
      const params = _data.param.map((item) => {
        return { type: item.type, property: item.property };
      });
      const action: ActionPagingType = {
        type: "edit",
        path: _data.path,
        param: params,
        icon: "",
      };
      const _compBody = {
        type: "action",
        position: "center",
        action: [action],
      };
      Object.assign(compBody, _compBody);
    }

    console.log(compBody);

    if (index === -1) {
      pageStore.addHeaderPaging(id, removeUndefinedProp(compHeader));
      pageStore.addBodyPaging(id, removeUndefinedProp(compBody));
    }
    // if (index > -1) {
    //   pageStore.editHeaderPaging(id, index, removeUndefinedProp(compHeader));
    //   pageStore.editBodyPaging(id, index, removeUndefinedProp(compBody));
    // }
    reset();
    onClose();
  };

  return (
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
              Label
            </label>
            <Input name="label" register={register} />
          </div>
          <div className="mb-3 xl:w-96">
            <label className="form-label mb-2 inline-block capitalize text-gray-700">
              Action Type
            </label>
            <Select
              name="actionType"
              register={register}
              options={["edit", "delete", "callback", "switch"]}
              onChange={(val) => setActionType(() => val)}
            />
          </div>
          {actionType === "edit" ? (
            <>
              <p>edit</p>
              <div className="mb-3 xl:w-96">
                <label className="form-label mb-2 inline-block capitalize text-gray-700">
                  Path
                </label>
                <Input name="path" register={register} />
              </div>
              <div className="mb-3 xl:w-96">
                <label className="form-label mb-2 inline-block capitalize text-gray-700">
                  Icon
                </label>
                <Input name="icon" register={register} />
              </div>
              <div className="mb-3 xl:w-96">
                <label className="form-label mb-2 inline-block capitalize text-gray-700">
                  Param (should be an array)
                </label>
                <Input name="param" register={register} />
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
                          {...register(`param.${index}.type` as const)}
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
                          {...register(`param.${index}.property` as const)}
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
          ) : null}
          {actionType === "delete" ? (
            <>
              <p>delete</p>
              <div className="mb-3 xl:w-96">
                <label className="form-label mb-2 inline-block capitalize text-gray-700">
                  Property
                </label>
                <Input name="property" register={register} />
              </div>
            </>
          ) : null}
          {actionType === "callback" ? (
            <>
              <p>callback</p>
              <div className="mb-3 xl:w-96">
                <label className="form-label mb-2 inline-block capitalize text-gray-700">
                  Key
                </label>
                <Input name="key" register={register} />
              </div>
            </>
          ) : null}
          {actionType === "switch" ? (
            <>
              <p>switch</p>
              <div className="mb-3 xl:w-96">
                <label className="form-label mb-2 inline-block capitalize text-gray-700">
                  Case (should be an array object)
                </label>
                <Input name="case" register={register} />
              </div>
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
  );
}

export default AddActionModal;
