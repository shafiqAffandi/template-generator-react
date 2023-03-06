import { useState } from "react";

function DropdownNavbar() {
  const [popupOpen, setPopupOpen] = useState(false);
  const onClickDropdown = () => {
    console.log("drowpdown click");
    setPopupOpen(() => !popupOpen);
  };
  return (
    <>
      <button
        className="inline-block rounded bg-lime-300 px-3.5 py-2.5 text-center text-xs font-bold uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-slate-700 hover:text-white hover:shadow-lg"
        onClick={onClickDropdown}
      >
        =
      </button>
      {popupOpen ? (
        <>
          <div className="fixed z-10 mt-10 ml-10 rounded bg-slate-100 p-2 text-right">
            <ul>
              <li>asdfsdfsssssszzzzzzzz</li>
              <li>asdfsdf</li>
              <li>asdfsdf</li>
            </ul>
          </div>
        </>
      ) : null}
    </>
  );
}

export default DropdownNavbar;
