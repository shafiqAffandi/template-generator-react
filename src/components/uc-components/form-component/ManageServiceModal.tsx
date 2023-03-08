import { SubmitHandler, useForm } from "react-hook-form";
import usePageStore from "../../../stores/PageStore";
import { Input } from "../../ui-components/InputComponent";
import { Modal } from "../../ui-components/ModalComponent";
import { Select } from "../../ui-components/SelectComponent";

type Props = {
  id: string;
  open: boolean;
  onClose: () => void;
  data?: any;
};

function setDefaultValue(data: any) {
  if (data === undefined) return {};
  return {
    add: data.add,
    edit: data.edit,
    get: data.detail,
  };
}

function ManageServiceModal({ id, open, onClose, data = undefined }: Props) {
  if (!open) return null;
  const pageStore = usePageStore();
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<any>({
    defaultValues: setDefaultValue(data),
  });

  const onSubmit: SubmitHandler<any> = (dataInput) => {
    console.log(dataInput);
    const serviceUrl = {
      detail: dataInput.get,
      add: dataInput.add,
      edit: dataInput.edit,
    };
    pageStore.setServiceUrl(id, serviceUrl);
    reset();
    onClose();
  };

  return (
    <Modal>
      <div className="text-right">
        <button
          type="button"
          className="inline-block rounded bg-slate-600 p-2 capitalize text-white shadow-lg transition duration-100 ease-in-out hover:bg-red-600"
          onClick={() => onClose()}
        >
          cancel
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 xl:w-96">
          <label className="form-label mb-2 inline-block capitalize text-gray-700">
            Get Service
          </label>
          <Input name="get" register={register} />
        </div>
        <div className="mb-3 xl:w-96">
          <label className="form-label mb-2 inline-block capitalize text-gray-700">
            Add Service
          </label>
          <Input name="add" register={register} />
        </div>
        <div className="mb-3 xl:w-96">
          <label className="form-label mb-2 inline-block capitalize text-gray-700">
            Edit Service
          </label>
          <Input name="edit" register={register} />
        </div>
        <div className="w-full">
          <input
            type="submit"
            value={Object.keys(data).length === 0 ? "Add" : "Save Changes"}
            className="inline-block w-full rounded bg-green-500 px-6 py-2.5 text-xs font-bold capitalize leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-green-700 hover:text-white hover:shadow-lg"
          />
        </div>
      </form>
    </Modal>
  );
}

export default ManageServiceModal;
