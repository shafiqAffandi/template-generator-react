import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { API_HOST_URL } from "../environments/environment";
import usePageStore from "../stores/PageStore";
import { toUpper } from "../utils/utils";
import { Input } from "./ui-components/InputComponent";
import { Modal } from "./ui-components/ModalComponent";
import { Select } from "./ui-components/SelectComponent";

type Props = {
  id?: string;
  open: boolean;
  onClose: () => void;
};

function NewMenuModal({ open, id = undefined, onClose }: Props) {
  if (!open) return null;

  const [templateOpt, setTemplateOpt] = useState([]);
  const pageStore = usePageStore();

  useEffect(() => {
    fetch(`${API_HOST_URL}/template/GetAllTemplate`)
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        console.log(data);
        setTemplateOpt(() => data);
      });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>();

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
    pageStore.clearPage();
    pageStore.setMenu(
      toUpper(data.menuName).replace(/\s+/g, ""),
      data.menuName
    );
    reset();
    onClose();
  };

  return (
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
              Select Template
            </label>
            <Select
              register={register}
              name="templateId"
              options={templateOpt}
            />
          </div>
          <div className="mb-3 xl:w-96">
            <label className="form-label mb-2 inline-block capitalize text-gray-700">
              Menu Name
            </label>
            <Input register={register} name="menuName" />
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
  );
}

export default NewMenuModal;
