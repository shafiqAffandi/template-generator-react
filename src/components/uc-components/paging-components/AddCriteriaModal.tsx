import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { RestrictionConstant } from "../../../constant/RestrictionConstant";
import usePageStore from "../../../stores/PageStore";
import {
  CriteriaPaging,
  InputsSearchComponentType,
  PagingInputType,
} from "../../../types/Type";
import { removeUndefinedProp } from "../../../utils/utils";
import { Input } from "../../ui-components/InputComponent";
import { Modal } from "../../ui-components/ModalComponent";
import { Select } from "../../ui-components/SelectComponent";

type Props = {
  open: boolean;
  onClose: () => void;
  index: number;
  data?: any;
  id: string;
};

function AddCriteriaModal({ open, onClose, id, data, index }: Props) {
  if (!open) return null;
  const pageStore = usePageStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>({
    defaultValues: { ...data },
  });

  const onClickCancel = () => {
    reset();
    onClose();
  };

  const onSubmit: SubmitHandler<any> = (critData) => {
    const criteria: CriteriaPaging = { ...critData };
    if (index === -1) {
      pageStore.addCriteriaPaging(id, removeUndefinedProp(criteria));
    }
    if (index > -1) {
      pageStore.editCriteriaPaging(id, index, removeUndefinedProp(criteria));
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="m-2 p-2 text-left">
          <div className="mb-3 xl:w-96">
            <label className="form-label mb-2 inline-block capitalize text-gray-700">
              Property Name
            </label>
            <Input name="propName" register={register} />
          </div>
          <div className="mb-3 xl:w-96">
            <label className="form-label mb-2 inline-block capitalize text-gray-700">
              Restriction
            </label>
            <Select
              name="restriction"
              register={register}
              keyval={RestrictionConstant}
            />
          </div>
          <div className="mb-3 xl:w-96">
            <label className="form-label mb-2 inline-block capitalize text-gray-700">
              Value
            </label>
            <Input name="value" register={register} />
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

export default AddCriteriaModal;
