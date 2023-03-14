import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { API_HOST_URL } from "../environments/environment";
import usePageStore from "../stores/PageStore";
import { Input } from "./ui-components/InputComponent";
import { Modal } from "./ui-components/ModalComponent";
import { Select } from "./ui-components/SelectComponent";

type Props = {
  open: boolean;
  onClose: () => void;
};

function LoadMenuModal({ open, onClose }: Props) {
  if (!open) return null;

  const [listMenu, setListMenu] = useState([]);
  const pageStore = usePageStore();

  useEffect(() => {
    fetch(`${API_HOST_URL}/pages/GetAllMenu`)
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        console.log(data);
        setListMenu(() => data);
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
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        code: data.menu,
      }),
    };
    fetch(`${API_HOST_URL}/pages/LoadMenu`, requestOptions)
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        console.log(data);
        pageStore.setMenu(data.menuId, data.menuName);
        pageStore.setPage(data.pages);
      });
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
              Load from
            </label>
            <Select name="menu" register={register} options={listMenu} />
          </div>
        </div>
        <div className="text-center">
          <input
            type="submit"
            value={"Select"}
            className="inline-block rounded bg-green-500 px-6 py-2.5 text-xs font-bold capitalize leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-green-700 hover:text-white hover:shadow-lg"
          />
        </div>
      </form>
    </Modal>
  );
}

export default LoadMenuModal;
