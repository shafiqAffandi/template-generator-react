import { useMemo, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useTable } from "react-table";
import TableWrapper from "../../table-components/TableWrapper";
import { Modal } from "../../ui-components/ModalComponent";
import mockData from "../../../data/mock-data.json";
import AddGridViewModal from "./AddGridViewModal";
import usePageStore from "../../../stores/PageStore";
import { matchesEl } from "../../../utils/utils";

type Props = {
  id: string;
  open: boolean;
  onClose: () => void;
};

function GridViewModal({ id, open, onClose }: Props) {
  if (!open) return null;
  const pageStore = usePageStore();
  const [isOpen, setIsOpen] = useState(false);
  const [idxData, setIdxData] = useState(-1);
  const pages = pageStore.pages;
  const pageIndex = pages.findIndex((el) => matchesEl(el, id));
  const dataHeader = pages[pageIndex].paging?.pagingInput.headerList;
  const dataBody = pages[pageIndex].paging?.pagingInput.bodyList;
  const data: any = dataHeader?.map((item, index) => {
    return {
      type: dataBody?.[index].type,
      label: item.label,
    };
  });

  console.log(data);

  const onEdit = (index: number) => {
    console.log("edit index", index);
    //@ts-ignore
    // setComponentData(() => data[index]);
    // setIdxData(() => index);
    // setIsOpen(() => true);
  };

  const onRemove = (index: number) => {
    console.log("remove index", index);
    pageStore.removeHeaderPaging(id, index);
    pageStore.removeBodyPaging(id, index);
  };

  const onCloseModal = () => {
    //@ts-ignore
    // setComponentData(() => {});
    setIdxData(() => -1);
    setIsOpen(() => false);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Type",
        accessor: "type",
      },
      {
        Header: "Label",
        accessor: "label",
      },
    ],
    []
  );

  const tableData = useMemo(() => [...(data ?? [])], [[...(data ?? [])]]);
  // const tableData = useMemo(() => [...mockData], []);
  // @ts-ignore
  const tableInstance = useTable({ columns, data: tableData });

  return (
    <>
      <Modal>
        {/* <p>{JSON.stringify(data)}</p> */}
        <div className="flow-root">
          <div className="float-left">
            <div className="flex">
              <p className="my-auto mr-2">{id}</p>
              <button
                type="button"
                className="inline-block rounded bg-slate-600 p-2 capitalize text-white shadow-lg transition duration-100 ease-in-out hover:bg-green-600"
                onClick={() => setIsOpen(true)}
              >
                add
              </button>
            </div>
          </div>
          <div className="float-right">
            <button
              type="button"
              className="inline-block rounded bg-slate-600 p-2 capitalize text-white shadow-lg transition duration-100 ease-in-out hover:bg-red-600"
              onClick={onClose}
            >
              back
            </button>
          </div>
        </div>
        <div>
          <TableWrapper
            tableInstance={tableInstance}
            onEdit={onEdit}
            onRemove={onRemove}
          />
        </div>
      </Modal>
      <AddGridViewModal
        open={isOpen}
        id={id}
        // data={componentData}
        index={idxData}
        onClose={() => onCloseModal()}
      />
    </>
  );
}

export default GridViewModal;
