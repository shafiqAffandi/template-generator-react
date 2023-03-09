import { useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import usePageStore from "../stores/PageStore";
import { Modal } from "./ui-components/ModalComponent";
import { Select } from "./ui-components/SelectComponent";

type Props = {
  id: string;
  open: boolean;
  onClose: () => void;
  data?: any;
};

function setDefaultData(data: string[]) {
  const mappedData = data.map((item) => {
    return {
      childName: item,
    };
  });
  return mappedData;
}

function ChildModal({ id, open, onClose, data = [] }: Props) {
  if (!open) return null;
  const pageStore = usePageStore();
  const [childList, setChildList] = useState([""]);

  useEffect(() => {
    const page = pageStore.pages;
    const listPage = page.filter((el) => el.id != id);
    const listId = listPage.map((item) => item.id);
    setChildList(listId);
  }, []);

  const {
    register,
    control,
    unregister,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<{ child: { childName: string }[] }>({
    defaultValues: {
      child: setDefaultData(data),
    },
  });

  useEffect(() => {
    let defaultValue: { child: { childName: string }[] } = { child: [] };
    defaultValue.child = setDefaultData(data);
    reset({ ...defaultValue });
  }, []);

  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "child", // unique name for your Field Array
  });

  const onClickCancel = () => {
    reset();
    onClose();
  };

  const onSubmit: SubmitHandler<{ child: { childName: string }[] }> = (
    dataInput
  ) => {
    const compChild: string[] = dataInput.child.map(
      (item: { childName: string }) => item.childName
    );
    pageStore.setChildPage(id, compChild);
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
          <div className="col-span-4 p-1">
            <label className="form-label mb-2 inline-block capitalize text-gray-700">
              child
            </label>
          </div>
          {fields.map((item, index) => (
            <div key={item.id} className="grid grid-cols-12">
              <div className="col-span-4 p-1">
                <Select
                  register={register}
                  name={`child.${index}.childName`}
                  options={childList}
                />
                {/* <select
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
                  {...register(`child.${index}.childName` as const)}
                /> */}
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
            value={data.length === 0 ? "Add" : "Save Changes"}
            className="inline-block w-full rounded bg-green-500 px-6 py-2.5 text-xs font-bold capitalize leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-green-700 hover:text-white hover:shadow-lg"
          />
        </div>
      </form>
    </Modal>
  );
}

export default ChildModal;
