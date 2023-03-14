import { SubmitHandler, useForm } from "react-hook-form";
import { API_HOST_URL } from "../environments/environment";
import usePageStore from "../stores/PageStore";
import { toUpper } from "../utils/utils";
import { Input } from "./ui-components/InputComponent";
import { Modal } from "./ui-components/ModalComponent";

type Props = {
  open: boolean;
  onClose: () => void;
};

function SaveTemplateModal({ open, onClose }: Props) {
  if (!open) return null;

  const pageStore = usePageStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>();

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);

    let rawTemplate = [...pageStore.pages];
    for (let item of rawTemplate) {
      if (item.paging !== undefined) {
        item.paging.pagingInput.headerList = [];
        item.paging.pagingInput.bodyList = [];
        item.paging.pagingInput.component = [];
      }

      if (item.forms !== undefined) {
        item.forms.serviceUrl = {};
        item.forms.subsection = [];
        item.forms.criteria = [];
      }
    }

    // TODO: cleanup template for other component (eg. ucviewgeneric, ucaddtotemp)

    // TODO: hit API for save template
    const reqObj = {
      templateId: toUpper(data.templateName).replace(/\s+/g, ""),
      templateName: data.templateName,
      template: rawTemplate,
    };

    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(reqObj),
    };
    fetch(`${API_HOST_URL}/template/SaveTemplate`, requestOptions)
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        reset();
        onClose();
      });

    // console.log(reqObj);
    // console.log(JSON.stringify(reqObj));
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
              Template Name
            </label>
            <Input name="templateName" register={register} isRequired={true} />
          </div>
        </div>
        <div className="text-center">
          <input
            type="submit"
            value={"Save"}
            className="inline-block rounded bg-green-500 px-6 py-2.5 text-xs font-bold capitalize leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-green-700 hover:text-white hover:shadow-lg"
          />
        </div>
      </form>
    </Modal>
  );
}

export default SaveTemplateModal;
