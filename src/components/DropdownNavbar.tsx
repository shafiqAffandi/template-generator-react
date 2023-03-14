import { useState } from "react";
import usePageStore from "../stores/PageStore";
import LoadMenuModal from "./LoadMenuModal";
import NewMenuModal from "./NewMenuModal";
import SaveTemplateModal from "./SaveTemplateModal";

function DropdownNavbar() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [loadModalOpen, setLoadModalOpen] = useState(false);
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const pageStore = usePageStore();

  const onClickDropdown = () => {
    setPopupOpen(() => !popupOpen);
  };

  const onCreateNewMenu = () => {
    console.log("create new menu");
    setModalOpen(() => true);
    setPopupOpen(() => false);
  };

  const onCreateLoadMenu = () => {
    console.log("load menu");
    setLoadModalOpen(() => true);
    setPopupOpen(() => false);
  };

  const onSaveAsTemplate = () => {
    console.log("create template");
    setTemplateModalOpen(() => true);
    setPopupOpen(() => false);
  };

  return (
    <>
      <button
        className="inline-block rounded bg-lime-500 px-3.5 py-2.5 text-center text-xs font-bold uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-slate-700 hover:text-white hover:shadow-lg"
        onClick={onClickDropdown}
      >
        =
      </button>
      {popupOpen ? (
        <>
          <div className="fixed z-10 ml-32 mt-10 rounded bg-slate-100 text-left">
            <ul>
              <li
                className="w-40 rounded py-1 px-2 hover:cursor-pointer hover:bg-slate-300"
                onClick={() => onCreateNewMenu()}
              >
                Create New Menu
              </li>
              <li
                className="w-40 rounded py-1 px-2 hover:cursor-pointer hover:bg-slate-300"
                onClick={() => onCreateLoadMenu()}
              >
                Load Menu
              </li>
              <li
                className="w-40 rounded py-1 px-2 hover:cursor-pointer hover:bg-slate-300"
                onClick={() => onSaveAsTemplate()}
              >
                Save As A Template
              </li>
            </ul>
          </div>
        </>
      ) : null}
      <NewMenuModal onClose={() => setModalOpen(false)} open={modalOpen} />
      <LoadMenuModal
        onClose={() => setLoadModalOpen(false)}
        open={loadModalOpen}
      />
      <SaveTemplateModal
        onClose={() => setTemplateModalOpen(false)}
        open={templateModalOpen}
      />
    </>
  );
}

export default DropdownNavbar;
