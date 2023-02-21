import { SubmitHandler, useForm } from "react-hook-form";
import usePageStore from "../stores/PageStore";
import { Modal } from "./ui-components/ModalComponent";

type Props = {
  open: boolean;
  children: string;
  id?: string;
  onClose: () => void;
};

// Form input
// title: string
// addButton: boolean
// backButton: boolean

type Inputs = {
  title: string;
  addButton: boolean;
  backButton: boolean;
};

function PageModal({ open, children, onClose, id }: Props) {
  if (!open) return null;

  const pageStore = usePageStore();
  const data = pageStore.pages.find((item) => item.id === id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues:
      id === undefined
        ? {}
        : {
            title: data?.title,
            addButton: data?.addButton,
            backButton: data?.backButton,
          },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    pageStore.setNewPage(data.title, data.addButton, data.backButton);
    if (!id) {
      pageStore.addPage();
      reset();
      onClose();
    }
    if (id) {
      pageStore.editPage(id);
      reset();
      onClose();
    }
  };

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="m-2 p-2 text-left">
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
            <div className="mt-2 grid grid-cols-3 text-left">
              <label className="col-span-1">Add Button</label>
              <div className="col-span-2 text-left">
                <input type={"checkbox"} {...register("addButton")} />
              </div>
            </div>
            <div className="mt-2 grid grid-cols-3 text-left">
              <label className="col-span-1">Back Button</label>
              <div className="col-span-2 text-left">
                <input type={"checkbox"} {...register("backButton")} />
              </div>
            </div>
          </div>
          <div className="text-center">
            <input
              type="submit"
              value={id === undefined ? "Add" : "Save Edit"}
              className="inline-block rounded bg-green-500 px-6 py-2.5 text-xs font-bold capitalize leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-green-700 hover:text-white hover:shadow-lg"
            />
          </div>
        </form>
      </Modal>
    </>
  );
}

export default PageModal;
