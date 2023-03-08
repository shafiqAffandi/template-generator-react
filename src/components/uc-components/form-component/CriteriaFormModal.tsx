import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import usePageStore from "../../../stores/PageStore";
import { Modal } from "../../ui-components/ModalComponent";

type Props = {
  id: string;
  open: boolean;
  onClose: () => void;
  data?: any;
};

function setCritObj(data: any) {
  const keys = Object.keys(data) as (keyof typeof data)[];

  return keys.map((key) => {
    return { get: key, set: data[key] };
  });
}

function setDefaultValue(data: any) {
  if (data === undefined) return {};
  return { criteria: data };
}

function CriteriaFormModal({ id, open, onClose, data }: Props) {
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

  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: `criteria`, // unique name for your Field Array
  });

  const onSubmit: SubmitHandler<any> = (dataInput) => {
    console.log(dataInput);
    const critArr: { get: string; set: string }[] = [];
    dataInput.criteria.forEach((item: { get: string; set: string }) => {
      critArr.push({
        get: item.get,
        set: item.set,
      });
    });
    console.log(critArr);
    pageStore.setCriteriaForm(id, critArr);
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
                  get value
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
                  {...register(`criteria.${index}.get` as const)}
                />
              </div>
              <div className="col-span-4 p-1">
                <label className="form-label mb-2 inline-block capitalize text-gray-700">
                  set value
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
                  {...register(`criteria.${index}.set` as const)}
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

export default CriteriaFormModal;
