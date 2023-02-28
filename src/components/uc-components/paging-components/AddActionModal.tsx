import { SubmitHandler, useForm } from "react-hook-form";
import usePageStore from "../../../stores/PageStore";
import { InputActionPagingType } from "../../../types/ActionPagingType";
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

const setDefaultValue = (data: any) => {
  if (Object.keys(data).length === 0) return data;
  return {
    label: data?.header?.label,
    position: data?.header?.position,
  };
};

function AddActionModal({ open, onClose, index, data, id }: Props) {
  if (!open) return null;
  if (typeof data === "undefined") data = {} as any;
  const pageStore = usePageStore();

  const onClickCancel = () => {
    reset();
    onClose();
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputActionPagingType>({
    defaultValues: setDefaultValue(data),
  });

  const onSubmit: SubmitHandler<InputActionPagingType> = (data) => {
    const compHeader: HeaderPagingType = {
      type: "label",
      label: data.label,
      position: data.position,
    };

    const compBody = {
      type: "action",
      position: data.position,
      action: [],
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
              Position
            </label>
            <Select
              name="position"
              register={register}
              options={["left", "center", "right"]}
            />
          </div>
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
