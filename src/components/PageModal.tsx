import { SubmitHandler, useForm } from "react-hook-form";
import usePageStore from "../stores/PageStore";
import { Input } from "./ui-components/InputComponent";
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
  addLink: string;
};

function PageModal({ open, children, onClose, id }: Props) {
  if (!open) return null;

  const pageStore = usePageStore();
  const data = pageStore.pages.find((item) => item.id === id);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues:
      id === undefined
        ? {}
        : {
            title: data?.title,
            addButton: data?.addButton,
            backButton: data?.backButton,
            addLink: data?.addLink,
          },
  });

  const watchAddButton = watch("addButton");

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const addLink = data.addButton ? data.addLink : "";
    pageStore.setNewPage(data.title, data.addButton, addLink, data.backButton);
    if (!id) {
      pageStore.addPage();
    }
    if (id) {
      pageStore.editPage(id);
    }

    reset();
    onClose();
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
              <Input register={register} name="title" />
            </div>
            <div className="mt-2 grid grid-cols-3 text-left">
              <label className="col-span-1">Add Button</label>
              <div className="col-span-2 text-left">
                <input type={"checkbox"} {...register("addButton")} />
              </div>
            </div>
            {watchAddButton ? (
              <>
                <div className="mb-3 xl:w-96">
                  <label className="form-label mb-2 inline-block capitalize text-gray-700">
                    Add Link
                  </label>
                  <Input register={register} name="addLink" />
                </div>
              </>
            ) : null}
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
