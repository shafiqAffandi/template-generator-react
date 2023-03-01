import { useTable } from "react-table";
import { useMemo, useState } from "react";
import { matchesEl } from "../../../utils/utils";
import usePageStore from "../../../stores/PageStore";
import TableWrapper from "../../table-components/TableWrapper";
import { Modal } from "../../ui-components/ModalComponent";
import AddCriteriaModal from "./AddCriteriaModal";

type Props = {
  id: string;
  open: boolean;
  onClose: () => void;
};

function CriteriaModal({ id, open, onClose }: Props) {
  if (!open) return null;

  const [isOpen, setIsOpen] = useState(false);
  const [criteriaData, setCriteriaData] = useState();
  const [idxData, setIdxData] = useState(-1);
  const pageStore = usePageStore();
  const pages = pageStore.pages;
  const pageIndex = pages.findIndex((el) => matchesEl(el, id));
  let data = pages[pageIndex].paging?.criteria;

  const columns = useMemo(
    () => [
      {
        Header: "Property Name",
        accessor: "propName",
      },
      {
        Header: "Restriction",
        accessor: "restriction",
      },
      {
        Header: "Value",
        accessor: "value",
      },
    ],
    []
  );

  const onCloseModal = () => {
    //@ts-ignore
    setCriteriaData(() => {});
    setIdxData(() => -1);
    setIsOpen(() => false);
  };

  const onEdit = (index: number) => {
    //@ts-ignore
    setCriteriaData(() => data[index]);
    setIdxData(() => index);
    setIsOpen(() => true);
  };

  const onRemove = (index: number) => {
    pageStore.removeCriteriaPaging(id, index);
  };

  const tableData = useMemo(() => [...(data ?? [])], [[...(data ?? [])]]);
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
      <AddCriteriaModal
        open={isOpen}
        id={id}
        data={criteriaData}
        index={idxData}
        onClose={() => onCloseModal()}
      />
    </>
  );
}

export default CriteriaModal;
