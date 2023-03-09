import { useState } from "react";
import usePageStore from "../stores/PageStore";
import { PageType } from "../types/Type";
import ChildModal from "./ChildModal";
import ComponentModal from "./ComponentModal";
import PageComponent from "./PageComponent";
import PageModal from "./PageModal";

type Props = {
  children: PageType;
  onRemove: () => void;
};

function Page({ children, onRemove }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openPageModal, setOpenPageModal] = useState(false);
  const [openChildModal, setOpenChildModal] = useState(false);
  const pageStore = usePageStore();
  const data = pageStore.pages.find((item) => item.id === children.id);
  console.log(data?.addButton);
  return (
    <>
      <div className="ml-48 mr-48 mt-12 rounded-lg bg-white p-8">
        <div className="flow-root">
          <div className="float-left flex">
            <p className="my-auto mr-2 text-black">{children.id}</p>
            <button
              type="button"
              onClick={() => setIsModalOpen(() => true)}
              className="rounded bg-green-500 p-2 font-semibold text-white transition duration-100 ease-in-out hover:bg-green-700"
            >
              Add Component
            </button>
          </div>

          <div className="float-right">
            <button
              type="button"
              onClick={() => setOpenChildModal(() => true)}
              className="ml-1 rounded bg-blue-600 p-2 font-semibold text-white transition duration-100 ease-in-out hover:bg-blue-800"
            >
              Set Child
            </button>
            <button
              type="button"
              onClick={() => setOpenPageModal(() => true)}
              className="ml-1 rounded bg-blue-600 p-2 font-semibold text-white transition duration-100 ease-in-out hover:bg-blue-800"
            >
              Edit Page
            </button>
            <button
              type="button"
              onClick={onRemove}
              className="ml-1 rounded bg-red-600 p-2 font-semibold text-white transition duration-100 ease-in-out hover:bg-red-800"
            >
              Remove
            </button>
          </div>
        </div>
        <p>{JSON.stringify(data)}</p>
        <PageComponent id={children.id} />
      </div>
      <ComponentModal
        open={isModalOpen}
        identifier={children.id}
        onClose={() => setIsModalOpen(false)}
      ></ComponentModal>
      <PageModal
        open={openPageModal}
        onClose={() => setOpenPageModal(false)}
        id={children.id}
      >
        Edit New Page
      </PageModal>
      <ChildModal
        data={data?.child}
        open={openChildModal}
        onClose={() => setOpenChildModal(false)}
        id={children.id}
      />
    </>
  );
}

export default Page;
