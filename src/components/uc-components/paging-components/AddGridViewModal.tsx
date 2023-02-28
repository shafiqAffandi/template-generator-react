import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import usePageStore from "../../../stores/PageStore";
import {
  BodyPagingType,
  HeaderPagingType,
  InputsGridViewType,
} from "../../../types/Type";
import { matchesEl, removeUndefinedProp, toUpper } from "../../../utils/utils";
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

function AddGridViewModal({ open, onClose, index, data, id }: Props) {
  if (!open) return null;

  const pageStore = usePageStore();
  const searchData = pageStore.pages.find((el) => matchesEl(el, id))?.paging
    ?.pagingInput.component;
  const searchDataKeyVal = searchData?.map((item) => {
    return {
      key: item.id,
      value: item.label,
    };
  });
  const {
    register,
    unregister,
    setValue,
    handleSubmit,
    reset,
    resetField,
    watch,
    formState: { errors },
  } = useForm<InputsGridViewType>({
    defaultValues: {
      sortable: data?.header?.type === "sort" ? true : false,
      name: data?.header?.name,
      label: data?.header?.label,
      position: data?.header?.position,
      type: data?.body?.type,
      property: data?.body?.property,
    },
  });

  const watchIsSortable = watch("sortable");

  useEffect(() => {
    if (watchIsSortable === undefined) return;
    if (watchIsSortable) {
      register("name");
    }
    if (!watchIsSortable) {
      unregister("name");
    }
  }, [watchIsSortable]);

  const onSubmit: SubmitHandler<InputsGridViewType> = (data) => {
    const compHeader: HeaderPagingType = {
      type: data.sortable ? "sort" : "label",
      label: data.label,
      position: data.position,
      name: data.name,
    };

    const compBody: BodyPagingType = {
      type: data.type,
      position: data.position,
      property: data.property,
    };
    if (index === -1) {
      pageStore.addHeaderPaging(id, removeUndefinedProp(compHeader));
      pageStore.addBodyPaging(id, removeUndefinedProp(compBody));
    }
    if (index > -1) {
      pageStore.editHeaderPaging(id, index, removeUndefinedProp(compHeader));
      pageStore.editBodyPaging(id, index, removeUndefinedProp(compBody));
    }
    reset();
    onClose();
  };

  const onClickCancel = () => {
    reset();
    onClose();
  };

  const copyFromHandler = (val: string) => {
    const selectedData = searchData!.find((el) => el.id === val);
    setValue("label", selectedData?.label ?? "");
    setValue("name", selectedData?.name ?? "");
    setValue(
      "property",
      toUpper(selectedData?.label ?? "").replace(/\s+/g, "")
    );
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
            {searchData!.length > 0 && typeof searchData !== "undefined" ? (
              <>
                <div className="mb-3 xl:w-96">
                  <label className="form-label mb-2 inline-block capitalize text-gray-700">
                    Copy From
                  </label>
                  <Select
                    name="copyfrom"
                    keyval={searchDataKeyVal}
                    register={register}
                    onChange={copyFromHandler}
                  />
                </div>
              </>
            ) : null}

            <div className="mb-3 xl:w-96">
              <label className="form-label mb-2 inline-block capitalize text-gray-700">
                Type
              </label>
              <Select
                name="type"
                options={["text", "boolean"]}
                register={register}
                isRequired={true}
              />
            </div>
            <div className="mb-3 xl:w-96">
              <label className="form-label mb-2 inline-block capitalize text-gray-700">
                Label
              </label>
              <Input name="label" register={register} isRequired={true} />
            </div>
            <div className="mb-3 xl:w-96">
              <label className="form-label mb-2 inline-block capitalize text-gray-700">
                Property
              </label>
              <Input name="property" register={register} />
            </div>
            <div className="mb-3 xl:w-96">
              <label className="form-label mb-2 inline-block capitalize text-gray-700">
                Position
              </label>
              <Select
                name="position"
                options={["left", "center", "right"]}
                register={register}
              />
            </div>
            <div className="mb-3 grid grid-cols-3 text-left">
              <label className="col-span-1">Sortable?</label>
              <div className="col-span-2 text-left">
                <input type={"checkbox"} {...register("sortable")} />
              </div>
            </div>
            {watchIsSortable ? (
              <>
                <div className="mb-3 xl:w-96">
                  <label className="form-label mb-2 inline-block capitalize text-gray-700">
                    Column Name
                  </label>
                  <Input name="name" register={register} />
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
    </>
  );
}

export default AddGridViewModal;
