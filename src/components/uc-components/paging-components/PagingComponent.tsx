import { useState } from "react";
import { PageType, PagingInputType } from "../../../types/Type";
import GridViewModal from "./GridViewModal";
import SearchModal from "./SearchModal";

type Props = {
  id: string;
  data: PagingInputType;
};

function PagingComponent({ id, data }: Props) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isGridOpen, setIsGridOpen] = useState(false);

  return (
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
    </div>
  );
}

export default PagingComponent;
