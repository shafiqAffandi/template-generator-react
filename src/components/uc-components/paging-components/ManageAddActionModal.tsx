import { useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import usePageStore from "../../../stores/PageStore";
import {
  ActionCallbackType,
  ActionDeleteType,
  ActionEditType,
  ActionPagingType,
  ActionSwitchType,
} from "../../../types/ActionPagingType";
import { BodyPagingType } from "../../../types/Type";
import { removeUndefinedProp } from "../../../utils/utils";
import { Input } from "../../ui-components/InputComponent";
import { Modal } from "../../ui-components/ModalComponent";
import { Select } from "../../ui-components/SelectComponent";
import ActionTypeCallbackComponent from "./action-type-components/ActionTypeCallbackComponent";
import ActionTypeDeleteComponent from "./action-type-components/ActionTypeDeleteComponent";
import ActionTypeEditComponent from "./action-type-components/ActionTypeEditComponent";
import ActionTypeSwitchComponent from "./action-type-components/ActionTypeSwitchComponent";

type Props = {
  open: boolean;
  onClose: () => void;
  index: number;
  idxData: number;
  bodyData?: BodyPagingType;
  id: string;
};

const setDefaultValue = (
  data: BodyPagingType,
  idx: number
): ActionPagingType => {
  if (idx === -1) return {} as any;
  if (data.action![idx].type === "edit") {
    const _data = data.action![idx] as ActionEditType;
    return {
      type: _data.type,
      icon: _data.icon,
      param: _data.param,
      path: _data.path,
    };
  }
  if (data.action![idx].type === "delete") {
    const _data = data.action![idx] as ActionDeleteType;
    return {
      type: _data.type,
      property: _data.property,
    };
  }
  if (data.action![idx].type === "callback") {
    const _data = data.action![idx] as ActionCallbackType;
    return {
      type: _data.type,
      key: _data.key,
    };
  }

  if (data.action![idx].type === "switch") {
    return { ...data.action![idx] };
  }

  return {} as any;
};

function ManageAddActionModal({
  open,
  onClose,
  index,
  idxData,
  bodyData,
  id,
}: Props) {
  if (!open) return null;
  const pageStore = usePageStore();

  const {
    register,
    control,
    unregister,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ActionPagingType>({
    defaultValues: setDefaultValue(bodyData ?? ({} as any), idxData),
  });

  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "param", // unique name for your Field Array
  });

  const watchTypeDdl = watch("type");

  useEffect(() => {
    if (watchTypeDdl === "edit") {
      register("icon");
      register("path");
      register("param");
      unregister("property");
      unregister("key");
      unregister("case");
    }
    if (watchTypeDdl === "delete") {
      register("property");
      unregister("icon");
      unregister("path");
      unregister("key");
      unregister("case");
      fields.forEach((el, idx) => {
        remove(idx);
      });
      unregister("param");
    }
    if (watchTypeDdl === "callback") {
      register("key");
      unregister("icon");
      unregister("path");
      unregister("property");
      unregister("case");
      fields.forEach((el, idx) => {
        remove(idx);
      });
      unregister("param");
    }
    if (watchTypeDdl === "switch") {
      register("case");
      unregister("icon");
      unregister("path");
      unregister("key");
      unregister("property");
      fields.forEach((el, idx) => {
        remove(idx);
      });
      unregister("param");
    }
  }, [watchTypeDdl]);

  const onClickCancel = () => {
    reset();
    onClose();
  };

  const onSubmit: SubmitHandler<any> = (data) => {
    const action: ActionPagingType = {} as any;

    if (data.type === "edit") {
      const _data = data as ActionEditType;
      const path = data.isSelfCustom ? _data.path : `/BREAD/${id}`;
      const params = _data.param.map((item) => {
        return { type: item.type, property: item.property };
      });
      if (!data.isSelfCustom) {
        params.push({ type: "mode", property: "edit" });
        params.push({ type: "view", property: "form" });
      }
      const _action: ActionPagingType = {
        type: _data.type,
        path: path,
        param: params,
        icon: _data.icon,
      };
      Object.assign(action, _action);
    }

    if (data.type === "delete") {
      const _data = data as ActionDeleteType;
      const _action: ActionPagingType = {
        type: _data.type,
        property: _data.property,
      };
      Object.assign(action, _action);
    }

    if (data.type === "callback") {
      const _data = data as ActionCallbackType;
      const _action: ActionPagingType = {
        type: _data.type,
        key: _data.key,
      };
      Object.assign(action, _action);
    }

    if (data.type === "switch") {
      const _data = data as ActionSwitchType;
      const _action: ActionSwitchType = { ..._data };
      Object.assign(action, _action);
    }

    if (idxData === -1) {
      pageStore.addActionBodyPaging(id, index, removeUndefinedProp(action));
    }
    if (idxData > -1) {
      pageStore.editActionBodyPaging(
        id,
        index,
        idxData,
        removeUndefinedProp(action)
      );
    }
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
              Action Type
            </label>
            <Select
              name="type"
              register={register}
              options={["edit", "delete", "callback", "switch"]}
            />
          </div>
          {watchTypeDdl === "edit" ? (
            <ActionTypeEditComponent
              register={register}
              control={control}
              watch={watch}
            />
          ) : null}
          {watchTypeDdl === "delete" ? (
            <ActionTypeDeleteComponent register={register} />
          ) : null}
          {watchTypeDdl === "callback" ? (
            <ActionTypeCallbackComponent register={register} />
          ) : null}
          {watchTypeDdl === "switch" ? (
            <ActionTypeSwitchComponent
              register={register}
              unregister={unregister}
              control={control}
              watch={watch}
            />
          ) : null}
        </div>
        <div className="text-center">
          <input
            type="submit"
            value={bodyData === undefined ? "Add" : "Save Changes"}
            className="inline-block w-full rounded bg-green-500 px-6 py-2.5 text-xs font-bold capitalize leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-green-700 hover:text-white hover:shadow-lg"
          />
        </div>
      </form>
    </Modal>
  );
}

export default ManageAddActionModal;
