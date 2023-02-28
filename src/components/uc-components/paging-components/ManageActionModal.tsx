import { useMemo, useState } from "react";
import { useTable } from "react-table";
import usePageStore from "../../../stores/PageStore";
import TableWrapper from "../../table-components/TableWrapper";
import { Modal } from "../../ui-components/ModalComponent";
import ManageAddActionModal from "./ManageAddActionModal";

type Props = {
  open: boolean;
  onClose: () => void;
  index: number;
  // data?: {
  //   header: HeaderPagingType | undefined;
  //   body: BodyPagingType | undefined;
  // };
  data?: any;
  id: string;
};

function ManageActionModal({ open, onClose, index, data, id }: Props) {
  if (!open) return null;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idxData, setIdxData] = useState(-1);
  const pageStore = usePageStore();

  const columns = useMemo(
    () => [
      {
        Header: "Type",
        accessor: "type",
      },
    ],
    []
  );

  const tableData = useMemo(
    () => [...(data.body.action ?? [])],
    [[...(data.body.action ?? [])]]
  );
  // @ts-ignore
  const tableInstance = useTable({ columns, data: tableData });

  const onClickCancel = () => {
    onClose();
  };

  const onCloseModal = () => {
    setIdxData(() => -1);
    setIsModalOpen(() => false);
  };

  const onEdit = (actionIdx: number) => {
    setIdxData(() => actionIdx);
    setIsModalOpen(() => true);
  };

  const onRemove = (actionIdx: number) => {
    pageStore.removeActionBodyPaging(id, index, actionIdx);
  };

  return (
    <>
      <Modal>
        <div className="flow-root">
          <div className="float-left">
            <div className="flex">
              <p className="my-auto mr-2">{id + " manage action"}</p>
              <button
                type="button"
                className="inline-block rounded bg-slate-600 p-2 capitalize text-white shadow-lg transition duration-100 ease-in-out hover:bg-green-600"
                onClick={() => setIsModalOpen(true)}
              >
                add action
              </button>
            </div>
          </div>
          <div className="float-right">
            <button
              type="button"
              className="inline-block rounded bg-slate-600 p-2 capitalize text-white shadow-lg transition duration-100 ease-in-out hover:bg-red-600"
              onClick={() => onClickCancel()}
            >
              cancel
            </button>
          </div>
        </div>
        <p>table here</p>
        <TableWrapper
          tableInstance={tableInstance}
          onEdit={onEdit}
          onRemove={onRemove}
        />
      </Modal>
      <ManageAddActionModal
        open={isModalOpen}
        onClose={onCloseModal}
        index={index}
        idxData={idxData}
        id={id}
        bodyData={data.body}
      />
    </>
  );
}

export default ManageActionModal;
