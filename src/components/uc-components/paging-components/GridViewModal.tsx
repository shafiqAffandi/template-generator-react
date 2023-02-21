import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Modal } from "../../ui-components/ModalComponent";

type Props = {
  id: string;
  open: boolean;
  onClose: () => void;
};

function GridViewModal({ id, open, onClose }: Props) {
  const idName = "gridViewComponent";

  const { register, control, handleSubmit, reset, trigger, setError } = useForm(
    {
      // defaultValues: {}; you can populate the fields by this attribute
    }
  );
  const { fields, append, remove } = useFieldArray({
    control,
    name: idName,
  });

  const onSubmitHandler: SubmitHandler<any> = (data) => {
    console.log(data);
    // const compList: SearchComponentType[] = [];
    // // console.log(data);
    // data.searchComponent.forEach((element: any) => {
    //   const comp: SearchComponentType = {
    //     type: element.type,
    //     label: element.label,
    //     name: element.columnName,
    //     value: "",
    //     placeholder: "",
    //     datatype: "text",
    //   };
    //   compList.push(comp);
    // });

    // pageStore.addSearchComponent(id, compList);
  };

  if (!open) return null;
  return (
    <>
      <Modal>
        <div className="text-right">
          <button
            type="button"
            className="inline-block rounded bg-slate-600 p-2 capitalize text-white shadow-lg transition duration-100 ease-in-out hover:bg-red-600"
            onClick={onClose}
          >
            cancel
          </button>
        </div>
        {/* <form onSubmit={handleSubmit(onSubmitHandler)}>
          <>
            <ul className="w-full">
              {fields.map((item, index) => (
                <div key={item.id} className="grid grid-cols-12">
                  <div className="col-span-6 p-1">
                    <label>Header Type</label>
                    <Select
                      register={register}
                      name={`${idName}.${index}.headerType`}
                      options={["label", "sort"]}
                    />
                  </div>
                  <div className="col-span-6 p-1">
                    <label>Body Type</label>
                    <Select
                      register={register}
                      name={`${idName}.${index}.bodyType`}
                      options={["text", "boolean", "action"]}
                    />
                  </div>
                  <div className="col-span-6 p-1">
                    <label>Position</label>
                    <Select
                      register={register}
                      name={`${idName}.${index}.position`}
                      options={["left", "center", "right"]}
                    />
                  </div>
                  <div className="col-span-6 p-1">
                    <label>Label</label>
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
                      {...register(`${idName}.${index}.label`)}
                    />
                  </div>
                  <div className="col-span-6 p-1">
                    <label>Column Name</label>
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
                      {...register(`${idName}.${index}.columnName`)}
                    />
                  </div>
                  <div className="col-span-6 p-1">
                    <label>Property</label>
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
                      {...register(`${idName}.${index}.property`)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <button
                      className="mt-auto mb-1 inline-block rounded bg-slate-600 p-2 capitalize text-white shadow-lg transition duration-100 ease-in-out hover:bg-red-600"
                      type="button"
                      onClick={() => remove(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </ul>
            <button
              className="mr-2 inline-block rounded bg-green-600 p-2 capitalize text-white shadow-lg transition duration-100 ease-in-out hover:bg-green-800"
              type="button"
              onClick={() => append({})}
            >
              append
            </button>
          </>
          <input
            className="mr-2 inline-block rounded bg-blue-600 p-2 capitalize text-white shadow-lg transition duration-100 ease-in-out hover:bg-blue-800"
            type="submit"
            value={"Save"}
          />
        </form> */}
      </Modal>
    </>
  );
}

export default GridViewModal;
