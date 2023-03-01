import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import usePageStore from "../../../stores/PageStore";
import { PagingInputType } from "../../../types/Type";

type Props = {
  identifier: string;
  data?: PagingInputType;
  onClose: () => void;
};

type InputsType = {
  title: string;
  querystring: string;
  exportExcel: boolean;
};

function AddPagingComponent({ identifier, onClose, data }: Props) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputsType>({
    defaultValues: {
      title: data?.pagingInput.title ?? "",
      querystring: data?.pagingInput.querystring?.name ?? "",
      exportExcel: data?.pagingInput.exportExcel ?? false,
    },
  });

  const pageStore = usePageStore();

  const onSubmit: SubmitHandler<InputsType> = (dataInput) => {
    const comp: PagingInputType = {
      pagingInput: {
        title: dataInput.title,
        querystring: { name: dataInput.querystring },
        exportExcel: dataInput.exportExcel,
        component: [],
        headerList: [],
        bodyList: [],
      },
      criteria: [],
    };
    if (data === undefined) {
      pageStore.addPaging(identifier, comp);
    }
    if (data !== undefined) {
      pageStore.editPaging(identifier, comp);
    }
    onClose();
  };

  return (
    <div className="overscroll-y-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="m-2 w-full p-2 text-left">
          <div className="mb-3 xl:w-96">
            <label className="form-label mb-2 inline-block capitalize text-gray-700">
              title
            </label>
            <input
              type="text"
              {...register("title")}
              required
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
              id="titleId"
            />
          </div>
          <div className="mb-3 xl:w-96">
            <label className="form-label mb-2 inline-block capitalize text-gray-700">
              Query String
            </label>
            <input
              type="text"
              {...register("querystring")}
              required
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
              id="queryStringId"
            />
          </div>
          <div className="mb-3 grid grid-cols-3 text-left">
            <label className="col-span-1">Export Excel Button</label>
            <div className="col-span-2 text-left">
              <input
                id="exportExcelId"
                type={"checkbox"}
                {...register("exportExcel")}
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <input
            type="submit"
            value={data === undefined ? "Add" : "Save Changes"}
            className="inline-block w-full rounded bg-green-500 px-6 py-2.5 text-xs font-bold capitalize leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-green-700 hover:text-white hover:shadow-lg"
          />
        </div>
      </form>
    </div>
  );
}

export default AddPagingComponent;
