import { useState } from "react";
import usePageStore from "../stores/PageStore";
import PageModal from "./PageModal";

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <nav className="relative mb-3 flex flex-wrap items-center justify-between bg-slate-500/0 px-2 py-3">
        <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
          <div className="relative flex w-full justify-between lg:static lg:block lg:w-auto lg:justify-start">
            <p className="inline-block whitespace-nowrap py-2 text-sm font-bold uppercase leading-relaxed text-white">
              Template Generator
            </p>
          </div>
          <div
            className="flex flex-grow items-center"
            id="example-navbar-danger"
          >
            <ul className="flex list-none flex-col lg:ml-auto lg:flex-row">
              <li className="nav-item">
                <div className="flex justify-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="inline-block rounded bg-green-500 px-6 py-2.5 text-xs font-bold uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-slate-700 hover:text-white hover:shadow-lg"
                  >
                    Add Page
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <PageModal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        Add New Page
      </PageModal>
    </>
  );
}

export default Navbar;
