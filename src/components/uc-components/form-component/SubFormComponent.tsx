import { useMemo, useState } from "react";
import { useTable } from "react-table";
import usePageStore from "../../../stores/PageStore";
import { FormInputType } from "../../../types/FormType";
import ComponentModal from "../../ComponentModal";
import TableWrapper from "../../table-components/TableWrapper";
import AddFormInputComponent from "./AddFormInputComponent";

type Props = {
  id: string;
  data: FormInputType;
  idx: number;
};

function SubFormComponent({ id, data, idx }: Props) {
  const [isFormInputOpen, setIsFormInputOpen] = useState(false);
  const [isComponentOpen, setIsComponentOpen] = useState(false);
  const [subFormInputIdx, setSubFormInputIdx] = useState(-1);
  const pageStore = usePageStore();

  const dataTable = data.formInput;
  const columns = useMemo(
    () => [
      {
        Header: "Type",
        accessor: "Type",
      },
      {
        Header: "Label",
        accessor: "Label",
      },
    ],
    []
  );

  const tableData = useMemo(
    () => [...(data.formInput ?? [])],
    [[...(data.formInput ?? [])]]
  );
  // @ts-ignore
  const tableInstance = useTable({ columns, data: tableData });

  const onCloseFormInput = () => {
    setSubFormInputIdx(() => -1);
    setIsFormInputOpen(() => false);
  };

  const onEdit = () => {
    setIsComponentOpen(() => true);
  };

  const onEditFormInput = (formIdx: number) => {
    setSubFormInputIdx(() => formIdx);
    setIsFormInputOpen(() => true);
  };

  const onRemoveFormInput = (formIdx: number) => {
    pageStore.removeFormInput(id, idx, formIdx);
  };

  const onRemove = () => {
    pageStore.removeSubForm(id, idx);
  };
  return (
    <>
      <div className="my-2 border-2 border-solid border-red-400">
        <p>{JSON.stringify(data)}</p>
        <TableWrapper
          tableInstance={tableInstance}
          onEdit={onEditFormInput}
          onRemove={onRemoveFormInput}
        />
        <br />
        <button
          onClick={() => setIsFormInputOpen(() => true)}
          className="mr-2 rounded bg-gray-500 p-2 font-semibold text-white"
        >
          add form input
        </button>
        <button
          onClick={() => onEdit()}
          className="mr-2 rounded bg-gray-500 p-2 font-semibold text-white"
        >
          edit
        </button>
        <button
          onClick={() => onRemove()}
          className="mr-2 rounded bg-gray-500 p-2 font-semibold text-white"
        >
          remove subsection
        </button>
      </div>
      <ComponentModal
        open={isComponentOpen}
        identifier={id}
        data={data as any}
        type={"form"}
        idx={idx}
        onClose={() => setIsComponentOpen(false)}
      ></ComponentModal>
      <AddFormInputComponent
        open={isFormInputOpen}
        id={id}
        data={data}
        onClose={onCloseFormInput}
        idx={subFormInputIdx}
        compIdx={idx}
      />
    </>
  );
}

export default SubFormComponent;
