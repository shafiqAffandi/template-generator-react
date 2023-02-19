import { PageType } from "../types/PageType";

type Props = {
  children: PageType;
  onRemove: () => void;
};

function Page({ children, onRemove }: Props) {
  return (
    <div className="ml-48 mr-48 mt-12 rounded-lg bg-white p-8">
      <p className="text-black">{children.id}</p>
      <button
        onClick={onRemove}
        className="rounded bg-red-600 p-2 font-semibold text-white transition duration-100 ease-in-out hover:bg-red-800"
      >
        Remove
      </button>
    </div>
  );
}

export default Page;
