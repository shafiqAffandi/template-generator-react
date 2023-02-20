import { useState } from "react";
import usePageStore from "../stores/PageStore";
import { PageType } from "../types/Type";
import ComponentModal from "./ComponentModal";
import PagingComponent from "./uc-components/paging-components/PagingComponent";

type Props = {
  children: PageType;
  onRemove: () => void;
};

function Page({ children, onRemove }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pageStore = usePageStore();

  return (
    <>
      <div className="ml-48 mr-48 mt-12 rounded-lg bg-white p-8">
        <p className="text-black">{children.id}</p>
        <button
          type="button"
          onClick={onRemove}
          className="rounded bg-red-600 p-2 font-semibold text-white transition duration-100 ease-in-out hover:bg-red-800"
        >
          Remove
        </button>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="rounded bg-green-500 p-2 font-semibold text-white transition duration-100 ease-in-out hover:bg-green-700"
        >
          Add Component
        </button>
        {pageStore.pages.map((page) => {
          if (page.id !== children.id) return null;
          if (page.paging === undefined) return null;
          return <PagingComponent id={children.id} data={page.paging} />;
        })}
      </div>
      <ComponentModal
        open={isModalOpen}
        identifier={children.id}
        onClose={() => setIsModalOpen(false)}
      ></ComponentModal>
    </>
  );
}

export default Page;
