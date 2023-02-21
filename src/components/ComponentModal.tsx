import { useEffect, useState } from "react";
import { PagingInputType } from "../types/Type";
import FormComponent from "./uc-components/form-component/FormComponent";
import AddPagingComponent from "./uc-components/paging-components/AddPagingComponent";
import ViewComponent from "./uc-components/view-component/ViewComponent";
import { Modal } from "./ui-components/ModalComponent";

type Props = {
  open: boolean;
  identifier: string;
  data?: PagingInputType;
  type?: string;
  onClose: () => void;
};

function ComponentModal({ open, identifier, onClose, data, type }: Props) {
  if (!open) return null;
  const [ucType, setUcType] = useState("");

  useEffect(() => {
    if (data !== undefined) {
      setUcType(() => type ?? "");
    }
  }, []);

  const onCancleHandler = () => {
    setUcType(() => "");
    onClose();
  };

  return (
    <>
      <Modal>
        <div className="text-right">
          <button
            type="button"
            className="inline-block rounded bg-slate-600 p-2 capitalize text-white shadow-lg transition duration-100 ease-in-out hover:bg-red-600"
            onClick={() => onCancleHandler()}
          >
            cancel
          </button>
        </div>

        <select
          name=""
          id="ucId"
          value={ucType}
          onChange={(e) => setUcType(e.target.value)}
        >
          <option value="">--select one--</option>
          <option value="paging">Paging</option>
          <option value="form">Form</option>
          <option value="view">View</option>
        </select>

        {ucType === "paging" && (
          <AddPagingComponent
            identifier={identifier}
            data={data}
            onClose={() => onCancleHandler()}
          />
        )}

        {ucType === "form" && <FormComponent />}

        {ucType === "view" && <ViewComponent />}

        {/* <div className="text-right">
          <button
            type="button"
            className="inline-block rounded bg-slate-600 p-2 capitalize text-white shadow-lg transition duration-100 ease-in-out hover:bg-red-600"
            onClick={() => onAddComponentHandler()}
          >
            Add Component
          </button>
        </div> */}
      </Modal>
    </>
  );
}

export default ComponentModal;
