import { useState } from "react";
import FormComponent from "./uc-components/form-component/FormComponent";
import AddPagingComponent from "./uc-components/paging-components/AddPagingComponent";
import ViewComponent from "./uc-components/view-component/ViewComponent";

type Props = {
  open: boolean;
  identifier: string;
  onClose: () => void;
};

function ComponentModal({ open, identifier, onClose }: Props) {
  const [ucType, setUcType] = useState("");

  const onCancleHandler = () => {
    setUcType(() => "");
    onClose();
  };

  if (!open) return null;
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-zinc-900/50 backdrop-blur-sm">
        <div className="fixed top-1/2 left-1/2 z-10 inline-block h-auto w-2/5 -translate-y-1/2 -translate-x-1/2 rounded bg-white p-2">
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
        </div>
      </div>
    </>
  );
}

export default ComponentModal;
