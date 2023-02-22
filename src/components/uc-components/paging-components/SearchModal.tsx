import usePageStore from "../../../stores/PageStore";
import { useTable } from "react-table";
import { useMemo, useState } from "react";
import TableWrapper from "../../table-components/TableWrapper";
import AddSearchModal from "./AddSearchModal";
import { Modal } from "../../ui-components/ModalComponent";
import { matchesEl } from "../../../utils/utils";
import {
  InputsSearchComponentType,
  SearchComponentType,
} from "../../../types/Type";

type Props = {
  id: string;
  open: boolean;
  onClose: () => void;
};

function SearchModal({ id, open, onClose }: Props) {
  if (!open) return null;
  const [isOpen, setIsOpen] = useState(false);
  const [componentData, setComponentData] = useState(
    {} as InputsSearchComponentType
  );
  const [idxData, setIdxData] = useState(-1);
  const pageStore = usePageStore();
  const pages = pageStore.pages;
  const pageIndex = pages.findIndex((el) => matchesEl(el, id));
  let data = pages[pageIndex].paging?.pagingInput.component;

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
      {
        Header: "Column Name",
        accessor: "name",
      },
    ],
    []
  );

  const onCloseModal = () => {
    //@ts-ignore
    setComponentData(() => {});
    setIdxData(() => -1);
    setIsOpen(() => false);
  };

  const onEdit = (index: number) => {
    //@ts-ignore
    setComponentData(() => data[index]);
    setIdxData(() => index);
    setIsOpen(() => true);
  };

  const onRemove = (index: number) => {
    pageStore.removeSearchComponent(id, index);
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
      <AddSearchModal
        open={isOpen}
        id={id}
        data={componentData}
        index={idxData}
        onClose={() => onCloseModal()}
      />
    </>
  );
}

export default SearchModal;
