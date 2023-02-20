import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import usePageStore from "../../../stores/PageStore";
import { SearchComponentType } from "../../../types/Type";
import { Select } from "../../form-components/form-component";

type Props = {
  id: string;
  open: boolean;
  onClose: () => void;
};

function SearchModal({ id, open, onClose }: Props) {
  const { register, control, handleSubmit, reset, trigger, setError } = useForm(
    {
      // defaultValues: {}; you can populate the fields by this attribute
    }
  );
  const { fields, append, remove } = useFieldArray({
    control,
    name: "searchComponent",
  });

  const pageStore = usePageStore();

  const onSubmitHandler: SubmitHandler<any> = (data) => {
    const compList: SearchComponentType[] = [];
    // console.log(data);
    data.searchComponent.forEach((element: any) => {
      const comp: SearchComponentType = {
        type: element.type,
        label: element.label,
        name: element.columnName,
        value: "",
        placeholder: "",
        datatype: "text",
      };
      compList.push(comp);
    });

    pageStore.addSearchComponent(id, compList);
  };

  if (!open) return null;
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-zinc-900/50 backdrop-blur-sm">
        <div className="fixed top-1/2 left-1/2 z-10 inline-block h-auto -translate-y-1/2 -translate-x-1/2 rounded bg-white p-2">
          <div className="text-right">
            <button
              type="button"
              className="inline-block rounded bg-slate-600 p-2 capitalize text-white shadow-lg transition duration-100 ease-in-out hover:bg-red-600"
              onClick={onClose}
            >
              cancel
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <>
              <ul className="w-full">
                {fields.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-12">
                    <div className="col-span-6 p-1">
                      <label>Type</label>
                      <Select
                        register={register}
                        name={`searchComponent.${index}.type`}
                        options={["textbox", "dropdown"]}
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
                        {...register(`searchComponent.${index}.label`)}
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
                        {...register(`searchComponent.${index}.columnName`)}
                      />
                    </div>
                    <div className="flex flex-col">
                      <button
                        className="mt-auto mb-1 inline-block h-3/5 rounded bg-slate-600 p-2 capitalize text-white shadow-lg transition duration-100 ease-in-out hover:bg-red-600"
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
          </form>
        </div>
      </div>
    </>
  );
}

export default SearchModal;
