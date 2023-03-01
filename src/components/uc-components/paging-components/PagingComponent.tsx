import { useState } from "react";
import usePageStore from "../../../stores/PageStore";
import { PageType, PagingInputType } from "../../../types/Type";
import ComponentModal from "../../ComponentModal";
import CriteriaModal from "./CriteriaModal";
import GridViewModal from "./GridViewModal";
import SearchModal from "./SearchModal";

type Props = {
  id: string;
  data: PagingInputType;
};

function PagingComponent({ id, data }: Props) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [isCriteriaOpen, setIsCriteriaOpen] = useState(false);
  const [isComponentOpen, setIsComponentOpen] = useState(false);
  const pageStore = usePageStore();

  const onEdit = () => {
    setIsComponentOpen(() => true);
  };
  const onRemove = () => {
    pageStore.removePaging(id);
  };

  return (
    <>
      <div className="mt-3 border-2 border-solid border-blue-500 p-8">
        <div>
          <div>{JSON.stringify(data)}</div>
          <button
            onClick={() => setIsSearchOpen(() => true)}
            className="mr-2 rounded bg-gray-500 p-2 font-semibold text-white"
          >
            setPaging
          </button>
          <button
            onClick={() => setIsGridOpen(() => true)}
            className="mr-2 rounded bg-gray-500 p-2 font-semibold text-white"
          >
            setGrid
          </button>
          <button
            onClick={() => setIsCriteriaOpen(() => true)}
            className="mr-2 rounded bg-gray-500 p-2 font-semibold text-white"
          >
            setCriteria
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
            remove
          </button>
        </div>
        <SearchModal
          id={id}
          open={isSearchOpen}
          onClose={() => setIsSearchOpen(() => false)}
        />
        <GridViewModal
          id={id}
          open={isGridOpen}
          onClose={() => setIsGridOpen(() => false)}
        />
        <CriteriaModal
          id={id}
          open={isCriteriaOpen}
          onClose={() => setIsCriteriaOpen(() => false)}
        />
      </div>
      <ComponentModal
        open={isComponentOpen}
        identifier={id}
        data={data}
        type={"paging"}
        onClose={() => setIsComponentOpen(false)}
      ></ComponentModal>
    </>
  );
}

export default PagingComponent;
